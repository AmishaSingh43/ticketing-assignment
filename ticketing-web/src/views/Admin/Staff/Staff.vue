<template>
    <div class="container mt-5">
        <div class="card">
            <div class="card-header" style="background-color: #e3f2fd;">
                <h4>Staff List</h4>
            </div>
            <div class="card-body">
                <table class="table table-bordered">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Phone</th>
                        <th>Role</th>
                        <th>Expert In</th>
                        <th>Can Change Status</th>
                        <th>Can Assign Ticket</th>
                        <th>Is Free</th>
                    </tr>
                </thead>
                <tbody v-if="this.staffs.length > 0">
                    <tr v-for="(staff, index) in this.staffs" :key="index" >
                        <td>{{ staff.id }}</td>
                        <td>{{ staff.name }}</td>
                        <td>{{ staff.email }}</td>
                        <td>{{ staff.phone }}</td>
                        <td>{{ staff.role }}</td>
                        <td>{{ staff.expertise }}</td>
                        <td>{{ staff.can_change_status }}</td>
                        <td>{{ staff.can_assign_ticket }}</td>
                        <td>{{ staff.is_staff_free }}</td>
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
    import User from "../../../apis/User";

    export default {
        name: 'staffView',
        data(){
            return {
                staffs: [],
            }
        },
        mounted(){
            User.staffs().then(response => {
                this.staffs = response.data.staffs;
            });
        }
    }
</script>