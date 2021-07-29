<template>
    <div class="home">
        <br />
        <div class="column is-half is-offset-one-quarter">
            <div class="box">
                <h1 class="title">Mint Your Rocks</h1>
                <button class="button is-primary is-fullwidth" v-if="!account" @click="connect">
                    Connect Your Wallet
                </button>
                <div class="box has-text-centered" v-if="salePending && startingBlock && currentBlock">
                    <h1 class="title is-2 has-text-warning">Sale Pending...</h1>
                    <h3 class="subtitle">{{startingBlock - currentBlock}} Blocks Remaining</h3>
                </div>
                <div class="box has-text-centered" v-if="!saleActive && !salePending">
                    <h1 class="title is-1 has-text-warning">{{timeLeft}}</h1>
                    <h2 class="subtitle">Sale Begins</h2>
                </div>
                <div class="columns" v-if="account">
                    <div class="column has-text-centered">
                        <h2 class="title is-5" v-if="currentRockId">{{10420 - currentRockId}}</h2>
                        <h2 class="title is-5" v-if="!currentRockId">---</h2>
                        <h3 class="subtitle is-6 has-text-primary has-text-weight-bold">Rocks Left</h3>
                    </div>
                    <div class="column has-text-centered">
                        <h2 class="title is-5">.042069</h2>
                        <h3 class="subtitle is-6 has-text-primary has-text-weight-bold">Price Per Rock</h3>
                    </div>
                    <div class="column has-text-centered">
                        <h2 class="title is-5">20</h2>
                        <h3 class="subtitle is-6 has-text-primary has-text-weight-bold">Limit Per Mint</h3>
                    </div>
                </div>
                <hr v-if="account" />
                <div class="field-body" v-if="account">
                    <div class="field">
                        <p class="control is-expanded has-icons-left">
                            <input v-model="mintAmount" class="input" type="number" placeholder="Amount to Mint" :disabled="(saleActive === false || isMinting)">
                            <span class="icon is-small is-left">
                              <i class="fas fa-gem"></i>
                            </span>
                        </p>
                    </div>
                    <div class="field">
                        <p class="control is-expanded">
                            <button class="button is-primary is-fullwidth" :disabled="(saleActive === false || isMinting)" @click="mintRock">
                                <span class="icon is-small is-left" v-if="!isMinting">
                                  <i class="fab fa-ethereum"></i>
                                </span>
                                <span class="icon is-small is-left" v-if="isMinting">
                                  <i class="fas fa-spinner fa-pulse"></i>
                                </span>
                                <span>Mint</span>
                            </button>
                        </p>
                    </div>
                </div>

                <div  v-if="account">
                    <div class="field" v-if="mintGift">
                        <br />
                        <p class="control is-expanded has-icons-left">
                            <input v-model="mintAddress" class="input" type="text" placeholder="Recipient's Address" :disabled="(saleActive === false || isMinting)">
                            <span class="icon is-small is-left">
                              <i class="fas fa-gift"></i>
                            </span>
                        </p>
                    </div>

                    <br />
                    <a @click="mintGift=true" v-if="!mintGift"><span class="icon"><i class="fas fa-gift"></i></span> Mint a Gift</a>
                    <a @click="mintGift=false" v-if="mintGift"><span class="icon"><i class="fas fa-user"></i></span> Mint for Yourself</a>

                </div>

                <br />
                <article class="message is-danger" v-if="msg">
                    <div class="message-body">
                        {{msg}}
                    </div>
                </article>
                <div class="has-text-centered">
                    <audio controls autoplay loop v-if="isMinting">
                        <source src="../assets/reggae.mp3" type="audio/mpeg">
                        Your browser does not support the audio element.
                    </audio>
                    <audio autoplay v-if="playHurray">
                        <source src="../assets/hurray.mp3" type="audio/mpeg">
                    </audio>
                </div>

                <p class="help has-text-centered" v-if="account">
                    Smart Contract: <a :href="'https://etherscan.io/address/' + contract.address" target="_blank">{{contract.address}}</a>
                </p>
            </div>
            <br />

            <div class="box">
                <div class="columns">
                    <div class="column is-4">
                        <img src="../assets/blank.png" class="rock-img" />
                    </div>
                    <div class="column has-text-centered">
                        <br />
                        <p class="is-size-6">Find a <strong>super rare</strong> blank rock<br />and win <strong>at least 0.5 ETH</strong>!</p>
                    </div>
                </div>
            </div>
            <br />
            <div class="box" v-if="account">
                <h1 class="title">Your Rocks</h1>
                <p v-if="balanceOfRocks === 0">You are not yet a rock collector.</p>
                <div class="columns is-multiline" v-if="balanceOfRocks > 0">
                    <div class="column is-6" v-for="rock in rocks" :key="rock">
                        <Rock
                            :id="parseInt(rock)"
                            :contract="contract"
                            />
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
  import confetti from 'canvas-confetti';

  import Rock from "../components/Rock.vue";

  export default {
    name: 'Mint',
    data: function() {
      return {
        mintStart: 0,
        timeLeft: '',
        salePending: false,
        saleActive: true,
        startingBlock:  '',
        currentBlock: '',
        balanceOfRocks: 0,
        rocks: [],
        mintAmount: '',
        isMinting: false,
        playHurray: false,
        currentRockId: '',
        msg: '',
        mintGift: false,
        mintAddress: '',
      }
    },
    components: {
      Rock
    },
    props: {
      account: String,
      isAdmin: Function,
      contract: Object,
      network: Number
    },
    watch: {
      contract: function() {
        this.loadStartingBlock();
        this.loadRocks();
      }
    },
    mounted: async function() {
      if(this.contract.address) {
        this.loadRocks();
      }
      this.mintStart = Date.now() - 1000;
    },
    methods: {
      mintRock: async function() {
        try {
          this.isMinting = true;
          let mintAddress;
          if(this.mintGift === true) {
            mintAddress = this.mintAddress;
          } else {
            mintAddress = this.account;
          }
          await this.contract.mintRock(this.mintAmount, mintAddress, {value: this.mintAmount * .042069 * 1e18, from: this.account});
          this.isMinting = false;
          this.playHurray = true;
          this.confetti();
          setTimeout(this.loadRocks, 5000);
          setTimeout(this.noHurray, 5000);
        }
        catch (error) {
          console.log('Error', error);
          this.isMinting = false;
          this.msg = 'Something went wrong while minting, please try again.';
          setTimeout(this.clearMsg, 5000);
        }
      },
      noHurray: function() {
        this.playHurray = false;
      },
      loadRocks: async function() {
            let rocks = await this.contract.getRocksByOwner(this.account, {from: this.account});
            rocks.reverse();
            this.rocks = rocks;
            this.balanceOfRocks = this.rocks.length;
            this.currentRockId = parseInt(await this.contract.getCurrentRockId.call({from: this.account}));

      },
      loadStartingBlock: async function() {
        if(this.contract.address) {
          this.startingBlock = parseInt(await this.contract.saleStartBlock.call({from: this.account}));
          this.currentRockId = parseInt(await this.contract.getCurrentRockId.call({from: this.account}));
        }
      },
      loadCurrentBlock: async function() {
        this.currentBlock = await this.$web3.eth.getBlockNumber();
        if(this.startingBlock && this.currentBlock >= this.startingBlock) {
          this.saleActive = true;
          this.salePending = false;
        } else {
          setTimeout(this.loadCurrentBlock, 1000);
        }
      },
      calculateTimeLeft: function() {
        const timeLeft = (this.mintStart - Date.now()) / 1000;
        if(timeLeft <= 0) {
          this.loadCurrentBlock();
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
      },
      confetti: function() {
        let colors = ['#FD2A00', '#FDFE00', '#19C401'];
        let end = Date.now() + (3 * 1000);
        (function frame() {
          confetti({
            particleCount: 3,
            angle: -90,
            spread: 200,
            origin: { y: -0.2 },
            colors: colors
          });
          if (Date.now() < end) {
            requestAnimationFrame(frame);
          }
        }());
      },
      clearMsg: function() {
        this.msg = '';
      },
      connect: function() {
        this.$emit('connect');
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    .rock-img {
        border-radius: 15px;
    }
</style>
