import axios from 'axios';


export default class AppointmentService {

    url = "https://vehicle-tracking-uniquindio.herokuapp.com/appointment/";

    getAll() {
        return axios.get(this.url);
    }

    save(appointment) {
        console.log(appointment);
        return axios.post(this.url, appointment)
    }
    update(appointment) {
        console.log(appointment);
        return axios.patch(this.url, appointment)
    }

    delet(id){
        return axios.delete(this.url +id)
    }
}