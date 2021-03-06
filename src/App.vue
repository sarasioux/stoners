<template>
    <div class="container">
        <nav class="navbar is-hidden-mobile is-hidden-tablet-only" role="navigation" aria-label="main navigation">
            <div class="navbar-brand">
                <a role="button" class="navbar-burger" aria-label="menu" aria-expanded="false" data-target="navbarBasicExample" @click="isDropdownActive=(isDropdownActive===false)" :class="{'is-active':isDropdownActive}">
                    <span aria-hidden="true"></span>
                    <span aria-hidden="true"></span>
                    <span aria-hidden="true"></span>
                </a>
            </div>

            <div id="navbarBasicExample" class="navbar-menu" :class="{'is-active':isDropdownActive}">
                <div class="navbar-start">
                    <a class="navbar-item has-text-warning" href="https://twitter.com/mystoners" target="_blank">
                            <span class="icon is-large">
                                <i class="fab fa-2x fa-twitter"></i>
                            </span>
                    </a>
                    &nbsp;
                    <a class="navbar-item has-text-warning" href="https://discord.gg/gjVrcc7FZU" target="_blank">
                            <span class="icon">
                                <i class="fab fa-2x fa-discord"></i>
                            </span>
                    </a>
                    <router-link to="/" class="navbar-item has-text-primary" v-if="$route.name != 'Home'">
                        Home
                    </router-link>
                    <router-link to="/admin" class="navbar-item has-text-danger" v-if="isAdmin()">
                        Admin
                    </router-link>
                </div>

                <div class="navbar-end">
                    <div class="navbar-item" v-if="!isConnected">
                        <button class="button is-primary has-text-weight-bold" @click="connectWeb3">Connect Wallet</button>
                    </div>
                    <div class="navbar-item" v-if="isConnected">
                        <span class="tag is-dark">{{account}}</span>
                    </div>
                    <div class="navbar-item" v-if="isConnected">
                        <router-link to="/mint" class="button is-primary has-text-weight-bold">Mint</router-link>
                    </div>
                    <div class="navbar-item" v-if="isConnected">
                        <router-link to="/claim" class="button is-warning has-text-weight-bold"><span class="icon"><i class="fas fa-cannabis has-text-primary"></i></span> &nbsp; Claim</router-link>
                    </div>
                </div>
            </div>
        </nav>
        <div class="is-hidden-desktop columns is-mobile">
            <div class="column has-text-left">
                <router-link to="/" class="navbar-item has-text-primary" v-if="$route.name != 'Home'">
                    Home
                </router-link>
            </div>
            <div class="column has-text-right is-8">
                <div class="navbar-item" v-if="!isConnected">
                    <button class="button is-primary has-text-weight-bold" @click="connectWeb3">Connect Wallet</button>
                </div>
                <div class="navbar-item-buttons" v-if="isConnected">
                    <router-link to="/mint" class="button is-primary has-text-weight-bold">Mint</router-link> &nbsp;
                    <router-link to="/claim" class="button is-warning has-text-weight-bold" v-if="isAdmin()"><span class="icon"><i class="fas fa-cannabis has-text-primary"></i></span> &nbsp; Claim</router-link>
                </div>
            </div>
        </div>

        <router-view
            :isAdmin="isAdmin"
            :contract="contract"
            :weedContract="weedContract"
            :account="account"
            :network="network"
            v-on:connect="connectWeb3"
        ></router-view>

        <div class="section">
            <br />
            <br />
            <div class="columns is-mobile">
                <div class="column"></div>
                <div class="column has-text-centered is-hidden-mobile">
                    <a class="button is-ghost" href="https://twitter.com/mystoners" target="_blank">
                            <span class="icon is-large">
                                <i class="fab fa-2x fa-twitter"></i>
                            </span>
                    </a>
                    &nbsp;
                    <a class="button is-ghost" href="https://discord.gg/gjVrcc7FZU" target="_blank">
                            <span class="icon">
                                <i class="fab fa-2x fa-discord"></i>
                            </span>
                    </a>
                </div>
                <div class="column has-text-right"></div>
            </div>
        </div>
    </div>
</template>

<script>

  import StonersRockContract from '../public/contracts/StonersRock.json'
  import WeedContract from '../public/contracts/Weed.json'
  import TruffleContract from '@truffle/contract'

  export default {
    name: 'App',
    data: function() {
      return {
        contract: {},
        weedContract: {},
        isDropdownActive: false,
        isGenerating: false,
        generateAmount: 10,
        generated: [],
        gapi: {},
        showAuthButton: true,
        connectionInProgress: false,
        isConnected: false,
        account: '',
        network: 0

      }
    },
    components: {

    },
    mounted: async function() {
    },
    methods: {
      connectWeb3: async function() {
        this.connectionInProgress = true;
        try {
          // Request account access
          let accounts = await this.$web3.currentProvider.send('eth_requestAccounts');
          this.account = accounts.result[0];
          this.connectionInProgress = false;
          this.network = await this.$web3.eth.net.getId();
          this.isConnected = true;
          this.initContracts();
        } catch (error) {
          // User denied account access
          console.log('did not receive accts', error);
        }
      },
      initContracts: async function() {
        let contract = TruffleContract(StonersRockContract);
        contract.setProvider(this.$web3.currentProvider);
        contract.defaults({
          from: this.account
        });
        this.contract = await contract.deployed();

        contract = TruffleContract(WeedContract);
        contract.setProvider(this.$web3.currentProvider);
        contract.defaults({
            from: this.account
        });
        this.weedContract = await contract.deployed();
      },
      isAdmin: function() {
        return (
          String(this.account).toLowerCase() === '0x00796e910bd0228ddf4cd79e3f353871a61c351c'.toLowerCase()     // Sara Main
          || String(this.account).toLowerCase() === '0xB58Fb5372e9Aa0C86c3B281179c05Af3bB7a181b'.toLowerCase()  // Mark Main
          || String(this.account).toLowerCase() === '0x7fc55376D5A29e0Ee86C18C81bb2fC8F9f490E50'.toLowerCase()  // Shaun Main
          || String(this.account).toLowerCase() === '0x314439ab9e319440500376224211aa898215b889'.toLowerCase()  // Sara Dev
          || String(this.account).toLowerCase() === '0xd83Dd8A288270512b8A46F581A8254CD971dCb09'.toLowerCase()  // Owner
        );
      }

    }
  }
</script>

<style>
    .hideme {
        display: none;
    }
    .pull-right {
        float: right;
    }
    .navbar {
        background: transparent;
    }
    a.button.is-ghost:hover {
        text-decoration: none !important;
        color: white;
    }
    .navbar-item-buttons {
        padding: 0.5em;
    }
</style>
