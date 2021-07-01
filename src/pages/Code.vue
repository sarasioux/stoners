<template>
    <div class="code">
        <div class="section">
            <br />
            <div class="columns">
                <div class="column is-8 is-offset-2">
                    <nav class="panel">
                        <p class="panel-heading">
                            Contract Hashes
                        </p>
                        <p class="panel-block">
                            <label>Contract Address</label>
                            <strong class="has-text-primary">0x00796e910Bd0228ddF4cd79e3f353871a61C351C</strong>
                        </p>
                        <p class="panel-block">
                            <label>Final Proof Hash</label>
                            <strong class="has-text-primary">5aceca418efce6bbd8ff8428923a95680466914e38a60ba777b6421cbee1c17b</strong>
                        </p>
                    </nav>
                </div>
            </div>
        </div>

        <div class="section">
            <h1 class="title is-hand">About The Code</h1>
            <p>Thanks to <a href="https://boredapeyachtclub.com">BAYC</a> for setting the bar on transparency in NFT hashing and provenance.
                With them in mind and an eye toward creating a more open and transparent crypto community, we'd love to discuss our code.  Each Rock
                image is first hashed using SHA-256. That hash is used for creating the file, as well as the corresponding attributes
                JSON file that sits behind the NFT.  This hashing ensures that no two images can be exactly alike.</p>
            <br />
            <p>We auto-generated 10,420 images, and then ran them all through quality control to ensure they look as good as possible,
                for cartoon pet rocks, you know.  If any Rocks didn't make the cut, we generated new ones until we were back to 10,420.
                We also enforced our limits on watermarking and easter eggs during this step.</p>
            <br />
            <p>Finally, we created a combined hash with each file in order, and saved the hash of the combined result as the final
                certification record on the smart contract.  In this way, anyone who wants to can go back through the immutable steps
                of creation and verify the authenticity of every Rock.</p>
        </div>

        <div class="section">
            <a class="button pull-right is-primary is-outlined" href="https://github.com/sarasioux/stoners" target="_blank">
                        <span class="icon">
                            <i class="fab fa-github"></i>
                        </span>
                <span>Visit dApp on Github</span>
            </a>
            <h2 class="title is-hand">
                Getting Started
            </h2>
            <div class="columns">
                <div class="column is-2">
                    <div class="box">
                        <figure class="image">
                            <img src="../assets/google-screenshot.png" alt="Google Drive Screenshot" />
                        </figure>
                    </div>
                </div>
                <div class="column is-narrow"></div>
                <div class="column">

                    <p>We started with a set of assets stored on Google Drive, with each attribute stored in its own subfolder.  Every asset was
                        pre-sized to fit exactly when stacked on top of eachother in a 600x600 frame.  Then we built a dApp to connect
                        Google and start our Web3 experience.  The dApp allowed us to test the random generation to see what our
                        Rocks would look like, so we could make any changes to the artwork before generating in bulk.</p>
                    <br />
                    <p>The dApp also provided an admin interface to review generated Rocks, and delete any seriously undesirables.  This was
                        extremely rare though, and once we got the art dialed in I don't think it happened at all except for the placement of
                        easter eggs and giveaways.</p>
                    <br />
                    <p>Once all of the images were generated, catalogued, verified, and approved, it was a simple matter of uploading them to IPFS
                        and tracking their CIDs for use in our contract's token URLs.</p>
                    <br />

                </div>

            </div>

        </div>

        <div class="section">
            <h2 class="title is-hand">The Contract</h2>
            <p>More details about the contract coming soon.  We're still under development!</p>
        </div>




    </div>
</template>

<script>

  export default {
    name: 'Code',
    data: function() {
      return {
      }
    },
    components: {
    },
    mounted: function() {
    },
    methods: {
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    .panel label {
        min-width: 180px;
    }
</style>
