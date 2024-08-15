import axios from 'axios';

// Create an Axios instance with common settings
const apiClient = axios.create({
    baseURL: 'http://localhost:5000/api', // Replace with your Flask API base URL
    headers: {
        'Content-Type': 'application/json',
    },
});

// Utility function to get the token from localStorage or wherever it's stored
function getAuthToken() {
    return localStorage.getItem('token'); // Adjust according to your authentication method
}

// Add a request interceptor to attach the token to each request
apiClient.interceptors.request.use(config => {
    const token = getAuthToken();
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
}, error => {
    return Promise.reject(error);
});

// Auth API
export const registerUser = async (data: any) => {
    return apiClient.post('/auth/register', data);
};

// Chat API
export const sendMessage = async (data: any) => {
    return apiClient.post('/chat/send', data);
};

export const fetchMessages = async (otherUserId: string) => {
    return apiClient.get(`/chat/messages`, {
        params: { other_user_id: otherUserId },
    });
};

export const markMessageRead = async (messageId: number) => {
    return apiClient.post(`/chat/mark_read/${messageId}`);
};

export const getUnreadCount = async () => {
    return apiClient.get('/chat/unread_count');
};

export const getRecentChats = async () => {
    return apiClient.get('/chat/recent');
};

// Email API
export const sendInvite = async (email: string) => {
    return apiClient.post('/emails/send-invite', { email });
};

export const sendNotification = async (email: string, subject: string, message: string) => {
    return apiClient.post('/emails/send-notification', { email, subject, message });
};

// Image API
export const uploadImage = async (file: File) => {
    const formData = new FormData();
    formData.append('file', file);

    return apiClient.post('/images/upload', formData, {
        headers: {
            'Content-Type': 'multipart/form-data',
        },
    });
};

export const deleteImage = async (imageId: number) => {
    return apiClient.delete(`/images/${imageId}`);
};

// Payments API
export const getPayments = async () => {
    return apiClient.get('/payment');
};

export const updatePayment = async (id: number, status: string) => {
    return apiClient.put(`/payment/${id}`, { status });
};

// Product API
export const getProducts = async () => {
    return apiClient.get('/product');
};

export const getProductById = async (id: number) => {
    return apiClient.get(`/product/${id}`);
};

export const createProduct = async (data: any) => {
    return apiClient.post('/product', data);
};

export const updateProduct = async (id: number, data: any) => {
    return apiClient.put(`/product/${id}`, data);
};

export const deleteProduct = async (id: number) => {
    return apiClient.delete(`/product/${id}`);
};

// Reports API
export const getWeeklyReport = async () => {
    return apiClient.get('/reports/weekly');
};

export const getMonthlyReport = async () => {
    return apiClient.get('/reports/monthly');
};

export const getAnnualReport = async () => {
    return apiClient.get('/reports/annual');
};

export const getAnalytics = async () => {
    return apiClient.get('/reports/analytics');
};

// Supplies API
export const getSupplies = async () => {
    return apiClient.get('/supply');
};

export const getSupplyById = async (id: number) => {
    return apiClient.get(`/supply/${id}`);
};

export const createSupply = async (data: any) => {
    return apiClient.post('/supply', data);
};

export const updateSupply = async (id: number, data: any) => {
    return apiClient.put(`/supply/${id}`, data);
};

export const deleteSupply = async (id: number) => {
    return apiClient.delete(`/supply/${id}`);
};

// Users API
export const getUsers = async () => {
    return apiClient.get('/users');
};

export const getUserById = async (id: number) => {
    return apiClient.get(`/user/${id}`);
};

export const updateUser = async (id: number, data: any) => {
    return apiClient.put(`/user/${id}`, data);
};

export const deleteUser = async (id: number) => {
    return apiClient.delete(`/user/${id}`);
};

