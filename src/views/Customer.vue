<template>
  <div style="margin: 0 auto; width: 80%">
    <Panel header="Clientes">
      <Menubar :model="items" />
      <br />
      <div class="card card-info">
      <div class="card-body table-responsive">
      <table class="table table-hover table-head-fixed text-nowrap projects table table-bordered">
        <thead>
          <tr>
            <th>Identificación</th>
            <th>Correo</th>
            <th>Nombre</th>
            <th>Telefono</th>
            <th>Vehiculo</th>
            <th>Acciones</th>

          </tr>
        </thead>
        <tbody>
          <tr v-for="(item,id) in customers" :key="id">
            <td v-text="item.id"></td>
            <td v-text="item.email"></td>
            <td v-text="item.name"></td>
            <td v-text="item.phone"></td>
            <td> 
              <span v-for="(vehicle,id) in item.vehicles" :key="id">{{vehicle.plate}} </span>
            </td>
            <td>
              <Button class="p-button-warning mr-2" icon="pi pi-pencil" @click="showUpdate(item)" style="margin-right:5px" />
              <Button class="p-button-danger" icon="pi pi-trash" @click="showDelete(item)" />
            </td>
           

          </tr>
        </tbody>
      </table>
    </div>
    </div>

    </Panel> 

    
   
    <Dialog header="Agregar cliente" :visible.sync="displayModalCrear" :modal="true">
      
      <br />
      <span class="p-float-label">
        <InputText id="email" type="text" v-model="customer.email" style="width: 100%" />
        <label for="email">Correo electronico</label>
      </span>
      <br />
      <br />
      <span class="p-float-label">
        <InputText id="name" type="text" v-model="customer.name" style="width: 100%" />
        <label for="name">Nombre</label>
      </span>
      <br />
      <br />
      <span class="p-float-label">
        <InputText id="phone" type="text" v-model="customer.phone" style="width: 100%" />
        <label for="phone">Telefono</label>
      </span>
      <br />
      <br />
      <span class="p-float-label">
        <Button label="Agregar vehiculo" icon="pi pi-plus" @click="ShowVehicleModal"/>
      </span>
      <br />

      <template #footer>
        <Button label="Guardar" icon="pi pi-check" @click="save"/>

        <Button label="Cancelar" icon="pi pi-times" @click="closeModal" class="p-button-secondary" />
      </template>
    </Dialog>

      <Dialog header="Agregar Vehiculo al cliiente" :visible.sync="displayModalVehiculo" :modal="true">
      
      <br />
      <span class="p-float-label">
        <InputText id="plate" type="text" v-model="vehicles.plate" style="width: 100%" />
        <label for="plate">Placa</label>
      </span>
      <br />
      <br />
      <span class="p-float-label">
        <InputText id="vin" type="text" v-model="vehicles.vin" style="width: 100%" />
        <label for="vin">Numero de chasis</label>
      </span>
      <br />
      <br />
      <span class="p-float-label">
        <InputText id="brand" type="text" v-model="vehicles.brand" style="width: 100%" />
        <label for="brand">Marca</label>
      </span>
      <br />
      <br />
      <span class="p-float-label">
        <InputText id="model" type="text" v-model="vehicles.model" style="width: 100%" />
        <label for="model">Modelo</label>
      </span>
      <br />
      <br />
      <span class="p-float-label">
        <InputText id="year" type="text" v-model="vehicles.year" style="width: 100%" />
        <label for="year">Año</label>
      </span>
      <br />
      
      <template #footer>
        <Button label="Guardar" icon="pi pi-check" @click="closeModalVehicle"/>

        <Button label="Cancelar" icon="pi pi-times" @click="cancelVehicleCreate" class="p-button-secondary" />
      </template>
    </Dialog> 

    <Dialog header="Actualizar cliente" :visible.sync="displayModalEditar" :modal="true">
      
       <br />
      <span class="p-float-label">
        <InputText id="email" type="text" v-model="selectedCustomer.email" style="width: 100%" />
        <label for="email">Correo electronico</label>
      </span>
      <br />
      <br />
      <span class="p-float-label">
        <InputText id="name" type="text" v-model="selectedCustomer.name" style="width: 100%" />
        <label for="name">Nombre</label>
      </span>
      <br />
      <br />
      <span class="p-float-label">
        <InputText id="phone" type="text" v-model="selectedCustomer.phone" style="width: 100%" />
        <label for="phone">Telefono</label>
      </span>
      <br />
      <br />
      <span class="p-float-label">
        <Button label="Agregar vehiculo" icon="pi pi-plus" @click="ShowVehicleModal"/>
      </span>
      <br />
      
      <template #footer>
        <Button label="Editar" class="p-button-warning" icon="pi pi-check" @click="update" />

        <Button label="Cancelar" icon="pi pi-times" @click="closeModal" class="p-button-secondary" />
      </template>
    </Dialog> 
    

    
    
  </div>
  
  
