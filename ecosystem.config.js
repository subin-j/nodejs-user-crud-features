module.exports = {
    apps : [{
      name: 'Express App',
      script: 'test.js',
      instances: "1",
      autorestart: true,
      watch: true,
      max_memory_restart: '1G',
      exec_mode:"cluster",
      env: {
        NODE_ENV: 'development'
      },
      env_production: {
        NODE_ENV: 'production'
      }
    }]
  };