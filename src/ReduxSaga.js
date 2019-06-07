// function *foo() {
//     try {
//         var x = yield 3;
//         console.log( "x: " + x ); // may never get here!
//     }
//     catch (err) {
//         console.log( "Error: " + err );
//     }
// }

// var it = foo();

// var res = it.next(); // { value:3, done:false }

// // instead of resuming normally with another `next(..)` call,
// // let's throw a wrench (an error) into the gears:
// it.throw( "Oops!" ); // Error: Oops!

// saga란 action에 대한 listener이다.
// 음… 액션 리스너구나. 이벤트 리스너같은 것이군.