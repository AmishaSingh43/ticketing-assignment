<template>
    <div class="container mt-5">
        <div class="card">
            <div class="card-header" style="background-color: #e3f2fd;">
                <h4>Edit Ticket</h4>
            </div>

            <div class="card-body">
                <ul class="alert alert-warning" v-if="Object.keys(this.errorList).length > 0">
                    <li class="mb-0 ms-3" v-for="(error, index) in this.errorList" :key="index">
                        {{ error[0] }}
                    </li>
                </ul>

                <div class="mb-3">
                    <label for="status" class="form-label">Status</label>
                    <select class='form-control' v-model='model.ticket.status'>
                        <option value='0' selected>Select status</option>
                        <option v-for='status in statuses' :value='status.id'>{{ status.name }}</option>
                    </select>
                </div>

                <div class="mb-3">
                    <label for="priority" class="form-label">Priority</label>
                    <select class='form-control' v-model='model.ticket.priority'>
                        <option value='0' selected>Select priority</option>
                        <option v-for='priority in prioritise' :value='priority.id'>{{ priority.name }}</option>
                    </select>
                </div>

                <div class="mb-3">
                    <label for="type" class="form-label">Type</label>
                    <select class='form-control' v-model='model.ticket.type'>
                        <option value='0' selected>Select type</option>
                        <option v-for='t in types' :value='t.id'>{{ t.name }}</option>
                    </select>
                </div>
                
                <div class="mb-3">
                    <button type="button" @click="updateTicket" class="btn btn-primary">Update</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import Ticket from "../../../apis/Ticket";
    import axios from "axios";

    export default {
        name: 'adminTicketEdit',
        data(){
            return {

                statuses: [{'name': "Open", 'id': "open"},
                         {'name': "In Progress", 'id': "in_progress"},
                         {'name': "Resolved", 'id': "resolved"},
                ],
                
                prioritise: [{'name': "High", 'id': "hign"},
                           {'name': "Medium", 'id': "medium"},
                           {'name': "Low", 'id': "low"},
                ],

                types: [{'name': "Cleaning", 'id': "cleaning"},
                        {'name': "Mainatenance", 'id': "mainatenance"},
                        {'name': "Electrician", 'id': "electrician"},
                        {'name': "All", 'id': "all"},
                ],

                ticketId: '',
                errorList: '',
                model: {
                    ticket: {
                        title: '',
                        description: '',
                        priority: '',
                        type: ''
                    }
                }
            }
        },
        mounted(){
            this.ticketId = this.$route.params.id;
            this.getTicketData(this.ticketId);
        },
        methods: {
            getTicketData(ticketId){
                Ticket.showTicket(ticketId).then(res => {
                    this.model.ticket = res.data.tickets[0];
                })
                .catch( function(error){
                    if (error.response){
                        if (error.response.status == 404){
                            alert(error.response.data.message);
                        }
                    }
                });

            },

            updateTicket(){
                var mythis = this;
                axios.put('http://localhost:8000/api/tickets/${this.ticketId}/edit', this.model.ticket)
                .then(res => {
                    alert(res.data.message);

                    this.model.ticket = {
                        title: '',
                        description: '',
                        priority: '',
                        type: ''
                    }
                    this.$router.push({name: "/admin/tickets"});
                })
                .catch( function(error){
                    if (error.response){
                        if (error.response.status == 422){
                            mythis.errorList = error.response.data.errors;
                        }
                        if (error.response.status == 404){
                            alert(error.response.data.message);
                        }
                    }else if (error.request){
                        console.log(error.request);
                    }else{
                        console.log('Error', error.message);
                    }
                });
            }
        }
    }
</script>