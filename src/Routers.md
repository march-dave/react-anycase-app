npm install react-router-dom@6


import { BrowserRouter } from "react-router-dom";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
      <BrowserRouter>
        <App />
      </BrowserRouter>
  </React.StrictMode>
); 


(App.js)

import { Routes, Route, Link } from 'react-router-dom'

function App(){
  return (
    (생략)
    <Routes>
      <Route path="/detail" element={ <div>상세페이지임</div> } />
      <Route path="/about" element={ <div>어바웃페이지임</div> } />
    </Routes>
  )
}

<Link to="/">홈</Link>
<Link to="/detail">상세페이지</Link>
<Link to="/about">상세페이지</Link>



import { Routes, Route, Link, useNavigate, Outlet } from 'react-router-dom'

페이지 이동은 Link 써도 된다고 했는데 그게 못생겼으면 이거 쓰면 됩니다. 
function App(){
    let navigate = useNavigate()
    
    return (
      (생략)
      <button onClick={()=>{ navigate('/detail') }}>이동버튼</button>
    )
  }

navigate(2) 숫자넣으면 앞으로가기, 뒤로가기 기능개발도 가능합니다.
-1 넣으면 뒤로 1번 가기
2 넣으면 앞으로 2번 가기 기능입니다.

유저가 이상한 경로로 접속했을 때 "없는 페이지입니다" 이런거 보여주고 싶으면
<Route path="*" element={ <div>없는페이지임</div> } />

<Route path="*"> 하나 맨 밑에 만들어두면 됩니다.

* 경로는 모든 경로를 뜻해서
위에 만들어둔 /detail 이런게 아닌 이상한 페이지 접속시 * 경로로 안내해줍니다. 


서브경로 만들 수 있는 nested routes

<Route path="/about/member" element={ <div>멤버들</div> } />
<Route path="/about/location" element={ <div>회사위치</div> } />
이렇게 만들어도 되겠지만

<Route path="/about" element={ <About/> } >  
  <Route path="member" element={ <div>멤버들</div> } />
  <Route path="location" element={ <div>회사위치</div> } />
</Route>

function About(){
  return (
    <div>
      <h4>about페이지임</h4>
      <Outlet></Outlet>
    </div>
  )
}

App.js 컴포넌트에 
<Route path="/detail/:id" element={ <Detail shoes={shoes}/> }/>


import { useParams } from 'react-router-dom'

function Detail(){
  let {id} = useParams();
  console.log(id)
  
  return (
    <div className="container>
      <div className="row">
        <div className="col-md-6">
          <img src="https://codingapple1.github.io/shop/shoes1.jpg" width="100%" />
        </div>
        <div className="col-md-6 mt-4">
        <h4 className="pt-5">{props.shoes[id].title}</h4>
        <p>{props.shoes[0].content}</p>
        <p>{props.shoes[0].price}원</p>
        <button className="btn btn-danger">주문하기</button>
      </div>
    </div>
  </div>
  )
}