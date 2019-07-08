// Update with your config settings.

module.exports = {

  development: {
    client: 'pg',
    connection: {
      host : '127.0.0.1',
      user : 'ethangrab',
      password : null,
      database : 'quant_self',
      charset: 'utf8'
    },
    migrations: {
      directory: './db/migrations'
    },
    seeds: {
      directory: './db/seeds/dev'
    },
    useNullAsDefault: true
  },

  staging: {
    client: 'pg',
    connection: {
      database: 'quant_self_staging',
      user:     'ethangrab',
      password: null
    },
    migrations: {
      directory: './db/migrations'
    },
    seeds: {
      directory: './db/seeds/dev'
    }
  },

  production: {
    client: 'pg',
    connection: {
      database: 'quant_self_production',
      user:     'ethangrab',
      password: null
    },
    migrations: {
      directory: './db/migrations'
    },
    seeds: {
      directory: './db/seeds/dev'
    }
  },

  test: {
    client: 'pg',
    connection: {
      database: 'quant_self_test',
      user: 'ethangrab',
      password: null
    },
    migrations: {
      directory: './db/migrations'
    },
    seeds: {
      directory: './db/seeds/dev'
    }
  }
};
