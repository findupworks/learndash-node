import { DataTypes, Model, Optional } from 'sequelize'
import sequelizeConnection from '../config'
import Course from "./Post";
import TermTaxonomy from "./TermTaxonomy";

interface TermRelationshipAttributes {
    object_id: number;
    term_taxonomy_id: string;
}

export interface TermRelationshipInput extends Optional<TermRelationshipAttributes, 'object_id' | 'term_taxonomy_id'> {}

export interface TermRelationshipOuput extends Required<TermRelationshipAttributes> {}

class TermRelationship extends Model<TermRelationshipAttributes, TermRelationshipInput> implements TermRelationshipAttributes {
    public object_id!: number
    public term_taxonomy_id!: string;
}

TermRelationship.init({
    object_id: {
        type: DataTypes.INTEGER,
        field: "object_id",
        references: {
            model: Course,
            key: "id",
        }
    },
    term_taxonomy_id: {
        type: DataTypes.INTEGER,
        field: "term_taxonomy_id",
        references: {
            model: TermTaxonomy,
            key: "term_taxonomy_id"
        }
    },
}, {
    sequelize: sequelizeConnection,
    paranoid: true,
    tableName: "wp_term_relationships",
    timestamps: false,
})

export default TermRelationship;