// export const sqrt = Math.sqrt;
// export function square(x) {
//     return x * x;
// }

// export function diag(x, y) {
//     return sqrt(square(x) + square(y));
// }

// import {square} from  'lib';
// console.log(square(11));
// console.log(square(4, 3));

// import * from 'lib';
// console.log(square(11));
// console.log(square(4, 3));


// export default function() {...}
// import myFunction from 'myFunc';
// myFunc();


// import Main from 'main';
// con lib = {message: "This Is A Lib"};
// export { lib as Lib };


// Utiliites.js
// export function cube(x) {
//     return x * x * x;
//   }
// export const foo = Math.PI + Math.SQRT2;

// App.js
// import { cube, foo } from 'Utilities';
// console.log(cube(3)); // 27
// console.log(foo);    // 4.555806215962888

// Or

// import * as utilities from 'Utilities';
// console.log(utilities.cube(3)); // 27
// console.log(utilities.foo);    // 4.555806215962888


// Utility.js
// export default function cube(x) {
//     return x * x * x;
//   };

// App.js
// import sdfjsdljfsad from 'cube';
// console.log(sdfjsdljfsad(3)); // 27