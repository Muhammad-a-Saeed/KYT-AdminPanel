import { API_ROUTES, apiUrl } from "@/config";
import { jwtDecode } from "jwt-decode";
import fetcher from "./fetcher";

export const signupUser = async (data) => {
    const res = await fetcher({ method: "POST", path: API_ROUTES.SIGN_UP, data });
    return res;
}


export const loginUser = async (data) => {
	const res = await fetcher({ method: "POST", path: API_ROUTES.SIGN_IN, data })
	const token = res?.data?.token;
	if (res?.success) {
		let { payload } = jwtDecode(token);
		payload.token = token

		if (payload) {
			localStorage.setItem("auth_user", JSON.stringify(payload));
			return { success: true, user: payload }
		}
	} else return res
}

