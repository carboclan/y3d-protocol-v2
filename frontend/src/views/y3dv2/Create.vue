<template>
  <LayoutY3DV2>
    <div class="create">
      <p class="title">Create A y3d Token</p>
      <div class="ui icon message" v-if="deploying">
        <i class="notched circle loading icon"></i>
        <div class="content">
          <div class="header">Please wait in patience</div>
          <p>Deploying your Y3D Token to the blockchain now.</p>
        </div>
      </div>
      <div class="ui positive message" v-if="deployedY3dToken">
        <i class="close icon"></i>
        <div class="header">Your y3dToken is ready.</div>
        <p>Contract Address: {{ deployedY3dToken }}</p>
        <button class="ui primary button" @click="goToY3dContract">Go Y3D Token page</button>
      </div>
      <form class="ui form">
        <div :class="['field', 'create-field',
          { 'validate-faild': !inputValidateStatus.tokenContract }
        ]">
          <label>Underlying Token (Required)</label>
          <input
            type="text"
            placeholder="Enter Token Contract address..."
            v-model="tokenContract"
          />
          <MainButton @click="clickOnSelectToken" class="token-select-button">
            Select
          </MainButton>
        </div>
        <div :class="['field', 'create-field',
          { 'validate-faild': !inputValidateStatus.yTokenContract }
        ]">
          <label>yToken</label>
          <input
            type="text"
            placeholder="Enter yToken Contract address..."
            v-model="yTokenContract"
          />
        </div>
        <div :class="['field', 'create-field',
          { 'validate-faild': !inputValidateStatus.fee }
        ]">
          <label>Fee % (Max 25.5%) (Required)</label>
          <input
            type="number"
            placeholder="Enter fee..."
            step="0.1"
            min="0"
            max="25.5"
            v-model.number="fee"
          />
        </div>
        <!-- <div :class="['field', 'create-field',
          { 'validate-faild': !inputValidateStatus.timelock }
        ]">
          <label>Timelock</label>
          <input type="text" />
        </div> -->
        <div class="swap-button-content">
          <MainButton :disabled="!inputValidateStatus.createButton" :btnLoading="deploying"
            @click="createY3dToken">
            Create
          </MainButton>
        </div>
      </form>
    </div>
    <SelectTokenModal
      :isUToken="true"
      v-model="shownSelectTokenModal" @select-token="selectToken"></SelectTokenModal>
  </LayoutY3DV2>
</template>

<script>
import LayoutY3DV2 from '@/layouts/LayoutY3DV2.vue';
import MainButton from '@/components/MainButton.vue';
import { getProvider, utils } from '@/store/ethers/ethersConnect';
import { y3dFactory } from '@/contract';
import SelectTokenModal from '@/components/SelectTokenModal.vue';

