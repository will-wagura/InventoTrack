import axios, { AxiosInstance, AxiosResponse, AxiosError } from 'axios';

const apiClient: AxiosInstance = axios.create({
    baseURL: 'http://127.0.0.1:5000',
    timeout: 10000,
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
    },
});

// Add a request interceptor to include the token in the headers
apiClient.interceptors.request.use((config) => {
    const token = localStorage.getItem('access_token');
    if (token) {
        config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
}, (error) => {
    return Promise.reject(error);
});

// Interceptor to handle errors globally and manage token refresh
apiClient.interceptors.response.use(
    (response: AxiosResponse) => response,
    async (error: AxiosError) => {
        const status = error.response?.status;
        const originalRequest = error.config;

        if (status === 401 && !originalRequest._retry) {
            console.error('Unauthorized access - possibly invalid token.');

            originalRequest._retry = true; // Avoid infinite loop on token refresh

            const refreshToken = localStorage.getItem('refresh_token');
            if (refreshToken) {
                try {
                    const { data } = await axios.post<{ access_token: string }>(
                        'http://127.0.0.1:5000/refresh',
                        { refresh_token: refreshToken }
                    );

                    localStorage.setItem('access_token', data.access_token);

                    // Update the original request with the new token
                    apiClient.defaults.headers['Authorization'] = `Bearer ${data.access_token}`;
                    originalRequest.headers['Authorization'] = `Bearer ${data.access_token}`;
                    return apiClient(originalRequest); // Retry the original request
                } catch (refreshError) {
                    console.error('Token refresh failed:', refreshError);
                    // Handle failed refresh, e.g., redirect to login
                }
            }

            // Optionally, redirect to login or show a message
        } else if (status === 404) {
            console.error('Resource not found.');
        } else {
            console.error('API call error:', status, error.message);
        }

        return Promise.reject(error);
    }
);
export const refreshToken = async (refreshToken: string) => {
    try {
        const response = await axios.post(
            'http://127.0.0.1:5000/refresh',
            { refresh_token: refreshToken }
        );
        return response.data;
    } catch (error) {
        if (axios.isAxiosError(error)) {
            console.error('Token refresh failed:', error.response?.data || error.message);
        } else {
            console.error('Unexpected error:', error);
        }
        throw error;
    }
};
export const login = async (email: string, password: string) => {
    try {
        const { data } = await apiClient.post<{ access_token: string, refresh_token: string }>(
            '/login',
            { email, password }
        );

        localStorage.setItem('access_token', data.access_token);
        localStorage.setItem('refresh_token', data.refresh_token);

        return data;
    } catch (error) {
        console.error('Login failed:', error);
        throw error;
    }
};

// Generic HTTP methods
export const get = async <T>(url: string, params?: any): Promise<T> => {
    try {
        const response = await apiClient.get<T>(url, { params });
        return response.data;
    } catch (error) {
        console.error('API request failed:', error);
        throw error; // Rethrow to handle it in the component
    }
};


export const post = async <T>(url: string, data: any): Promise<T> => {
    return apiClient.post<T>(url, data).then(response => response.data);
};

export const put = async <T>(url: string, data: any): Promise<T> => {
    return apiClient.put<T>(url, data).then(response => response.data);
};

export const del = async <T>(url: string): Promise<T> => {
    return apiClient.delete<T>(url).then(response => response.data);
};
