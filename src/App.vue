<template>
    <div class="container">
        <h1 class="title">Stoners</h1>
        <button v-if="showAuthButton" class="button" @click="handleAuthClick">Authorize Google</button>
        <div class="columns is-mobile">
            <div class="column is-5">
                <div class="box" v-if="attributesLoaded">
                    <div class="field is-grouped">
                        <div class="control is-expanded">
                            <button class="button is-fullwidth" @click="choices = {}; reset = Date.now()">
                                Reset
                            </button>
                        </div>
                        <div class="control is-expanded">
                            <button class="button is-primary is-fullwidth" @click="randomize = Date.now()">
                                Random
                            </button>
                        </div>
                    </div>

                    <br /><br />
                    <div v-for="attribute in choiceOrder" :key="attribute">
                        <Attribute
                                :attribute="attribute"
                                :id="attributes[attribute]"
                                :reset="reset"
                                :randomize="randomize"
                                v-on:choice="choice"
                        />
                    </div>
                </div>
            </div>
            <div class="column rock-column">
                <div class="choices">
                    <div v-for="att in choiceOrder" :key="att">
                        <Choice
                            v-if="choices[att]"
                            :attribute="att"
                            :id="choices[att]"
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
        attributesLoaded: false,
        attributes: {},
        choices: {},
        reset: 0,
        randomize: Date.now(),
        choiceOrder: [
          'Backgrounds', 'HairBehindStoner', 'Arms', 'Rocks', 'HairAccessories', 'Eyes', 'Mouths', 'Nose', 'Signature'
        ]
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
              self.attributes[file.name] = file.id;
            }
            self.attributesLoaded = true;
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
