// let arr = ['abc', 'bcd', 'efg']
// arr.map( (cur) => )
// arr.some( (cur) => )
// arr.reducer( (cur) => )
// arr.forEach( () => )
// arr.filter( () => )
// arr.fill()
// arr.includes( )


// for(let i=0; i<arr.length -1; i++) {}

// var subsets = function(nums) {
//     combine(nums.slice(0));
//   };
  
//   function combine(nums) {
//     while (nums.length) {
//       nums.shift();
//       combine(nums.slice(0));
//       console.log(nums);
//     }
//   }
  
//   subsets([1,2,3]);


// var subsets = function(nums) {
//     combine(nums.slice(0));
//   };
  
//   function combine(nums) {
//       while (nums.length) {
//       let r = nums.shift();
//       console.log(r, ':',  nums);
//       combine(nums.slice(0));
//     }
//   }
  
//   subsets([1,2,3]);


// function combine(nums) {
//     while (nums.length) {
//         nums.shift();
//         console.log(nums);
//         return combine(nums.slice(0));
//   }
// }

// combine([1,2,3])

// function combine(nums) {
//     while (nums.length) {
//         nums.shift();
//         console.log(nums);
//         return combine(nums);
//   }
// }

// combine([1,2,3])



// ---------------  return -----------
//     1 : [ 2, 3 ]
//     2 : [ 3 ]
//     3 : []
//     3 : []
//     2 : [ 3 ]
//     3 : []
//     3 : []
// ------------------------------------


// /**
//  * @param {number[]} nums
//  * @return {number}
//  */
// var singleNumber = function(nums) {
    
    // var singleNumber = function(nums) {
    
    //     var total = 0;
        
    //     for(var i = 0; i < nums.length; i++){
    //         var num = nums[i];
    //         total ^= num; // 햐... 이렇게 까지.
    //     }
        
    //     return total;
         
    // };

// Given an integer array nums, find the contiguous subarray (containing at least one number) which has the largest sum and return its sum.
    /**
 * @param {number[]} nums = [-2,1,-3,4,-1,2,1,-5,4]
 * @return {number} 6
 */
// var maxSubArray = function(nums) {
//     var sum = 0;
//     var maxSum = -Infinity;
    
//     for(var i = 0; i < nums.length; i++){
//         sum += nums[i];
//         maxSum = Math.max(maxSum, sum);
        
//         if(sum < 0){
//             sum = 0;
//         }
//     }
    
//     return maxSum;
// };


/**
 * @param {string} s
 * @return {number}
 */


// var lengthOfLongestSubstring = function(s) {
//     if(s === null || s.length === 0){
//         return 0;
//     }
    
//     var map = {};
//     var len = 0;
//     var maxLen = len;
//     var start = 0;

//     // scan from left to right.    
//     for(var i = start; i < s.length; i++){
//         c = s[i];

//         if(map[c] !== undefined && map[c] >= start) {
//             start = map[c] + 1; // start new search with repeated word's last location + 1
//             len = i - start; // real length -> from for example 3 to 5 is 3, so it's 5-3+1 and + 1 happens later
//         }
        
//         len++; // real length -> from for example 3 to 5 is 3, so it's 5-3+1 and + 1 happens later
        
//         if(len > maxLen){
//             maxLen = len;
//         }
        
//         map[c] = i;
//     }
    
//     return maxLen;
// };

// Given a string S, find the longest palindromic substring in S. You may assume that the maximum length of S is 1000, and there exists one unique longest palindromic substring.
// Amazon Microsoft Bloomberg
// Show Tags
// Show Similar Problems

/**
 * @param {string} s
 * @return {string}
 */



// var longestPalindrome = function(s) {
//     if(s === null || s.length === 0){
//         return "";
//     }    
    
//     var result = "";

//     // The reason to multiply by 2 is because 
//     // Palindrome can be in two forms
//     // 1. abba There will be case which center has two idenitical charachter,
//     //   And there will be maximum 2*n - 1 such case
//     // 2. aba There will be case which center has only one character
//     var len = 2*s.length - 1;
//     var left, right;
    
