<template>
  <div class="container">
    <div class="background-container">
      <h2>Welcome to Ticketing Assignment Web</h2>
      <div class="mt-4 p-5 bg-primary text-white rounded">
        <p>NOTE: No need for registration if you are CUSTOMER... </p>
        <ul class="navbar-nav me-auto mb-2 mb-lg-0">
          <li class="nav-item">
            <RouterLink class="nav-link active" to="/login">Login</RouterLink>
          </li>
          <li class="nav-item">
            <RouterLink class="nav-link" to="/register">Register Here ...</RouterLink>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<style scoped>
.background-container {
  background-image: url('/bg-icon.jpeg'); /* Replace with the actual path to your image */
  background-size: cover;
  background-position: center;
  height: 100vh; /* Adjust as needed */
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
}
/* Add any other styling as needed */
</style>
