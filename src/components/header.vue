<template>
    <v-app-bar app 
      color="white"
      flat
      light
      elevation='1'>
      <v-btn icon @click="menu" class='ml-2'>
          <v-avatar
            class="d-flex align-center">
                <v-icon v-if="drawer" x-large color='primary' > mdi-menu-open </v-icon>
                <v-icon v-if="!drawer" x-large color='primary'> mdi-menu </v-icon>
            </v-avatar>
      </v-btn>
        

        <v-spacer></v-spacer>

      </v-app-bar>
</template>

<script>


export default {
    name: 'Header',
    props: [
        'drawer'
    ],
    components: {
        
    },
    data: () => ({

    }),
    methods: {
        menu() {
            this.$emit('menu');
        }
    },
    
}

</script>
