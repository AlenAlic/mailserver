<template>
  <div class="container">
    <div class="panel">
      <div class="panel__header">
        <div class="panel__title">Virtual Domains</div>
      </div>
      <virtual-domains></virtual-domains>
    </div>
    <div class="panel">
      <div class="panel__header">
        <div class="panel__title">Virtual Users</div>
      </div>
      <virtual-users></virtual-users>
    </div>
    <div class="panel">
      <div class="panel__header">
        <div class="panel__title">Virtual Aliases</div>
      </div>
      <virtual-aliases></virtual-aliases>
    </div>
  </div>
</template>

<script>
import VirtualDomains from "@/components/mail/VirtualDomains";
import VirtualUsers from "@/components/mail/VirtualUsers";
import VirtualAliases from "@/components/mail/VirtualAliases";
export default {
  name: "Dashboard",
  components: {
    VirtualAliases,
    VirtualUsers,
    VirtualDomains
  }
};
</script>
