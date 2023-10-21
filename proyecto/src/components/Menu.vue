<template>
  <nav class="nav-extended">
    <div class="nav-wrapper">
      <a href="#" class="brand-logo">Logo</a>
      <a href="#" data-target="mobile-demo" class="sidenav-trigger"><i class="material-icons">menu</i></a>
    </div>
    <div class="nav-content">
      <ul class="tabs tabs-transparent">
        <li class="tab"><router-link to="/">Inicio</router-link></li>
        <li class="tab"><router-link to="/area">Area</router-link></li>
        <li class="tab"><router-link to="/activo">Activos</router-link></li>
        <li class="tab"><router-link to="/tipoactivo">Tipo Activo</router-link></li>
      </ul>
    </div>
  </nav>

  <ul class="sidenav" id="mobile-demo">
    <li><router-link to="/"><i class="material-icons">home</i>Inicio</router-link></li>
    <li><router-link to="/area"><i class="material-icons">font_download</i>Area</router-link></li>
    <li><router-link to="/activo"><i class="material-icons">assignment</i>Activo</router-link></li>
    <li><router-link to="/tipoactivo"><i class="material-icons">extension</i>Tipo Activo</router-link></li>
  </ul>
</template>

<script>
import M from 'materialize-css'
export default {
  name: 'Menu',
  data() {
    return {
      sidenav: null
   } 
  },
  props: {
    msg: String
  },
  methods: {
    menu() {
      this.sidenav.open();
    }
  },
  mounted() {
    var elems = document.querySelectorAll('.sidenav');
    var instances = M.Sidenav.init(elems);
    this.sidenav = instances[0];
  }
}
</script>

