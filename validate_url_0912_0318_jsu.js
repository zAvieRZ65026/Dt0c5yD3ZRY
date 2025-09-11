// 代码生成时间: 2025-09-12 03:18:45
const axios = require('axios');

/**
 * Validates the given URL to check if it is reachable.
 * @param {string} url - The URL to be validated.
 * @returns {Promise<boolean>} - A promise that resolves to true if the URL is valid, false otherwise.
 */
async function validateURL(url) {
  // Check if the URL is valid using a regular expression
  // This regex checks for basic URL structure, but might not cover all edge cases
  const urlRegex = /^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([\/\w \.-]*)*\/?$/;
  if (!urlRegex.test(url)) {
    throw new Error('Invalid URL format');
  }

  // Make a HEAD request to the URL to check its availability
  try {
    const response = await axios.head(url, {
      timeout: 5000, // Timeout after 5 seconds
      headers: {
        'Accept': 'application/json'
      }
    });

    // Check if the response status code is between 200 and 299
    if (response.status >= 200 && response.status < 300) {
      return true;
    } else {
      return false;
    }
  } catch (error) {
    // Handle any errors that occur during the request
    console.error('Error validating URL:', error.message);
    return false;
  }
}

// Example usage
validateURL('https://example.com').then(isValid => {
  console.log('Is the URL valid?', isValid);
}).catch(error => {
  console.error('Error:', error.message);
});