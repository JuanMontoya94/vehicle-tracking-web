import axios from 'axios';


export default class EntryService {

    url = "https://vehicle-tracking-uniquindio.herokuapp.com/entry/";
    

    getAll() {
        return axios.get(this.url);
    }

    save(entry) {
        console.log(entry);
        return axios.post(this.url, entry)
    }
    update(entry) {
        console.log(entry);
        return axios.patch(this.url, entry)
    }

    delet(id){
        return axios.delete(this.url +id)
    }
}