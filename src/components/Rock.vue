<template>
    <div class="card">
        <div class="card-image" v-if="image">
            <figure class="image is-square">
                <img :src="image" />
            </figure>
        </div>
        <div class="card-content">
            <div class="media">
                <div class="media-content">
                    <p class="title is-6">{{name}}</p>
                </div>
            </div>

            <div class="content">
                <div class="columns is-multiline">
                    <div class="column is-6 has-text-centered" v-for="att in attributes" :key="att">
                        <h1 class="title is-7 has-text-warning">{{att.value}}</h1>
                        <h2 class="subtitle is-7">{{att.trait_type}}</h2>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>

  export default {
    name: 'Rock',
    data: function() {
      return {
        ownerOf: '',
        tokenUri: '',
        attributes: [],
        image: '',
        ipfsImage: '',
        name: ''
      }
    },
    props: {
      id: Number,
      contract: {}
    },
    watch: {
      contract: function() {
        this.loadData();
      }
    },
    mounted: async function() {
      console.log('Rock', this.id);
      if(this.contract) {
          await this.loadData();
      }

    },
    methods: {
        loadData: async function() {
          this.ownerOf = await this.contract.ownerOf.call(this.id);
          this.tokenUri = await this.contract.tokenURI(this.id);
          const tokenUrl = this.tokenUri.replace('ipfs://', 'https://ipfs.infura.io/ipfs/');
          const response = await fetch(tokenUrl);
          try {
            const json = await response.json();
            this.attributes = json.attributes;
            this.ipfsImage = json.image.replace('ipfs://', 'https://ipfs.infura.io/ipfs/');
            this.image = this.ipfsImage;
            this.name = json.name;
          }
          catch(error) {
            console.log('json error', error);
          }

        }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
