// Update with your config settings.

module.exports = {

  development: {
    client: 'pg',
    connection: {
      host : '127.0.0.1',
      user : 'walsh',
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
      user:     'walsh',
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
      database: 'postgres://wbcpuhsadxsplh:74cc4c1770e50800a31c0896ce337f3bc1875f440d70cfde9192bd8e5b7ffe3c@ec2-50-16-197-244.compute-1.amazonaws.com:5432/dccdmohut4qmrq',
      user:     'walsh',
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
      user: 'walsh',
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
