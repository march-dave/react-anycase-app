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
    // let left = 0;
    // let right = height - 1;
    // let maxWater = 0;
    
    // 루프 돌리고
    // var contain = (right-left)*Math.min(height[left],height[right]);
    //    maxWater = Math.max(contain, maxWater);

    
    // return maxWater;
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