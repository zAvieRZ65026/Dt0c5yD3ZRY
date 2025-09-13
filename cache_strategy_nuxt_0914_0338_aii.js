// 代码生成时间: 2025-09-14 03:38:14
// Import necessary Nuxt.js modules
const { defu } = require('@nuxt/utils')
const cacheableResponse = require('cacheable-response')

// Define the module's meta information
module.exports = function (moduleOptions) {
  const options = defu(moduleOptions, this.options.cacheStrategy)

  // Setup cacheable-response middleware
  this.nuxt.hook('server:setupMiddleware', async (app) => {
    app.use(cacheableResponse(options))
  })

  // Add error handling
  this.nuxt.hook('error:handler', async (error, nuxtError) => {
    // Log the error if it's not a client-side error
    if (error.code !== 'NuxtError') {
      this.options.logger.error(error)
    }
    // Return the error to the client
    return error
  })

  // Custom configuration for the module
  this.addServerMiddleware({
    path: '/_cache',
    handler: (req, res) => {
      // Serve cache status
      res.writeHead(200, { 'Content-Type': 'application/json' })
      res.end(JSON.stringify({
        status: 'Cache is enabled',
        options: options
      }))
    },
  })
}

// Expose meta information for Nuxt.js
module.exports.meta = require('./package.json')


/*
 * Configuration for the module.
 * This should be placed inside `nuxt.config.js`.
 *
 * @type {Object}
 */
exports.default = defu({
  cacheStrategy: {
    ttl: 3600, // Time to live in seconds
    privacy: 'default',
    matchOptions: {
      allowedCharsets: ['utf-8']
    }
  },
}, process.env)
