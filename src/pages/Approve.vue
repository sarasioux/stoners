<template>
    <div class="approve" v-if="isGoogleAuthed">
        <h1 class="title">Approve</h1>
        <nav class="pagination is-small" role="navigation" aria-label="pagination">
            <a class="pagination-previous" @click="previousPage">Previous</a>
            <a class="pagination-next" @click="nextPage">Next page</a>
            <ul class="pagination-list">
                <li v-for="(page, idx) in pages" :key="page">
                    <a class="pagination-link" :class="{'is-current':(idx === currentPageNumber)}" @click="setCurrentPage(idx)" aria-label="Goto page 1">{{idx + 1}}</a>
                </li>
            </ul>
        </nav>
        <div class="columns is-multiline">
            <div class="column is-3" v-for="file in files" :key="file">
                <ApproveRock
                    :id="file.id"
                    :name="file.name"
                />
            </div>
        </div>
        <nav class="pagination is-small" role="navigation" aria-label="pagination">
            <a class="pagination-previous" @click="previousPage">Previous</a>
            <a class="pagination-next" @click="nextPage">Next page</a>
            <ul class="pagination-list">
                <li v-for="(page, idx) in pages" :key="page">
                    <a class="pagination-link" :class="{'is-current':(idx === currentPageNumber)}" @click="setCurrentPage(idx)" aria-label="Goto page 1">{{idx + 1}}</a>
                </li>
            </ul>
        </nav>
    </div>
</template>

<script>

  import ApproveRock from "../components/ApproveRock.vue";

  export default {
    name: 'Test',
    data: function() {
      return {
        currentPageNumber: 0,
        files: [],
        pages: [null],
      }
    },
    components: {
      ApproveRock
    },
    props: {
      isGoogleAuthed: Boolean
    },
    watch: {
      isGoogleAuthed: function() {
        this.listFiles();
      }
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
          q: "'1DyqPzP_60zRaQwW6w1Qu6ACo2JxPEP_Q' in parents and mimeType='image/png'",
          pageSize: 100,
          fields: "nextPageToken, files(id, name)",
          orderBy: "createdTime desc",
          pageToken: this.pages[this.currentPageNumber]
        }).then(function(response) {
          const files = response.result.files;
          if (files && files.length > 0) {
            self.files = files;
            if(response.result.nextPageToken) {
              self.pages[self.currentPageNumber+1] = response.result.nextPageToken;
            }
          } else {
            console.log('No files found.');
          }
        });
      },
      nextPage: function() {
        if(this.pages[this.currentPageNumber + 1]) {
          this.currentPageNumber++;
          this.listFiles();
        }
      },
      previousPage: function() {
        if(this.currentPageNumber > 0) {
          this.currentPageNumber--;
          this.listFiles();
        }
      },
      setCurrentPage: function(num) {
        this.currentPageNumber = num;
        this.listFiles();
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
