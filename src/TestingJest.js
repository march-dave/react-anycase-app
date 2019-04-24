// # Case 1
// function sum(a, b) {
// 	return a + b;
// }

// var result = sum(1, 2);
// var expected = 5;

// if (result !== expected) {
// 	throw new Error(result + ' is not equal to ' + expected);
// }

// expect(result).toBe(expected)


// # Case 2
// function sum(a, b) {
// 	return a + b;
// }

// function expect(result) {
//   return {
//     toBe: function(expected) {
//       if (result !== expected) {
//       	throw new Error(result + ' is not equal to ' + expected);
//       }
//     }
//   }
// }

// test('adds 1 + 2 to equal 3', () => {
//     expect(sum(1, 2)).toBe(3);
// });


// # Case 3

// test('object assignment', () => {
//     const data = { one: 1};
//     data['two'] = 2;
//     expect(data).toEqual({one: 1, two: 2});
// });

// test('adding positive numbers is not zero', () => {
//     for (let a = 1; a < 10; a++) {
//         for (let b = 1; b < 10; b++) {
//             expect(a + b).not.toBe(0);
//         }
//     }
// });

// test('null', () => {
//     const n = null;
//     expect(n).toBeNull();           // only null
//     expect(n).toBeUndefined();      // only undefined 
//     expect(n).not.toBeUndefined();  // opposite of toBeUndefined
//     expect(n).not.toBeTruthy();     // Anything that an if statement treats as true  
//     expect(n).toBeFalsy();          // Anything that an if statement treats as false 
//   });
  
//   test('zero', () => {
//     const z = 0;
//     expect(z).not.toBeNull();
//     expect(z).toBeDefined();
//     expect(z).not.toBeUndefined();
//     expect(z).not.toBeTruthy();
//     expect(z).toBeFalsy();
//   });

//   test('two plus two', () => {
//     const value = 2 + 2;
//     expect(value).toBeGreaterThan(3);
//     expect(value).toBeGreaterThanOrEqual(3.5);
//     expect(value).toBeLessThan(5);
//     expect(value).toBeLessThanOrEqual(4.5);

//     expect(value).toBe(4);
//     expect(value).toEqual(4);
// });

// test('adding floating point numbers', () => {
//     const value = 0.1 + 0.2;
//     expect(value).toBeCloseTo(0.3);
// });

// // Strings
// test('there is no I in team', () => {
//     expect('team').not.toMatch(/I/);
// });

// test('but there is a "stop" in Christoph', () => {
//     expect('Christoph').toMatch(/stop/);
// });


// const shoppingList = [
//     'diapers',
//     'kleenex',
//     'trash bags',
//     'paper towels',
//     'beer'
// ];

// test('the shopping list has beer on it', () => {
//     expect(shoppingList).toContain('beer');
// });


// Enzyme는 assertion을 위해 Chai와 Sinon을 사용하지만 
// Jest 에서 expect()와 jest.fn()을 내장하고 있기 때문에 꼭 사용할 필요는 없다.

//https://circleci.com/blog/continuously-testing-react-applications-with-jest-and-enzyme/