export default {
  name: 'CreateToken',
  mounted() {
    this.getPairs();
    this.tokenContract = this.$route.query.token ? this.$route.query.token : '';
  },
  data: () => ({
    tokenContract: '',
    yTokenContract: '',
    fee: 0,
    deploying: false,
    deployedY3dToken: '',
    shownSelectTokenModal: false,
  }),
  components: {
    LayoutY3DV2,
    MainButton,
    SelectTokenModal,
  },
  computed: {
    inputValidateStatus() {
      return this.createY3dTokenValidator();
    },
  },
  methods: {
    async getPairs() {
      const contract = y3dFactory.connect(getProvider().getSigner());
      const events = await contract.queryFilter('y_3dTokenCreated');
      const allPairs = events.map(({ args }) => args);
      window.console.log(allPairs);

      const uTokenFilter = contract.filters.y_3dTokenCreated(null, '0xCB9543F6A3A1De19B4A2aFE7C30C54290E5e61F4');
      const uTokenEvents = await contract.queryFilter(uTokenFilter);
      const uTokenPairs = uTokenEvents.map(({ args }) => args);
      window.console.log(uTokenPairs);
    },
    async createY3dToken() {
      const checkStatus = this.showCreateY3dTokenErrorMessage();
      if (!checkStatus) return;

      this.deploying = true;
      const contract = y3dFactory.connect(getProvider().getSigner());
      try {
        const response = await contract.create(this.tokenContract);
        // const response = await contract.create(this.tokenContract, this.yTokenContract, this.fee)
        console.log('[Create Page] [createY3dToken] tx response:', response);

        // Wait for 1 confirmation
        const receipt = await response.wait(1);
        console.log('[Create Page] [createY3dToken] tx receipt:', receipt);
        const createY3dTokenEvent = receipt.events[1];
        console.log('[Create Page] [createY3dToken] createY3dTokenEvent:', createY3dTokenEvent);
        const hex64ToAddress = (hex) => `0x${hex.slice(26)}`;
        const y3dToken = hex64ToAddress(createY3dTokenEvent.data);
        this.deploying = false;
        this.deployedY3dToken = y3dToken;
        this.resetFormInfo();
        /* eslint-disable-next-line */
        alert('!');
        console.log('[Create Page] [createY3dToken] y3dToken address:', y3dToken);
        this.$store.dispatch('swap/fetchTokensInfo');
        this.$store.dispatch('swap/fetchPairList');
      } catch (error) {
        const message = `Create error: ${error.message}.`;
        this.$message({
          type: 'error',
          message,
        });
        this.deploying = false;
        console.error('[Create Page] [createY3dToken] error:', message);
      }
    },
    goToY3dContract() {
      console.log('[Create Page] [goToY3dContract] called!');
      this.$router.push({
        name: 'Govern',
        query: { token: this.deployedY3dToken },
      });
    },
    createY3dTokenValidator() {
      const tokenContract = utils.isAddress(this.tokenContract);
      const yTokenContract = this.yTokenContract ? utils.isAddress(this.yTokenContract) : true;
      const fee = typeof this.fee === 'number' && !(Number(this.fee) < 0 || Number(this.fee) > 25.5);
      const createButton = tokenContract && fee;
      const status = {
        tokenContract,
        yTokenContract,
        fee,
        timelock: true,
        createButton,
      };
      console.log('[Create Page] [createY3dTokenValidator] status:', status);
      return status;
    },
    showCreateY3dTokenErrorMessage() {
      const status = this.createY3dTokenValidator();
      if (!status.tokenContract || !status.yTokenContract) {
        this.$message({
          type: 'error',
          message: 'This is not a ethereum address, please double check your input.',
        });
        return false;
      }
      if (!status.fee) {
        this.$message({
          type: 'error',
          message: 'The fee is out of range.',
        });
        return false;
      }
      return true;
    },
    resetFormInfo() {
      this.tokenContract = '';
      this.yTokenContract = '';
      this.fee = 0;
    },
    clickOnSelectToken() {
      this.shownSelectTokenModal = true;
    },
    selectToken(token) {
      this.tokenContract = token.data.address;
    },
  },
};
</script>

<style lang="scss" scoped>
@import '@/assets/styles/color';
.create {
  margin-top: 30px;
  .title {
    color: white;
    font-weight: 500;
    font-size: 16;
  }
  .create-field {
    border-radius: 20px;
    border: 1px solid $y3d-border;
    background-color: $y3d-black;
    padding: 20px;
    label {
      color: $y3d-sub-title;
      margin-bottom: 10px;
    }
    .token-select-button {
      font-size: 14px;
      margin-top: 10px;
      width: 100px;
      height: 30px;
      padding: 0;
      line-height: 30px;
    }
    input {
      background-color: transparent;
      padding-left: 0;
      padding-right: 0;
      caret-color: white;
      outline: none;
      // height: 44px;
      color: white;
      border: 0;
      font-size: 20px;
    }
    input:focus {
      background-color: transparent;
      border: 0;
      color: white;
    }
    &.validate-faild {
      border-color: red;
      label {
        color: red;
      }
    }
  }
  .y3d-button {
    height: 56px;
    border-radius: 20px;
    width: 100%;
  }
}
</style>
