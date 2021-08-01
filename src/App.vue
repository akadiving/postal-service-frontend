<template>
  <v-app>
    <v-main>
      <v-slide-x-transition>
        <router-view />
      </v-slide-x-transition>
    </v-main>
  </v-app>
</template>

<script>

export default {
  name: "App",
  components: {
    
  },
  data: () => ({
    
  }),

  methods: {
    
  }
};
</script>
<style scoped>
.v-main{
  background-color: rgb(245, 240, 245);
}
</style>
