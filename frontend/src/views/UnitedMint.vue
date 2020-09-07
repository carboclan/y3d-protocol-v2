<template>
    <div class="united-mint">
        <table class="ui celled striped table">
            <thead>
                <tr><th colspan="3"> Contract Statistics </th>
            </tr></thead>
            <tbody>
                <tr>
                <td class="collapsing"><i class="money icon"></i> Waiting to mint yyCrv with </td>
                <td> {{ usdtWaitingToMint }} USDT </td>
                </tr>
                <tr>
                <td><i class="money icon"></i> Waiting for claim </td>
                <td> {{ yyCrvWaitingToClaim }} yyCrv </td>
                </tr>
                <tr>
                <td><i class="folder icon"></i> Max. USDT to claim for yyCrv (without minting new yyCrv) </td>
                <td>{{ usdtThatCanJustClaim }} USDT</td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { getProvider, utils } from '../store/ethers/ethersConnect';
import { UnitedMint } from '../contract';
import { BigNumber } from 'ethers';
// import { ContractStat, UserBalances } from "../interface";

// interface ContractStat {
//     usdtBalance: BigNumber;
//     yyCrvBalance: BigNumber;
// }

// interface UserBalances {
//     usdt: BigNumber;
//     yyCrv: BigNumber;
// }

export default Vue.extend({
    name: 'UnitedMintView',
    data: () => ({
        contractStat: {
            usdtBalance: '',
            yyCrvBalance: '',
            minted_USDT: ''
        },
    }),
    computed: {
        usdtWaitingToMint() {
            if (!this.contractStat.usdtBalance) return "...";
            return utils.formatUnits(this.contractStat.usdtBalance, 6);
        },
        yyCrvWaitingToClaim() {
            if (!this.contractStat.yyCrvBalance) return "...";
            return utils.formatUnits(this.contractStat.yyCrvBalance, 18);
        },
        usdtThatCanJustClaim() {
            return this.formatPrice(this.contractStat.minted_USDT, 6);
        }
    },
    methods: {
        formatPrice(price, decimals) {
            if (!price) return "...";
            return utils.formatUnits(price, decimals);
        },
        async fetchStat() {
            const UNI_DEPOSIT_CONTRACT = UnitedMint.connect(getProvider());
            const [ usdtBalance, yyCrvBalance, minted_USDT] = await Promise.all([
                UNI_DEPOSIT_CONTRACT.unminted_USDT(),
                UNI_DEPOSIT_CONTRACT.minted_yyCRV(),
                UNI_DEPOSIT_CONTRACT.mintedUSDT()
            ]);
            this.contractStat = { usdtBalance, yyCrvBalance, minted_USDT }
        }
    },
    mounted() {
        this.fetchStat()
    },
})
</script>

<style lang="scss" scoped>
.united-mint {
    text-align: center;
}
</style>
