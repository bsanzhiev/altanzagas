import axios, { AxiosError, AxiosResponse } from "axios";

const BASE_URL = "http://127.0.0.0:8099";

interface LoginData {
	email: string;
	password: string;
}

interface RegisterData extends LoginData {
	first_name: string;
	second_name: string;
	username: string;
}

interface RegisterResponse {
	userID: number;
	email: string;
	username: string;
	error: string | undefined;
}

interface LoginResponse {
	userID: number;
	email: string;
	username: string;
	token: string;
	error: string | undefined;
}

const authRoutes = {
	register: async (registerdData: RegisterData) => {
		try {
			const response = await axios.post(
				`${BASE_URL}/auth/register`,
				registerdData
			);
			return response.data as RegisterResponse;
		} catch (error: any) {
			const axiosError = error as AxiosError;
			if (axiosError.response) {
				const axiosError = error as AxiosResponse<RegisterResponse>;
				throw new Error(axiosError.data.error);
			} else {
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
				const responseData = axiosError.response.data as LoginResponse;
				throw new Error(responseData.error);
			} else {
				throw axiosError;
			}
		}
	},
};

export default authRoutes;
