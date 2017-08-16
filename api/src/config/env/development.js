module.exports = {
  port: 9000,
  protocol: 'http',
  env: 'development',
  host: 'localhost',
  security: {
    auth: {
      passwordSaultLength: 10,
      jwt: {
        header: 'x-access-token',
        secret: 'C4U7a3781VhMa72Kn6z1:d*d',
        issuer: 'mohito.daiquiri',
        audience: 'audience',
        subject: 'subject',
        expiresIn: '1h',
      },
    },
  },
  mongodb: {
    host: 'mongodb',
    port: 27017,
    dbName: 'opine-development',
    sslEnabled: false,
    auth: false,
    buildConnectionString() {
      return `mongodb://${this.host}:${this.port}/${this.dbName}`;
    },
  },
};
