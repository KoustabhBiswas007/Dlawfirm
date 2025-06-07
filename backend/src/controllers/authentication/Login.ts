import * as authInterfaces from '../../interface/AuthInterface'
import { AuthModel } from '../../models/Authmodel';
import { Encrypt } from '../../utility/Encrypt';
export class Login {
    login =  async (data:authInterfaces.LoginData) => {
        const authmodelObj = new AuthModel();
        const encryptObj = new Encrypt();
        const user = await authmodelObj.getUser(data);

        if(user.length > 0){
            const accessToken  = await encryptObj.generateAccessToken(data);

            if(accessToken.status === 0)
            {
                return {status:0,statusCode:200, message: "Login Successful", accesstoken: accessToken.accesstoken};
            }
            else
            {
                return {status: 1, statusCode: 401, message: "Invalid Credentials" };
            }
        }
        else{
            return {status: 1, statusCode: 401, message: "Invalid Credentials" };
        }
    }
}