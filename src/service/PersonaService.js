import axios from 'axios';


export default class PersonaService {

    url = "http://localhost:8080/appointment";
    //url = "https://vehicle-tracking-uniquindio.herokuapp.com/appointment";

    getAll() {
        return axios.get(this.url);
    }

    save(persona) {
        console.log(persona);
        return axios.post(this.url, persona)
    }
}