</template>
<script src="https://cdnjs.cloudflare.com/ajax/libs/limonte-sweetalert2/7.29.2/sweetalert2.all.js"></script>

<script>

import CustomerService from "../service/CustomerService";
export default {
  name: "customer",
  data() {
    return {
     
      customers: null,

      vehicles:{
        plate : null,
        vin:null,
        brand: null,
        model: null,
        year:null
      }
      
      ,
      customer: {
        id:null,
        email:null,
        name:null,
        phone:null,
        vehicles:[]
        
      },
      selectedCustomer:{
        id:null,
        email:null,
        name:null,
        phone:null,
        vehicles:[]
        
      },
      selectedCustomerItem:{
        id:null,
        email:null,
        name:null,
        phone:null,
        vehicles:[]
      },
      items: [
        {
          label: "Nuevo cliente",
          icon: "pi pi-fw pi-plus",
          command: () => {
            this.showSaveModal();
          }
        },
        {
          label: "Refrescar",
          icon: "pi pi-fw pi-refresh",
          command: () => {
            this.getAll();
          }
        }
        
      ],
      displayModalCrear: false,
      displayModalEditar:false,
      displayModalVehiculo:false
    };
  },
  CustomerService: null,
  created() {
    this.CustomerService = new CustomerService();
  },
  mounted() {
    this.getAll();
  },
  methods: {
    
    showSaveModal() {
      this.displayModalCrear = true;
    },
    
    getAll() {
      this.CustomerService.getAll().then(data => {
      
        this.customers = data.data;
      });
    },
    save() {
      this.CustomerService.save(this.customer).then(data => {
        console.log(data)
        
         if (data.status === 200) {
          swal.fire(
             'Exito',
             'Cliente agregado con exito',
             'success'
           )
          this.displayModalCrear = false;
          this.displayModalEditar = false;
          this.customer = {
            id:null,
            email:null,
            name:null,
            phone:null,
            vehicle:{
              plate : null,
              vin : null,
              brand :null,
              model : null,
              year : null
            }
           };
           this.getAll();
           
         }
      });
    },
    showUpdateModal() {
     this.customer=this.selectedCustomer;
     this.displayModalEditar = true;
    },
    showUpdate(item){
      this.costumer=this.selectedCustomer;
      this.selectedCustomer=item;

      this.showUpdateModal();
    },
    showDelete(item){
      this.costumer=this.selectedCustomer;
      this.selectedCustomer=item;

      this.delet();
    },
    update() {
     
      this.customer.vehicles=[];
      console.log(this.selectedCustomerItem);
      
      this.CustomerService.update(this.customer).then(data => {
        console.log(data)
         if (data.status === 200) {
           swal.fire(
             'Actualizado',
             'Cliente actualizado con exito',
             'success'
           )

          this.displayModalEditar = false;
         this.customer = {
            id:null,
            email:null,
            name:null,
            phone:null,
            vehicle:{
              plate : null,
              vin : null,
              brand :null,
              model : null,
              year : null
            }
           };
           this.getAll();
         }
      });
    },
    delet(){
      if(confirm("¿Está seguro que desea eliminar la cita?")){
      this.CustomerService.delet(this.selectedCustomer.id).then(data => {
        if (data.status === 200){
            swal.fire(
             'Eliminado',
             'La cita se ha eliminado',
             'success'
           )
             this.getAll();
             
        }

      });
      }
    },
    
    ShowVehicleModal(){
      
      //this.displayModalCrear = false;
      this.displayModalVehiculo = true;
    },
    closeModalVehicle() {
      this.customer.vehicles.push(this.vehicles);
      this.displayModalVehiculo = false;

    },
    closeModal() {
      this.displayModalCrear = false;
      this.displayModalEditar = false;
      this.customer = {
            id:null,
            email:null,
            name:null,
            phone:null,
            vehicle:{
              plate : null,
              vin : null,
              brand :null,
              model : null,
              year : null
            }
           };
    },
    cancelVehicleCreate(){
      this.customer= {
        
        vehicle:{
              plate : null,
              vin : null,
              brand :null,
              model : null,
              year : null
            }
      }
      closeModalVehicle();
    }
  }
};

</script>

<style>
</style>