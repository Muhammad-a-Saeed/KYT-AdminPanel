import { apiUrl } from "@/config";
import axios from "axios";
import { toast } from "react-toastify";

const fetcher = async ({ method = "GET", path, data, headers }) => {
    try {
        const resp = await axios({
            method: method,
            url: `${apiUrl}${path || ""}`,
            data,
            headers: {
                accept: "application/json",
                ...headers
            },
        });
        if (resp?.status === 200) return resp.data

    } catch (error) {
        toast.error(error?.response?.data.message)
        return error?.response?.data
    }
}

export default fetcher