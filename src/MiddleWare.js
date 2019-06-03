// 미들웨어
// const logger = store => next => action => {
//     /* 미들웨어 내용 */
// const logger = (store) => {
//     return (next) => {
//         return (action) => {
//             if (typeof(action) !== 'undefined') {
//                 console.log("### action 실행 : ", 
//                     new Date().toLocaleTimeString(), JSON.stringify(action))
//             }            
//             return next(action);
//         }
//     }
// }
// }