import { Encrypt } from "../../utility/Encrypt"
export class Accesstoken{
    getAccessToken = async (data:{email:string,password:string})=>{
        const encryptObj = new Encrypt();
        return await encryptObj.generateAccessToken(data);
    }

    getRefreshToken  = async (data:{email:string,password:string}) => {
        const encryptObj = new Encrypt();
        return await encryptObj.generateRefreshToken(data);
    }


}