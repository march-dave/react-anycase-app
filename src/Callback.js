// 콜백 사용법 1)
// 함수를 만들고 변수?에 넣는다. 나중에 사용 하려고
// let a = function() {
//     console.log('A')
// }

// 함수를 만들고 인자를 받는다. 함수의 인자는 변수던 함수던 인자는 막 받아주는것이 자바스크립트
// 여기서는 인자의 이름은 아무 이름 이라도 상관 없다.  dfjalskjdsflkjsa 라고 한들 OK
// 다만 인자에서 받은 것이 함수라고 가정 하에 그리고 내용상 함수 여야 하는데 
// 받은 인자를 실행? ~~~() 하면 된다.
// function slowfunc(callback) {
//     callback();
// }

// 그러면 함수 이름에 인자를 내가 최초에 지정한 함수의 변수? 를 넘겨 주면 된다.
// slowfunc(a);

// 콜백 사용법 2)
// node.js 에서 사용 할때

// data.txt = '안녕하세요 동기, 비동기' 있다고 가정 하고

// let fs = require('fs');
// console.log(1);
// let data = fs.readFileSync('data.txt',  {encoding: 'utf8'});
// console.log(data);

// console.log(2);
// fs.readFile('data.txt', {encoding: 'utf8'}, function(err, data) {
//     console.log(3);
//     console.log(data);
// })
// console.log(4);

// 실행 결과 
// 1 
// '안녕하세요 동기, 비동기'
// 2
// 4 
// 3 
// '안녕하세요 동기, 비동기'

// call back log 찍기

function myFunc() {
return 'func';
}

async function myAsync() {
return 'async'
}

myAsync().then( (result) => {
    console.log(result)
}  )

console.log(myFunc());
console.log(myAsync());