<template>
    <div class="home">
        <br />
        <div class="column is-half is-offset-one-quarter">
            <div class="box">
                <h1 class="title is-4">Your &nbsp;<span class="icon"><i class="fas fa-cannabis has-text-primary"></i></span> WEED</h1>
                <button class="button is-primary is-fullwidth" v-if="!account" @click="connect">
                    Connect Your Wallet
                </button>

                <div class="columns" v-if="account">
                    <div class="column">
                        <h1 class="title has-text-primary has-text-centered">{{formatNumber(weedBalance)}}</h1>
                        <h2 class="subtitle is-6 has-text-centered">Your Balance</h2>
                    </div>
                    <div class="column">
                        <h1 class="title has-text-centered"><button class="button is-small is-warning" @click="addToken">Add to Wallet</button></h1>
                    </div>
                </div>

                <p class="help has-text-centered" v-if="account">
                    Smart Contract: <a :href="'https://etherscan.io/address/' + weedContract.address" target="_blank">{{weedContract.address}}</a>
                </p>
            </div>
            <br />

            <div class="box" v-if="account">
                <h1 class="title is-4">Your Unclaimed &nbsp;<span class="icon"><i class="fas fa-cannabis has-text-primary"></i></span> WEED</h1>
                <p v-if="balanceOfRocks === 0">You are not yet a rock collector. <router-link to="/mint">Mint some rocks now!</router-link></p>
                <div class="columns is-multiline" v-if="balanceOfRocks > 0">
                    <div class="column is-12" v-if="unclaimedBalance > 0">
                        <button class="button is-primary is-fullwidth" @click="claimWeed" :disabled="isClaiming">
                            <span class="icon is-small is-left" v-if="isClaiming">
                              <i class="fas fa-spinner fa-pulse"></i>
                            </span>
                            <span>Claim Your Weed</span>
                        </button>
                    </div>
                    <div class="column is-6" v-for="rock in rocks" :key="rock">
                        <ClaimRock
                            :id="parseInt(rock)"
                            :account="account"
                            :contract="contract"
                            :weedContract="weedContract"
                            v-on:unclaimed="unclaimedEvent"
                            />
                    </div>
                </div>

                <p class="help" v-if="rocks.length > 0">You can claim 4,200 one time for every rock you own, and 69 for every day that you hold a rock.  Unclaimed Weed caps at 30 days, so you'll need to claim at least once a month to get maximum value for your rocks.</p>
            </div>

            <div class="box">
                <h2 class="title is-4">How to Spend &nbsp;<span class="icon"><i class="fas fa-cannabis has-text-primary"></i></span> WEED</h2>
                <p>Hold onto your WEED for now, because you'll be able to spend it on some exciting opportunities soon!</p>
                <br />
                <ul>
                    <li>&nbsp;<span class="icon"><i class="fas fa-cannabis has-text-primary"></i></span> Ape into our upcoming NFT game with just WEED and gas.</li>
                    <li>&nbsp;<span class="icon"><i class="fas fa-cannabis has-text-primary"></i></span> Buy exclusive Stoner merch and gifts with WEED.</li>
                    <li>&nbsp;<span class="icon"><i class="fas fa-cannabis has-text-primary"></i></span> Bid on upcoming NFT auctions with WEED.</li>
                    <li>&nbsp;<span class="icon"><i class="fas fa-cannabis has-text-primary"></i></span> <a href="https://discord.gg/gjVrcc7FZU" target="_blank">Join our Discord</a> for more WEED opportunities!</li>
                </ul>
            </div>
        </div>
    </div>
</template>

<script>
  import confetti from 'canvas-confetti';
  import ClaimRock from "../components/ClaimRock.vue";
  import numeral from "numeral";

  export default {
    name: 'Claim',
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
        isClaiming: false,
        playHurray: false,
        currentRockId: '',
        msg: '',
        mintGift: false,
        mintAddress: '',
        weedBalance: 0,
        unclaimedBalance: 0,
      }
    },
    components: {
      ClaimRock
    },
    props: {
      account: String,
      isAdmin: Function,
      contract: Object,
      weedContract: Object,
      network: Number
    },
    watch: {
      contract: function() {
        this.loadRocks();
      },
      weedContract: function() {
        this.loadWeed();
      }
    },
    mounted: async function() {
      if(this.contract.address) {
        this.loadRocks();
      }
      if(this.weedContract.address) {
        this.loadWeed();
      }
      this.mintStart = Date.now() - 1000;
    },
    methods: {
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
      loadWeed: async function() {
          let balance = parseInt(await this.weedContract.balanceOf.call(this.account));
          this.weedBalance = balance / 10e18;
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
      },
      formatNumber: function(num) {
        return numeral(num).format('0,0');
      },
      unclaimedEvent: function(amount) {
        this.unclaimedBalance += amount;
      },
      claimWeed: async function() {
        this.isClaiming = true;
        await this.weedContract.claimWeed(this.rocks);
        this.isClaiming = false;
        this.unclaimedBalance = 0;
        this.loadRocks();
        this.loadWeed();
        this.confetti();
      },
      addToken: async function() {
        const tokenAddress = this.weedContract.address;
        const tokenSymbol = 'WEED';
        const tokenDecimals = 18;
        const tokenImage = 'https://stonersrock.com/weed.png';

        try {
          // wasAdded is a boolean. Like any RPC method, an error may be thrown.
          console.log('eth', this.$web3);
          this.$web3.currentProvider.sendAsync({
            method: 'wallet_watchAsset',
            params: {
              type: 'ERC20', // Initially only supports ERC20, but eventually more!
              options: {
                address: tokenAddress, // The address that the token is at.
                symbol: tokenSymbol, // A ticker symbol or shorthand, up to 5 chars.
                decimals: tokenDecimals, // The number of decimals in the token
                image: tokenImage, // A string url of the token logo
              },
            },
          }, (err, added) => {
            if (err || 'error' in added) {
              console.log('Problem adding token.', err);
              return;
            }
            console.log('Token successfully added to your wallet.');
          });
        } catch (error) {
          console.log(error);
        }
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
