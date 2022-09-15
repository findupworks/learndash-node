import { DataTypes, Model, Optional } from 'sequelize'
import sequelizeConnection from '../config'
import Terms from "./Terms";

interface TermTaxonomyAttributes {
    term_taxonomy_id: number;
    term_id: string;
    taxonomy: string;
    term? : Terms;
}

export interface TermTaxonomyInput extends Optional<TermTaxonomyAttributes, 'term_taxonomy_id' | 'term_id'> {}

export interface TermTaxonomyOutput extends Required<TermTaxonomyAttributes> {}

class TermTaxonomy extends Model<TermTaxonomyAttributes, TermTaxonomyInput> implements TermTaxonomyAttributes {
    public term_taxonomy_id!: number
    public term_id!: string;
    public taxonomy!: string;
    public term!: Terms;
}

TermTaxonomy.init({
    term_taxonomy_id: {
        type: DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true,
        field: "term_taxonomy_id"
    },
    term_id: {
        type: DataTypes.STRING,
        allowNull: false
    },
    taxonomy: {
        type: DataTypes.STRING,
        allowNull: false,
        field: "taxonomy"
    },
}, {
    sequelize: sequelizeConnection,
    paranoid: true,
    tableName: "wp_term_taxonomy",
    timestamps: false,
});


TermTaxonomy.belongsTo(Terms, {
    foreignKey: "term_id",
    targetKey: "id",
    as: "term"
})

export default TermTaxonomy;