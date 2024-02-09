<template>
    <div class="container mt-5">
        <div class="card">
            <div class="card-header" style="background-color: #e3f2fd;">
                <h4>Assign To</h4>
            </div>

            <div class="card-body">
                <div class="mb-3">
                    <label for="staff" class="form-label">Staff</label>
                    <select class='form-control' v-model='staffId'>
                        <option value='0' selected>Select staff</option>
                        <option v-for='staff in staffList' :value='staff.id'>{{ staff.name }}</option>
                    </select>
                </div>
  
                <div class="mb-3">
                    <button type="button" @click="assignStaff" class="btn btn-primary">Assign</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import User from "../../../apis/User";
    import axios from "axios";

    export default {
        name: 'adminTicketAssign',
        data(){
            return {
                ticketId: '',
                staffList: [],
                staffId: '',
            }
        },
        mounted(){
            this.ticketId = this.$route.params.id;
            this.getStaffData();
        },
        methods: {
            getStaffData(){
                User.staffs().then(res => {
                    this.staffList = res.data.staffs;
                })
                .catch( function(error){
                    if (error.response){
                        if (error.response.status == 404){
                            alert(error.response.data.message);
                        }
                    }
                });

            },

            assignStaff(){
                axios.put('http://127.0.0.1:8000/api/tickets/${this.ticketId}/edit', this.staffId)
                .then(res => {
                    alert(res.data.message);
                    this.staffId = '';
                });
                this.$router.push({name: "/admin/tickets"});
            }
        }
    }
</script>