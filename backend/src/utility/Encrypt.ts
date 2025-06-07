import bcrypt from 'bcryptjs';
import crypto from 'crypto';
import { dbConfig } from '../config/dbconfig';
import { QueryTypes } from 'sequelize';
import { exit } from 'process';
import { differenceInMilliseconds, differenceInSeconds } from 'date-fns'
import { formatInTimeZone, toZonedTime, format } from 'date-fns-tz';
import jwt from 'jsonwebtoken';
import { AuthModel } from '../models/Authmodel';
// import { time } from 'console';
export class Encrypt {
    private generateKeySalt = async () => {
        const randomNo = crypto.randomBytes(32);
        const iv = crypto.randomBytes(16);

        const db = await dbConfig();
        const authmodelObj = new AuthModel();
        const existingKey = await authmodelObj.getEncDataInfo();

        if (existingKey.length > 0) {
            const existingKey = await authmodelObj.getEncDataInfo();
            return { status: 0, key: existingKey[0].encrypt_key, iv: existingKey[0].iv, secret_key: existingKey[0].secret_key };
        }
        else {
            const now = format(toZonedTime(new Date(), 'Asia/Kolkata'), 'yyyy-MM-dd HH:mm:ss', { timeZone: 'Asia/Kolkata' });
            await authmodelObj.setEncDataInfo({ randomNo: randomNo, iv: iv, secret_key: 'dLawfirMsdlaeDlc12$dvBnT' });
            const existingKey = await authmodelObj.getEncDataInfo();
            return { status: 0, key: existingKey[0].encrypt_key, iv: existingKey[0].iv, secret_key: existingKey[0].secret_key };

        }
        // return existingKey[0];

        //  return { key: existingKey[0], iv: iv };
    }
    public encryptData = async (data: string) => {
        const obj = new Encrypt();
        let keySalt = <{ status: number, key: string, iv: string }>await obj.generateKeySalt();
        // return keySalt.key;
        // return await obj.generateKeySalt();

        const cipher = crypto.createCipheriv('aes-256-cbc', Buffer.from(keySalt.key, 'hex'), Buffer.from(keySalt.iv, 'hex'));
        let encrptedData = cipher.update(data, 'utf-8', 'hex');
        return encrptedData += cipher.final('hex');
    }
    public decryptData = async (data: string) => {
        const obj = new Encrypt();
        let keySalt = <{ status: number, key: string, iv: string }>await obj.generateKeySalt();
        const cipher = crypto.createDecipheriv('aes-256-cbc', Buffer.from(keySalt.key), Buffer.from(keySalt.iv));
        let encrptedData = cipher.update(data, 'utf-8', 'hex');
        return encrptedData += cipher.final('hex');
    }
    // Generating access token
    public generateAccessToken = async (data: { email: string, password: string }) => {
        const obj = new Encrypt();
        const authmodelObj = new AuthModel();
        const encDataInfo = <{ status: number, key: string, iv: string, secret_key: string }>await obj.generateKeySalt();

        const user = await authmodelObj.getUser(data);
        // console.log(user[0].law_login_id);
        if (user.length > 0) {
            const jwtToken = jwt.sign(
                { userId: user[0].law_users_login_id_pk, email: user[0].law_login_id,role:user[0].law_role_id_pk },
                await obj.encryptData(encDataInfo.secret_key),
                {
                    expiresIn: '5minutes',
                    algorithm: 'HS256'
                }
            );
            return { status: 0, statusCode: 200, message: "Login Sucessful", accesstoken: jwtToken };

        }
        else {
            return { status: 1, statusCode: 401, message: "Invalid Credentials" };
        }



    }
    // Generating Refresh Token
    public generateRefreshToken = async (data: { email: string, password: string }) => {
        const obj = new Encrypt();
        const authmodelObj = new AuthModel();

        const encDataInfo = <{ status: number, key: string, iv: string, secret_key: string }>await obj.generateKeySalt();

        const user = await authmodelObj.getUser(data);
        try{
            const validJwt = jwt.verify(user[0].refresh_token,await obj.encryptData(encDataInfo.secret_key));
            console.log(validJwt);
            return { status: 0, statusCode: 200, message: "Login Sucessful", token: validJwt };
        }
        catch(err){
            console.log(err);
            return { status: 1, statusCode: 401, message: "Session Expired" };
        }
        
        // if (user.length > 0) {
        //     const jwtToken = jwt.sign(
        //         { userId: user[0].law_users_login_id_pk, email: user[0].law_login_id,role:user[0].law_role_id_pk },
        //         await obj.encryptData(encDataInfo.secret_key),
        //         {
        //             expiresIn: '30seconds',
        //             algorithm: 'HS256'
        //         }
        //     );
        //     const affectedRows = await authmodelObj.insertRefreshToken({ refreshToken: jwtToken, loginId: user[0].law_login_id });
             
        //     console.log(affectedRows);
        //     if(affectedRows[1] == 1) 
        //     {
        //         return { status: 0, statusCode: 200, message: "Login Sucessful", token: jwtToken };
        //     }
        //     else
        //     {
        //         return { status: 1, statusCode: 500, message: "Something went wrong" };
        //     }
            

        // }
        // else {
        //     return { status: 1, statusCode: 401, message: "Invalid Credentials" };
        // }
    }






















    /*
        // const now = formatInTimeZone(new Date(), 'Asia/Kolkata', 'yyyy-MM-dd HH:mm:ss');
            const now = format(new Date(), 'yyyy-MM-dd HH:mm:ss', { timeZone: 'Asia/Kolkata' });
            const entryTime = existingKey[0].entry_time.toISOString().replace('T', ' ').replace('Z', '');



            const interval = differenceInSeconds(now, entryTime);
            if (interval > existingKey[0].update_interval) {
                const updateStat = await db.query('UPDATE law_encryption_data_info SET encrypt_key = :key, iv = :iv, entry_time = :entryTime, update_interval = :updateIntVal', {
                    replacements: { key: randomNo.toString('hex'), iv: iv.toString('hex'), entryTime: now, updateIntVal: updateInterval },
                    type: QueryTypes.UPDATE
                });
                if (updateStat[1] === 1) {
                    const existingKey = await db.query<EncryptionDataInfo>('SELECT * FROM law_encryption_data_info limit 1', {
                        type: QueryTypes.SELECT
                    });
                    return { status: 0, key: existingKey[0].encrypt_key, iv: existingKey[0].iv };
                }
                else {
                    return { status: 1, message: 'Failed to update encryption key.' };
                }
            }
            else {
                const existingKey = await db.query<EncryptionDataInfo>('SELECT * FROM law_encryption_data_info limit 1', {
                    type: QueryTypes.SELECT
                });
                return { status: 0, key: existingKey[0].encrypt_key, iv: existingKey[0].iv };
            }
    */
}