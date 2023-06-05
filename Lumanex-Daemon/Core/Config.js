module.exports = {
  /* Do not touch these values, they will be filled in by the code */
  BLOCKCHAIN_FOLDER: "",

  COINNAME: "Lumanex",                  /* Coin name */
  TICKER: "LNX",                        /* Coin ticker/symbol */
  VERSION: "1.0.0",                     /* Current version */
  DIFFICULTY_TARGET: 30,                /* 30 Second block time */
  PUBLIC_ADDRESS_PREFIX: "LNX",         /* Public address prefix */
  DECIMALS: 8,                          /* Decimals of the coin */

  MAXIMUM_SUPPLY: 2000000000000000,     /* 20'000'000.00000000 LNX (in atomic units) */
  BLOCK_REWARD: 100000000,              /* 1.00000000 LNX (in atomic units) */
  PREMINE_REWARD: 10000000000000,       /* 100'000.00000000 (in atomic units) */

  GENESIS_BLOCK_TIMESTAMP: 1685976122,  /* Block 0 timestamp */
  MINIMUM_ALLOWED_FEE: 5000,            /* Minimum allowed fee in atomic units */

  FORK_HEIGHTS: [
    10000 /* 0 = TBA */
  ],

  SOFTWARE_SUPPORTED_FORK_INDEX: 0,     /* Supports fork height index number */
  TRANSACTION_VERSION: 1,               /* Current Transaction Version */
  BLOCK_VERSION: 1,                     /* Current Block Version */

  NETWORK_ID: [                         /* Public Network ID of Mainnet */
    0x07, 0x2c, 0x29, 0x9e, 0xf9, 0x6b, 0xc3, 0x61, 0xce, 0xbe, 0x64, 0xa8, 0x7e, 0x71, 0x20, 0x1c
  ],

  TESTNET_NETWORK_ID: [                 /* Public Network ID of Testnet */
    0x07, 0x2c, 0x29, 0x9e, 0xf9, 0x6b, 0xc3, 0x61, 0xce, 0xbe, 0x64, 0xa8, 0x7e, 0x71, 0x20, 0x1c
  ],

  P2P_PORT: 23000,                      /* P2P port */
  RPC_PORT: 23001,                      /* RPC port */
  WALLET_API_PORT: 23002,               /* Wallet API port */

  SEED_NODES: [                         /* Public mainnet seed nodes */
    "127.0.0.1"
  ],

  TESTNET_SEED_NODES: [                 /* Public testnet seed nodes */
    "127.0.0.1"
  ]
};