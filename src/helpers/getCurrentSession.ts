import axios from "axios"

const URI = "https://test.tracnghiem.bfd.vn/v1/auth/refresh-tokens"

export default async function getCurrentSession() {
        /** @input refreshToken */
        let refreshToken = localStorage.getItem("refreshToken")
        let { data } = await axios.post(URI, { refreshToken })

        return data
}