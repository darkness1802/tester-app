export interface Auth {
    user: User
    tokens: Tokens
}

export interface User {
    isPasswordChange: boolean
    status: string
    name: string
    gender: string
    phone: string
    email: string
    roleId: string
    address: string
    id: string
}

export interface Tokens {
    access: Access
    refresh: Refresh
}

export interface Access {
    token: string
    expires: string
}

export interface Refresh {
    token: string
    expires: string
}