<template>
    <div class="container mt-5">
        <div class="card shadow">
            <div class="card-header" style="background-color: #e3f2fd;">
                <h4>Login</h4>
            </div>

            <div class="card-body">
                <div class="mb-3">
                    <label for="email" class="form-label">Email<span style="color: red;">*</span></label>
                    <input type="email" v-model="model.user.email" id="email" placeholder="Enter your email" class="form-control" />
                    <span class="text-danger" v-if="errors.email">
                        {{ errors.email[0] }}
                    </span>
                </div>

                <div class="mb-3">
                    <label for="password" class="form-label">Password<span style="color: red;">*</span></label>
                    <input type="password" v-model="model.user.password" id="password" placeholder="Enter your password" class="form-control" />
                </div>

                <div class="mb-3">
                    <button type="button" @click="signIn" class="btn btn-info">Login</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
   import User from "../../apis/User";

    export default {
        name: 'login',
        data() {
            return {
                errors: [],
                model: {
                    user: {
                        email: '',
                        password: '',
                    }
                }
            }
        },
        methods: {
            signIn() {
                User.login(this.model.user).then(res => {
                    this.model.user = {
                        email: '',
                        password: '',
                    }
                    this.$root.$emit('login', true);

                    localStorage.setItem('token', res.data.token);
                    localStorage.setItem('role', res.data.user.role);

                    if(res.data.user.role == 'customer'){
                        this.$router.push({name: "tickets"});
                    }else{
                        this.$router.push({name: "dashboard"});
                    }
                })
                .catch(error => {
                    if (error.response.status == 422) {
                        this.errors = error.response.data.errors;
                        // alert(error.response.data.message);
                    }
                });      

            }
        }
    }
</script>