<template>
    <div class="attribute">
        <div class="field is-horizontal">
            <label class="label ">{{attribute}}</label>
            <div class="control">
                <div class="select is-small">
                    <select v-model="choice" @change="optionSelect">
                        <option value="select">Select Attribute</option>
                        <option v-for="att in attributes" :key="att" :value="att.id">{{att.name}}</option>
                    </select>
                </div>
            </div>
        </div>
        <br />
    </div>
</template>

<script>
  export default {
    name: 'Attribute',
    data: function() {
      return {
        attributes: [],
        choice: 'select'
      }
    },
    props: {
      attribute: String,
      id: String,
      reset: Number,
      randomize: Number
    },
    watch: {
      reset: function () {
        this.choice = 'select';
        this.listFiles();
      },
      randomize: function () {
        if(this.attributes.length > 0) {
            let rarities = [];
            for(let i=0; i<this.attributes.length; i++) {
              let parts = this.attributes[i].name.split('.');
              let frequency = parts[1];
              for(let p=0; p<frequency; p++) {
                rarities.push(this.attributes[i].id);
              }
            }
            this.shuffleArray(rarities);
            this.choice = rarities[Math.floor(Math.random()*rarities.length)];
            this.$emit('choice', this.attribute, this.choice);
        }
      },
    },
    mounted: function() {
      this.listFiles();
    },
    methods: {
      listFiles: function() {
        this.attributes = [];
        let self = this;
        window.gapi.client.drive.files.list({
          'q': "'" + this.id + "' in parents and mimeType contains 'image/'",
          'pageSize': 100,
          'fields': "nextPageToken, files(id, name)",
          'orderBy': "name"
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
      optionSelect: function() {
        this.$emit('choice', this.attribute, this.choice);
      },
      shuffleArray: function(array) {
        for (var i = array.length - 1; i > 0; i--) {
          var j = Math.floor(Math.random() * (i + 1));
          var temp = array[i];
          array[i] = array[j];
          array[j] = temp;
        }
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    .label {
        min-width: 200px;
    }
</style>
