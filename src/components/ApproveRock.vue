<template>
    <div class="card" :class="{'has-background-grey':deleted}">
        <div class="card-image">
            <figure class="image is-square">
                <img :src="'https://drive.google.com/uc?export=view&id=' + id" />
            </figure>
        </div>
        <div class="card-content">
            <div class="media">
                <div class="media-content">
                    <p class="title is-6">{{rockName}}</p>
                    <p class="code subtitle is-7">{{hash}}</p>
                </div>
            </div>

            <div class="content">
                <div class="columns is-multiline attributes">
                    <div class="column is-4 has-text-centered" v-for="att in attributes" :key="att">
                        <h1 class="title">{{att.value}}</h1>
                        <p class="subtitle">{{att.trait_type}}</p>
                    </div>
                </div>
            </div>
        </div>
        <footer class="card-footer">
            <a v-if="!deleted" class="card-footer-item" @click="deleteRock">Delete</a>
            <h3 v-if="deleted" class="title is-6 card-footer-item has-text-danger">DELETED</h3>
        </footer>
    </div>
</template>

<script>
  export default {
    name: 'ApproveRock',
    data: function() {
      return {
        hash: '',
        jsonId: '',
        rockName: '',
        description: '',
        external_url: '',
        attributes: [],
        deleted: false,
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
          'pageSize': 1,
          'fields': "files(id, name)",
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
      },
      deleteRock: async function() {
        try {
          await window.gapi.client.drive.files.delete({
            fileId: this.id
          });
          await window.gapi.client.drive.files.delete({
            fileId: this.jsonId
          });
        }
        catch (error) {
          const err = JSON.parse(error.body);
          alert(err.error.message);
        }
        this.deleted = true;
      }

    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .code {
      font-family: Courier;
      font-size: 0.6em;
  }
    .attributes .title,
    .attributes .subtitle {
        font-size: 0.55em !important;
    }
</style>
