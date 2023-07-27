import { createContext, useContext, useState, useEffect } from "react"
import type { Auth } from "../types/auth.types"
import axios from "axios"

interface IAuthContext {
    auth: Auth | null
    setAuth?: React.Dispatch<React.SetStateAction<Auth | null>>
    logout?: () => void
}

const initState: IAuthContext = {
    auth: null
}

const AuthContext = createContext<IAuthContext>(initState)

export default function AuthProvider (props: { children: React.ReactNode }) {

    const [auth, setAuth] = useState<Auth | null>(JSON.parse(localStorage.getItem("auth")!) ?? null)

    const logout = async () => {
        await axios.post("https://test.tracnghiem.bfd.vn/v1/auth/logout", {
            refreshToken: auth?.tokens.refresh.token
        })
        setAuth(null)
    }

    useEffect(() => {
        const onAuthStateChange = () => {
            localStorage.setItem("auth", JSON.stringify(auth))
        }; onAuthStateChange()
    }, [auth])

    return <AuthContext.Provider value={{ auth, setAuth, logout }}>
        { props.children }
    </AuthContext.Provider>
}

export const useAuth = () => useContext(AuthContext)