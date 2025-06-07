
import { Sequelize } from "sequelize";

export const dbConfig = async () => {
    const sequelize = new Sequelize('dlawfirm', 'root', 'root', {
        host: 'localhost',
        dialect: 'mysql'
    });

    try {
        await sequelize.authenticate();
        console.log('Connection to the database has been established successfully.');
    }
    catch(error){
        console.log('Unable to connect to the database:', error);
    }
    return sequelize;

}
