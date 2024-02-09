<template>
    <div class="container mt-5">
        <div class="card">
            <div class="card-header" style="background-color: #e3f2fd;">
                <h4>User List
                    <RouterLink to="/user/create" class="btn btn-primary float-end">
                        Add User
                    </RouterLink>
                </h4>
            </div>
            <div class="card-body">
                <table class="table table-bordered">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Phone</th>
                        <th>Expert In</th>
                        <th>Role</th>
                        <th>Can Change Status</th>
                        <th>Can Assign Ticket</th>
                        <th>Is Free</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody v-if="this.users.length > 0">
                    <tr v-for="(user, index) in this.users" :key="index" >
                    <td>{{ user.id }}</td>
                    <td>{{ user.name }}</td>
                    <td>{{ user.email }}</td>
                    <td>{{ user.phone }}</td>
                    <td>{{ user.expertise }}</td>
                    <td>{{ user.role }}</td>
                    <td>{{ user.can_change_status }}</td>
                    <td>{{ user.can_assign_ticket }}</td>
                    <td>{{ user.is_staff_free }}</td>
                    <td>
                        <RouterLink :to="{path: '/users/' +user.id+ '/edit'}" class="btn  btn-sm btn-success">
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
    import User from "../../../apis/User";

    export default {
        name: 'userView',
        data(){
            return {
                users: []
            }
        },
        mounted(){
            User.users().then(response => {
                this.users = response.data.users;
            });
        }
    }
</script>