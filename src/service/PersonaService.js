import axios from 'axios';


export default class PersonaService {

    url = "http://localhost:8080/appointment";

    getAll() {
        return axios.get(this.url);
    }

    save(persona) {
        return axios.post(this.url, persona)
    }
}