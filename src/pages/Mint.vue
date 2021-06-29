<template>
    <div class="home">
        <br />
        <div class="column is-half is-offset-one-quarter">
            <div class="box">
                <h1 class="title">Mint Your Rocks</h1>
                <div class="columns">
                    <div class="column has-text-centered">
                        <h2 class="title is-4">3456</h2>
                        <h3 class="subtitle is-5 has-text-primary">Rocks Remaining</h3>
                    </div>
                    <div class="column has-text-centered">
                        <h2 class="title is-4">.05</h2>
                        <h3 class="subtitle is-5 has-text-primary">Price Per Rock</h3>
                    </div>
                    <div class="column has-text-centered">
                        <h2 class="title is-4">20</h2>
                        <h3 class="subtitle is-5 has-text-primary">Limit Per Order</h3>
                    </div>
                </div>
                <hr />
                <div class="field-body">
                    <div class="field">
                        <p class="control is-expanded has-icons-left">
                            <input class="input is-large" type="number" placeholder="Amount to Mint">
                            <span class="icon is-small is-left">
                              <i class="fas fa-gem"></i>
                            </span>
                        </p>
                    </div>
                    <div class="field">
                        <p class="control is-expanded">
                            <button class="button is-large is-primary is-fullwidth">
                                <span class="icon is-small is-left">
                                  <i class="fab fa-ethereum"></i>
                                </span>
                                <span>Mint</span>
                            </button>
                        </p>
                    </div>
                </div>
            </div>
            <br />
            <div class="box">
                <h1 class="title">Your Rocks</h1>
                <p>You are not yet a rock collector.</p>
            </div>
        </div>
    </div>
</template>

<script>

  export default {
    name: 'Mint',
    data: function() {
      return {
      }
    },
    components: {
    },
    mounted: function() {
    },
    methods: {
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
