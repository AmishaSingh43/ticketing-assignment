import './assets/main.css'

import { createApp } from 'vue'
import axios from "axios";
import App from './App.vue'
import router from './router'

import "bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

const app = createApp(App)

app.use(router)

axios.defaults.withCredentials = true;
axios.defaults.withXSRFToken = true;

app.mount('#app')
