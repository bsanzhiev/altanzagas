import axios, { AxiosError } from "axios";

const BASE_URL = "http://127.0.0.0:8099";

interface LoginData {
	email: string;
	password: string;
}

interface LoginResponse {
  error: string | undefined;
	userID: number;
	email: string;
	username: string;
	token: string;
}

const authRoutes = {
	register: async (data: any) => {
		try {
			const response = await axios.post(`${BASE_URL}/auth/register`, data);
			return response.data as ApiResponse;
		} catch (error: any) {
			const axiosError = error as AxiosError;
			if (axiosError.response) {
				// Если есть ответ от сервера, вывести сообщение об ошибке
				throw new Error(axiosError.response.data.error);
			} else {
				// В противном случае, обработать другие виды ошибок
				throw axiosError;
			}
		}
	},

	login: async (credentials: LoginData) => {
		try {
			const response = await axios.post(`${BASE_URL}/auth/login`, credentials, {
				responseType: "json",
			});
			return response.data as LoginResponse;
		} catch (error) {
			const axiosError = error as AxiosError;
			if (axiosError.response) {
				// Если есть ответ от сервера, вывести сообщение об ошибке
				const responseData = axiosError.response.data as LoginResponse;
				throw new Error(responseData.error);
			} else {
				// В противном случае, обработать другие виды ошибок
				throw axiosError;
			}
		}
	},
};

export default authRoutes;
