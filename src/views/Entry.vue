<template>
  <div style="margin: 0 auto; width: 80%">
    <Panel header="Ingresos">
      <Menubar :model="items" />
      <br />
      <div class="card card-info">
      <div class="card-body table-responsive">
      <table class="table table-hover table-head-fixed text-nowrap projects table table-bordered">
        <thead>
          <tr>
            <th>Codigo</th>
            <th>Estado</th>
            <th>Kilometraje</th>
            <th>Placa</th>

          </tr>
        </thead>
        <tbody>
          <tr v-for="(item,id) in Entries" :key="id">
            <td v-text="item.id"></td>
            <td v-text="item.state"></td>
            <td v-text="item.km"></td>
            <td v-text="item.appointment.vehicle.plate"></td>
            
          </tr>
        </tbody>
      </table>
    </div>
    </Panel> 
    
  </div>
  
  
</template>
<script src="https://cdnjs.cloudflare.com/ajax/libs/limonte-sweetalert2/7.29.2/sweetalert2.all.js"></script>

<script>

import EntryService from "../service/EntryService";
export default {
  name: "customer",
  data() {
    return {
     
      Entries: null,
      entry: {
        id:null,
        state:null,
        km:null,
        appointment:{
          vehicle:{
            plate:null
                  }
        }
      },
      items: [
        
        {
          label: "Refrescar",
          icon: "pi pi-fw pi-refresh",
          command: () => {
            this.getAll();
          }
        }
        
      ],
    };
  },
  CustomerService: null,
  created() {
    this.EntryService = new EntryService();  },
  mounted() {
    this.getAll();
  },
  methods: {
    
    
    
    getAll() {
      this.EntryService.getAll().then(data => {
      
        this.Entries = data.data;
      });
    }
    
  }
};

</script>

<style>
</style>