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
      </DataTable>

    </Panel>
    <Dialog header="Crear Persona" :visible.sync="displayModal" :modal="true">
      <span class="p-float-label">
       <Dropdown v-model="selectedEmployee" :options="employees" optionLabel="name" placeholder="Codigo empleado" style="width: 80%"  />
      </span>
      <br />
      <br />
      <span class="p-float-label">
        <InputText id="plate" type="text" v-model="appointment.date" style="width: 100%" />
        <label for="plate">Placa vehiculo</label>
      </span>
      <br />
      
      <template #footer>
        <Button label="Guardar" icon="pi pi-check" @click="save" />
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
        {name: '1', code: '1'}
      ]
      ,
      appointments: null,
      appointment: {
        id: null,
        date: null,
        status: null,
        vehicle:{
          plate : null
        }
      },
      items: [
        {
          label: "Nuevo",
          icon: "pi pi-fw pi-plus",
          command: () => {
            this.showSaveModal();
          }
        },
        {
          label: "Editar",
          icon: "pi pi-fw pi-pencil"
        },
        {
          label: "Eliminar",
          icon: "pi pi-fw pi-trash"
        },
        {
          label: "Refrescar",
          icon: "pi pi-fw pi-refresh",
          command: () => {
            this.getAll();
          }
        }
      ],
      displayModal: false
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
    showSaveModal() {
      this.displayModal = true;
    },
    getAll() {
      this.personaService.getAll().then(data => {
        this.appointments = data.data;
      });
    },
    save() {
      this.personaService.save(this.appointment).then(data => {
        if (data.status === 200) {
          this.displayModal = false;
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
      this.displayModal = false;
    }
  }
};
</script>

<style>
</style>