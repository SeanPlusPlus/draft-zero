const ethers = require('ethers');
const imxsdk = require('@imtbl/imx-sdk');

require('dotenv').config()

const {
  PRIVATE_KEY,
  CONTRACT_ADDRESS,
} = process.env

const { ImmutableXClient } = imxsdk;

const chains = {
  ropsten: {
    host: 'https://eth-ropsten.alchemyapi.io/v2/cDQ2d3i8Qz8khADvafgRzIM3tx_Xs2GG',
    apiKey: 'cDQ2d3i8Qz8khADvafgRzIM3tx_Xs2GG',
    chainId: 3,
    network_id: 3,
    name: 'ropsten',
  },
};

async function mint(etherKey) {
  const { apiKey } = chains.ropsten

  const provider = new ethers.providers.AlchemyProvider('ropsten', apiKey);

  const signer = new ethers.Wallet(PRIVATE_KEY, provider);

  const minter = await ImmutableXClient.build({
    publicApiUrl: 'https://api.ropsten.x.immutable.com/v1', //getEnv('PUBLIC_API_URL'),
    starkContractAddress: '0x4527BE8f31E2ebFbEF4fCADDb5a17447B27d2aef', //getEnv('STARK_CONTRACT_ADDRESS'),
    registrationContractAddress: '0x6C21EC8DE44AE44D0992ec3e2d9f1aBb6207D864', // getEnv('REGISTRATION_ADDRESS'),
    gasLimit: 7000000, //getEnv('GAS_LIMIT'),
    gasPrice: 40000000000, //getEnv('GAS_PRICE'),
    signer,
  });

  try {

    const { id } = req.query
    const payload = [
      {
        contractAddress: CONTRACT_ADDRESS,
        users: [
          {
            etherKey,
            tokens: [
              {
                id,
                blueprint: `1:${JSON.stringify({
                  name: 'L1 meta',
                })}`,
              },
            ],
          },
        ],
      },
    ];

    const minted = await minter.mintV2(payload);
    return minted
  } catch (error) {
    return error
  }
}

export default mint