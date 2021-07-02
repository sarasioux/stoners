<template>
    <div class="home">
        <br />
        <div class="column is-half is-offset-one-quarter">
            <div class="box">
                <h1 class="title">Mint Your Rocks</h1>
                <div class="box has-text-centered" v-if="!saleActive">
                    <h1 class="title is-1 has-text-danger">{{timeLeft}}</h1>
                    <h2 class="subtitle">Sale Begins</h2>
                </div>
                <div class="columns">
                    <div class="column has-text-centered">
                        <h2 class="title is-5">3456</h2>
                        <h3 class="subtitle is-6 has-text-primary has-text-weight-bold">Rocks Remaining</h3>
                    </div>
                    <div class="column has-text-centered">
                        <h2 class="title is-5">.042069</h2>
                        <h3 class="subtitle is-6 has-text-primary has-text-weight-bold">Price Per Rock</h3>
                    </div>
                    <div class="column has-text-centered">
                        <h2 class="title is-5">20</h2>
                        <h3 class="subtitle is-6 has-text-primary has-text-weight-bold">Limit Per Order</h3>
                    </div>
                </div>
                <hr />
                <div class="field-body">
                    <div class="field">
                        <p class="control is-expanded has-icons-left">
                            <input class="input is-large" type="number" placeholder="Amount to Mint" :disabled="(saleActive === false)">
                            <span class="icon is-small is-left">
                              <i class="fas fa-gem"></i>
                            </span>
                        </p>
                    </div>
                    <div class="field">
                        <p class="control is-expanded">
                            <button class="button is-large is-primary is-fullwidth" :disabled="(saleActive === false)">
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
        mintStart: 0,
        timeLeft: '',
        saleActive: false,
      }
    },
    components: {
    },
    mounted: function() {
      const d = new Date(1626207600*1000);
      this.mintStart = d.getTime();
      this.calculateTimeLeft();
      setTimeout(this.calculateTimeLeft, 1000);
    },
    methods: {
      calculateTimeLeft: function() {
        const timeLeft = (this.mintStart - Date.now()) / 1000;
        if(timeLeft <= 0) {
          this.saleActive = true;
        } else {
          const days = Math.floor(timeLeft/(60*60*24));
          const hours = Math.floor((timeLeft-(days*60*60*24))/(60*60));
          const minutes = Math.floor((timeLeft-(days*60*60*24)-(hours*60*60))/(60));
          const seconds = Math.floor((timeLeft-(days*60*60*24)-(hours*60*60)-(minutes*60)));
          this.timeLeft = days + ':' + this.pad(hours) + ':' + this.pad(minutes) + ':' + this.pad(seconds);
          setTimeout(this.calculateTimeLeft, 1000);
        }
      },
      pad(num) {
        if(String(num).length === 1) {
          return '0' + String(num);
        }
        return num;
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
