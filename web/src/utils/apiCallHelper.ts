import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';

// Define a generic type for the response data
type ApiResponse<T> = {
    data: T;
    status: number;
    statusText: string;
};

// Define a generic type for the API call function
type ApiCallFunction = <T>(config: AxiosRequestConfig) => Promise<ApiResponse<T>>;

// Create an instance of Axios with default configuration
const axiosInstance = axios.create({
    baseURL: 'https://api.example.com', // Replace with your API base URL
    headers: {
        'Content-Type': 'application/json',
        // Add any other headers as needed
    },
});

// Utility function to make API calls
const apiCall: ApiCallFunction = async <T>(config: AxiosRequestConfig) => {
    try {
        const response: AxiosResponse<T> = await axiosInstance(config);

        // Return a simplified response object
        return {
            data: response.data,
            status: response.status,
            statusText: response.statusText,
        };
    } catch (error) {
        // Handle errors and return a simplified error response
        if (error.response) {
            // The request was made and the server responded with a status code
            return {
                data: error.response.data,
                status: error.response.status,
                statusText: error.response.statusText,
            };
        } else if (error.request) {
            // The request was made but no response was received
            return {
                data: null,
                status: 0,
                statusText: 'No response received',
            };
        } else {
            // Something happened in setting up the request that triggered an Error
            return {
                data: null,
                status: 0,
                statusText: error.message || 'Unknown error',
            };
        }
    }
};

export default apiCall;
