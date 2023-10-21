<template>
    <div class="container">
        <h1>Editar Activo</h1>

        <div class="row">
            <form class="col s12" @submit.prevent="actualizar()">
                <div class="row">
                        <div class="input-field col s6">
                            <select class="browser-default input-field" v-model="payload.areaId">
                                <option value="" selected>Seleccione area</option>
                                <option :value="area.id" v-for="area in areas">{{ area.nombre }}</option>
                            </select>
                        </div>
                        <div class="input-field col s6">
                            <select class="browser-default input-field" v-model="payload.tipoactivoId">
                                <option value="" selected>Seleccione tipo activo</option>
                                <option :value="tipoactivo.id" v-for="tipoactivo in tipoactivos">{{ tipoactivo.nombre }}</option>
                            </select>
                        </div>

                    <div class="input-field col s12">
                        <input id="Marca" type="text" v-model="payload.marca">
                        <label for="Marca" class="active">Marca:</label>
                    </div>
                    <div class="input-field col s6">
                        <input id="Modelo" type="text" v-model="payload.modelo">
                        <label for="Modelo" class="active">Modelo:</label>
                    </div>
                    <div class="input-field col s6">
                        <input id="Estado" type="text" v-model="payload.estado">
                        <label for="Estado" class="active">Estado:</label>
                    </div>

                    <div class="input-field col s6">
                        <button class="btn waves-effect waves-light" type="submit" name="action">Guardar
                            <i class="material-icons">add</i>
                        </button>
                        <button class="btn waves-effect waves-light red" type="button" name="action">
                            <router-link to="/activo">Cancelar<i class="material-icons">cancel</i></router-link>
                        </button>
                    </div>
                </div>
            </form>
        </div>
    </div>
</template>
<script>
export default {
    name: 'ActivosEditarView',
    data() {
        const api = process.env.VUE_APP_API;
        return {
            api: api,
            items: [],
            areas: [],
            tipoactivos: [],
            payload: {
                areaId: null,
                marca: null,
                modelo: null,
                estado: null,
                tipoactivoId: ''
            }
        }
    },
    methods: {
        getId() {
            this.axios({
                method: 'get',
                url: this.api + '/activos/' + this.$route.params.id
            }).
                then((response) => {
                    this.payload = response.data;
                }).catch((error) => {
                    console.log(error);
                })
        },
        getAreas() {
            this.axios({
                method: 'get',
                url: this.api + '/areas'
            }).
                then((response) => {
                    this.areas = response.data;
                }).catch((error) => {
                    console.log(error);
                })
        },
        getTipoActivo() {
            this.axios({
                method: 'get',
                url: this.api + '/tipoactivos'
            }).
                then((response) => {
                    this.tipoactivos = response.data;
                }).catch((error) => {
                    console.log(error);
                })
        },
        actualizar() {
            if (confirm("Esta seguro de actualizar el activo?")) {
                this.axios({
                    method: 'put',
                    url: this.api + '/activos/' + this.$route.params.id,
                    data: this.payload
                }).
                    then((response) => {
                        console.log("Se modifico correctamente.");
                        this.$router.push("/activo");
                    }).catch((error) => {
                        console.log(error);
                    })
            }
        }
    },
    components: {

    },
    mounted() {
        this.getAreas();
        this.getTipoActivo();
        this.getId();
    }
}
</script>