<template>
  <v-app>
    <v-main>
      <transition mode="out-in">
        
        <router-view />
      </transition>
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
