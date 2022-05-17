<template>
  <div style="margin: 0 auto; width: 80%">
    <Panel header="Clientes">
      <Menubar :model="items" />
      <br />
      <DataTable :value="customers" :selection.sync="selectedCustomer" selectionMode="single" dataKey="" :paginator="true" :rows="10">
        <Column field="id" header="Identificación"></Column>
        <Column field="email" header="Email"></Column>
        <Column field="name" header="Nombre"></Column>
        <Column field="phone" header="Telefono"></Column>
      </DataTable>

    </Panel>
    <Dialog header="Crear cita" :visible.sync="displayModalCrear" :modal="true">
      
      <br />
      <span class="p-float-label">
        <InputText id="email" type="text" v-model="customer.email" style="width: 100%" />
        <label for="email">Placa vehiculo</label>
      </span>
      <br />
      
      <template #footer>
        <Button label="Guardar" icon="pi pi-check" @click="save"/>

        <Button label="Cancelar" icon="pi pi-times" @click="closeModal" class="p-button-secondary" />
      </template>
    </Dialog>

    <!-- <Dialog header="Editar cita" :visible.sync="displayModalEditar" :modal="true">
      
      <br />
      <span class="p-float-label">
        <InputText id="date" type="text" v-model="customer.date" style="width: 100%" />
        <label for="date">Fecha</label>
      </span>
      <br />
      <span class="p-float-label">
        <InputText id="status" type="text" v-model="customer.status" style="width: 100%" />
        <label for="status">Estado cita</label>
      </span>
      <br />
      <span class="p-float-label">
        <InputText id="plate" type="text" v-model="customer.vehicle.plate" style="width: 100%" />
        <label for="plate">Placa</label>
      </span>
      
      <template #footer>
        <Button label="Editar" class="p-button-warning" icon="pi pi-check" @click="update" />

        <Button label="Cancelar" icon="pi pi-times" @click="closeModal" class="p-button-secondary" />
      </template>
    </Dialog> -->

    
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
      customer: {
        id:null,
        email:null,
        name:null,
        phone:null
      },
      selectedCustomer:{
        id:null,
        email:null,
        name:null,
        phone:null
      },
      
      items: [
        {
          label: "Nueva cita",
          icon: "pi pi-fw pi-plus",
          command: () => {
            this.showSaveModal();
          }
        },
        {
          label: "Editar",
          icon: "pi pi-fw pi-pencil",
          command: () => {
            this.showUpdateModal();
          }
        },
        {
          label: "Eliminar",
          icon: "pi pi-fw pi-trash",
          command: () => {
            this.delet();
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
      displayModalEditar:false
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
    showSuccess() {
            this.$toast.add({severity:'success', summary: 'Success Message', detail:'Message Content', life: 3000});
        },
    showUpdateModal() {
      this.customer=this.selectedCustomer;
      this.displayModalEditar = true;
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
             'Creado',
             'La cita ha sido creada',
             'success'
           )
          this.displayModalCrear = false;
          this.displayModalEditar = false;
          this.customer = {
            id:null,
            email:null,
            name:null,
            phone:null
           };
           this.getAll();
           
         }
      });
    },
    update() {
      this.CustomerService.update(this.customer).then(data => {
        console.log(data)
         if (data.status === 200) {
           swal.fire(
             'Actualizado',
             'La cita se ha actualizado',
             'success'
           )

           this.showSuccess();
          this.displayModalEditar = false;
          this.customer = {
             id:null,
            email:null,
            name:null,
            phone:null
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
    
    closeModal() {
      this.displayModalCrear = false;
      this.displayModalEditar = false;
    }
  }
};

</script>

<style>
</style>