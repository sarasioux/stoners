<template>
    <div class="choice">
        <img :src="'https://drive.google.com/uc?export=view&id=' + id" />
    </div>
</template>

<script>
  export default {
    name: 'Choice',
    data: function() {
      return {
        attributes: [],
        choice: '',
        driveFile: {},
        imageBase64: ''
      }
    },
    props: {
      attribute: String,
      id: String
    },
    mounted: function() {
      this.getFile();
    },
    methods: {
      getFile: async function() {
        let driveFile = await window.gapi.client.drive.files.get({
          fileId: this.id,
          alt: 'media'
        });
        this.driveFile = driveFile;
        console.log('drive file', this.driveFile);

      },
      filePipe: function(stuff) {
        console.log('stuff', stuff);
      },
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
    .choice {
        position: fixed;
        top: 8%;
        left: 50%;
    }
</style>
