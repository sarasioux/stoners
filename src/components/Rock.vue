<template>
    <div class="card">
        <div class="card-image">
            <figure class="image is-square">
                <img :src="'https://drive.google.com/uc?export=view&id=' + id" />
            </figure>
        </div>
        <div class="card-content">
            <div class="media">
                <div class="media-content">
                    <p class="title is-4">{{rockName}}</p>
                    <p class="subtitle is-7">{{hash}}</p>
                </div>
            </div>

            <div class="content">
                <p>{{description}}</p>
                <div class="columns is-multiline">
                    <div class="column is-6 has-text-centered" v-for="att in attributes" :key="att">
                        <h1 class="title is-6">{{att.value}}</h1>
                        <h2 class="subtitle is-7">{{att.trait_type}}</h2>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
  export default {
    name: 'Rock',
    data: function() {
      return {
        hash: '',
        jsonId: '',
        rockName: '',
        description: '',
        external_url: '',
        attributes: []
      }
    },
    props: {
      name: String,
      id: String
    },
    mounted: function() {
      let parts = this.name.split('.');
      this.hash = parts[0];
      this.listFiles();
    },
    methods: {
      listFiles: function() {
        let self = this;
        window.gapi.client.drive.files.list({
          'q': "'1DyqPzP_60zRaQwW6w1Qu6ACo2JxPEP_Q' in parents and name = '" + this.hash + ".json'",
          'pageSize': 100,
          'fields': "nextPageToken, files(id, name)",
          'orderBy': "name"
        }).then(function(response) {
          const files = response.result.files;
          if (files && files.length > 0) {
            self.jsonId = files[0].id;
            self.loadJson();
          } else {
            console.log('No files found.');
          }
        });
      },
      loadJson: async function() {
        let driveFile = await window.gapi.client.drive.files.get({
          fileId: this.jsonId,
          alt: 'media'
        });
        const json = JSON.parse(driveFile.body);
        this.rockName = json.name;
        this.description = json.description;
        this.external_url = json.external_url;
        this.attributes = json.attributes;
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
