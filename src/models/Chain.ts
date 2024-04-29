export type Chain = {
    chainId: string;
    name: string;
    blockExplorerUrl: string;
    rpcUrl: string;
  };
  
export const sepolia: Chain = {
    chainId: '5',
    name: 'Sepolia',
    blockExplorerUrl: 'https://sepolia.etherscan.io/',
    rpcUrl: 'https://api.sepolia.kroma.network',
};

export const mainnet: Chain = {
    chainId: '1',
    name: 'Ethereum',
    blockExplorerUrl: 'https://etherscan.io',
    rpcUrl: 'https://mainnet.infura.io/v3/59b59e23bb7c44d799b5db4a1b83e4ee',
};

export const CHAINS_CONFIG = {
    [sepolia.chainId]: sepolia,
    [mainnet.chainId]: mainnet,
};