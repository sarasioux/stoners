<template>
    <div class="container">
        <h1 class="title">Stoners</h1>
        <button v-if="showAuthButton" class="button" @click="handleAuthClick">Authorize Google</button>
        <div class="columns is-mobile">
            <div class="column is-5">
                <div class="box" v-if="attributesLoaded">
                    <div :class="{'hideme':isGenerating}">
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
                        <hr />
                    </div>
                    <div class="field is-horizontal">
                        <div class="field-label is-normal">
                            <label class="label">Generate</label>
                        </div>
                        <div class="field-body">
                            <div class="field">
                                <div class="control">
                                    <input v-model="generateAmount" class="input " type="number" placeholder="100" :disabled="isGenerating">
                                </div>
                            </div>
                            <div class="field">
                                <div class="control">
                                    <button class="button is-primary" @click="generateRocks" :disabled="isGenerating">
                                        Generate
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="column rock-column" v-if="!isGenerating">
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
            <div class="column rock-column" v-if="isGenerating">
                <h1 class="title has-text-centered">Generating {{generateAmount}} Rocks</h1>
            </div>
        </div>
        <div class="columns is-multiline" v-if="isGenerating">
            <div class="column is-3" v-for="img in generated" :key="img">
                {{img}}
                <figure class="is-square">
                    <img :src="img" />
                </figure>
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
        isGenerating: false,
        generateAmount: 10,
        generated: [],
        gapi: {},
        showAuthButton: true,
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
          'G13',
          'Alaskan',
          'Blueberry',
          'Pink',
          'Blackberry',
          'Hindu',
          'God\'s',
          'Pineapple',

        ],
        namesSuffix: [
          'Kush',
          'Urkle',
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
          'Thunderfuck',
          'Rhino',
          'Muffins',
          'Skunk',
          'Lemonaide',
          'Creamsicle',
          'Tangle'
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
      generateRocks: function() {
        this.isGenerating = true;
        for(let i=0; i<this.generateAmount; i++) {
          this.processRandom();
          setTimeout(this.generateRoutine, 5000);
        }
      },
      generateRoutine: async function() {
        let canvas = document.createElement('canvas');
        canvas.width = 600;
        canvas.height = 600;

        // Build an image with our layers
        for(let k in this.attributes) {
          if(this.choices[k]) {
            await this.generateOne(canvas, this.choices[k]);
          }
        }
        console.log('canvas', canvas);
        const dataURL = canvas.toDataURL();
        this.generated.push(dataURL);
      },
      generateOne: function(canvas, id) {
        return new Promise(function(resolve) {
          let newImage = document.createElement('img');
          newImage.src = 'https://drive.google.com/uc?export=view&id=' + id;
          newImage.setAttribute('crossorigin', 'anonymous');
          newImage.onload = function () {
            console.log('writing newimage', newImage);
            canvas.getContext('2d').drawImage(newImage, 0, 0);
            resolve(true);
          }
        });
      }

    }
  }
</script>

<style>
    .hideme {
        display: none;
    }

</style>
