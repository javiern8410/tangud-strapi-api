module.exports = ({ env }) => ({
  defaultConnection: "default",
  connections: {
    default: {
      connector: "mongoose",
      settings: {
        host: env("DATABASE_HOST", process.env.MONGO_HOST),
        srv: env.bool("DATABASE_SRV", true),
        port: env.int("DATABASE_PORT", 27017),
        database: env("DATABASE_NAME", process.env.MONGO_DB),
        username: env("DATABASE_USERNAME", process.env.MONGO_USER),
        password: env("DATABASE_PASSWORD", process.env.MONGO_PASSW),
      },
      options: {
        authenticationDatabase: env("AUTHENTICATION_DATABASE", null),
        ssl: env.bool("DATABASE_SSL", true),
      },
    },
  },
});

// const URI =  'mongodb://javiern8410:Asdfghj123*@cluster0-shard-00-00-vbmcs.mongodb.net:27017,cluster0-shard-00-01-vbmcs.mongodb.net:27017,cluster0-shard-00-02-vbmcs.mongodb.net:27017/mern-tasks?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin&retryWrites=true&w=majority';
