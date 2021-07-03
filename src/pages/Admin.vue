<template>
    <div class="section admin" v-if="isAdmin()">
        <div class="columns">
            <div class="column">
                <div class="box">
                    <h1 class="title">Admin</h1>

                    <div class="field is-horizontal">
                        <div class="field-label is-normal">
                            <label class="label">Starting Block</label>
                        </div>
                        <div class="field-body">
                            <div class="field">
                                <p class="control is-expanded">
                                    <input v-model="startingBlock" class="input" type="text" placeholder="120250457">
                                </p>
                                <p class="help">{{startingBlock}}</p>
                            </div>
                            <div class="field">
                                <p class="control is-expanded">
                                    <button class="button is-warning is-fullwidth" @click="updateStartingBlock">Update</button>
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
                                    <input v-model="baseUri" class="input" type="text" placeholder="http://localhost:8080/rocks/">
                                </p>
                                <p class="help">{{baseUri}}</p>
                            </div>
                            <div class="field">
                                <p class="control is-expanded">
                                    <button class="button is-warning is-fullwidth" @click="updateBaseUri">Update</button>
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
                                    <input v-model="provenanceHash" class="input" type="text" placeholder="aqpow8iuer098wue0r98u">
                                </p>
                                <p class="help">{{provenanceHash}}</p>
                            </div>
                            <div class="field">
                                <p class="control is-expanded">
                                    <button class="button is-warning is-fullwidth" @click="updateProvenanceHash">Update</button>
                                </p>
                            </div>
                        </div>
                    </div>

                    <hr />

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

                    <hr />


                    <div class="field is-horizontal">
                        <div class="field-label is-normal">
                            <label class="label">Mint Reserved</label>
                        </div>
                        <div class="field-body">
                            <div class="field">
                                <p class="control is-expanded">
                                    <input v-model="mintReservedAmount" class="input" type="text" placeholder="20">
                                </p>
                                <p class="help">{{currentReserveId}} / {{currentRockId}} / {{ownerOf}}</p>
                            </div>
                            <div class="field">
                                <p class="control is-expanded">
                                    <button class="button is-primary is-fullwidth" @click="mintReserved">Mint</button>
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
        mintReservedAmount: '',
        currentRockId: 0,
        currentReserveId: 0,
        ownerOf: 0,

      }
    },
    props: {
      account: String,
      isAdmin: Function,
      contract: Object
    },
    watch: {
      contract: function() {
        this.loadVariables();
      },
    },
    components: {
    },
    mounted: async function() {
      if(this.contract) {
        this.loadVariables();
      }
    },
    methods: {
      loadVariables: async function() {
        if(this.contract.address) {
          this.startingBlock = parseInt(await this.contract.saleStartBlock({from: this.account}));
          this.baseUri = await this.contract.baseUri({from: this.account});
          this.provenanceHash = await this.contract.PROVENANCE({from: this.account});
          this.currentRockId = parseInt(await this.contract.getCurrentRockId.call({from: this.account}));
          this.currentReserveId = parseInt(await this.contract.getCurrentReserveId.call({from: this.account}));
        }
      },
      updateStartingBlock: async function() {
        const response = await this.contract.setSaleStartBlock(this.startingBlock);
        console.log('response', response);
      },
      updateBaseUri: async function() {
        const response = await this.contract.setBaseUri(this.baseUri);
        console.log('response', response);
      },
      updateProvenanceHash: async function() {
        const response = await this.contract.setProvenanceHash(this.provenanceHash);
        console.log('response', response);
      },
      mintReserved: async function() {
        const response = await this.contract.reserveRocks(this.mintReservedAmount);
        console.log('response', response);
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
