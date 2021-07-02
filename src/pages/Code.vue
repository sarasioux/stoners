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
            <h1 class="title is-hand is-1">About The Code</h1>
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
            <a class="is-hidden button pull-right is-primary is-outlined" href="https://github.com/sarasioux/stoners" target="_blank">
                <span class="icon">
                    <i class="fab fa-github"></i>
                </span>
                <span>dApp on Github</span>
            </a>
            <h2 class="title is-hand is-1">
                Getting Started
            </h2>
            <p>We started with a set of assets stored on Google Drive, with each attribute stored in its own subfolder.  Every asset was
                pre-sized to fit exactly when stacked on top of eachother in a square frame.  Then we built a dApp to connect
                Google and start our Web3 experience.  The dApp allowed us to test the random generation to see what our
                Rocks would look like, so we could make any changes to the artwork before generating in bulk.</p>
            <br />
            <p>I didn't exactly build ours to be public-facing, but you can imagine it looks a lot like the cool one over at
                <a href="https://nouns.wtf" target="_blank">nouns.wtf</a>.</p>
        </div>

        <div class="section">
            <a class="is-hidden button pull-right is-primary is-outlined" href="https://github.com/sarasioux/stoners-contracts" target="_blank">
                <span class="icon">
                    <i class="fab fa-github"></i>
                </span>
                <span>Contracts on Github</span>
            </a>
            <h2 class="title is-hand is-1">The Contracts</h2>
            <p>More details about the contracts coming soon.  We're still under development!</p>
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
