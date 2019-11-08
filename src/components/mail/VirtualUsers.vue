<template>
  <div class="table__responsive">
    <table class="table">
      <thead>
        <tr>
          <th class="table__cell--icon">ID</th>
          <th class="table__wrap">Domain</th>
          <th class="table__wrap">E-mail</th>
          <th class="table__cell--icon"></th>
          <th class="table__cell--date">
            Available since
          </th>
          <th class="table__cell--date">
            Last edit
          </th>
          <th class="table__cell--icon" @click="showCreateModal()">
            <span v-if="virtual_users.length > 0" data-tooltip="Add user" data-tooltip-pos="up">
              <span class="table__icon mdi mdi-plus-circle"></span>
            </span>
          </th>
          <th class="table__cell--icon"></th>
        </tr>
      </thead>
      <tbody v-if="loading || virtual_users.length === 0">
        <tr>
          <td colspan="8">
            <div class="has-component-centered">
              <div v-if="loading" class="spinner_grow--small"></div>
              <button v-else class="button--cta" @click="showCreateModal()">Add user</button>
            </div>
          </td>
        </tr>
      </tbody>
      <tbody v-else>
        <tr v-for="user in virtual_users" :key="user.id">
          <td class="table__cell--icon">{{ user.id }}</td>
          <td class="table__wrap">{{ user.domain }}</td>
          <td class="table__wrap">{{ user.email }}</td>
          <td @click="showPasswordModal(user)">
            <span data-tooltip="Check password" data-tooltip-pos="up">
              <span class="table__icon mdi mdi-email-lock"></span>
            </span>
          </td>
          <td>{{ $util.getFormattedDate(user.created_at) }}</td>
          <td>{{ $util.getFormattedDateTime(user.updated_at) }}</td>
          <td @click="showUpdateModal(user)">
            <span data-tooltip="Edit" data-tooltip-pos="up">
              <span class="table__icon mdi mdi-pencil"></span>
            </span>
          </td>
          <td @click="showDeleteModal(user)">
            <span data-tooltip="Delete" data-tooltip-pos="up">
              <span class="table__icon mdi mdi-delete"></span>
            </span>
          </td>
        </tr>
      </tbody>
    </table>
    <create-virtual-user-modal></create-virtual-user-modal>
    <update-virtual-user-modal
      :defaultUser="active_user"
      :defaultEmail="!!active_user ? active_user.username : ''"
      :defaultDomain="!!active_user ? active_user.domain_id : 0"
    ></update-virtual-user-modal>
    <delete-virtual-user-modal :user="active_user"></delete-virtual-user-modal>
    <check-virtual-user-password-modal :user="active_user"></check-virtual-user-password-modal>
  </div>
</template>

<script>
import CreateVirtualUserModal from "@/components/modals/VirtualUser/CreateVirtualUserModal";
import DeleteVirtualUserModal from "@/components/modals/VirtualUser/DeleteVirtualUserModal";
import UpdateVirtualUserModal from "@/components/modals/VirtualUser/UpdateVirtualUserModal";
import { USERS } from "@/store/modules/mail";
import { mapState } from "vuex";
import CheckVirtualUserPasswordModal from "@/components/modals/VirtualUser/CheckVirtualUserPasswordModal";
export default {
  name: "VirtualUsers",
  components: {
    CheckVirtualUserPasswordModal,
    UpdateVirtualUserModal,
    DeleteVirtualUserModal,
    CreateVirtualUserModal
  },
  created() {
    this.$store.dispatch(USERS);
  },
  data: function() {
    return {
      active_user: null
    };
  },
  computed: mapState({
    loading: state => state.mail.loading_users,
    virtual_users: state => state.mail.users
  }),
  methods: {
    getUsers: function() {
      this.active_user = null;
      this.$store.dispatch(USERS);
    },
    showCreateModal: function() {
      this.$modal.show("create-virtual-user-modal");
    },
    showUpdateModal: function(user) {
      this.active_user = user;
      this.$modal.show("update-virtual-user-modal");
    },
    showDeleteModal: function(user) {
      this.active_user = user;
      this.$modal.show("delete-virtual-user-modal");
    },
    showPasswordModal: function(user) {
      this.active_user = user;
      this.$modal.show("check-virtual-user-password-modal");
    }
  }
};
</script>
