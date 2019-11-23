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