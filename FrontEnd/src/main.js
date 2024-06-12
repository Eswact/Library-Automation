import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import './assets/index.css'
import 'vue3-toastify/dist/index.css';


import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import {faHome, faBook, faCircleInfo, faHeadset, faBars, faCircleXmark, faUser, faCaretUp, faCircleChevronRight, faPhone, faEnvelope, faLocationDot, faRightFromBracket, faUserPen, faPlus, faTrashCan, faUpload} from '@fortawesome/free-solid-svg-icons'
library.add(faHome, faBook, faCircleInfo, faHeadset, faBars, faCircleXmark, faUser, faCaretUp, faCircleChevronRight, faPhone, faEnvelope, faLocationDot, faRightFromBracket, faUserPen, faPlus, faTrashCan, faUpload)

const app = createApp(App)
.component('font-awesome-icon', FontAwesomeIcon)

app.use(router)

app.mount('#app')
