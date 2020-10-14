/* eslint-disable no-alert */
import { ActionContext } from 'vuex';
import { formatUnits } from 'ethers/lib/utils';
import { FixedNumber } from 'ethers';
import {
  MSGS,
  EVENT_CHANNEL,
  connect,
  event,
  ready,
  getProvider,
  getWallet,
  getWalletAddress,
  getNetName,
  hasEns,
  getBlance,
  getNetworkBrowserMainUrl,
} from './ethersConnect';
/* eslint-disable import/extensions */
/* eslint-disable import/no-unresolved */
import { Y3DEthersState } from './types';
/* eslint-enable import/extensions */
/* eslint-enable import/no-unresolved */

export default {
  async connect(ctx: ActionContext<Y3DEthersState, any>) {
    try {
      const oldAddress = ctx.state.address;
      const oldNetwork = ctx.state.network;

      const provider = getProvider();
      if (!provider) throw new Error(MSGS.NOT_CONNECTED);

      const wallet = getWallet();
      if (!wallet) throw new Error(MSGS.NO_WALLET);
      const address = await getWalletAddress();
      const blance = await getBlance(address!);
      const network = await getNetName();
      const formatedBlance = Number.parseFloat(formatUnits(blance, 18)).toFixed(4);
      const networkBrowseMainUrl = await getNetworkBrowserMainUrl();

      if (network !== oldNetwork || address !== oldAddress) {
        ctx.commit('connected', true);
        ctx.commit('error', null);
        ctx.commit('address', address);
        ctx.commit('blance', formatedBlance);
        ctx.commit('coinName', 'ETH');
        ctx.commit('user', address);
        ctx.commit('network', network);
        ctx.commit('networkBrowseMainUrl', networkBrowseMainUrl);

        ctx.dispatch('swap/fetchTokensInfo', {}, { root: true });
        ctx.dispatch('swap/fetchPairList', {}, { root: true });
        // const msg = oldAddress && oldAddress !== address
        //   ? `Your Ethereum address/user has changed.
        //   Address: ${address}
        //   Network: ${network} ${network === 'Rinkeby Test Network' ? '☑️' : '✖️'}`
        //   : `You are connected to the Ethereum Network.
        //   Address: ${address}
        //   Network: ${network} ${network === 'Rinkeby Test Network' ? '☑️' : '✖️'}
        //   If you change your address or network, this app will update automatically.`
        // alert(msg)

        // Other vuex stores can wait for this
        event.$emit(EVENT_CHANNEL, MSGS.ETHERS_VUEX_READY);

        // now check for .eth address too
        if (await hasEns()) {
          console.log('Net supports ENS. Checking...');
          ctx.commit('ens', await provider.lookupAddress(address!));
          if (ctx.state.ens) {
            ctx.commit('user', ctx.state.ens);
          }
        }

        provider.on('block', (blockNumber: number) => {
          console.log('Block mined:', blockNumber);
        });
      }
    } catch (err) {
      ctx.dispatch('disconnect', err);
    }
  },
  async disconnect(ctx: ActionContext<Y3DEthersState, any>, err: Error) {
    const oldAddress = ctx.state.address;
    ctx.commit('connected', false);
    ctx.commit('error', err);
    ctx.commit('address', '');
    ctx.commit('blance', 0);
    ctx.commit('coinName', '');
    ctx.commit('user', '');
    ctx.commit('network', '');
    ctx.commit('ens', null);
    ctx.commit('networkBrowseMainUrl', '');

    // eslint-disable-next-line no-nested-ternary
    const msg = err ? `There was an error: ${err.message}` : (oldAddress
      ? 'You have been disconnected from your Ethereum connection. Please check MetaMask, etc.'
      : 'You are not connected to an Ethereum node and wallet. Please check MetaMask, etc.');
    alert(msg);
  },
  async logout(ctx: ActionContext<Y3DEthersState, any>) {
    ctx.commit('address', '');
    ctx.commit('user', '');
    ctx.commit('blance', 0);
    ctx.commit('coinName', '');
    alert('You have been logged out from your Ethereum connection');
  },
  async notConnected(ctx: ActionContext<Y3DEthersState, any>) {
    ctx.commit('address', '');
    ctx.commit('user', '');
    ctx.commit('blance', 0);
    ctx.commit('coinName', '');
    alert('You are not connected to the Ethereum network. Please check MetaMask,etc.');
  },
  async init(ctx: ActionContext<Y3DEthersState, any>) {
    event.$on(EVENT_CHANNEL, async (msg: string) => {
      console.log('Ethers event received', msg);
      switch (msg) {
        case MSGS.NOT_READY:
          await ctx.dispatch('disconnect');
          break;
        case MSGS.NO_WALLET:
          await ctx.dispatch('logout');
          break;
        case MSGS.ACCOUNT_CHANGED:
          await ctx.dispatch('connect');
          break;
        case MSGS.NOT_CONNECTED:
          await ctx.dispatch('notConnected');
          break;
        default:
          break;
      }
    });

    if (ready()) {
      await ctx.dispatch('connect');
      event.$emit(EVENT_CHANNEL, MSGS.ETHERS_VUEX_INITIALIZED);
    } else {
      console.log('Log in to your Ethereum wallet to see what it can do!');
      await connect();
    }
    ctx.commit('initialized', true);
  },
};
