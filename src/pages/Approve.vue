<template>
    <div class="approve">
        <h1 class="title">Approve</h1>
        <div class="columns is-multiline">
            <div class="column is-3" v-for="file in files" :key="file">
                <Rock
                    :id="file.id"
                    :name="file.name"
                />
            </div>
        </div>
    </div>
</template>

<script>

  import Rock from "../components/Rock.vue";

  export default {
    name: 'Test',
    data: function() {
      return {
        files: []
      }
    },
    components: {
        Rock
    },
    mounted: function() {
      this.listFiles();
    },
    methods: {
      listFiles: function() {
        let self = this;
        window.gapi.client.drive.files.list({
          'q': "'1DyqPzP_60zRaQwW6w1Qu6ACo2JxPEP_Q' in parents and mimeType='image/png'",
          'pageSize': 100,
          'fields': "nextPageToken, files(id, name)",
          'orderBy': "name"
        }).then(function(response) {
          const files = response.result.files;
          if (files && files.length > 0) {
            console.log('received files', files);
            self.files = files;
          } else {
            console.log('No files found.');
          }
        });
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
