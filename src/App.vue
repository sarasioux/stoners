<template>
    <div class="container">
        <div class="section">
            <nav class="navbar" role="navigation" aria-label="main navigation">
                <div class="navbar-brand">
                    <div class="navbar-item">
                        <router-link to="/">
                            <h1 class="title is-4 is-hand has-text-link">Stoners Rock</h1>
                        </router-link>
                    </div>

                    <a role="button" class="navbar-burger" aria-label="menu" aria-expanded="false" data-target="navbarBasicExample" @click="isDropdownActive=(isDropdownActive===false)" :class="{'is-active':isDropdownActive}">
                        <span aria-hidden="true"></span>
                        <span aria-hidden="true"></span>
                        <span aria-hidden="true"></span>
                    </a>
                </div>

                <div id="navbarBasicExample" class="navbar-menu" :class="{'is-active':isDropdownActive}">
                    <div class="navbar-start">
                        <router-link to="/sanctuary" class="navbar-item">
                            The Sanctuary
                        </router-link>
                        <router-link to="/code" class="navbar-item">
                            The Code
                        </router-link>
                        <router-link to="/test" class="navbar-item has-text-danger" v-if="!showAuthButton">
                            Test
                        </router-link>
                        <router-link to="/approve" class="navbar-item has-text-danger" v-if="!showAuthButton">
                            Approve
                        </router-link>
                    </div>

                    <div class="navbar-end">
                        <div class="navbar-item" v-if="isAdmin() && showAuthButton" >
                            <button class="button" @click="handleAuthClick">Authorize Google</button>
                        </div>
                        <div class="navbar-item" v-if="!isConnected">
                            <button class="button is-primary has-text-weight-bold" @click="connectWeb3">Connect Wallet</button>
                        </div>
                        <div class="navbar-item" v-if="isConnected">
                            <span class="tag is-dark">{{account}}</span>
                        </div>
                        <div class="navbar-item" v-if="isConnected">
                            <router-link to="/mint" class="button is-primary has-text-weight-bold">Mint</router-link>
                        </div>
                    </div>
                </div>
            </nav>
        </div>
        <router-view
            :isGoogleAuthed="(showAuthButton === false)"
        ></router-view>
    </div>
</template>

<script>

  export default {
    name: 'App',
    data: function() {
      return {
        isDropdownActive: false,
        isGenerating: false,
        generateAmount: 10,
        generated: [],
        gapi: {},
        showAuthButton: true,

        account: '',
        connectionInProgress: false,
        isConnected: false,

      }
    },
    components: {

    },
    mounted: async function() {
    },
    methods: {
      handleAuthClick: function() {
        let self = this;
        window.gapi.auth2.getAuthInstance().signIn().then(() => {
          self.showAuthButton = false;
        });
      },
      connectWeb3: async function() {
        this.connectionInProgress = true;
        try {
          // Request account access
          let accounts = await this.$web3.currentProvider.send('eth_requestAccounts');
          this.account = accounts.result[0];
          this.connectionInProgress = false;
          this.network = await this.$web3.eth.net.getId();
          this.isConnected = true;

        } catch (error) {
          // User denied account access
          console.log('did not receive accts', error);
        }
      },
      isAdmin: function() {
        return (String(this.account) === '0x00796e910bd0228ddf4cd79e3f353871a61c351c' || String(this.account) === '0xB58Fb5372e9Aa0C86c3B281179c05Af3bB7a181b' || String(this.account) === '0x7fc55376D5A29e0Ee86C18C81bb2fC8F9f490E50');
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
</style>
