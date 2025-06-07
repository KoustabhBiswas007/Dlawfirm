
export interface User {
        law_users_login_id_pk: number;
        law_login_id: string;
        role_name: string;
        law_role_id_pk: number;
        refresh_token:string
    }

export interface EncryptionDataInfo {
            entry_time: Date;
            encrypt_key: string;
            iv: string;
            secret_key: string;
            update_interval: number;
        }
export interface LoginData {
    email:string;
    password:string;
}