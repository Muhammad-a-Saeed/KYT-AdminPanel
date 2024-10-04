import { API_ROUTES } from "@/config"
import fetcher from "./fetcher"

export const addNewFeedback = async ({  data, token }) => {
    return await fetcher({ method: "POST", path: API_ROUTES.FEEDBACK.DEFAULT, data, headers: { authorization: token } })
}
export const getAllFeedbacks = async ({ token }) => {
    return await fetcher({ method: "GET", path: API_ROUTES.FEEDBACK.DEFAULT, headers: { authorization: token } })
}