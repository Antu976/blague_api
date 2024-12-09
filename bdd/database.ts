import { Sequelize } from "sequelize";

const sequelize = new Sequelize ({
    dialect: 'sqlite',
    host: './database.sqlite'

})

export default sequelize;