require('dotenv').config()

/**
 * Contains general definitions to Electron APP
 */
module.exports = {
  environment: {
    enableLogs: process.env.ENABLE_LOGS || false,//TODO: Check if env variable returns an string or boolean value
  },
  /**
   * Contains the database connection
   */
  database: {
    /**
     * Server name (default localhost)
     */
    server: process.env.SERVER || 'localhost',
    /**
     * Username of database
     */
    user: process.env.USER,
    /**
     * User password of database
     */
    password: process.env.PASSWORD,
    /**
     * Name of database
     */
    name: process.env.NAME,
    /**
     * Connection string (used in Oracle and MongoDb)
     */
    connectionString: process.env.CONNECTION_STRING,
    /**
     * Type of server (Can be SQL, MySQL, MongoDB, CosmosDB, Oracle)
     */
    type: process.env.TYPE || 'MYSQL',
  },
}