import axios from 'axios';


export default class CustomerService {

    url = "https://vehicle-tracking-uniquindio.herokuapp.com/customer/";
    
    getAll() {
        return axios.get(this.url);
    }

    save(customer) {
        console.log(customer);
        return axios.post(this.url, customer)
    }
    update(customer) {
        console.log(customer);

        return axios.patch(this.url, customer)
    }

    delet(id){
        return axios.delete(this.url +id)
    }
}