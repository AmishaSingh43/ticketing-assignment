<template>
    <div class="container mt-5">
        <div class="card shadow">
            <div class="card-header" style="background-color: #e3f2fd;">
                <h4>Edit User</h4>
            </div>

            <div class="card-body">
                <div class="mb-3">
                    <label for="name" class="form-label">Name<span style="color: red;">*</span></label>
                    <input type="text" v-model="user.name"  placeholder="Enter your name"
                        class="form-control" />
                </div>
                <div class="mb-3">
                    <label for="phone" class="form-label">Phone<span style="color: red;">*</span></label>
                    <input type="text" v-model="user.phone"  placeholder="Enter your phone number"
                        class="form-control" />
                </div>
                <div class="mb-3">
                    <label for="email" class="form-label">Email<span style="color: red;">*</span></label>
                    <input type="email" v-model="user.email" id="email" placeholder="Enter your email"
                        class="form-control" />
                </div>
                <div class="mb-3">
                    <label for="password" class="form-label">Password<span style="color: red;">*</span></label>
                    <input type="password" v-model="user.password" id="password" placeholder="Enter your password"
                        class="form-control" />
                </div>
                <div class="mb-3">
                    <label for="role" class="form-label">Role<span style="color: red;">*</span></label>
                    <select class='form-control' v-model='user.role'>
                        <option value='0' selected>Select role</option>
                        <option v-for='role in roles' :value='role.id'>{{ role.name }}</option>
                    </select>
                </div>
                <div class="mb-3">
                    <label for="role" class="form-label">Expertise<span style="color: red;">*</span></label>
                    <select class='form-control' v-model='user.expertise'>
                        <option value='0' selected>Select expertise</option>
                        <option v-for='expert in expertise' :value='expert.id'>{{ expert.name }}</option>
                    </select>
                </div>
                <div class="mb-3">
                    <label for="address" class="form-label">Address</label>
                    <input type="text" v-model="user.address"  placeholder="Enter your address"
                        class="form-control" />
                </div>
                <div class="mb-3">
                    <label for="can_change_status" class="form-label">Can Change Status</label>
                    <select class='form-control' v-model='user.can_change_status'>
                        <option value='0' selected>Select value</option>
                        <option v-for='value in booleanValue' :value='value.id'>{{ value.name }}</option>
                    </select>
                </div>

                <div class="mb-3">
                    <label for="can_assign_ticket" class="form-label">Can Assign Ticket</label>
                    <select class='form-control' v-model='user.can_assign_ticket'>
                        <option value='0' selected>Select value</option>
                        <option v-for='value in booleanValue' :value='value.id'>{{ value.name }}</option>
                    </select>
                </div>

                <div class="mb-3">
                    <label for="is_staff_free" class="form-label">Is Free</label>
                    <select class='form-control' v-model='user.is_staff_free'>
                        <option value='0' selected>Select value</option>
                        <option v-for='value in booleanValue' :value='value.id'>{{ value.name }}</option>
                    </select>
                </div>

                <div class="mb-3">
                    <button type="button" @click="updateUser" class="btn btn-info">Update</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import User from "../../../apis/User";
import axios from "axios";

export default {
    name: 'staffEdit',
    data() {
        return {

            booleanValue: [{'name': "True", 'id': true},
                          {'name': "False", 'id': false},
            ],

            roles: [{'name': "Admin", 'id': "admin"},
                    {'name': "Customer", 'id': "customer"},
                    {'name': "Staff", 'id': "staff"},
            ],

            expertise: [{'name': "Cleaning", 'id': "cleaning"},
                    {'name': "Mainatenance", 'id': "mainatenance"},
                    {'name': "Electrician", 'id': "electrician"},
                    {'name': "All", 'id': "all"},
            ],

            userId: '',
            errorList: '',
            
            user: {
                name: '',
                phone: '',
                email: '',
                password: '',
                expertise: '',
                role: '',
                address: '',
                can_change_status: '',
                can_assign_ticket: '',
                is_staff_free: '',
            }
            
        }
    },
    mounted(){
        this.userId = this.$route.params.id;
        this.getStaffData(this.userId);
    },
    methods: {
        getStaffData(userId){
            User.showUser(userId).then(res => {
                this.user = res.data;
                
            })
            .catch( function(error){
                if (error.response){
                    if (error.response.status == 404){
                        alert(error.response.data.message);
                    }
                }
            });

        },

        updateUser(){
            var mythis = this;
            axios.put('http://127.0.0.1:8000/api/users/${this.userId}/edit', this.user)
            .then(res => {
                alert(res.data.message);

                this.user = {
                    name: '',
                    phone: '',
                    email: '',
                    password: '',
                    expertise: '',
                    role: '',
                    address: '',
                    can_change_status: '',
                    can_assign_ticket: '',
                    is_staff_free: '',
                }
                this.$router.push({ name: "userView" });
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