
import React, { useEffect, useState } from "react";
import { useAuth } from "../contexts/Auth";
import { LoadingOutlined } from "@ant-design/icons"; ``
import { useNavigate } from "react-router-dom"
import type { Auth } from "../types/auth.types";

// withAuth HOC for checking and protecting a router component
function withAuth<P extends Auth>(
    Page: React.ComponentType<P>
) {

    return () => {
        const [loading, $loading] = useState<boolean>(true)
        const nav = useNavigate()
        const { auth, setAuth } = useAuth()

        useEffect(() => {
            const authStateChecking = async () => {

                // loading auth state

                if (auth?.user) {
                    $loading(false)
                    return
                }

                const authStorage = JSON.parse(localStorage.getItem("auth")!)

                if (authStorage) {
                    $loading(false)
                    setAuth && setAuth(authStorage as Auth)
                    return
                }

                if (!auth?.user.id) {
                    nav("/signin")
                }

            }

            authStateChecking()
        }, [])

        const props = auth as P;

        if (loading) return <LoadingOutlined />

        return <Page {...props} />
    }
}

export default withAuth