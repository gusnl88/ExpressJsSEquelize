const BoardsService=require("../../model/service/BoardService");
const boardService=new BoardsService();
describe("BoardsService test",()=>{
    test("List",async ()=>{
        // let page=1;
        let reqParams={
            field:"status", //검색할 칼럼
            value:"public", //검색할 칼럼의 값
            page:"1",
            orderField:"b_id",
            orderDirect:"desc"

        };
        // const pageVo=new PageVo(page,reqParams);

        const boards=await boardService.list(reqParams);
        console.log(JSON.stringify(boards,"boardsEntity",2))
    })
    test("detail join",async ()=>{
       const board= await boardService.detail(6);
        console.log(JSON.stringify(board,"boardEntity",2))
        //user 를 호출할 때 Lazy Loading 지연로딩이 발생!!(게으른 연산!!)
        //필요할때만 쿼리를 실행(조회하기 떄문)하기떄문에 데이터 낭비가 없다.
        // //단점 : join 보다 느리다.
        // const user=await board.getUser();
        // console.log(JSON.stringify(user,"usersEntity",2))
        const replies=await board.getReplies();
        console.log(JSON.stringify(replies,"boardRepliesEntity",2))

    })

})