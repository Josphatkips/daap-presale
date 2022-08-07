import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { Chain } from '@rainbow-me/rainbowkit';
import '@rainbow-me/rainbowkit/styles.css';
import {
  getDefaultWallets,
  RainbowKitProvider,
} from '@rainbow-me/rainbowkit';
import {
  chain,
  configureChains,
  createClient,
  WagmiConfig,
} from 'wagmi';
import { alchemyProvider } from 'wagmi/providers/alchemy';
import { publicProvider } from 'wagmi/providers/public';


// Custom Chain


const avalancheChain: Chain = {
  id: 43_114,
  name: 'Avalanche',
  network: 'avalanche',
  iconUrl: 'https://example.com/icon.svg',
  iconBackground: '#fff',
  nativeCurrency: {
    decimals: 18,
    name: 'Avalanche',
    symbol: 'AVAX',
  },
  rpcUrls: {
    default: 'https://api.avax.network/ext/bc/C/rpc',
  },
  blockExplorers: {
    default: { name: 'SnowTrace', url: 'https://snowtrace.io' },
    etherscan: { name: 'SnowTrace', url: 'https://snowtrace.io' },
  },
  testnet: false,
};



// End custom chain
// Custom Chain


const BNBChain: Chain = {
  id: 56,
  name: 'BSC Mainet',
  network: 'bsc',
  iconUrl: 'https://assets-cdn.trustwallet.com/blockchains/smartchain/info/logo.png',
  iconBackground: '#fff',
  nativeCurrency: {
    decimals: 8,
    name: 'BNB',
    symbol: 'BNB',
  },
  rpcUrls: {
    default: 'https://bsc-dataseed.binance.org/',
  },
  blockExplorers: {
    default: { name: 'SnowTrace', url: 'https://bscscan.com' },
    // etherscan: { name: 'SnowTrace', url: 'https://snowtrace.io' },
  },
  testnet: false,
};
const BNBChainTest: Chain = {
  id: 97,
  name: 'BSC Test Net',
  network: 'bsc',
  iconUrl: 'https://assets-cdn.trustwallet.com/blockchains/smartchain/info/logo.png',
  iconBackground: '#fff',
  nativeCurrency: {
    decimals: 8,
    name: 'BNB',
    symbol: 'BNB',
  },
  rpcUrls: {
    default: 'https://data-seed-prebsc-1-s1.binance.org:8545/',
  },
  blockExplorers: {
    default: { name: 'SnowTrace', url: 'https://testnet.bscscan.com' },
    // etherscan: { name: 'SnowTrace', url: 'https://snowtrace.io' },
  },
  testnet: true,
};



// End custom chain

const { chains, provider } = configureChains(
  // [chain.mainnet, chain.polygon, chain.optimism, chain.arbitrum,chain.ropsten,chain.rinkeby,chain.goerli,chain.kovan,chain.polygonMumbai],
  [chain.mainnet,  chain.optimism, chain.arbitrum,chain.rinkeby,BNBChain,BNBChainTest],
  [
    alchemyProvider({ alchemyId: process.env.ALCHEMY_ID }),
    publicProvider()
  ]
);

const { connectors } = getDefaultWallets({
  appName: 'My RainbowKit App',
  chains
});

const wagmiClient = createClient({
  autoConnect: true,
  connectors,
  provider
})

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <WagmiConfig client={wagmiClient}>
    <RainbowKitProvider chains={chains}>
    <App />
    </RainbowKitProvider>
    </WagmiConfig>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
