import { DataTypes } from "sequelize";
import sequelize from "./database";

const blagues =  sequelize.define('blague', {
    id: {
        type : DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },

    contenu : {
        type: DataTypes.TEXT,
        allowNull: false
    },
    reponse: {
        type: DataTypes.TEXT,
        allowNull: false
    }
});

export default blagues;