//     for(var i = 0; i < len; i++){
//         left = right = parseInt(i/2);
//         if(i%2 === 1){
//             right++;
//         }
        
//         var str = expandFromCenterAndCheckForPalindrome(s,left,right);
        
//         if(str.length > result.length){
//             result = str;
//         }
//     }
//     return result;
// };


// // other implementation

// var longestPalindrome = function(s) {
//     if(s === null || s.length === 0){
//         return "";
//     }    
    
//     var result = "";
//     var len = s.length;
//     var left, right;
    
//     for(var i = 0; i < len; i++){
//         left = right = i;

//         var str = expandFromCenterAndCheckForPalindrome(s,left,right);
//         if(str.length > result.length){
//             result = str;
//         }
//         var str = expandFromCenterAndCheckForPalindrome(s,left,right + 1);
//         if(str.length > result.length){
//             result = str;
//         }
//     }
//     return result;
// };



// var expandFromCenterAndCheckForPalindrome = function(s, left, right){
//     // in the case where left !== right
//     // that's the case "abba"
//     // which it checks for if b === b then a === a

//     // in the case where left === right
//     // that's the case "aba"
//     // which it check if b === b as left === right
//     // then a === a 
//     while(left >= 0 && right < s.length && s[left] === s[right]){
//         left--;
//         right++;
//     }
    
//     return s.substring(left+1, right);
// }

/**
 * @param {number[]} nums
 * @return {void} Do not return anything, modify nums in-place instead.
 */
// var moveZeroes = function(nums) {
    
//     let y = 0; // y is none zero pointer

//     // y only increase when i found a none zero number
//     // i only swap if i found a none zero number
//     for (var i = 0; i < nums.length; i++) {
//         if (nums[i] !== 0) {
//             var tmp = nums[i];
//             nums[i] = nums[y];
//             nums[y] = tmp;
//             y++;
//         }
//     }

// };
// console.log(moveZeroes([0,1,0,3,12]))


// 263. Ugly Number
// Write a program to check whether a given number is an ugly number.

// Ugly numbers are positive numbers whose prime factors only include 2, 3, 5.
/**
 * @param {number} num
 * @return {boolean}
 */
// var isUgly = function(num) {
    
//     if (num <= 0) return false;
//     if (num === 1) return true;
//     while (num % 2 === 0) num /= 2;
//     while (num % 3 === 0) num /= 3;
//     while (num % 5 === 0) num /= 5;
    
//     return num === 1;
// };


// 258. Add Digits
// Given a non-negative integer num, repeatedly add all its digits until the result has only one digit.

/**
 * @param {number} num
 * @return {number}
 */
// var addDigits = function(num) {
//     let arr = num.toString().split("");
//     return arr.length === 1 ? num : addDigits(arr.reduce( (p, c) => parseInt(p) + parseInt(c)    ) 
// };

// 2. Add Two Numbers
// You are given two non-empty linked lists representing two non-negative integers. The digits are stored in reverse order and each of their nodes contain a single digit. Add the two numbers and return it as a linked list.

// You may assume the two numbers do not contain any leading zero, except the number 0 itself.

/**
 * Definition for singly-linked list.
 * function ListNode(val) {
 *     this.val = val;
 *     this.next = null;
 * }
 */
/**
 * @param {ListNode} l1
 * @param {ListNode} l2
 * @return {ListNode}
 */
// var addTwoNumbers = function(l1, l2) {
    
//     // l1 = 243 --> 342
//     // l2 = 564 --> 465
//     // 342 + 465 = 807
    
    
// };


// 8. String to Integer (atoi)

/**
 * @param {string} str
 * @return {number}
 */
// var myAtoi = function(str) {
    
//     let arr = str.trim().split(' ');
    
//     let num = 0;
//     let r_num = 0;
    
//      if (arr[0].match(/\d+/g) != undefined) {
//          num = parseInt(arr[0])
//      }
    
