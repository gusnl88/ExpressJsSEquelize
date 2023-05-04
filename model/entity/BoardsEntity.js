// const sequelize=require("../WepAppBoardSequelize");
const {DataType , Sequelize , DataTypes} = require("sequelize");
module.exports = (sequelize) => {

    const boardsEntity = sequelize.define("boardsEntity" , {
        b_id: {
            type: DataTypes.INTEGER.UNSIGNED ,//UNSIGNED + - 가 없는것.
            primaryKey: true ,
            autoIncrement: true ,//자동으로 1씩증가
        } ,
        u_id: {
            type: DataTypes.STRING(255) ,
            allowNull: false ,
            references: {//참조하고 있다.
                model: "usersEntity" ,//table 명이아니라 모델명
                key: "u_id" ,
                onDelete: "CASCADE" ,
                onupdate: "CASCADE"
            }
        } ,
        post_time: {
            type: DataTypes.DATE ,
            defaultValue: Sequelize.literal("CURRENT_TIMESTAMP")
        } ,
        update_time: {
            type: DataTypes.DATE ,
            defaultValue: Sequelize.literal("CURRENT_TIMESTAMP OR UPDATE CURRENT_TIMESTAMP")
        } ,
        status: {
            type: DataTypes.ENUM("PUBLIC" , "PRIVATE" , "REPORT" , "BLOCK") ,
            defaultValue: "PUBLIC"
        } ,
        title: {
            type: DataTypes.STRING(255)
        } ,
        content: {
            type: DataTypes.TEXT ,
            allowNull: false
        } ,
        view_count: {
            type: DataTypes.INTEGER.UNSIGNED ,
            default: 0
        }
    } , {
        tableName: "boards" ,
        timestamps: false
    });

    return boardsEntity;
}
// module.exports=boardsEntity;