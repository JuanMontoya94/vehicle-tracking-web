import axios from 'axios';


export default class PersonaService {

    url = "https://vehicle-tracking-uniquindio.herokuapp.com/appointment/";

    getAll() {
        return axios.get(this.url);
    }

    save(persona) {
        console.log(persona);
        return axios.post(this.url, persona)
    }
    update(persona) {
        console.log(persona);
        return axios.patch(this.url, persona)
    }

    delet(id){
        return axios.delete(this.url +id)
    }
}