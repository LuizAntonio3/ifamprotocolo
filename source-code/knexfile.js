// Update with your config settings.

module.exports = {

  development: {
    client: 'postgresql',
    connection: {
      host: 'localhost',
      user: 'postgres',
      password: '',
      database: 'ifamprotocolo'
    }
  },
  
  staging: {
    client: 'postgresql',
    connection: {
      database: 'my_db',
      user:     'username',
      password: 'password'
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations'
    }
  },

  production: {
    client: 'postgresql',
    connection: {
      host: 'ec2-184-72-246-219.compute-1.amazonaws.com',
      user: 'sslvislnyikbdn',
      password: '003ed630f73700e8d8be5f85cd8471eb3077301edba34ea63f6ad593cd865a7a',
      database: 'd7t8e1cmrvf86j',
      ssl: true
    },
    pool: {
      min: 2,
      max: 10
    }
  }

};
