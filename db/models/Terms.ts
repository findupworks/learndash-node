import { DataTypes, Model, Optional } from 'sequelize'
import sequelizeConnection from '../config'

interface TermsAttributes {
    id: number;
    name: string;
}

export interface TermsInput extends Optional<TermsAttributes, 'id' | 'name'> {}

export interface TermsOutput extends Required<TermsAttributes> {}

class Terms extends Model<TermsAttributes, TermsInput> implements TermsAttributes {
    public id!: number
    public name!: string;
}

Terms.init({
    id: {
        type: DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true,
        field: "term_id"
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
}, {
    sequelize: sequelizeConnection,
    paranoid: true,
    tableName: "wp_terms",
    timestamps: false,
})

export default Terms;