//     ( num > 0 ) ?  r_num = Math.min( Math.pow(2, 31) - 1, num) : 
//                     r_num = Math.max( Math.pow(2, 31) | 0, num);
    
//     if ( isNaN(r_num) ) {
//         r_num = 0;
//     }
//     return r_num;
// };


// 11. Container With Most Water

// /**
//  * @param {number[]} height
//  * @return {number}
//  */
// var maxArea = function(height) {
//     let left = 0; // 왼쪽
//     let right = height - 1; // 오른쪽
//     let maxWater = 0; // 반환될 가장 많은 물의 양 값
    
//     // 루프 돌리고 어디까지 돌리냐면? 왼쪽과 오른쪽이 만나기 전까지
//     while( left < right ) {
//     let contain = (right-left)*Math.min(height[left],height[right]);
//        maxWater = Math.max(contain, maxWater);
        
//          여기서는 하나씩 배열의 값을 변경 해준다.
//          왼쪽이 크면 오른쪽 빼고
//          오른쪽이 크면 왼쪽 빼고
        
//         if ( height[left] > height[right] ) {
//             right--;
//         } else {
//             left--;
//         }
//     }
    
//     return maxWater;
// };

// Write a function to find the longest common prefix string amongst an array of strings.


/**
 * @param {string[]} strs
 * @return {string}
 */
// var searchRange = function(nums, target) {
    
//     let arr = [];
//     let r_arr = [];
    
//     arr = nums.map( (cur, idx) =>  { if (cur === target) return idx }  ).filter( c => c !== undefined );
    
//     if (arr.length > 1) {
//         return r_arr.concat(arr[0]).concat(arr[arr.length-1]);
//     } else if (arr.length == 1) {
//         return arr.concat(arr);
//     } else {
//         return [-1, -1];
//     }
// };

// 15. 3Sum
// Given an array nums of n integers, are there elements a, b, c in nums such that a + b + c = 0? Find all unique triplets in the array which gives the sum of zero.
/**
 * @param {number[]} nums
 * @return {number[][]}
 */
// var threeSum = function(nums) {
    
//     nums.sort( (a, b) => a -b )
    
// };


// 12. Integer to Roman
/**
 * @param {number} num
 * @return {string}
 */
// var intToRoman = function(num) {
    
//     // num 이 IIII --> 4 이면 --> IV
//     // num 이 9 --> IX
//     // 3 까지는 III, 4 부터는 IX, 그래서 9 라면 IX ( 10 에서 하나 빼기 )
//     // 같은 방법으로 90 이면 100 에서 하나 빼고
//     // 40 이면 50 에서 하나 뺀다.
//     // 1994 M, CM, XC, IV
//     // 58 L, IIX --> VIII
//     // I             1
//     // V             5
//     // X             10
//     // L             50
//     // C             100
//     // D             500
//     // M             1000
    
//     // 4 로 나눠서 0 이 나오면
//    1, 5,  (num % 4 === 1) 이면 I, V - 1,  
//    10, 50  (num % 4 === 2) X - 1,
//     (num % 4 === 2) 이면 L - 10, 
//    100 (num % 4 === 4)    C - 100, 
//    500  (num % 4 === 20)  D - 1,  
//    1000 (num % 4 === 40)  M - 1   
//     // 58 LVIII
//     // 1994 MCMXCIV
//     // integer convert to a roman numeral
//     // 범위 1 to 3999
// };

// 13. Roman to Integer
/**
 * @param {string} s
 * @return {number}
 */
// var romanToInt = function(s) {
    
//     // s 는 I, V, IX, LVIII ... 처럼 로마체가 넘어온다
//     // 그것을 숫자로 변경 하는 것이 임무
    
//     let obj = {
//         I: 1,
//         V: 5,
//         X: 10,
//         L: 50,
//         C: 100,
//         D: 500,
//         M: 1000
//     }
   
//     let res = 0;
//     for(let i=0; i<s.length; i++) {
        
