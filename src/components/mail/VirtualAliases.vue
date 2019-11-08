<template>
  <div class="table__responsive">
    <table class="table">
      <thead>
        <tr>
          <th class="table__cell--icon">ID</th>
          <th class="table__wrap">Domain</th>
          <th class="table__wrap">Source</th>
          <th class="table__wrap">Destination</th>
          <th class="table__cell--date">
            Available since
          </th>
          <th class="table__cell--date">
            Last edit
          </th>
          <th class="table__cell--icon" @click="showCreateModal()">
            <span v-if="virtual_aliases.length > 0" class="table__icon mdi mdi-plus-circle"></span>
          </th>
          <th class="table__cell--icon"></th>
        </tr>
      </thead>
      <tbody v-if="loading || virtual_aliases.length === 0">
        <tr>
          <td colspan="8">
            <div class="has-component-centered">
              <div v-if="loading" class="spinner_grow--small"></div>
              <button v-else class="button--cta" @click="showCreateModal()">Add alias</button>
            </div>
          </td>
        </tr>
      </tbody>
      <tbody v-else>
        <tr v-for="alias in virtual_aliases" :key="alias.id">
          <td class="table__cell--icon">{{ alias.id }}</td>
          <td class="table__wrap">{{ alias.domain }}</td>
          <td class="table__wrap">{{ alias.source }}</td>
          <td class="table__wrap">{{ alias.destination }}</td>
          <td>{{ $util.getFormattedDate(alias.created_at) }}</td>
          <td>{{ $util.getFormattedDateTime(alias.updated_at) }}</td>
          <td @click="showUpdateModal(alias)">
            <span class="table__icon mdi mdi-pencil"></span>
          </td>
          <td @click="showDeleteModal(alias)">
            <span class="table__icon mdi mdi-delete"></span>
          </td>
        </tr>
      </tbody>
    </table>
    <create-virtual-alias-modal @aliasCreated="getAliases()"></create-virtual-alias-modal>
    <update-virtual-alias-modal
      :defaultAlias="active_alias"
      :defaultSource="!!active_alias ? active_alias.source_name : ''"
      :defaultDestination="!!active_alias ? active_alias.destination : ''"
      :defaultDomain="!!active_alias ? active_alias.domain_id : 0"
    ></update-virtual-alias-modal>
    <delete-virtual-alias-modal :alias="active_alias"></delete-virtual-alias-modal>
  </div>
</template>

<script>
import CreateVirtualAliasModal from "@/components/modals/VirtualAlias/CreateVirtualAliasModal";
import DeleteVirtualAliasModal from "@/components/modals/VirtualAlias/DeleteVirtualAliasModal";
import UpdateVirtualAliasModal from "@/components/modals/VirtualAlias/UpdateVirtualAliasModal";
import { ALIASES } from "@/store/modules/mail";
import { mapState } from "vuex";
export default {
  name: "VirtualAliases",
  components: {
    DeleteVirtualAliasModal,
    CreateVirtualAliasModal,
    UpdateVirtualAliasModal
  },
  created() {
    this.$store.dispatch(ALIASES);
  },
  data: function() {
    return {
      active_alias: null
    };
  },
  computed: mapState({
    loading: state => state.mail.loading_aliases,
    virtual_aliases: state => state.mail.aliases
  }),
  methods: {
    getAliases: function() {
      this.active_alias = null;
      this.$store.dispatch(ALIASES);
    },
    showCreateModal: function() {
      this.$modal.show("create-virtual-alias-modal");
    },
    showUpdateModal: function(alias) {
      this.active_alias = alias;
      this.$modal.show("update-virtual-alias-modal");
    },
    showDeleteModal: function(alias) {
      this.active_alias = alias;
      this.$modal.show("delete-virtual-alias-modal");
    }
  }
};
</script>
