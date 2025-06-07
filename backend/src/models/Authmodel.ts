import { QueryTypes } from "sequelize";
import { dbConfig } from "../config/dbconfig";
import * as authInterface from "../interface/AuthInterface";
export class AuthModel{
    
    public async setEncDataInfo(data: { randomNo: Buffer, iv: Buffer, secret_key: string}){
        const db = await dbConfig();
        const now  = new Date();

        return await db.query('INSERT INTO law_encryption_data_info (encrypt_key, iv,secret_key,entry_time,update_interval) VALUES (:key, :iv,:sec_key,:entryTime,:updateIntVal)', {
                replacements: { key: data.randomNo.toString('hex'), iv: data.iv.toString('hex'), sec_key: 'dLawfirMsdlaeDlc12$dvBnT', entryTime: now, updateIntVal: 300 },
                type: QueryTypes.INSERT
            });
    }
    public async getEncDataInfo(){
        const db = await dbConfig();
        return await db.query<authInterface.EncryptionDataInfo>('SELECT * FROM law_encryption_data_info limit 1', {
            type: QueryTypes.SELECT
        });
    }
    public async getUser(data:authInterface.LoginData) {
        const db = await dbConfig();
        let query = `SELECT login.law_users_login_id_pk,login.law_login_id,role.role_name,role.law_role_id_pk,refresh_token
            FROM law_user_login as login LEFT 
            JOIN law_role_master as role ON role.law_role_id_pk=login.law_users_role_details_id_fk 
            WHERE 
                law_login_id = :email 
                and law_hashed_password=:password 
                and login.active_status=1`;

        return await db.query<authInterface.User>(query, {
            replacements: {
                email: data.email,
                password: data.password
            },
            type: QueryTypes.SELECT
        });
    }
    public async insertRefreshToken(data:{refreshToken:string,loginId:string}){
        const db  = await dbConfig();
        let query = `UPDATE law_user_login SET refresh_token=:refreshToken, refresh_token_update_time=NOW() WHERE law_login_id=:loginId`;
        return await db.query(query,{
            replacements:{
                refreshToken: data.refreshToken,
                loginId: data.loginId
            },
            type: QueryTypes.UPDATE
        })
    }

    // public async validateLoginData(data: authInterface.LoginData) {
    //     const db  = await dbConfig();
    //     const query = `SELECT law_login_id, law_hashed_password FROM law_user_login WHERE law_login_id = :email AND active_status = 1`;
    //     const result = await db.query(query, {
    //         replacements: { email: data.email },
    //         type: QueryTypes.SELECT
        
    // }
}