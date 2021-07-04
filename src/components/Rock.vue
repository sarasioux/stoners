<template>
    <div class="card" :class="{'has-background-grey':deleted}">
        <div class="card-image">
            <figure class="image is-square">
                <img :src="'https://drive.google.com/uc?export=view&id=' + id" />
            </figure>
        </div>
        <div class="card-content">
            <div class="media">
                <div class="media-content">
                    <p class="title is-4">{{rockName}}</p>
                    <p class="subtitle is-7">{{hash}}</p>
                </div>
            </div>

            <div class="content">
                <p>{{description}}</p>
                <div class="columns is-multiline">
                    <div class="column is-6 has-text-centered" v-for="att in attributes" :key="att">
                        <h1 class="title is-6">{{att.value}}</h1>
                        <h2 class="subtitle is-7">{{att.trait_type}}</h2>
                    </div>
                </div>
            </div>
        </div>
        <footer class="card-footer">
            <a v-if="!deleted" href="#" class="card-footer-item" @click="deleteRock">Delete</a>
            <h3 v-if="deleted" class="title is-6 card-footer-item has-text-danger">DELETED</h3>
        </footer>
    </div>
</template>

<script>
  export default {
    name: 'Rock',
    data: function() {
      return {
        hash: '',
        jsonId: '',
        rockName: '',
        description: '',
        external_url: '',
        attributes: [],
        deleted: false,
      }
    },
    props: {
      id: String
    },
    mounted: function() {
      let parts = this.name.split('.');
      this.hash = parts[0];
    },
    methods: {


    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
