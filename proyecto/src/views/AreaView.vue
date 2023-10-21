<template>
  <div class="container">
    <h1>Areas</h1>

    <div class="row">
      <form class="col s12" @submit.prevent="nuevo()">
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
          <div class="input-field col s6">
            <select v-if="empresa" class="browser-default input-field" v-model="payload.empresaId">
              <option value="" selected>Seleccione la Empresa</option>
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

    <table id="tabla">
      <thead>
        <tr>
          <th>#</th>
          <th>Nombre</th>
          <th>Encargado</th>
          <th>Acciones</th>
        </tr>
      </thead>

      <tbody>
        <tr v-for="item in items">
          <td>{{ item.id }}</td>
          <td>{{ item.nombre }} (Cant. {{ item.cantidad }})</td>
          <td>{{ item.encargado }}</td>
          <td>
            <a class="btn-floating btn-small waves-effect waves-light"><i class="material-icons"
                @click="detalle(item)">info</i></a>&nbsp;
            <a class="btn-floating btn-small waves-effect waves-light blue"><i class="material-icons"
                @click="editar(item.id)">edit</i></a>&nbsp;
            <a class="btn-floating btn-small waves-effect waves-light red"><i class="material-icons"
                @click="eliminar(item.id)">delete</i></a>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  name: 'AreaView',
  data() {
    const api = process.env.VUE_APP_API;
    return {
      api: api,
      empresa: null,
      items: [],
      payload: {
        nombre: null,
        encargado: null,
        cantidad: 0,
        empresaId: '',
      }
    }
  },
  methods: {
    editar(id) {
      this.$router.push("/area/" + id);
    },
    eliminar(id) {
      if (confirm("Esta seguro de eliminar el area?")) {
        this.axios({
          method: 'delete',
          url: this.api + '/areas/' + id
        }).
          then((response) => {
            this.getList();
          }).catch((error) => {
            console.log(error);
          })
      }
    },
    nuevo() {
      this.axios({
        method: 'post',
        url: this.api + '/areas',
        data: this.payload
      }).then(
        (response) => {
          this.getList();
          console.log(response);
          this.limpiar();
        }).catch((error) => {
          console.log(error);
        });
    },
    getList() {
      this.axios({
        method: 'get',
        url: this.api + '/areas'
      }).
        then((response) => {
          this.items = response.data;
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
    limpiar() {
      this.payload = {
        nombre: null,
        encargado: null,
        cantidad: 0,
        empresaId: 1,
      }
    },
    detalle(area) {
      this.payload = {
        nombre: area.nombre,
        encargado: area.encargado,
        cantidad: area.cantidad,
        empresaId: area.empresaId,
      }
    }
  },
  components: {

  },
  mounted() {
    this.getList();
    this.getEmpresa();
  }
}
</script>