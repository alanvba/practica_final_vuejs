<template>
  <div>
<h3>component Tipo activo en desarrollo</h3>
  </div>
</template>
<script>
export default {
    name: 'TipoActivosView',
    data() {
      const api = process.env.VUE_APP_API;
      return {
        api: api
      }
    },
    methods: {},
      components: {

    }
}
</script>