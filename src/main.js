import { createApp } from 'vue'
import App from './App.vue'
import './index.css'
import axios from "axios"




axios.defaults.baseURL = 'https://damp-wave-81991.herokuapp.com'
createApp(App).mount('#app')
