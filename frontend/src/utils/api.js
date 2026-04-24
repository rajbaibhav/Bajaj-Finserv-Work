import axios from 'axios';

const API_URL = 'https://bajaj-bfhl-api-gxt3.onrender.com/';

export const processGraphData = async (dataArray) => {
    try {
        const response = await axios.post(`${API_URL}/bfhl`, {
            data: dataArray
        });
        return response.data;
    } catch (error) {
        throw new Error(error.response?.data?.error || 'Failed to connect to the API. Please ensure the backend is running.');
    }
};
