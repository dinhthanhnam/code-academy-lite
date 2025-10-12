export interface User {
    identity_code?: string;
    id?: number;
    email: string;
    name: string;
    role?: string;
    password?: string;
    created_at?: Date;
    updated_at?: Date;
}