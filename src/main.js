import Vue from 'vue'
import App from './App.vue'
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import Panel from 'primevue/panel';
import Menubar from 'primevue/menubar';
import Dialog from 'primevue/dialog';
import InputText from 'primevue/inputtext';
import Button from 'primevue/button';
import AutoComplete from 'primevue/autocomplete';
import Dropdown from 'primevue/dropdown';
import ToastService from 'primevue/toastservice';
import Toast from 'primevue/toast';
import swal from 'sweetalert2';
import "bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
//import Calendar from 'primevue/calendar';


import 'primevue/resources/themes/nova-light/theme.css';
import 'primevue/resources/primevue.min.css';
import 'primeicons/primeicons.css';
import router from './router'

Vue.config.productionTip = false

Vue.component('DataTable', DataTable)
Vue.component('Column', Column);
Vue.component('Panel', Panel);
Vue.component('Menubar', Menubar);
Vue.component('Dialog', Dialog);
Vue.component('InputText', InputText);
Vue.component('Button', Button);
Vue.component('Autocomplete', AutoComplete);
Vue.component('Dropdown', Dropdown);
Vue.component('Toast', Toast);
window.swal = swal

Vue.use(ToastService);

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
