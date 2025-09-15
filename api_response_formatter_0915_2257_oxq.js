// 代码生成时间: 2025-09-15 22:57:00
const axios = require('axios');
const { format } = require('date-fns');

/**
 * Class to handle API response formatting
 * @class ApiResponseFormatter
 */
class ApiResponseFormatter {
  
  constructor(baseUrl) {
    // Base URL for API requests
    this.baseUrl = baseUrl;
  }

  /**
   * Format API response with metadata
   * @param {Object} response - Original API response object
   * @return {Object} - Formatted API response object
   */
  static formatResponse(response) {
    // Extract the data from the API response
    const { data, headers } = response;

    // Create the formatted response object
    const formattedResponse = {
      meta: {
        timestamp: format(new Date(), 'yyyy-MM-dd HH:mm:ss'),
        status: response.status,
        statusText: response.statusText
      },
      data: data
    };

    return formattedResponse;
  }

  /**
   * Make an API request and format the response
   * @param {Object} config - Axios request configuration
   * @return {Promise} - Promise that resolves with the formatted response
   */
  async makeRequest(config) {
    try {
      // Use axios to make API request
      const response = await axios({
        baseURL: this.baseUrl,
        ...config
      });

      // Format the response
      return ApiResponseFormatter.formatResponse(response);
    } catch (error) {
      // Handle any errors that occur during the request
      console.error('API Request Error:', error.message);
      throw error;
    }
  }
}

// Example usage
const apiFormatter = new ApiResponseFormatter('https://api.example.com');

const config = {
  method: 'get',
  url: '/data'
};

apiFormatter.makeRequest(config)
  .then(formattedResponse => console.log('Formatted Response:', formattedResponse))
  .catch(error => console.error('Error:', error));