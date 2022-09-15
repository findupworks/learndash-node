import {DataTypes, Model, NonAttribute, Optional} from 'sequelize'
import sequelizeConnection from '../config'
import TermTaxonomy from "./TermTaxonomy";
import TermRelationship from "./TermRelationship";
import PostMeta from "./PostMeta";

interface PostAttributes {
    id: number;
    title: string;
    content: string;
    type: string;
    status: string;
    categories?: TermTaxonomy[];
    image?: PostMeta;
}

export interface PostInput extends Optional<PostAttributes, 'id' | 'title'> {}

export interface PostOutput extends Required<PostAttributes> {}

class Post extends Model<PostAttributes, PostInput> implements PostAttributes {
    public id!: number
    public title!: string
    public content!: string
    public type!: string
    public status!: string
    public categories!: NonAttribute<TermTaxonomy[]>;
    public image!: NonAttribute<PostMeta>;
}

Post.init({
    id: {
        type: DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true,
    },
    title: {
        type: DataTypes.STRING,
        allowNull: false,
        field: "post_title",

    },
    content: {
        type: DataTypes.STRING,
        allowNull: false,
        field: "post_content"
    },
    type: {
        type: DataTypes.STRING,
        allowNull: false,
        field: "post_type"
    },
    status: {
        type: DataTypes.STRING,
        allowNull: false,
        field: "post_status"
    },
}, {
    sequelize: sequelizeConnection,
    paranoid: true,
    tableName: "wp_posts",
    timestamps: false,
});

Post.belongsToMany(TermTaxonomy, {
    through: TermRelationship,
    foreignKey: "object_id",
    targetKey: "term_taxonomy_id",
    otherKey: "term_taxonomy_id",
    as: "categories",
})

Post.hasOne(PostMeta, {
    foreignKey: "post_id",
    sourceKey : "id",
    as: "image"
});

Post.hasOne(PostMeta, {
    foreignKey: "post_id",
    sourceKey : "id",
});

export default Post;