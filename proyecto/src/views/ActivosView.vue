<template>
    <div class="container">
        <h1>Activos</h1>

        <div class="row">
            <form class="col s12" @submit.prevent="nuevo()">
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
                            <i class="material-icons right prefix">add</i>
                        </button>
                    </div>
                </div>
            </form>
        </div>

        <div class="row large-centered">
            <div class="row">
                <form class="col s12" @submit.prevent="getListforTipo()">
                    <div class="input-field col s6 right">
                        <i class="material-icons prefix">search</i>
                        <input type="search" id="search" placeholder="Buscar producto por tipo" v-model="search"
                            @search="getListforTipo()" />
                        <label for="search" class="active">Buscar</label>
                        <button type="submit" class="waves-effect waves-light btn-small">Buscar</button>
                    </div>
                </form>
            </div>
            <div class="row">
                <h5>Fitro</h5>
                <select @change="filter('estado', $event.target.value)" class="browser-default input-field">
                    <option value="" selected>Todos</option>
                    <option value="Nuevo">Nuevo</option>
                    <option value="Usado">Usado</option>
                    <option value="desuso">desuso</option>
                </select>
            </div>
            <table id="tabla2">
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Area</th>
                        <th>Marca</th>
                        <th>Modelo</th>
                        <th>Estado</th>
                        <th>Acciones</th>
                    </tr>
                </thead>

                <tbody>
                    <tr v-for="item in items">
                        <td>{{ item.id }}</td>
                        <td>{{ item.area.nombre }}</td>
                        <td>{{ item.marca }}</td>
                        <td>{{ item.modelo }}</td>
                        <td>{{ item.estado }}</td>
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
    </div>
</template>
<script>
export default {
    name: 'ActivosView',
    data() {
        const api = process.env.VUE_APP_API;
        return {
            api: api,
            items: [],
            areas: [],
            tipoactivos:[],
            search: '',
            toFilter: '',
            payload: {
                areaId: '',
                marca: null,
                modelo: null,
                estado: null,
                tipoactivoId:''
            }
        }
    },
    methods: {
        filter(name, value) {
            this.toFilter = value == '' ? '' : '&' + name + '=' + value;
            this.getListforTipo();
        },
        editar(id) {
            this.$router.push("/activo/" + id);
        },
        eliminar(id) {
            if (confirm("Esta seguro de eliminar el activo?")) {
                this.axios({
                    method: 'delete',
                    url: this.api + '/activos/' + id
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
                url: this.api + '/activos',
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
                url: this.api + '/activos?_expand=area'
            }).
                then((response) => {
                    this.items = response.data;
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
        getListforTipo() {
            this.axios({
                method: 'get',
                url: this.api + '/activos?_expand=area&q=' + this.search + this.toFilter
            }).
                then((response) => {
                    this.items = response.data;
                }).catch((error) => {
                    console.log(error);
                })
        },
        limpiar() {
            this.payload = {
                marca: null,
                modelo: null,
                estado: null
            }
        },
        detalle(activo) {
            this.payload = {
                marca: activo.marca,
                modelo: activo.modelo,
                estado: activo.estado
            }
        },
    },
    components: {

    },
    mounted() {
        this.getAreas();
        this.getTipoActivo();
        this.getList();
    }
}
</script>