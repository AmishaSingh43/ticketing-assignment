import Api from "./Api";

export default {
  register(form) {
    return Api().post("/register", form);
  },

  login(form) {
    return Api().post("/login", form);
  },

  logout() {
    return Api().post("/logout");
  },

  auth() {
    return Api().get("/user");
  },

  users() {
    return Api().get("/users");
  },

  createUser(form) {
    return Api().post("/users", form);
  },

  showUser(id) {
    return Api().get('/user/#{id}/edit');
  },

  editUser(id, form) {
    return Api().put('/users/#{id}/edit', form);
  },

  staffs() {
    return Api().get("/staffs");
  }
};