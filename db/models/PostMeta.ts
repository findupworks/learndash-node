import { DataTypes, Model, Optional } from 'sequelize'
import sequelizeConnection from '../config'

interface PostMetaAttributes {
    meta_id: number;
    post_id: number;
    meta_key: string;
    meta_value: string;
    value?: PostMeta;
}

export interface PostMetaInput extends Optional<PostMetaAttributes, 'meta_id' | 'meta_key'> {}

export interface PostMetaOutput extends Required<PostMetaAttributes> {}

class PostMeta extends Model<PostMetaAttributes, PostMetaInput> implements PostMetaAttributes {
    public meta_id!: number
    public post_id!: number
    public meta_key!: string;
    public meta_value!: string;
    public value!: PostMeta;
}

PostMeta.init({
    meta_id: {
        type: DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true,
        field: "meta_id"
    },
    post_id: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    meta_key: {
        type: DataTypes.STRING,
        allowNull: false
    },
    meta_value: {
        type: DataTypes.STRING,
        allowNull: false
    },
}, {
    sequelize: sequelizeConnection,
    paranoid: true,
    tableName: "wp_postmeta",
    timestamps: false,
})

PostMeta.belongsTo(PostMeta, {
    foreignKey: "meta_value",
    targetKey: "meta_id"
})

export default PostMeta;