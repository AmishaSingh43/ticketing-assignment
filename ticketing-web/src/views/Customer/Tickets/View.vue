<template>
    <div class="container mt-5">
        <div class="card">
            <div class="card-header" style="background-color: #e3f2fd;">
                <h4>Tickets
                    <RouterLink to="/customer/ticket/create" class="btn btn-primary float-end">
                        Create Ticket
                    </RouterLink>
                </h4>
            </div>
            <div class="card-body">
                <table class="table table-bordered">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Code</th>
                        <th>Title</th>
                        <th>Status</th>
                        <th>Description</th>
                        <th>Priority</th>
                        <th>Type</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody v-if="this.tickets.length > 0">
                    <tr v-for="(ticket, index) in this.tickets" :key="index" >
                    <td>{{ ticket.id }}</td>
                    <td>{{ ticket.ticket_id }}</td>
                    <td>{{ ticket.title }}</td>
                    <td>{{ ticket.status }}</td>
                    <td>{{ ticket.description }}</td>
                    <td>{{ ticket.priority }}</td>
                    <td>{{ ticket.type }}</td>
                    <td>
                        <!-- <RouterLink to="/" class="btn btn-sm btn-success">
                            Show
                        </RouterLink> -->

                        <RouterLink :to="{path: '/customer/tickets/' +ticket.id+ '/edit'}" class="btn  btn-sm btn-success">
                            Edit    
                        </RouterLink>
                    </td>
                    </tr>
                </tbody>

                <tbody v-else>
                    <tr>
                        <td colspan="7">Loading...</td>
                    </tr>
                </tbody>
                </table>
            </div>
        </div>
    </div>
</template>

<script>
    import Ticket from "../../../apis/Ticket";

    export default {
        name: 'tickets',
        data(){
            return {
                tickets: []
            }
        },
        mounted(){
            this.getTickets();
        },
        methods: {
            getTickets(){
                Ticket.tickets().then(res => {
                    this.tickets = res.data.tickets;
                });
            }
        }
    }
</script>