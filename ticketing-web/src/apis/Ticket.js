import Api from "./Api";

export default {
  tickets() {
    return Api().get("/tickets");
  },

  createTicket(form) {
    return Api().post("/tickets", form);
  },

//   editTicket(id, form) {
//     return Api().post('/tickets/#{id}/edit', form);
//   },

  showTicket(id) {
    return Api().get('/tickets/#{id}/edit');
  },
  
};