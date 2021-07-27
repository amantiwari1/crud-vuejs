import { createApp } from 'vue'
import App from './App.vue'
import './index.css'
import axios from "axios"




axios.defaults.baseURL = 'http://localhost:8800'
createApp(App).mount('#app')
