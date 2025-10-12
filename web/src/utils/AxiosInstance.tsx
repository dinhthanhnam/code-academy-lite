import axios from "axios";

// Hàm lấy giá trị của cookie theo tên
const getCookie = (name) => {
	const match = document.cookie.match(new RegExp('(^| )' + name + '=([^;]+)'));
	return match ? decodeURIComponent(match[2]) : null;
};

const api = axios.create({
	baseURL: process.env.NEXT_PUBLIC_API_URL,
	withCredentials: true,
	headers: {
		"Content-Type": "application/json",
		"Accept": 'application/json',
	},
	validateStatus: (status: number) => {
		return status >= 200 && status < 500;
	},
});

// Thêm CSRF token vào tất cả request nếu tìm thấy trong cookie
api.interceptors.request.use((config) => {
	const xsrfToken = getCookie("XSRF-TOKEN");
	if (xsrfToken) {
		config.headers["X-XSRF-TOKEN"] = xsrfToken;
	}
	return config;
});


export default api;
