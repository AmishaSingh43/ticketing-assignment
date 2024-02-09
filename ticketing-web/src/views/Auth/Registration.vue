<template>
    <div class="container mt-5">
        <div class="card shadow">
            <div class="card-header" style="background-color: #e3f2fd;">
                <h4>Registration Form</h4>
            </div>

            <div class="card-body">
                <ul class="alert alert-warning" v-if="Object.keys(this.errorList).length > 0">
                    <li class="mb-0 ms-3" v-for="(error, index) in this.errorList" :key="index">
                        {{ error[0] }}
                    </li>
                </ul>
                <div class="mb-3">
                    <label for="name" class="form-label">Name<span style="color: red;">*</span></label>
                    <input type="text" v-model="user.name"  placeholder="Enter your name"
                        class="form-control" />
                    <!-- <p class="text-danger" v-if="errors.name" v-text="errors.name"></p> -->
                </div>
                <div class="mb-3">
                    <label for="phone" class="form-label">Phone<span style="color: red;">*</span></label>
                    <input type="text" v-model="user.phone"  placeholder="Enter your phone number"
                        class="form-control" />
                        <!-- <p class="text-danger" v-if="errors.phone" v-text="errors.phone"></p> -->
                </div>
                <div class="mb-3">
                    <label for="email" class="form-label">Email<span style="color: red;">*</span></label>
                    <input type="email" v-model="user.email" id="email" placeholder="Enter your email"
                        class="form-control" />
                        <!-- <p class="text-danger" v-if="errors.email" v-text="errors.email"></p> -->
                </div>
                <div class="mb-3">
                    <label for="password" class="form-label">Password<span style="color: red;">*</span></label>
                    <input type="password" v-model="user.password" id="password" placeholder="Enter your password"
                        class="form-control" />
                        <!-- <p class="text-danger" v-if="errors.password" v-text="errors.password"></p> -->
                </div>
                <div class="mb-3">
                    <label for="role" class="form-label">Role<span style="color: red;">*</span></label>
                    <select class='form-control' v-model='user.role'>
                        <option value='0' selected>Select role</option>
                        <option v-for='role in roles' :value='role.id'>{{ role.name }}</option>
                    </select>
                    <!-- <p class="text-danger" v-if="errors.role" v-text="errors.role"></p> -->
                </div>
                <div class="mb-3">
                    <label for="expertise" class="form-label">Expertise<span style="color: red;">*</span></label>
                    <select class='form-control' v-model='user.expertise'>
                        <option value='0' selected>Select expertise</option>
                        <option v-for='expert in expertise' :value='expert.id'>{{ expert.name }}</option>
                    </select>
                    <!-- <p class="text-danger" v-if="errors.expertise" v-text="errors.expertise"></p> -->
                </div>
                <div class="mb-3">
                    <label for="address" class="form-label">Address</label>
                    <input type="text" v-model="user.address"  placeholder="Enter your address"
                        class="form-control" />
                </div>
                <div class="mb-3">
                    <button type="button" @click="signUp" class="btn btn-info">Register</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios';

export default {
    name: 'registration',
    data() {
        return {
            roles: [{'name': "Admin", 'id': "admin"},
                    {'name': "Customer", 'id': "customer"},
                    {'name': "Staff", 'id': "staff"},
            ],

            expertise: [{'name': "Cleaning", 'id': "cleaning"},
                    {'name': "Mainatenance", 'id': "mainatenance"},
                    {'name': "Electrician", 'id': "electrician"},
                    {'name': "All", 'id': "all"},
            ],

            errorList: '',
            
            user: {
                name: '',
                phone: '',
                email: '',
                password: '',
                role: '',
                expertise: '',
                address: ''

            }
            
        }
    },
    methods: {
        signUp() {
            var mythis = this;
            axios.post('http://127.0.0.1:8000/api/register', this.user)
                .then(res => {
                    this.user = {
                        name: '',
                        phone: '',
                        email: '',
                        password: '',
                        role: '',
                        expertise: '',
                        address: ''
                    }
                    alert(res.data.message);
                    this.$router.push({ name: "login" });
                })
                .catch(function (error) {
                    if (error.response) {
                        mythis.errorList = error.response.data.errors;
                    }
                });
        }
    }
}
</script>