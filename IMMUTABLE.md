# Immutable

### Deploy L1 Smart Contract

- https://github.com/immutable/imx-contracts
- setup an account on Alchemy and add your `ALCHEMY_API_KEY` to the `.env`
- setup an account on etherscan and add your `ETHERSCAN_API_KEY` to the `.env`
- make sure to add ropsten eth to your wallet
- update the `CONTRACT_NAME` and `CONTRACT_SYMBOL` and `PRIVATE_KEY` in `.env`
- install and deploy

```
➜ yarn install
➜ yarn hardhat run deploy/asset.ts --network ropsten
```

- the `Deployed Contract Address` displayed in your terminal will appear in etherscan, for ex:

https://ropsten.etherscan.io/address/0x4de01F452ec345FC157b03fDB214c3Da10711E01

### IMX Onboarding

- https://github.com/immutable/imx-examples
- follow the onboarding steps
    - make sure for Step 3 to update the `CreateCollectionParams` in the `3-create-collection` file

https://github.com/immutable/imx-examples/blob/main/docs/onboarding.md

- after running `npm run onboarding:create-collection` your collection is now live, for ex:

https://market.ropsten.immutable.com/assets?collection=0x4de01f452ec345fc157b03fdb214c3da10711e01

- useful docs for Step 4 metadata:

https://docs.x.immutable.com/docs/asset-metadata#core-properties

