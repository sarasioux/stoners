<template>
    <div class="section admin" v-if="isAdmin()">
        <div class="columns">
            <div class="column">
                <article v-if="msg" class="message is-warning is-small pull-right">
                    <div class="message-body">
                        {{msg}}
                    </div>
                </article>
                <h1 class="title">Admin</h1>
                <div class="tabs">
                    <ul>
                        <li :class="{'is-active':(activeTab==='mint')}" v-if="isOwner()"><a @click="setActive('mint')">Mint</a></li>
                        <li :class="{'is-active':(activeTab==='withdraw')}"><a @click="setActive('withdraw')">Withdraw</a></li>
                        <li :class="{'is-active':(activeTab==='settings')}" v-if="isOwner()"><a @click="setActive('settings')">Settings</a></li>
                    </ul>
                </div>
                <div class="box">

                    <div class="mint" v-if="activeTab==='mint'">
                        <div class="columns">
                            <div class="column is-2">
                                <label class="label">Mint to Self</label>
                            </div>
                            <div class="column is-2">
                                <div class="field">
                                    <p class="control">
                                        <input v-model="mintReservedAmount" class="input amount-input" type="text" placeholder="20" >
                                    </p>
                                    <p class="help">Remaining: {{420 - currentReserveId}}</p>
                                </div>
                            </div>
                            <div class="column">
                                <button class="button is-primary" @click="mintReserved">Mint</button>
                            </div>
                        </div>

                        <div class="columns">
                            <div class="column is-2">
                                <label class="label">Mint Gift</label>
                            </div>
                            <div class="column is-2">
                                <div class="field">
                                    <p class="control">
                                        <input v-model="mintReservedAmount" class="input amount-input" type="text" placeholder="1" >
                                    </p>
                                    <p class="help">Remaining: {{420 - currentReserveId}}</p>
                                </div>
                            </div>
                            <div class="column is-6">
                                <div class="field">
                                    <p class="control is-expanded">
                                        <input v-model="mintReservedReceiver" class="input" type="text" placeholder="0x00796e910bd0228ddf4cd79e3f353871a61c351c">
                                    </p>
                                </div>
                            </div>
                            <div class="column">
                                <button class="button is-primary" @click="mintReserved">Mint</button>
                            </div>
                        </div>
                    </div>

                    <div class="withdraw" v-if="activeTab==='withdraw'">
                        <div class="columns" v-if="isOwner()">
                            <div class="column is-3">
                                <label class="label">Withdraw Sales</label>
                            </div>
                            <div class="column is-3">
                                <div class="field">
                                    <p class="control">
                                        <button class="button is-warning is-fullwidth" @click="withdraw">Withdraw Sales</button>
                                    </p>

                                </div>
                            </div>
                            <div class="column is-6">
                                <p class="help">Balance: {{currentBalance}}</p>
                            </div>
                        </div>
                        <div class="columns">
                            <div class="column is-3">
                                <label class="label">Withdraw Royalties</label>
                            </div>
                            <div class="column is-3">
                                <div class="field">
                                    <p class="control">
                                        <button class="button is-warning is-fullwidth" @click="withdrawRoyalties">Withdraw Royalties</button>
                                    </p>

                                </div>
                            </div>
                            <div class="column is-6">
                                <p class="help">Total Balance: {{currentRoyalties}}<br />Personal Balance: {{personalRoyalties}}<br />Split Balance: {{splitBalance}}</p>
                            </div>
                        </div>
                    </div>

                    <div class="settings" v-if="activeTab==='settings'">
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
    </div>
</template>

<script>
  import StonersSplit from '../../public/contracts/StonersSplit.json'
  import TruffleContract from '@truffle/contract'

  export default {
    name: 'Admin',
    data: function() {
      return {
        activeTab: 'mint',
        startingBlock: 120250457,
        baseUri: '',
        currentBaseUri: '',
        provenanceHash: '',
        mintReservedAmount: '',
        mintReservedReceiver: '',
        currentRockId: 0,
        currentReserveId: 0,
        currentBalance: 0,
        splitBalance: 0,
        currentRoyalties: 0,
        personalRoyalties: 0,
        splitContract: '',
        splitInstance: {},
        msg: ''
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
      if(!this.isOwner()) {
        this.activeTab = 'withdraw';
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
          this.splitInstance = instance;
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
        const response = await this.contract.withdraw({from: this.account});
        console.log('response', response);
        this.loadVariables();
      },
      withdrawRoyalties: async function() {
        const response = await this.splitInstance.release(this.account, {from: this.account});
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
        this.msg = 'Mint Successful!';
        setTimeout(this.clearMsg, 5000);
        this.loadVariables();
      },
      mintGift: async function() {
        const response = await this.contract.reserveRocks(this.mintReservedAmount, this.mintReservedReceiver);
        console.log('response', response);
        this.msg = 'Mint Successful!';
        setTimeout(this.clearMsg, 5000);
        this.loadVariables();
      },
      setActive: function(tab) {
        this.activeTab = tab;
      },
      clearMsg: function() {
        this.msg = '';
      },
      isOwner: function() {
        return (
          String(this.account).toLowerCase() === '0x314439ab9e319440500376224211aa898215b889'.toLowerCase()  // Owner
        );
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
