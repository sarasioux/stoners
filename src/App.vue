<template>
    <div class="container">
        <nav class="navbar" role="navigation" aria-label="main navigation">
            <div class="navbar-brand">
                <div class="navbar-item">
                    <h1 class="title">Stoners</h1>
                </div>

                <a role="button" class="navbar-burger" aria-label="menu" aria-expanded="false" data-target="navbarBasicExample">
                    <span aria-hidden="true"></span>
                    <span aria-hidden="true"></span>
                    <span aria-hidden="true"></span>
                </a>
            </div>

            <div id="navbarBasicExample" class="navbar-menu">
                <div class="navbar-start" v-if="!showAuthButton">
                    <router-link to="/" class="navbar-item">
                        Test
                    </router-link>
                    <router-link to="/approve" class="navbar-item">
                        Approve
                    </router-link>
                </div>

                <div class="navbar-end">
                    <div class="navbar-item">
                        <button v-if="showAuthButton" class="button" @click="handleAuthClick">Authorize Google</button>
                    </div>
                </div>
            </div>
        </nav>
        <router-view
            v-if="!showAuthButton"
        ></router-view>
    </div>
</template>

<script>


  export default {
    name: 'App',
    data: function() {
      return {
        isGenerating: false,
        generateAmount: 10,
        generated: [],
        gapi: {},
        showAuthButton: true,

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
          self.listFiles();
        });
      },

    }
  }
</script>

<style>
    .hideme {
        display: none;
    }

</style>
