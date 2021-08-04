<template>
    <div class="media">
        <div class="media-left">
            <figure class="image is-96x96">
                <img :src="image" />
            </figure>
        </div>
        <div class="media-content">
            <p class="title is-7">{{name}}</p>
            <p class="subtitle is-3 has-text-warning has-text-weight-bold">{{formatNumber(unclaimed)}}</p>
        </div>
    </div>
</template>

<script>

  import numeral from "numeral";

  export default {
    name: 'ClaimRock',
    data: function() {
      return {
        ownerOf: '',
        tokenUri: '',
        attributes: [],
        image: '',
        ipfsImage: '',
        name: '',
        unclaimed: '',
        weedBalance: 0,
      }
    },
    props: {
      id: Number,
      contract: {},
      weedContract: {},
    },
    watch: {
      contract: function() {
        this.loadData();
      },
      weedContract: function() {
        this.loadWeed();
      }
    },
    mounted: async function() {
      if(this.contract) {
          await this.loadData();
      }
      if(this.weedContract.address) {
          await this.loadWeed();
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
        },
        loadWeed: async function() {
            let balance = parseInt(await this.weedContract.claimableWeed.call(this.id));
            this.unclaimed = balance / 1e18;
            this.$emit('unclaimed', this.unclaimed);
        },
        formatNumber: function(num) {
            let formatNum = numeral(num).format('0,0');
            if(formatNum === "NaN") {
                return 0;
            }
            return formatNum;
        }

    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
