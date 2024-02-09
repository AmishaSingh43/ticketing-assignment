<template>
  <div class="home col-8 mx-auto py-5 mt-5">
    <h1>Dashboard</h1>
    <div class="card">
      <div class="card-body" v-if="user">
        <h3>Hello, {{ user.name }}</h3>
        <span>{{ user.email }}</span>
      </div>

      <div class="mb-4">
        <ul class="mb-2 mb-lg-0">    
            <li>
              <RouterLink v-if="user" to="/users">Users</RouterLink>
            </li>
            <li>
              <RouterLink v-if="user" to="/staffs">Staffs</RouterLink>
            </li>
            
            <li>
              <RouterLink v-if="user" to="/admin/tickets">Tickets</RouterLink>
            </li>
          </ul>
      </div>
    </div>
  </div>
</template>

<script>
import User from "../../apis/User";

export default {
  data() {
    return {
      user: null
    };
  },

  mounted() {
    User.auth().then(response => {
      this.user = response.data;
    });
  }
};
</script>