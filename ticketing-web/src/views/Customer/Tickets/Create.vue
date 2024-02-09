<template>
    <div class="container mt-5">
        <div class="card">
            <div class="card-header" style="background-color: #e3f2fd;">
                <h4>Create Ticket</h4>
            </div>

            <div class="card-body">
                <ul class="alert alert-warning" v-if="Object.keys(this.errorList).length > 0">
                    <li class="mb-0 ms-3" v-for="(error, index) in this.errorList" :key="index">
                        {{ error[0] }}
                    </li>
                </ul>

                <div class="mb-3">
                    <label for="title">Title</label>
                    <input type="text" v-model="model.ticket.title" id="title" class="form-control" />
                </div>

                <div class="mb-3">
                    <label for="description">Description</label>
                    <textarea class="form-control" v-model="model.ticket.description" rows="4"></textarea>
                </div>

                <div class="mb-3">
                    <label for="priority">Priority</label>
                    <select class='form-control' v-model='model.ticket.priority'>
                        <option value='0' selected>Select priority</option>
                        <option v-for='priority in prioritise' :value='priority.id'>{{ priority.name }}</option>
                    </select>
                </div>

                <div class="mb-3">
                    <label for="type">Type</label>
                    <select class='form-control' v-model='model.ticket.type'>
                        <option value='0' selected>Select type</option>
                        <option v-for='t in types' :value='t.id'>{{ t.name }}</option>
                    </select>
                </div>

                <div class="mb-3">
                    <button type="button" @click="saveTicket" class="btn btn-primary">Save</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import Ticket from "../../../apis/Ticket";

    export default {
        name: 'ticketCreate',
        data(){
            return {
                prioritise: [{'name': "High", 'id': "hign"},
                           {'name': "Medium", 'id': "medium"},
                           {'name': "Low", 'id': "low"},
                ],

                types: [{'name': "Cleaning", 'id': "cleaning"},
                        {'name': "Mainatenance", 'id': "mainatenance"},
                        {'name': "Electrician", 'id': "electrician"},
                        {'name': "All", 'id': "all"},
                ],

                errorList: '',
                model: {
                    ticket: {
                        title: '',
                        description: '',
                        priority: '',
                        type: '',
                    }
                }
            }
        },
        methods: {
            saveTicket(){
                var mythis = this;
                Ticket.createTicket(this.model.ticket)
                .then(res => {
                    alert(res.data.message);
                    this.model.ticket = {
                        title: '',
                        description: '',
                        priority: '',
                        type: '',
                    }
                    this.$router.push({name: "tickets"});
                })
                .catch( function(error){
                    if (error.response){
                        if (error.response.status == 422){
                            mythis.errorList = error.response.data.errors;
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