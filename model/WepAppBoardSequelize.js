const {Sequelize}=require("sequelize");
//mysql2 모듈을 사용해서 접속이 가능하고 mysql2.pool 기능을 사용 가능.
//db 접속은 Sequelize 모듈이 직접한다.
//Sequelize : orm 기반으로 정의한 entity 로 query 를 생성하는 모듈
const sequelize=new Sequelize("webAppBoard","boardServerDev","mysql123",{
    host:"localhost",
    port:3306,
    dialect:"mysql",
    pool:{
        max:5, //접속자 5명
        min:0,  //접속이 없어도 접속을 유지하라
        acquire: 30000, //db 접속하는데 까지 기다려주는 시간
        idle:10000 //유저리스트를 가져오는데 까지 기다려주는 시간
    },
    logging:true //자동으로 생성하는 쿼리를 로그로 출력 (성능저하가 있기 때문에 배포시 false)
});
module.exports=sequelize;
