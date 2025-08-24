export interface Login {
    email: string;
    password: string;
}

export interface Signup {
    name: string;
    email: string;
    password: string;
}

export interface LoginResponse {
    secret: string;
}

export interface LogoutResponse {
    success: boolean;
}
