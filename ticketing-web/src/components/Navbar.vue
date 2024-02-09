<template>
    <header>
      <div class="wrapper">
        
        <nav class="navbar navbar-expand-lg bg-info" data-bs-theme="dark">
          <div class="container-fluid">
            <a class="navbar-brand" href="#">
              <img src="/ticket-logo.jpeg" alt="" width="150" height="50">
            </a>
            
            <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent"
              aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
              <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarSupportedContent">
              <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                <li class="nav-item">
                  <RouterLink class="nav-link active" v-if="!isLoggedIn" to="/"></RouterLink>
                </li>
                <li class="nav-item">
                  <RouterLink class="nav-link active" v-if="isLoggedIn && isAdmin" to="/dashboard">Dashboard</RouterLink>
                </li>
                <li>
                  <RouterLink class="nav-link active" v-if="isLoggedIn && isAdmin" to="/users">Users</RouterLink>
                </li>
                <li>
                  <RouterLink class="nav-link active" v-if="isLoggedIn && isAdmin" to="/staffs">Staffs</RouterLink>
                </li>
                <li class="nav-item">
                  <RouterLink class="nav-link" v-if="isLoggedIn && isCustomer" to="/customer/tickets">Tickets</RouterLink>
                </li>
                <li class="nav-item">
                  <RouterLink class="nav-link" v-if="isLoggedIn && isAdmin" to="/admin/tickets">Tickets</RouterLink>
                </li>
              </ul>
            </div>
  
            <div class="d-flex">
              <button class="btn btn-sm btn-outline-secondry" v-if="isLoggedIn" @click="logout" type="button">Logout</button>
            </div>
  
          </div>
        </nav>
      </div>
    </header>
</template>
  
<script>
import User from "../apis/User";

export default {
    data() {
        return {
            isLoggedIn: false,
            role: '',
            isCustomer: false,
            isAdmin: false
        };
    },

    mounted() {
        this.isLoggedIn = !!localStorage.getItem("token");
        this.role = localStorage.getItem("role");
        
        if(this.isLoggedIn){
            if(this.role == 'customer'){
                this.isCustomer = true;
            }else{
                this.isAdmin = true;
            }
        }
    },

    methods: {
        logout() {
            User.logout().then(() => {
                localStorage.removeItem("token");
                this.isLoggedIn = false;
                this.$router.push({ name: "home" });
            });
        }
    },
};
</script>
  
<style>
.router-link-exact-active {
    color: #ffffff !important;
    transition: all 0.25s;
}
</style>