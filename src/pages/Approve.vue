<template>
    <div class="approve" v-if="isGoogleAuthed">
        <h1 class="title">Approve</h1>
        <nav class="pagination is-small" role="navigation" aria-label="pagination">
            <a class="pagination-previous">Previous</a>
            <a class="pagination-next">Next page</a>
            <ul class="pagination-list">
                <li><a class="pagination-link" aria-label="Goto page 45">45</a></li>
                <li><a class="pagination-link is-current" aria-label="Page 46" aria-current="page">46</a></li>
                <li><a class="pagination-link" aria-label="Goto page 47">47</a></li>
                <li><span class="pagination-ellipsis">&hellip;</span></li>
            </ul>
        </nav>
        <div class="columns is-multiline">
            <div class="column is-3" v-for="file in files" :key="file">
                <Rock
                    :id="file.id"
                    :name="file.name"
                />
            </div>
        </div>
        {{nextPageToken}}
    </div>
</template>

<script>

  import Rock from "../components/Rock.vue";

  export default {
    name: 'Test',
    data: function() {
      return {
        nextPageToken: null,
        prevPageToken: null,
        currentPageToken: null,
        currentPageNumber: 0,
        files: []
      }
    },
    components: {
        Rock
    },
    props: {
      isGoogleAuthed: Boolean
    },
    mounted: function() {
      this.listFiles();
    },
    methods: {
      listFiles: function() {
        let self = this;
        window.gapi.client.drive.files.list({
          q: "'1DyqPzP_60zRaQwW6w1Qu6ACo2JxPEP_Q' in parents and mimeType='image/png'",
          pageSize: 3,
          fields: "nextPageToken, files(id, name)",
          orderBy: "name",
          pageToken: this.currentPageToken
        }).then(function(response) {
          const files = response.result.files;
          if (files && files.length > 0) {
            self.files = files;
            self.nextPageToken = response.result.nextPageToken;
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
</style>
