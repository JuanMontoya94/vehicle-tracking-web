<template>
  <div style="margin: 0 auto; width: 80%">
    <Panel header="Citas">
      <Menubar :model="items" />
      <br />
      <DataTable :value="appointments" :selection.sync="selectedAppointment" selectionMode="single" dataKey="id" :paginator="true" :rows="10">
        <Column field="id" header="Codigo"></Column>
        <Column field="date" header="Fecha"></Column>
        <Column field="status" header="Estado"></Column>
        <Column field="vehicle.plate" header="Placa"></Column>
      </DataTable>

    </Panel>
    <Dialog header="Crear cita" :visible.sync="displayModalCrear" :modal="true">
      <span class="p-float-label">
       <Dropdown v-model="appointment.employee" :options="employees" optionLabel="id" placeholder="Codigo empleado" style="width: 80%"  />
      </span>
      <br />
      <br />
      <span class="p-float-label">
        <InputText id="plate" type="text" v-model="appointment.vehicle.plate" style="width: 100%" />
        <label for="plate">Placa vehiculo</label>
      </span>
      <br />
      
      <template #footer>
        <Button label="Guardar" icon="pi pi-check" @click="save"/>

        <Button label="Cancelar" icon="pi pi-times" @click="closeModal" class="p-button-secondary" />
      </template>
    </Dialog>

    <Dialog header="Editar cita" :visible.sync="displayModalEditar" :modal="true">
      
      <br />
      <span class="p-float-label">
        <InputText id="date" type="text" v-model="appointment.date" style="width: 100%" />
        <label for="date">Fecha</label>
      </span>
      <br />
      <span class="p-float-label">
        <InputText id="status" type="text" v-model="appointment.status" style="width: 100%" />
        <label for="status">Estado cita</label>
      </span>
      <br />
      <span class="p-float-label">
        <InputText id="plate" type="text" v-model="appointment.vehicle.plate" style="width: 100%" />
        <label for="plate">Placa</label>
      </span>
      
      <template #footer>
        <Button label="Editar" class="p-button-warning" icon="pi pi-check" @click="update" />

        <Button label="Cancelar" icon="pi pi-times" @click="closeModal" class="p-button-secondary" />
      </template>
    </Dialog>

    
  </div>
</template>
<script src="https://cdnjs.cloudflare.com/ajax/libs/limonte-sweetalert2/7.29.2/sweetalert2.all.js"></script>

<script>

import AppointmentService from "../service/AppointmentService";
export default {
  name: "CrudApp",
  data() {
    return {
      selectedEmployee:null,
      employees:[
        {id: '1'}
      ]
      ,
      appointments: null,
      appointment: {
        employee:{
          id:null
        },
        vehicle:{
          plate : null
        }
      },
      selectedAppointment:{
        id:null,
        status:null,
        date:null,
        vehicle:{
          plate : null
        }
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
  AppointmentService: null,
  created() {
    this.AppointmentService = new AppointmentService();
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
      this.appointment=this.selectedAppointment;
      this.displayModalEditar = true;
    },
    getAll() {
      this.AppointmentService.getAll().then(data => {
        console.log(data)
        this.appointments = data.data;
      });
    },
    save() {
      this.AppointmentService.save(this.appointment).then(data => {
        console.log(data)
        
         if (data.status === 200) {
          swal.fire(
             'Creado',
             'La cita ha sido creada',
             'success'
           )
          this.displayModalCrear = false;
          this.displayModalEditar = false;
          this.appointment = {
             employee: null,
             vehicle:{
               plate : null
            }
           };
           this.getAll();
           
         }
      });
    },
    update() {
      this.AppointmentService.update(this.appointment).then(data => {
        console.log(data)
         if (data.status === 200) {
           swal.fire(
             'Actualizado',
             'La cita se ha actualizado',
             'success'
           )

           this.showSuccess();
          this.displayModalEditar = false;
          this.appointment = {
             employee: null,
             vehicle:{
               plate : null
            },
            status:null,
            date:null,
            id:null
           };
           this.getAll();
         }
      });
    },
    delet(){
      if(confirm("¿Está seguro que desea eliminar la cita?")){
      this.AppointmentService.delet(this.selectedAppointment.id).then(data => {
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