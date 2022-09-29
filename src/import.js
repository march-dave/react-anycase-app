(data.js 파일)

var name1 = 'Kim';
var name2 = 'Park';
export { name1, name2 }


(App.js 파일)

import { name1, name2 } from './data.js';

// export { } 했던 것들은 import { } 쓸 때 자유작명이 불가능합니다. export 했던 변수명 그대로 적어야함 