<template>
    <div class="home">
        <div class="section is-small small-top">
            <div class="has-text-centered">
                <figure class="logo is-hidden-widescreen-only">
                    <img src="../assets/logo.png" />
                </figure>
                <h1 class="is-hidden">Stoners Rock NFT</h1>
                <figure class="smaller-logo is-hidden-fullhd is-hidden-desktop-only is-hidden-tablet-only is-hidden-mobile">
                    <img src="../assets/logo.png" />
                </figure>
            </div>
            <figure class="is-4by3 base-transition">
                <img src="../assets/couch.jpg" class="rock-img" />
            </figure>
            <br />
            <div class="columns">
                <div class="column">
                    <p>The Rocks are a collection of 10,420 unique NFTs minted on the Ethereum
                        blockchain. Rocks grant you access to our exclusive Stoner Sanctuary, and more
                        exciting updates on our rockmap.</p>
                </div>
                <div class="column is-narrow"></div>
                <div class="column is-8">
                    <div class="columns is-multiline is-mobile">
                        <div class="column is-3-desktop is-6-mobile">
                            <figure class="is-square">
                                <img src="../assets/rocks/rainbow.png" class="rock-img">
                            </figure>
                        </div>
                        <div class="column is-3-desktop is-6-mobile">
                            <figure class="is-square">
                                <img src="../assets/rocks/girl.png" class="rock-img">
                            </figure>
                        </div>
                        <div class="column is-3-desktop is-6-mobile">
                            <figure class="is-square">
                                <img src="../assets/rocks/stoner.png" class="rock-img">
                            </figure>
                        </div>
                        <div class="column is-3-desktop is-6-mobile">
                            <figure class="is-square">
                                <img src="../assets/rocks/tophat.png" class="rock-img">
                            </figure>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <article class="message is-warning" v-if="isAdmin()">
            <div class="message-header">
                <p>Attention!  Are you already a Rock Holder?</p>
            </div>
            <div class="message-body">
                Head on over to our new <router-link to="/claim">Claim Page</router-link> to claim your free WEED for being a hodler!  Weed can be used for new NFT drops, exclusive merchandise, and more benefits coming soon.  <a href="https://discord.gg/gjVrcc7FZU" target="_blank">Join our Discord</a> for more information and help getting started.
            </div>
        </article>
        <div class="section">
            <h2 class="title is-hand is-1 is-size-2-mobile">Rockenomics</h2>
            <div class="">
                <div class="columns is-multiline has-text-centered">
                    <div class="column">
                        <h1 class="title has-text-warning is-4">10,420</h1>
                        <h2 class="subtitle is-6">Total Rocks Ever</h2>
                    </div>
                    <div class="column">
                        <h1 class="title has-text-warning is-4">420</h1>
                        <h2 class="subtitle is-6">Reserved Rocks</h2>
                    </div>
                    <div class="column">
                        <h1 class="title has-text-warning is-4">.042069</h1>
                        <h2 class="subtitle is-6">Price Per Rock</h2>
                    </div>
                    <div class="column">
                        <h1 class="title has-text-warning is-4">20</h1>
                        <h2 class="subtitle is-6">Purchase Limit</h2>
                    </div>
                    <div class="column">
                        <h1 class="title has-text-warning is-4">4.2069%</h1>
                        <h2 class="subtitle is-6">Royalties</h2>
                    </div>
                </div>
                <br />
                <p>We held back the first <strong>420 rocks for the team, giveaways, and future fundraisers</strong>, the rest are up for grabs to our stoner
                    brethren.  The rocks <strong>reveal immediately</strong> after minting, because we believe in instant gratification.
                </p>
                <br />
                <p>To fund the continued growth of our community, a 4.2069% fee is taken from all secondary sales.  Of this fee, 1% goes to the creators to help us get
                    closer to quitting our jobs and working crypto full time, the other <strong>3.2069% goes into a community fund</strong> to be spent on
                    initiatives that the Stoners decide.  We're thinking free merch, cash giveaways, and building out a piece of the metaverse for our stoners to enjoy.  (Shout out to the awesome
                    <a href="https://bullsontheblock.com/" target="_new">BOTB</a> creators for innovating community funds!)</p>
                <br />
            </div>


        </div>
        <div class="section">
            <h2 class="title is-hand is-1">Mechanics</h2>
            <div class="">
                <div class="columns is-multiline has-text-centered">
                    <div class="column">
                        <h1 class="title has-text-primary is-4">Instantly</h1>
                        <h2 class="subtitle is-6">Revealed</h2>
                    </div>
                    <div class="column">
                        <h1 class="title has-text-primary is-4">On-Chain</h1>
                        <h2 class="subtitle is-6">Storage</h2>
                    </div>
                    <div class="column">
                        <h1 class="title has-text-primary is-4">IPFS</h1>
                        <h2 class="subtitle is-6">Metadata & Images</h2>
                    </div>
                    <div class="column">
                        <h1 class="title has-text-primary is-4">Locked</h1>
                        <h2 class="subtitle is-6">Token URIs</h2>
                    </div>
                </div>
                <br />
                <p>Our token mechanics were inspired by the recently launched <a href="https://www.forgottenrunes.com/wtf" target="_blank">FRWC</a>
                    who demonstrated the techniques for storing NFT data on-chain.  Most of the recent NFT projects store their images on IPFS, but keep
                    the metadata hosted <strong>on their own API</strong>.</p>
                <br />
                <p>This means that if the API ever goes down, <strong>the original NFT is lost forever</strong>.  We believe the beauty of the blockchain universe is in
                    its permanence, decentralization, and non-fungibility.  With that in mind, our NFTs have been hardened
                    and <strong>stored on-chain, backed up to IPFS, with no external API server dependency</strong> once we sell out (to protect un-minted metadata).</p>
                <br />
                <p>We also took a novel approach to our rock reservation strategy.  Instead of pre-minting, we started the token ID count at 421, and left the first 420
                    rocks un-minted.  We have the ability to mint them as-needed for giveaways.  This <strong>eliminates the possibility of holding back the best mints for
                    ourselves</strong>.  Since the reserved rocks are unminted, and the sort order is random, we can't cheat!</p>
            </div>


        </div>
        <div class="section">
            <h2 class="title is-hand is-1">Why Rocks?</h2>
            <div class="columns">
                <div class="column">
                    <div class="is-size-6">
                        <p>We love NFTs and their creative potential, so we tried to find a way to take the most boring
                            pet ever and make it fun.</p>
                        <br />
                        <p>Welcome to Stoners Rock.  A distant cousin of the rocks made famous in the 1970s by someone we don't know and didn't research, and featured in
                            Gordan Korman's classic children's novel <i>No Coins Please</i> about a young hustler who turns
                            $100 into $1 million on a school trip.</p>
                        <br />
                        <p>Each rock is adorable and loveable and comes with a unique name that gives it extra personality.  This community
                            is for rock enthusiasts and stoners, since we love a good pun.  Minting went live at approximately 4:20pm EST on July 13,
                            International Rock Day, and <router-link to="/mint" class="has-text-weight-bold has-text-warning">minting is still available right now</router-link>.</p>
                    </div>
                    <br />
                </div>
                <div class="column is-narrow"></div>
                <div class="column is-4">
                    <figure class="image">
                        <img src="../assets/rocks/rainbow.png" class="rock-img">
                    </figure>
                </div>
            </div>
        </div>
        <div class="section">
            <h2 class="title is-hand is-1">About the Rocks</h2>
            <div class="box">
                <div class="columns">
                    <div class="column is-5-desktop is-4-fullhd">
                        <figure class="image">
                            <img src="../assets/rocks/stoner.png" class="rock-img">
                        </figure>
                    </div>
                    <div class="column is-narrow"></div>
                    <div class="column">
                        <h3 class="title is-3 is-hand has-text-primary">Meet Orange Crush</h3>
                        <p>The Rocks are a unique set of avatars generated from over 2 million possible combinations
                            of attributes including facial features, accessories, and unique themed names.</p>
                        <br />
                        <p>The names are randomly generated from a set of common strains of weed.  Real strains like <i>White Widow</i>,
                            as well as new strains like <i>Girl Scout Widow</i> are all possible.  Either way they sound delicious.</p>
                        <br />
                        <p>Each rock is stored as an ERC-721 NFT token on the Ethereum blockchain. Their images and attributes are stored on-chain,
                            and their JSON and web-available image are hosted on IPFS.  They were randomly generated and randomly assigned to the minters during purchase.</p>
                        <br />
                    </div>
                </div>
            </div>
        </div>

        <div class="section">
            <h2 class="title is-hand is-1">Rockmap Milestones</h2>
            <p>We still have day jobs, but if we can fund this project with some sales we'll start work on further fostering our awesome community of Stoners.
                Think of this NFT as a networking opportunity and an investment in your future.  When else do you have a chance to connect with people who love crypto and weed?</p>
            <br />
            <div class="columns">
                <div class="column">
                    <table class="table is-size-7">
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
                            <td>Announce our hidden Easter Eggs.</td>
                        </tr>
                        <tr>
                            <td><strong class="has-text-primary">30%</strong></td>
                            <td>Stoner Rocks merchandise drops with free giveaways.</td>
                        </tr>
                        <tr>
                            <td><strong class="has-text-primary">40%</strong></td>
                            <td>On-chain storage mechanism released.</td>
                        </tr>
                        <tr>
                            <td><strong class="has-text-primary">50%</strong></td>
                            <td>Stoner Sanctuary location announced.</td>
                        </tr>
                        <tr>
                            <td><strong class="has-text-primary">60%</strong></td>
                            <td>Custom NFTs start to drop.</td>
                        </tr>
                        <tr>
                            <td><strong class="has-text-primary">70%</strong></td>
                            <td>Get some lawyers to figure out commercial rights.</td>
                        </tr>
                        <tr>
                            <td><strong class="has-text-primary">80%</strong></td>
                            <td>First community smoke session.</td>
                        </tr>
                        <tr>
                            <td><strong class="has-text-primary">90%</strong></td>
                            <td>Rock giveaways begin!</td>
                        </tr>
                        <tr>
                            <td><strong class="has-text-primary">100%</strong></td>
                            <td>To thank our community all minters receive a hand-drawn thank you card.</td>
                        </tr>
                        </tbody>
                    </table>
                </div>
                <div class="column is-4">
                    <figure class="image">
                        <img src="../assets/rocks/girl.png" class="rock-img">
                    </figure>
                </div>
            </div>
            <div class="has-text-centered ">
                <a href="https://discord.gg/gjVrcc7FZU" class="title is-5 has-text-link" target="_blank">Join our Discord to influence our Rockmap!</a>
            </div>
        </div>

        <div class="section">
            <h2 class="title is-hand is-1">Rockers</h2>
            <p>A ragtag group of misfits, reunited for one glorious quest into the exciting underbelly of the NFT world.  Buy our rocks so we can keep on doing what we love.</p>
            <br />
            <div class="columns">
                <div class="column is-3 is-offset-1">
                    <div class="card">
                        <div class="card-image">
                            <figure class="image is-square">
                                <img src="../assets/sircrypto.jpg" alt="Sir Crypto Bitcoin Man">
                            </figure>
                        </div>
                        <div class="card-content">
                            <div class="media">
                                <div class="media-content">
                                    <p class="title is-4"><a href="https://twitter.com/sircryptos" target="_blank" class="has-text-primary">@sircryptos</a></p>
                                    <p class="subtitle is-6 has-text-grey">The Producer</p>
                                </div>
                            </div>

                            <div class="content is-size-7">
                                Entrepreneur turned NFT collector trying to bring love to rocks! BAYC, Alien boys, BOTB and HOK owner.
                            </div>
                        </div>
                    </div>
                </div>
                <div class="column is-narrow"></div>
                <div class="column is-3">
                    <div class="card">
                        <div class="card-image">
                            <figure class="image is-square">
                                <img src="../assets/cards.jpg" alt="Placeholder image">
                            </figure>
                        </div>
                        <div class="card-content">
                            <div class="media">
                                <div class="media-content">
                                    <p class="title is-4"><a href="https://twitter.com/linedetail" target="_blank" class="has-text-primary">@linedetail</a></p>
                                    <p class="subtitle is-6 has-text-grey">The Artist</p>
                                </div>
                            </div>

                            <div class="content is-size-7">
                                I'm an artist and animator, and I made a <a href="https://www.kickstarter.com/projects/line/lines-deck-of-elements" target="_blank">badass deck of cards</a>.
                            </div>
                        </div>
                        <footer class="card-footer">
                            <a href="https://linedetail.com" target="_blank" class="card-footer-item">linedetail.com</a>
                        </footer>
                    </div>
                </div>
                <div class="column is-narrow"></div>
                <div class="column is-3">
                    <div class="card">
                        <div class="card-image">
                            <figure class="image is-square">
                                <img src="../assets/wizard.png" alt="Sara Sioux Plague Doctor">
                            </figure>
                        </div>
                        <div class="card-content">
                            <div class="media">
                                <div class="media-content">
                                    <p class="title is-4"><a href="https://twitter.com/altcryp" target="_blank" class="has-text-primary">@altcryp</a></p>
                                    <p class="subtitle is-6 has-text-grey">The Coder</p>
                                </div>
                            </div>

                            <div class="content is-size-7">
                                I play VR and vape a lot.  I also code smart contracts for fun.
                            </div>
                        </div>
                        <footer class="card-footer">
                            <a href="https://melodramatic.com" target="_blank" class="card-footer-item">melodramatic.com</a>

                        </footer>
                    </div>
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
    props: {
      account: String,
      isAdmin: Function,
      contract: Object,
      weedContract: Object,
      network: Number
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
    a.is-ghost:hover {
        text-decoration: none !important;
    }
    figure.logo {
        display: inline-block;
    }
    figure.smaller-logo {
        width: 600px;
        display: inline-block;
    }
    p.is-size-4 {
        line-height: 1.3em;
    }
    .small-top {
        padding-top: 1em;
    }
</style>
