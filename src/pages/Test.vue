<template>
    <div class="test" v-if="isGoogleAuthed">
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
                            <button class="button is-primary is-fullwidth" @click="processRandom">
                                Random
                            </button>
                        </div>
                    </div>
                    <br /><br />
                    <div v-for="(id, name) in attributes" :key="id">
                        <Attribute
                                :attribute="name"
                                :id="id"
                                :reset="reset"
                                :randomize="randomize"
                                v-on:choice="choice"
                        />
                    </div>
                </div>
            </div>
            <div class="column rock-column">
                <h1 class="title has-text-centered">{{stonerName}}</h1>
                <div class="choices">
                    <div v-for="(id, name) in attributes" :key="id">
                        <Choice
                                v-if="choices[name]"
                                :attribute="name"
                                :id="choices[name]"
                        />
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>

  import Attribute from "../components/Attribute.vue";
  import Choice from "../components/Choice.vue";

  export default {
    name: 'Test',
    data: function() {
      return {
        attributesLoaded: false,
        attributes: {},
        choices: {},
        reset: 0,
        randomize: Date.now(),
        stonerName: '',
        namesPrefix: [
          'OG',
          'Purple',
          'Grand Daddy',
          'Sour',
          'Lemon',
          'Orange',
          'Girl Scout',
          'Wedding',
          'Mr.',
          'Blue',
          'White',
          'Ice Cream',
          'Jack',
          'Green',
          'Northern',
          'Bubba',
          'Cherry',
          'Strawberry',
          'Lava',
          'Super Sour',
          'Super Lemon',
          'Forbidden',
          'Super Silver',
          'Silver',
          'Jet',
          'Maui',
          'Platinum',
          'Fire',
          'Headband',
          'Mango',
          'Alaskan',
          'Blueberry',
          'Pink',
          'Blackberry',
          'God\'s',
          'Pineapple',
          'Super',
          'Cookies and',
          'Peanut Butter',
          'Grease',
          'Grape',
          'Tropicana',
          'Birthday',
          'Ghost Train',
          'Master',
          'Golden',
          'Lilac',
          'Black',
          'Monster',
          'Critical',
          'Alien',
          'Agent',
          'Truffle',
          'Apple',
          'Papaya',
          'Dream',
          'Sugar',
          'Mint',
          'Laughing'

        ],
        namesSuffix: [
          'Kush',
          'Crush',
          'Cake',
          'Cookies',
          'Dream',
          'Widow',
          'Punch',
          'Gelato',
          'Runtz',
          'Sherbert',
          'Express',
          'Herer',
          'Crack',
          'Lights',
          'Pie',
          'Cough',
          'Haze',
          'Fruit',
          'Trainwreck',
          'OG',
          'Cheese',
          'Fuel',
          'Diamond',
          'Wowie',
          'Thunder',
          'Rhino',
          'Muffins',
          'Skunk',
          'Lemonaide',
          'Creamsicle',
          'Tangle',
          'Indica',
          'Sativa',
          'Hybrid',
          'Slurricane',
          'Biscotti',
          'Gushers',
          'Breath',
          'Cream',
          'Jack',
          'Diesel',
          'Skywalker',
          'Orange',
          'Butter',
          'Cheesecake',
          'Queen',
          'Dawg'
        ]
      }
    },
    props: {
      isGoogleAuthed: Boolean
    },
    watch: {
      isGoogleAuthed: function() {
        this.listFiles();
      }
    },
    components: {
      Attribute, Choice
    },
    mounted: function() {
      if(this.isGoogleAuthed) {
        this.listFiles();
      }
    },
    methods: {
      listFiles: function() {
        let self = this;
        window.gapi.client.drive.files.list({
          'q': "'1jhlMWFT1SLsYDbua0lJDFGiI06EggBAg' in parents and mimeType='application/vnd.google-apps.folder'",
          'pageSize': 100,
          'fields': "nextPageToken, files(id, name)",
          'orderBy': "name"
        }).then(function(response) {
          const files = response.result.files;
          if (files && files.length > 0) {
            for (let i = 0; i < files.length; i++) {
              let file = files[i];
              if(file.name !== 'Generated') {
                self.attributes[file.name] = file.id;
              }
            }
            self.attributesLoaded = true;
          } else {
            console.log('No files found.');
          }
        });
      },
      choice: function(attribute, choice) {
        this.choices[attribute] = choice;
      },
      processRandom: function() {
        this.randomize = Date.now()
        this.stonerName = this.namesPrefix[Math.floor(Math.random()*this.namesPrefix.length)] + ' ' + this.namesSuffix[Math.floor(Math.random()*this.namesSuffix.length)];
      },
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    .choice {
        position: fixed;
        top: 15%;
        left: 50%;
    }
</style>
