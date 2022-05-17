<template>
  <div style="margin: 0 auto; width: 80%">
    <Panel header="Citas">
      <Menubar :model="items" />
      <br />
      <DataTable :value="appointments" :paginator="true" :rows="10">
        <Column field="id" header="Codigo"></Column>
        <Column field="date" header="Fecha"></Column>
        <Column field="status" header="Estado"></Column>
        <Column field="vehicle.plate" header="Placa"></Column>
        <Column field="Button" header="">
        <template >
          <Button label="" icon="pi pi-pencil" para class="p-button-warning"  @click="showUpdateModal" style="margin:15px"/>
          <Button label="" icon="pi pi-trash" class="p-button-danger" @click="delet" style="margin:15px" />
        </template>
        </Column>
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
      <span class="p-float-label">
       <Dropdown v-model="appointment.employee" :options="employees" optionLabel="id" placeholder="Codigo empleado" style="width: 80%"  />
      </span>
      <br />
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
      
      <template #footer>
        <Button label="Editar" class="p-button-warning" icon="pi pi-check" @click="update"/>

        <Button label="Cancelar" icon="pi pi-times" @click="closeModal" class="p-button-secondary" />
      </template>
    </Dialog>

    
  </div>
</template>

<script>

import PersonaService from "../service/PersonaService";
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
      
      items: [
        {
          label: "Nueva cita",
          icon: "pi pi-fw pi-plus",
          command: () => {
            this.showSaveModal();
          }
        }
        
      ],
      displayModalCrear: false,
      displayModalEditar:false
    };
  },
  personaService: null,
  created() {
    this.personaService = new PersonaService();
  },
  mounted() {
    this.getAll();
  },
  methods: {
    update(){

    },
    showSaveModal() {
     

      this.displayModalCrear = true;
    },
    showUpdateModal() {

      this.displayModalEditar = true;
    },
    getAll() {
      this.personaService.getAll().then(data => {
        this.appointments = data.data;
      });
    },
    save() {
      this.personaService.save(this.appointment).then(data => {
        console.log(data)
         if (data.status === 200) {
          this.displayModalCrear = false;
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
    closeModal() {
      this.displayModalCrear = false;
    }
  }
};
</script>

<style>
</style>