# Installer Site

<!-- 인테리어 -->

schema
title
createAt
그림그리고 완성버튼 -> [객체:{그림이름:String(url),위도,경도,색상}]
도면도 여부
도면도: 그림:String (url)
meta:
view
like

<!-- global -->

/
/join
/login

<!-- user -->

method:get /user/:id -> profile see
method:post /user/edit -> profile edit (특정 유저만 보이기 때문에)
method:delete /user/delete ->delete profile (특정 유저만 보이기 때문에)
/user/github/start ->social login(github)
/user/github/finish ->social login(github)
/user/kakao/finish ->social login(kakao)
/user/kakao/finish ->social login(kakao)

<!-- interior -->

/interior -> choose btn

<!-- 도면X -->

/interior/:id -> see
/interior/:id/delete -> delete
/interior/:id/edit ->edit
method:get /interior/create -> create interior

<!-- 도면존재 -->

/interior/floor/:id ->see
/interior/floor/:id/delete -> delete
/interior/floor/:id/edit ->edit
/interior/floor/create -> create

<!-- ranking -->

/rank/
/rank/:id -> see

<!-- notice -->

/notice/upload
/notice/:id
/notice/:id/edit
/notice/:id/delete
/notice/:id/report ->신고기능

<!-- function -->

그림: 사각형,원,삼각형,직선,곡선 -> 위치 옮기기 -> 색 입히기
초기화,정확한 높이,넓이 입력시 그림으로 나타내기,확대,축소
가격(계산기),지우개

<!-- 작성일 간소화 -->
<!-- 에러메세지 나오게 하는거 고민중 -->
