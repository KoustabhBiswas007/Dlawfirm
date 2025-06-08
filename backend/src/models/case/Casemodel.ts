import { QueryTypes } from "sequelize";
import { dbConfig } from "../../config/dbconfig"
import * as caseInterface from "../../interface/CaseInterface";
export class Casemodel{
    getAllCases = async () => {
        const db = await dbConfig();
        const query = `SELECT * FROM dlawfirm.law_case WHERE active_status = 1`;
        return await db.query<caseInterface.Caselist>(query,{
            type: QueryTypes.SELECT
        });
    }
}