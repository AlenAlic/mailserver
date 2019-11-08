<template>
  <div class="table__responsive">
    <table class="table">
      <thead>
        <tr>
          <th class="table__cell--icon">ID</th>
          <th class="table__wrap">Name</th>
          <th class="table__cell--date">
            Available since
          </th>
          <th class="table__cell--date">
            Last edit
          </th>
          <th class="table__cell--icon" @click="showCreateModal()">
            <span v-if="virtual_domains.length > 0" data-tooltip="Add domain" data-tooltip-pos="up">
              <span class="table__icon mdi mdi-plus-circle"></span>
            </span>
          </th>
          <th class="table__cell--icon"></th>
        </tr>
      </thead>
      <tbody v-if="loading || virtual_domains.length === 0">
        <tr>
          <td colspan="6">
            <div class="has-component-centered">
              <div v-if="loading" class="spinner_grow--small"></div>
              <button v-else class="button--cta" @click="showCreateModal()">Add domain</button>
            </div>
          </td>
        </tr>
      </tbody>
      <tbody v-else>
        <tr v-for="domain in virtual_domains" :key="domain.id">
          <td class="table__cell--icon">{{ domain.id }}</td>
          <td class="table__wrap">{{ domain.name }}</td>
          <td>{{ $util.getFormattedDate(domain.created_at) }}</td>
          <td>{{ $util.getFormattedDateTime(domain.updated_at) }}</td>
          <td @click="showUpdateModal(domain)">
            <span data-tooltip="Edit" data-tooltip-pos="up">
              <span class="table__icon mdi mdi-pencil"></span>
            </span>
          </td>
          <td @click="showDeleteModal(domain)">
            <span data-tooltip="Delete" data-tooltip-pos="up">
              <span class="table__icon mdi mdi-delete"></span>
            </span>
          </td>
        </tr>
      </tbody>
    </table>
    <create-virtual-domain-modal></create-virtual-domain-modal>
    <update-virtual-domain-modal
      :defaultDomain="active_domain"
      :defaultDomainName="!!active_domain ? active_domain.name : ''"
    ></update-virtual-domain-modal>
    <delete-virtual-domain-modal :domain="active_domain"></delete-virtual-domain-modal>
  </div>
</template>

<script>
import CreateVirtualDomainModal from "@/components/modals/VirtualDomain/CreateVirtualDomainModal";
import DeleteVirtualDomainModal from "@/components/modals/VirtualDomain/DeleteVirtualDomainModal";
import UpdateVirtualDomainModal from "@/components/modals/VirtualDomain/UpdateVirtualDomainModal";
import { DOMAINS } from "@/store/modules/mail";
import { mapState } from "vuex";

export default {
  name: "VirtualDomains",
  components: {
    UpdateVirtualDomainModal,
    DeleteVirtualDomainModal,
    CreateVirtualDomainModal
  },
  created() {
    this.$store.dispatch(DOMAINS);
  },
  data: function() {
    return {
      active_domain: null
    };
  },
  computed: mapState({
    loading: state => state.mail.loading_domains,
    virtual_domains: state => state.mail.domains
  }),
  methods: {
    getDomains: function() {
      this.active_domain = null;
      this.$store.dispatch(DOMAINS);
    },
    showCreateModal: function() {
      this.$modal.show("create-virtual-domain-modal");
    },
    showUpdateModal: function(domain) {
      this.active_domain = domain;
      this.$modal.show("update-virtual-domain-modal");
    },
    showDeleteModal: function(domain) {
      this.active_domain = domain;
      this.$modal.show("delete-virtual-domain-modal");
    }
  }
};
</script>
