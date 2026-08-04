module.exports = {
  apps: [{
    name: "functionsid",
    script: "./app.js",
    cwd: "/opt/functionsid",
    instances: 1,
    max_memory_restart: "200M",
    env: {
      NODE_ENV: "development",
    },
    env_production: {
      NODE_ENV: "production",
      PORT: 3000
    }
  }]
}
