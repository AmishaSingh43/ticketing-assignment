<template>
    <div class="container mt-5">
        <div class="card">
            <div class="card-header" style="background-color: #e3f2fd;">
                <h4>Tickets</h4>
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
                        <RouterLink :to="{path: '/admin/tickets/' +ticket.id+ '/edit'}" class="btn  btn-sm btn-primary">
                            Edit    
                        </RouterLink>

                        <RouterLink :to="{path: '/admin/tickets/' +ticket.id+ '/assign'}" class="btn  btn-sm btn-warning">
                            Assign    
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
        name: 'adminTickets',
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