<template>
    <div class="section admin" v-if="isAdmin()">
        <div class="columns">
            <div class="column">
                <div class="box">
                    <h1 class="title">Admin</h1>

                    <div class="field is-horizontal">
                        <div class="field-label is-normal">
                            <label class="label">Mint Reserved</label>
                        </div>
                        <div class="field-body">
                            <div class="field">
                                <p class="control is-expanded">
                                    <input v-model="mintReservedAmount" class="input" type="text" placeholder="20">
                                </p>
                                <p class="help">Remaining: {{420 - currentReserveId}}</p>
                            </div>
                            <div class="field">
                                <p class="control is-expanded">
                                    <button class="button is-primary is-fullwidth" @click="mintReserved">Mint</button>
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
                                    <input v-model="withdrawAmount" class="input" type="number" placeholder="1">
                                </p>
                                <p class="help">Balance: {{currentBalance}}</p>
                            </div>
                            <div class="field">
                                <p class="control control-eth">ETH</p>
                            </div>
                            <div class="field">
                                <p class="control is-expanded">
                                    <button class="button is-warning is-fullwidth" @click="withdraw">Withdraw</button>
                                </p>
                            </div>
                        </div>
                    </div>
                    <div class="field is-horizontal">
                        <div class="field-label is-normal">
                            <label class="label">Withdraw Royalties</label>
                        </div>
                        <div class="field-body">
                            <div class="field">
                                <p class="control is-expanded">
                                    <button class="button is-warning" @click="transferRoyalties">Transfer Community</button>
                                </p>
                                <p class="help">Balance: {{currentRoyalties}}</p>
                            </div>
                            <div class="field">
                                <p class="control is-expanded">
                                    <button class="button is-warning" @click="transferRoyalties">Withdraw Personal</button>
                                </p>
                                <p class="help">Balance: {{personalRoyalties}}</p>
                            </div>
                            <div class="field">
                                <p class="control">
                                    <span class="help">Current split contract balance:<br /> <strong>{{splitBalance}}</strong>.</span>
                                </p>
                            </div>
                        </div>
                    </div>

                    <hr />

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
                                <p class="help">{{currentBaseUri}}</p>
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

                    <br />
                    <p class="has-text-centered">StonersRock Contract:  <strong>{{contract.address}}</strong></p>
                    <p class="has-text-centered">StonersSplit Contract:  <strong>{{splitContract}}</strong></p>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
  import StonersSplit from '../../public/contracts/StonersSplit.json'
  import TruffleContract from '@truffle/contract'

  export default {
    name: 'Admin',
    data: function() {
      return {
        startingBlock: 120250457,
        baseUri: '',
        currentBaseUri: '',
        provenanceHash: '',
        withdrawAmount: '',
        mintReservedAmount: '',
        currentRockId: 0,
        currentReserveId: 0,
        currentBalance: 0,
        splitBalance: 0,
        currentRoyalties: 0,
        personalRoyalties: 0,
        splitContract: '',
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
          this.currentBaseUri = await this.contract.baseUri({from: this.account});
          this.currentRockId = parseInt(await this.contract.getCurrentRockId.call({from: this.account}));
          this.currentReserveId = parseInt(await this.contract.getCurrentReserveId.call({from: this.account}));
          this.currentBalance = await this.$web3.eth.getBalance(this.contract.address) / 1e18;

          let contract = TruffleContract(StonersSplit);
          contract.setProvider(this.$web3.currentProvider);
          contract.defaults({
            from: this.account
          });
          const instance = await contract.deployed();
          this.splitContract = instance.address;
          this.splitBalance = await this.$web3.eth.getBalance(this.splitContract) / 1e18;
          this.currentRoyalties = parseInt(await instance.getOwed(this.contract.address)) / 1e18;
          this.personalRoyalties = parseInt(await instance.getOwed(this.account)) / 1e18;

          const royaltyData = {};
          royaltyData.totalReceived = this.splitBalance;
          royaltyData.totalReleased = parseInt(await instance.totalReleased());
          royaltyData.totalShares = parseInt(await instance.totalShares());
          royaltyData.shares = parseInt(await instance.shares(this.contract.address));
          royaltyData.released = parseInt(await instance.released(this.contract.address));
          royaltyData.payee0 = await instance.payee(0);
          royaltyData.payee1 = await instance.payee(1);
          royaltyData.payee2 = await instance.payee(2);
          royaltyData.payee3 = await instance.payee(3);
        }
      },
      withdraw: async function() {
        const withdrawAmount = this.withdrawAmount * 1e18;
        console.log('withdrawing', withdrawAmount);
        const response = await this.contract.withdraw(withdrawAmount.toString(), {from: this.account});
        console.log('response', response);
        this.loadVariables();
      },
      transferRoyalties: async function() {
        const response = await this.contract.withdrawRoyalties({from: this.account});
        console.log('response', response);
      },
      updateStartingBlock: async function() {
        const response = await this.contract.setSaleStartBlock(this.startingBlock);
        console.log('response', response);
        this.loadVariables();
      },
      updateBaseUri: async function() {
        const response = await this.contract.setBaseUri(this.baseUri);
        console.log('response', response);
        this.loadVariables();
      },
      updateProvenanceHash: async function() {
        const response = await this.contract.setProvenanceHash(this.provenanceHash);
        console.log('response', response);
        this.loadVariables();
      },
      mintReserved: async function() {
        const response = await this.contract.reserveRocks(this.mintReservedAmount);
        console.log('response', response);
        this.loadVariables();
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
