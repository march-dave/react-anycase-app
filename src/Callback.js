import { nodeInternals } from "stack-utils";

콜백 사용법 1)
let a = function() {
    console.log('A')
}

function slowfunc(callback) {
    callback();
}

slowfunc(a);

콜백 사용법 2)
node.js 에서 사용 할때

data.txt = '안녕하세요 동기, 비동기' 있다고 가정 하고

let fs = require('fs');
console.log(1);
let data = fs.readFileSync('data.txt',  {encoding: 'utf8'});
console.log(data);

console.log(2);
fs.readFile('data.txt', {}, function(err, data) {
    console.log(3);
    console.log(data);
})
console.log(4);

실행 결과 
1 
'안녕하세요 동기, 비동기'
2
4 
3 
'안녕하세요 동기, 비동기'