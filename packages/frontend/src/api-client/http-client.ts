import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from 'axios';

/**
 * Create an Axios Client with defaults
 */
const axiosClient = axios.create({
  baseURL: process.env.API_URL,
});

/**
 * Request Wrapper with default success/error actions
 */
export const client = async function (
  options: AxiosRequestConfig,
): Promise<AxiosResponse> {
  const onSuccess = function (response: AxiosResponse) {
    console.debug('Request Successful!', response);

    return response.data;
  };

  const onError = function (error: AxiosError) {
    console.error('Request Failed:', error.config);
    console.error('Is Axios error:', error.isAxiosError);

    if (error.response) {
      console.error('Status:', error.response.status);
      console.error('Data:', error.response.data);
      console.error('Headers:', error.response.headers);
    } else {
      // Something else happened while setting up the request
      // triggered the error
      console.error('Error Message:', error.message);
    }

    return Promise.reject(error.response || error.message);
  };

  try {
    const response = await axiosClient(options);

    return onSuccess(response);
  } catch (error) {
    return onError(error);
  }
};
