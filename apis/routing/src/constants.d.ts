import { ChainId } from '@pancakeswap/sdk';
export declare const SUPPORTED_CHAINS: readonly [ChainId.ETHEREUM, ChainId.BSC, ChainId.LINEA_TESTNET, ChainId.POLYGON_ZKEVM, ChainId.ZKSYNC, ChainId.BSC_TESTNET, ChainId.GOERLI];
export type SupportedChainId = (typeof SUPPORTED_CHAINS)[number];
export declare const SWAP_Commissions = "0x80257EA0d092D58310959846fE7fC486e692c76d";
export declare const V3_SUBGRAPH_URLS: Record<SupportedChainId, string>;
export declare const swapperABI: ({
    inputs: {
        internalType: string;
        name: string;
        type: string;
    }[];
    stateMutability: string;
    type: string;
    name?: undefined;
    outputs?: undefined;
} | {
    stateMutability: string;
    type: string;
    inputs?: undefined;
    name?: undefined;
    outputs?: undefined;
} | {
    inputs: {
        internalType: string;
        name: string;
        type: string;
    }[];
    name: string;
    outputs: {
        internalType: string;
        name: string;
        type: string;
    }[];
    stateMutability: string;
    type: string;
})[];
//# sourceMappingURL=constants.d.ts.map