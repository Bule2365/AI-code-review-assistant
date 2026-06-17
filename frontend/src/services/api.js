import axios from 'axios';

// Sesuaikan URL ini dengan port backend FastAPI Anda (biasanya 8000)
const API_BASE_URL = 'http://localhost:8000';

export const uploadAndReviewCode = async (file, language) => {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('language', language);

    const response = await axios.post(`${API_BASE_URL}/review`, formData, {
        headers: {
            'Content-Type': 'multipart/form-data',
        },
    });

    return response.data;
};