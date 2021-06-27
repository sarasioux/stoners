<template>
    <div class="container">
        <h1 class="title">Stoners</h1>
        <button v-if="showAuthButton" class="button" @click="handleAuthClick">Authorize Google</button>
        <div class="columns">
            <div class="column is-4">
                <div class="box" v-if="attributes.length > 0">
                    <button v-if="!showAuthButton" class="button is-fullwidth" @click="choices = {}; reset = Date.now()">
                        Reset Selections
                    </button>
                    <br /><br />
                    <div v-for="attribute in attributes" :key="attribute">
                        <Attribute
                                :attribute="attribute.name"
                                :id="attribute.id"
                                :reset="reset"
                                v-on:choice="choice"
                        />
                    </div>
                </div>
            </div>
            <div class="column rock-column">
                <div class="choices">
                    <div v-for="(ch, att) in choices" :key="ch">
                        <Choice
                                :attribute="att"
                                :id="ch"
                        />
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>

  import Attribute from "./components/Attribute.vue";
  import Choice from "./components/Choice.vue";

  export default {
    name: 'App',
    data: function() {
      return {
        gapi: {},
        showAuthButton: true,
        attributes: [],
        choices: {},
        reset: 0
      }
    },
    components: {
      Attribute, Choice
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
      listFiles: function() {
        let self = this;
        window.gapi.client.drive.files.list({
          'q': "'1jhlMWFT1SLsYDbua0lJDFGiI06EggBAg' in parents and mimeType='application/vnd.google-apps.folder'",
          'pageSize': 100,
          'fields': "nextPageToken, files(id, name)"
        }).then(function(response) {
          const files = response.result.files;
          if (files && files.length > 0) {
            for (let i = 0; i < files.length; i++) {
              let file = files[i];
              self.attributes.push({name: file.name, id: file.id});
            }
          } else {
            console.log('No files found.');
          }
        });
      },
      choice: function(attribute, choice) {
        console.log('app choice made', attribute, choice);
        this.choices[attribute] = choice;
      }

    }
  }
</script>

<style>
    .rock-column {

    }

</style>
