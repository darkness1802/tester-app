import { useAuth } from "../contexts/Auth"
import { useNavigate } from "react-router-dom"
import { LogoutOutlined } from "@ant-design/icons"

const SignOutButton = () => {

    const nav = useNavigate()
    const { logout } = useAuth()

    const handleSignOut = () => {
        logout && logout()
        nav("/signin")
    }

    return <button onClick={handleSignOut}>
        <LogoutOutlined style={{ fontSize: 22 }} />
    </button>
}

export default SignOutButton