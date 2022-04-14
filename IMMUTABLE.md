# Immutable

### Deploy L1 Smart Contract

- https://github.com/immutable/imx-contracts
- make sure to add ropsten eth to your wallet
- update the `CONTRACT_NAME` and `CONTRACT_SYMBOL` and `PRIVATE_KEY` in `.env`
- install and deploy

```
➜ yarn install
➜ yarn hardhat run deploy/asset.ts --network ropsten
```

- the `Deployed Contract Address` displayed in your terminal will appear in etherscan, for ex:

https://ropsten.etherscan.io/address/0x9fD10A38D5511de10fC20Af6EE73D0578850A1bC

### IMX Onboarding

- https://github.com/immutable/imx-examples