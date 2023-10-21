<template>
  <div class="container">
    <h1>Editar Area</h1>

    <div class="row">
      <form class="col s12" @submit.prevent="actualizar()">
        <div class="row">
          <div class="input-field col s12">
            <input id="first_name" type="text" v-model="payload.nombre">
            <label for="first_name" class="active">Nombre Area:</label>
          </div>
          <div class="input-field col s12">
            <input id="Encargado" type="text" v-model="payload.encargado">
            <label for="Encargado" class="active">Encargado:</label>
          </div>
          <div class="input-field col s6">
            <input id="Cantidad" type="number" v-model="payload.cantidad">
            <label for="Cantidad" class="active">Cantidad:</label>
          </div>
          <div class="input-field col s12">
            <select v-if="empresa" class="browser-default " v-model="payload.empresaId">
              <option value="" selected>Seleccione la empresa</option>
              <option :value="empresa.id">{{ empresa.descripcion }}</option>
            </select>
          </div>
          <div class="input-field col s6">
            <button class="btn waves-effect waves-light" type="submit" name="action">Guardar
              <i class="material-icons right prefix">add</i>
            </button>
          </div>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  name: 'AreaEditarView',
  data() {
    const api = process.env.VUE_APP_API;
    return {
      api: api,
      items: [],
      empresa:null,
      payload: {
        nombre: null,
        encargado: null,
        cantidad: 0,
        empresaId: ''
      }
    }
  },
  methods: {
    getId() {
        this.axios({
          method: 'get',
          url: this.api + '/areas/' + this.$route.params.id
        }).
          then((response) => {
            this.payload = response.data;
          }).catch((error) => {
            console.log(error);
          })
    },
    getEmpresa() {
      this.axios({
        method: 'get',
        url: this.api + '/empresa'
      }).
        then((response) => {
          this.empresa = response.data;
        }).catch((error) => {
          console.log(error);
        })
    },
      actualizar() {
      if (confirm("Esta seguro de actualizar el area?")) {
        this.axios({
          method: 'put',
          url: this.api + '/areas/' + this.$route.params.id,
          data: this.payload
        }).
          then((response) => {
            console.log("Se modifico correctamente.");
            this.$router.push("/area");
          }).catch((error) => {
            console.log(error);
          })
      }
    }
  },
  components: {

  },
  mounted() {
    this.getEmpresa();
    this.getId();
  }
}
</script>