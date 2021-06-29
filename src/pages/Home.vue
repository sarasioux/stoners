<template>
    <div class="home">
        <div class="section">
            <div class="columns">
                <div class="column is-8">
                    <figure class="is-4by3">
                        <img src="https://bulma.io/images/placeholders/1280x960.png" />
                    </figure>
                </div>
                <div class="column is-narrow"></div>
                <div class="column">
                    <h1 class="title">Welcome to Stoners Rock.</h1>
                    <p>The Rocks are a collection of 10,420 unique NFTs minted on the Ethereum
                        blockchain. Rocks grant you access to our exclusive <router-link to="/sanctuary">Stoner Sanctuary</router-link>, and more
                        exciting updates on our rockmap.</p>
                    <br /><br />
                    <div class="columns is-multiline is-mobile">
                        <div class="column is-6">
                            <figure class="is-square">
                                <img src="../assets/rocks/rock4.png" class="rock-img">
                            </figure>
                        </div>
                        <div class="column is-6">
                            <figure class="is-square">
                                <img src="../assets/rocks/rock3.png" class="rock-img">
                            </figure>
                        </div>
                        <div class="column is-6">
                            <figure class="is-square">
                                <img src="../assets/rocks/rock2.png" class="rock-img">
                            </figure>
                        </div>
                        <div class="column is-6">
                            <figure class="is-square">
                                <img src="../assets/rocks/rock1.png" class="rock-img">
                            </figure>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="section">
            <h2 class="title">Rockenomics</h2>

            <div class="columns has-text-centered">
                <div class="column">
                    <h1 class="title has-text-primary">10,420</h1>
                    <h2 class="subtitle">Total Rocks Ever</h2>
                </div>
                <div class="column">
                    <h1 class="title has-text-primary">420</h1>
                    <h2 class="subtitle">Rocks For Giveaways</h2>
                </div>
                <div class="column">
                    <h1 class="title has-text-primary">.05</h1>
                    <h2 class="subtitle">Price Per Rock</h2>
                </div>
                <div class="column">
                    <h1 class="title has-text-primary">20</h1>
                    <h2 class="subtitle">Limit Per Purchase</h2>
                </div>
                <div class="column">
                    <h1 class="title has-text-primary">100</h1>
                    <h2 class="subtitle">Custom Rocks</h2>
                </div>
            </div>

            <p>We held back the first 420 rocks for giveaways and prizes, the rest are up for grabs to our stoner
                brethren.  The rocks reveal almost immediately after minting, pending some randomization certification
                from our buddies over at <a href="https://chain.link" target="_blank">Chainlink</a>.  Learn more about our implementation and integrations
                over in <router-link to="/code">The Code</router-link> section.
                A maximum of 100 minted rocks will bear a unique watermark entitling the owner to a custom hand-drawn
                background of their choosing.  Learn more about our artist in <router-link to="/art">The Art</router-link> section.</p>
        </div>
        <div class="section">
            <h2 class="title">About the Rocks</h2>
            <div class="columns is-mobile">
                <div class="column is-4">
                    <figure class="image">
                        <img src="../assets/rocks/rock1.png" class="rock-img">
                    </figure>
                </div>
                <div class="column is-narrow"></div>
                <div class="column">
                    <h3 class="title is-4">Meet Orange Crush</h3>
                    <p>The Rocks are a unique set of 10,420 avatars generated from over 1.3 million possible combinations
                        of attributes including facial features, accessories, and unique themed names.</p>
                    <br />
                    <p>The names are randomly generated from a set of common strains.  Maybe you'll get lucky and pick up a real one like "Grand Daddy Purple",
                        or maybe you'll get one like "Girl Scout Widow".  Either way they sound delicious.</p>
                    <br />
                    <p>Each rock is stored as an ERC-721 NFT token on the Ethereum blockchain, and hosted on IPFS.  They
                        were pre-generated and screened for awesomeness, and then randomly assigned to the minters during purchase.</p>
                    <br />
                    <p>Up to 100 Rocks contain a special signature feature, entitling the Rock holder to a customized avatar
                        background hand drawn by our artist.  Rock holders can redeem their custom backgrounds on our website,
                        when signed in to their wallet.  When a background is complete your NFT will automatically be updated.</p>
                </div>
            </div>
        </div>

        <div class="section">
            <h2 class="title">Rockmap Milestones</h2>
            <p>We still have day jobs, but if we can fund this project with some sales we'll start work on further fostering our awesome community of Stoners.  Think of this NFT as a networking opportunity and an investment in your future.  When else do you have a chance to connect with people who love crypto and weed?</p>
            <br />
            <div class="columns">
                <div class="column">
                    <table class="table is-striped">
                        <thead>
                        <tr>
                            <th>Percent Sold</th>
                            <th>Milestone</th>
                        </tr>
                        </thead>
                        <tbody>
                        <tr>
                            <td><strong class="has-text-primary">10%</strong></td>
                            <td>Get Shaun to smoke again (it's been a long, long time.)</td>
                        </tr>
                        <tr>
                            <td><strong class="has-text-primary">20%</strong></td>
                            <td>Announce our Easter Eggs.</td>
                        </tr>
                        <tr>
                            <td><strong class="has-text-primary">30%</strong></td>
                            <td>Get Mark a moonlit house.</td>
                        </tr>
                        <tr>
                            <td><strong class="has-text-primary">50%</strong></td>
                            <td>Get Sara an ape (she really wants one) and give one away to our community.</td>
                        </tr>
                        <tr>
                            <td><strong class="has-text-primary">70%</strong></td>
                            <td>Stoner Sanctuary location announced.</td>
                        </tr>
                        <tr>
                            <td><strong class="has-text-primary">90%</strong></td>
                            <td>Giveaways begin!</td>
                        </tr>
                        <tr>
                            <td><strong class="has-text-primary">100%</strong></td>
                            <td>To thank our community for reaching our goal all minters receive a hand-drawn thank you card.</td>
                        </tr>
                        </tbody>
                    </table>
                </div>
                <div class="column is-4">
                    <figure class="image">
                        <img src="../assets/rocks/rock2.png" class="rock-img">
                    </figure>
                </div>
            </div>
        </div>

        <div class="section">
            <h2 class="title">Rockers</h2>
            <p>A ragtag group of misfits, reunited for one glorious quest into the exciting underbelly of the NFT world.</p>
            <br />
            <div class="columns">
                <div class="column is-3 is-offset-1">
                    <div class="card">
                        <div class="card-image">
                            <figure class="image is-square">
                                <img src="https://bulma.io/images/placeholders/256x256.png" alt="Placeholder image">
                            </figure>
                        </div>
                        <div class="card-content">
                            <div class="media">
                                <div class="media-content">
                                    <p class="title is-4">Shaun B</p>
                                    <p class="subtitle is-6">The Hustler</p>
                                </div>
                            </div>

                            <div class="content">
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                            </div>
                        </div>
                        <footer class="card-footer">
                            <a href="https://linedetail.com" target="_blank" class="card-footer-item">linedetail.com</a>
                            <a href="https://twitter.com/linedetail" target="_blank" class="card-footer-item">@linedetail</a>
                        </footer>
                    </div>
                </div>
                <div class="column is-narrow"></div>
                <div class="column is-3">
                    <div class="card">
                        <div class="card-image">
                            <figure class="image is-square">
                                <img src="https://bulma.io/images/placeholders/256x256.png" alt="Placeholder image">
                            </figure>
                        </div>
                        <div class="card-content">
                            <div class="media">
                                <div class="media-content">
                                    <p class="title is-4">Mark LC</p>
                                    <p class="subtitle is-6">The Artist</p>
                                </div>
                            </div>

                            <div class="content">
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                            </div>
                        </div>
                        <footer class="card-footer">
                            <a href="https://linedetail.com" target="_blank" class="card-footer-item">linedetail.com</a>
                            <a href="https://twitter.com/linedetail" target="_blank" class="card-footer-item">@linedetail</a>
                        </footer>
                    </div>
                </div>
                <div class="column is-narrow"></div>
                <div class="column is-3">
                    <div class="card">
                        <div class="card-image">
                            <figure class="image is-square">
                                <img src="../assets/plaguedoctor.png" alt="Placeholder image">
                            </figure>
                        </div>
                        <div class="card-content">
                            <div class="media">
                                <div class="media-content">
                                    <p class="title is-4">Sara Sioux</p>
                                    <p class="subtitle is-6">The Coder</p>
                                </div>
                            </div>

                            <div class="content">
                                I play VR and vape a lot.  I also code smart contracts for fun.
                            </div>
                        </div>
                        <footer class="card-footer">
                            <a href="https://melodramatic.com" target="_blank" class="card-footer-item">melodramatic.com</a>
                            <a href="https://twitter.com/sarasioux" target="_blank" class="card-footer-item">@sarasioux</a>
                        </footer>
                    </div>
                </div>
            </div>
        </div>

        <div class="section">
            <br />
            <hr />
            <br />
            <div class="columns">
                <div class="column">
                    Sign up for our mailing list!
                </div>
                <div class="column has-text-centered">
                    Put a logo here
                </div>
                <div class="column has-text-right">
                    And some social links
                </div>
            </div>
        </div>
    </div>
</template>

<script>

  export default {
    name: 'Home',
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
    .rock-img {
        border-radius: 20px;
    }
</style>
