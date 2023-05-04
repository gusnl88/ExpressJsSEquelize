const{Sequelize,DataTypes}=require("sequelize");

module.exports=(sequelize)=>{
    const boardRepliseEntity=sequelize.define("boardRepliseEntity",{
        br_id:{
            type:DataTypes.INTEGER.UNSIGNED,
            primaryKey:true,
            autoIncrement:true,//자동으로 1씩증가
        },
        b_id:{
            type:DataTypes.INTEGER.UNSIGNED,
            allowNull:false,
            references: {//참조하고 있다.
                model: "boardsEntity" ,//table 명이아니라 모델명
                key: "b_id" ,
                onDelete: "CASCADE" ,
                onupdate: "CASCADE"
            }
        },
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
        parent_br_id:{
            type:DataTypes.INTEGER.UNSIGNED,
            allowNull:false,
            references: {//참조하고 있다.
                model: "boardRepliseEntity" ,//table 명이아니라 모델명
                key: "br_id" ,
                onDelete: "CASCADE" ,
                onupdate: "CASCADE"
            }
        },
        post_time:{
            type: DataTypes.DATE ,
            defaultValue: Sequelize.literal("CURRENT_TIMESTAMP")
        },
        update_time:{
            type: DataTypes.DATE ,
            defaultValue: Sequelize.literal("CURRENT_TIMESTAMP OR UPDATE CURRENT_TIMESTAMP")
        },
        status:{
            type:DataTypes.ENUM("PUBLIC","PRIVATE","REPORT","BLOCK"),
            defaultValue:"PUBLIC"
        },
        img_path:{
            type: DataTypes.STRING(255),
        },
        content: {
            type: DataTypes.TEXT ,
            allowNull: false
        } ,

    },{
        tableName:"board_replies",
        timestamps:false
    })


    return boardRepliseEntity;
}