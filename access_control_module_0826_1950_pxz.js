// 代码生成时间: 2025-08-26 19:50:32
// Import necessary modules and utilities
const { createMiddleware } = require('@nuxtjs/composition-api')
const { mapMutations } = require('vuex')

// Define the middleware to control access
const accessControlMiddleware = createMiddleware(async (context) => {
  // Extract user data from the context
  const user = context.store.state.user
  // Check if user is authenticated
  if (!user || !user.isAuthenticated) {
    // If the user is not authenticated, redirect to login
    context.redirect('/login')
    return
  }

  // Define the required access level for the route
  const requiredAccessLevel = context.route.meta.requiredAccessLevel
  // Check if the user has the required access level
  if (requiredAccessLevel && user.accessLevel < requiredAccessLevel) {
    // If the user does not have the required access level, show an error
    context.error({ statusCode: 403, message: 'Access Denied' })
    return
  }

  // Continue with the route if all checks pass
  context.next()
})

// Export the middleware for usage in the Nuxt.js configuration
module.exports = {
  accessControlMiddleware
}
