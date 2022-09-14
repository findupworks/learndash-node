import { DataTypes, Model, Optional } from 'sequelize'
import sequelizeConnection from '../config'

interface UserAttributes {
    id: number;
    user_login: string;
    display_name: string;
}

export interface UserInput extends Optional<UserAttributes, 'id' | 'user_login'> {}

export interface UserOuput extends Required<UserAttributes> {}

class User extends Model<UserAttributes, UserInput> implements UserAttributes {
    public id!: number
    public user_login!: string
    public display_name!: string
}

User.init({
    id: {
        type: DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true,
    },
    user_login: {
        type: DataTypes.STRING,
        allowNull: false
    },
    display_name: {
        type: DataTypes.STRING,
        allowNull: false
    },
}, {
    sequelize: sequelizeConnection,
    paranoid: true,
    tableName: "wp_users",
    timestamps: false,
})

export default User;