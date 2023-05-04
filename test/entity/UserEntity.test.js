const userEntity=require("../../model/entity/UsersEntity");
const {raw} = require("mysql2");

describe("UserEntity Test",()=>{
    test("findAll",async ()=>{
        const users=await userEntity.findAll();
        console.log(users);
    })
    test("findAll([u_id,pw,name])",async ()=>{
        const users=await userEntity.findAll({
            attributes:["u_id","pw","name"]
        });
        console.log(users);
    })
    test("findAll(where:permission)",async ()=>{
        const users=await userEntity.findAll({
            where:{
                permission: "admin"
            }
        });
        console.log(users);
    })
    test("findAll(paging)",async ()=>{
       //ORM 과 페이징
       //SQL (쿼리)이 공통규칙이 존재하는데 db 마다 조금씩 차이가 존재하고 특히 paging 과 함수가 많이 다르
        //ORM 이 데이터 베이스에 맞는 쿼리를 생성하기 떄문에 db가 바뀌어도 쿼리 수정이 필요없다.
       //oracle SELECT * FROM (SELECT *,ROWNUM r FROM (SELECT * FROM BOARD) b WHERE ROWNUM<=10) WHERE ROWNUM>=5
        //mysql SELECT * FROM BOARD LIMIT 5,5
        //oracle null data 체크하는 함수 NVL(칼럼,0)
        //mysql null data 체크하는 함수 INFULL(칼럼,0)
        const users=await userEntity.findAll({
            where:{permission: "admin"},
            offset:0,
            limit:5,
            order:[
                ["gender","asc"],
                ["name","asc"]
            ]

        })
        console.log(JSON.stringify(users,"usersEntity",2))
    });
        test("findByPk",async ()=>{
        const users=await userEntity.findByPk("user06");
        console.log(users);
    });
        test("create()등록 테스트",async ()=>{
            const users={
                "u_id": "testUser03",
                "pw": "1234",
                "name": "비공개회원",
                "phone": "9999999993",
                "img_path": "/img/users/testUser01.jpg",
                "email": "test03@acorn.co.kr",
                "birth": "1990-03-03",
                "gender": "MALE",
                "address": "서울시특별시",
                "detail_address": "강남",
                "permission": "PRIVATE"
            }
            let result;
            try {

                    result=await userEntity.create(users);
            }catch (e) {
                console.error(e)
            }
            console.log(result);
            // console.log(result._options.isNewRecord);
        })
    test("update 수정",async ()=>{
        const user={
            "name": "private 회원",
            "phone": "9999999993",
            "img_path": "/img/users/private회원.jpg",
            "email": "테스트유저03@acorn.co.kr",
            "birth": "1990-03-03",
            "gender": "MALE",
            "address": "경기도",
            "detail_address": "안양",
            "permission": "USER"
        };
        let result;
        try {
             result=await userEntity.update(user,{
                where:{
                    u_id:"testUser03"
                }
            });
        }catch (e) {
            console.error(e)
        }
        console.log(result);

    })
    test("destroy 삭제",async ()=>{
        let result;
        try {
            result=await userEntity.destroy({
                where:{
                    u_id:"testUser03"}
            })
        }catch (e) {
            console.error(e)
        }
        console.log(result)
    })
})