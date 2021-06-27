<template>
  <div class="attribute">
    <h2 class="title is-6">{{attribute}}</h2>
    <div v-for="att in attributes" :key="att">
      <div class="control">
        <label class="radio">
          <input v-model="choice" type="radio" :name="attribute" :value="att.id" @change="radioSelect($event)">
          {{att.name}}
        </label>
      </div>
    </div>
    <hr />
  </div>
</template>

<script>
export default {
  name: 'Attribute',
  data: function() {
    return {
      attributes: [],
      choice: ''
    }
  },
  props: {
    attribute: String,
    id: String
  },
  mounted: function() {
    this.listFiles();
  },
  methods: {
    listFiles: function() {
      let self = this;
      window.gapi.client.drive.files.list({
        'q': "'" + this.id + "' in parents and mimeType contains 'image/'",
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
    radioSelect: function() {
      this.$emit('choice', this.attribute, this.choice);
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
