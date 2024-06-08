import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import './assets/index.css'

import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import {faHome, faBook, faCircleInfo, faHeadset, faBars, faCircleXmark, faUser, faCaretUp, faCircleChevronRight, faPhone, faEnvelope, faLocationDot} from '@fortawesome/free-solid-svg-icons'
library.add(faHome, faBook, faCircleInfo, faHeadset, faBars, faCircleXmark, faUser, faCaretUp, faCircleChevronRight, faPhone, faEnvelope, faLocationDot)

const app = createApp(App)
.component('font-awesome-icon', FontAwesomeIcon)

app.use(router)

app.mount('#app')
