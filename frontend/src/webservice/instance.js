import axios from "axios";

function axiosInstence() {
    let token = localStorage.getItem("etoken")

    return axios.create({
        baseURL: import.meta.env.VITE_API_URL, // ✅ Uses live URL from Vercel or .env
        headers: {
            "Content-Type": "Application/json",
            "Authorization": `Bearer ${token}`,
            "Accept": "*/*"
        }
    })
}

export default axiosInstence;