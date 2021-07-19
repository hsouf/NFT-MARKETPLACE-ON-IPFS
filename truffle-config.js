const HDWalletProvider = require("@truffle/hdwallet-provider");

const fs = require("fs");
const mnemonic = "";

module.exports = {
  contracts_directory: "./contracts",
  contracts_build_directory: "./abis",
  networks: {
    development: {
      host: "127.0.0.1",
      port: 7545,
      network_id: "*",
    },
    testnet: {
      provider: () =>
        new HDWalletProvider(
          mnemonic,
          `wss://data-seed-prebsc-1-s1.binance.org:8545`,
          0,
          2
        ),
      network_id: 97,
      confirmations: 10,
      timeoutBlocks: 200,
      networkCheckTimeout: 20000,
      skipDryRun: true,
    },
    bsc: {
      provider: () =>
        new HDWalletProvider(mnemonic, `https://bsc-dataseed1.binance.org`),
      network_id: 56,
      confirmations: 10,
      timeoutBlocks: 200,
      skipDryRun: true,
    },
  },
  compilers: {
    solc: {
      version: "0.8.0",
      settings: {
        optimizer: {
          enabled: true,
          runs: 1,
        },
        evmVersion: "istanbul",
      },
    },
  },
  plugins: ["truffle-contract-size"],
};
