module.exports = {
  apps: [{
    name: "functionsid",
    script: "./app.js",
    instances: 1,
    max_memory_restart: "200M",
    env: {
      NODE_ENV: "development",
    },
    env_production: {
      NODE_ENV: "production",
      PORT: 3000,
      DB_USER: "FUNCTIONSID",
      DB_CONNECT_STRING: "sidcore_high",
      DB_WALLET_DIR: "/home/opc/oracle-wallet",
      TNS_ADMIN: "/home/opc/oracle-wallet",
      DB_POOL_MIN: 1,
      DB_POOL_MAX: 4,
      DB_POOL_INCREMENT: 1,
      DB_POOL_QUEUE_TIMEOUT: 120000,
      DB_POOL_CONNECT_TIMEOUT: 60
    }
  }]
}
