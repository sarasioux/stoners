<template>
    <div class="choice">
        <img :src="'https://drive.google.com/uc?export=view&id=' + id" />
    </div>
</template>

<script>
  export default {
    name: 'Choice',
    data: function() {
      return {
      }
    },
    props: {
      attribute: String,
      id: String
    },
    mounted: function() {
    },
    methods: {
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    .choice {
        position: fixed;
        top: 15%;
        left: 50%;
    }
</style>
