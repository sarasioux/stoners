<template>
    <div class="section admin" v-if="isAdmin()">
        <div class="columns">
            <div class="column is-8 is-offset-2">
                <div class="box">
                    <h1 class="title">Admin</h1>

                    <div class="field is-horizontal">
                        <div class="field-label is-normal">
                            <label class="label">Starting Block</label>
                        </div>
                        <div class="field-body">
                            <div class="field">
                                <p class="control is-expanded">
                                    <input class="input" type="text" placeholder="120250457">
                                </p>
                            </div>
                            <div class="field">
                                <p class="control is-expanded">
                                    <button class="button is-warning is-fullwidth">Update</button>
                                </p>
                            </div>
                        </div>
                    </div>
                    <div class="field is-horizontal">
                        <div class="field-label is-normal">
                            <label class="label">Base URI</label>
                        </div>
                        <div class="field-body">
                            <div class="field">
                                <p class="control is-expanded">
                                    <input class="input" type="text" placeholder="http://localhost:8080/rocks/">
                                </p>
                            </div>
                            <div class="field">
                                <p class="control is-expanded">
                                    <button class="button is-warning is-fullwidth">Update</button>
                                </p>
                            </div>
                        </div>
                    </div>
                    <div class="field is-horizontal">
                        <div class="field-label is-normal">
                            <label class="label">Provenance Hash</label>
                        </div>
                        <div class="field-body">
                            <div class="field">
                                <p class="control is-expanded">
                                    <input class="input" type="text" placeholder="aqpow8iuer098wue0r98u">
                                </p>
                            </div>
                            <div class="field">
                                <p class="control is-expanded">
                                    <button class="button is-warning is-fullwidth">Update</button>
                                </p>
                            </div>
                        </div>
                    </div>

                    <div class="field is-horizontal">
                        <div class="field-label is-normal">
                            <label class="label">Withdraw Funds</label>
                        </div>
                        <div class="field-body">
                            <div class="field">
                                <p class="control is-expanded">
                                    <input class="input" type="number" placeholder="1">
                                </p>
                            </div>
                            <div class="field">
                                <p class="control control-eth">ETH</p>
                            </div>
                            <div class="field">
                                <p class="control is-expanded">
                                    <button class="button is-warning is-fullwidth">Withdraw</button>
                                </p>
                            </div>
                        </div>
                    </div>
                    <div class="field is-horizontal">
                        <div class="field-label is-normal">
                            <label class="label">Transfer Royalties</label>
                        </div>
                        <div class="field-body">
                            <div class="field">
                                <p class="control is-expanded">
                                    <button class="button is-warning">Transfer</button>
                                </p>
                            </div>
                        </div>
                    </div>

                    <div class="field is-horizontal">
                        <div class="field-label is-normal">
                            <label class="label">Mint Reserved</label>
                        </div>
                        <div class="field-body">
                            <div class="field">
                                <p class="control is-expanded">
                                    <input class="input" type="text" placeholder="20">
                                </p>
                            </div>
                            <div class="field">
                                <p class="control is-expanded">
                                    <button class="button is-primary is-fullwidth">Mint</button>
                                </p>
                            </div>
                        </div>
                    </div>

                    <div class="field is-horizontal">
                        <div class="field-label is-normal">
                            <label class="label">On-Chain Storage</label>
                        </div>
                        <div class="field-body">
                            <div class="field">
                                <p class="control is-expanded">
                                    <button class="button is-primary is-fullwidth">Upload Images</button>
                                </p>
                            </div>
                            <div class="field">
                                <p class="control is-expanded">
                                    <button class="button is-primary is-fullwidth">Upload Metadata</button>
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>

  export default {
    name: 'Admin',
    data: function() {
      return {
        startingBlock: 120250457,
        baseUri: 'http://localhost:8080/rocks/',
        provenanceHash: '',
        withdrawAmount: 0,

      }
    },
    props: {
      isAdmin: Function,
      contract: Object
    },
    components: {
    },
    mounted: function() {
      console.log('contract', this.contract);
    },
    methods: {
      updateStartingBlock: async function() {
        console.log('contract');
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    label {
        min-width: 200px;
    }
    .control-eth {
        padding-top: 0.5em;
    }
</style>