//         // 뒤에 값이 더 크다면 (IX) 앞에 값의 곱하기 2를 빼준다. 왜냐면 아래쪽에서 항상 숫자를 더한다.
//         if(  obj[s[i-1]] < obj[s[i]] ) {
//             res -= 2 * obj[s[i-1]];
//         }
        
//         res += obj[s[i]]
//     }
    
//     return res;
// };

// 15. 3Sum
// /**
//  * @param {number[]} nums
//  * @return {number[][]}
//  */
// var threeSum = function(nums) {
    
//     nums.sort( (a, b) => { return a - b } )
    
    // 조건
    // 배열에서 3개를 더해서 0 만들기
    // 같은 배열 요소를 2번 쓰지 아니 한다
    
    // 경우 3- 1)
    // 배열 요소중 0 이 있으면
    // + 와 - 대칭 하는 값이 있는지 찾는다
    
    // 경우 3 - 2)
    // 배열 요소중 0 이 아니지만 
    // 중간값과 양쪽으로 - 와 - 가 합쳐서 대칭이 되는 경우
    // 이런 경우는 중간값이 짝수 만 가능 하다 2(-1, -1), 4(-2, -2), 6(-3, -3), 8(-4, -4) ..
    
    // 경우 3 - 3) 이건 사실 좀 거시기 하네 
    // 배열 요소가 0 이 아니지만 
    // 그냥 전체를 더해서 0 이 되는 경우

    // 다 필요 없고 기준점 1개를 정해서
    // 2개를 더해서 기준점과의 합이 0 이 되면 된다.
    // let res = [];
    
    // // nums = [-1, 0, 1, 2, -1, -4],
    // // sorting 하고 나서 nums = [-4, -1, -1, 0, 2, 1],
    // let j = 0, k=0;
    // for(let i=0; i<nums.length-2; i++) {
        
    //     let tar = 0 - nums[i];
        
    //     j = i + 1;
    //     k = nums.length - 1;
        
    //     while(j < k) {
            
    //         if (tar === nums[j] + nums[k] ) {
    //             res.push([nums[i], nums[j], nums[k]])
            
    //             j++;
    //             k--;

    //             while (j < k && nums[j] === nums[j - 1]) j++;
    //             while (j < k && nums[k] === nums[k + 1]) k--;
                
    //         } else if (nums[j] + nums[k] < tar) {
    //             j++;
    //         } else {
    //             k--;
    //         }
    //     }
    // }
    
    // return res;

// };

// 1. Two Sum

// var twoSum = function(nums, target) {
    // let hash = {};
    // for(let i = 0; i < nums.length; i++) {
    //     let num = nums[i]; // 2, 7, 11, 15
    //     if(hash[num] !== undefined) {   // 
    //         return [hash[num], i];  // [0, 1] // 햐!!! 별것을 다 생각해 내야 하네
    //     } else {
    //         hash[target - num] = i;  // hash[9-2] = 0, hash[9-7] = 1, hash[9-11] = 3, hash[9-15] = 4
    //     }                            // hash[7] = 0, hash[2] = 1
    // }
    
//     return [];
// };

// 3. Longest Substring Without Repeating Characters
// Input: "abcabcbb"
// Output: 3 
// /**
//  * @param {string} s
//  * @return {number}
//  */
// var lengthOfLongestSubstring = function(s) { 
//     // 반복 안되는 문자열의 길이 반환하기
//     let res = '';
    
//     for(let i=0; i<s.length; i++) {
        
//         // 여기서 반복이 안되면 res 대입 하면 된다
//         if (res[res.length] !== s[i]) {
//             res += s[i];    
//         }
        
        
//     }
    
//     return res.length;
// };

// 4. Median of Two Sorted Arrays
/**
 * @param {number[]} nums1
 * @param {number[]} nums2
 * @return {number}
 */
// var findMedianSortedArrays = function(nums1, nums2) {
    
//     let a = nums1[nums1.length - 1];
//     let b = nums2[0];
    
//     return (a + b) / 2; 
    
// };