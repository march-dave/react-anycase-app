// let arr = ['abc', 'bcd', 'efg']
// arr.map( (cur) => )
// arr.some( (cur) => )
// arr.reducer( (cur) => )
// arr.forEach( () => )
// const result = arr.filter( () => )
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
//         1) I + X ==> 11
//         2) ( I * 2 ) ==> -2
//         3) 11 - 2 ==> 9
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

// 16. 3Sum Closest
// /**
//  * @param {number[]} nums
//  * @param {number} target
//  * @return {number}
//  */
// var threeSumClosest = function(nums, target) {
//     // nums = [-1, 2, 1, -4]
//     // target = 1
//     // 배열중 3개의 값을 더해서 target 값이 나오는 배열을 찾기
//     // [-1, 2, 1] 는 -1 + 2 + 1 ==> 2 이지만 target = 1 의 가장 가까운 값 2를 반환! 
//     // 2019-12-15 어떻게 풀어야 하나. 모르겠네. 
//     // 2019-12-17 3 개의 배열값을 더해서 기준값과 비교(절대값) 해서 크면 k 에서 빼고 반대로 작으면 j를 올리고
//     // 그런데 아직 
//     // 순서를 한번은 정렬을 하고 Submit을 통과 못했다. [1, 1, 1, 0], -100 일때 2를 반환 해야하는데 3을 반환!! 
//     nums.sort( (a, b) => a - b );
    
//     // let sum = 0;
//     let res = null;
//     let j = 0, k = 0;
//     let diff = 9999; // 처음에 그냥 어마 어마 하게 큰 랜덤값을 넣어 둔다.
    
//     for(let i=0; i<nums.length - 2; i++) {    
//          j = i+ 1;   // 시작 다음 부터
//          k = nums.length - 1;    // 꼬리 부터
        
//         while( j < k ) {
//             // 3개를 더해서 target의 가까운 값이면 된다
//             let sum = nums[i] + nums[j] + nums[k];

//             let newDiff = sum - target;
   
//             if(Math.abs(newDiff) < diff) res = sum;
//             diff = Math.min(Math.abs(newDiff), diff);
            
//             if(newDiff >= 0) k--;
//             else j++;
//         }
//     }
//     return res;
// };

// 26. Remove Duplicates from Sorted Array
/**
 * @param {number[]} nums
 * @return {number}
 */
// var removeDuplicates = function(nums) {
    
//     // 입력이 nums = [0,0,1,1,1,2,2,3,3,4] 반환은 5 중복값은 제거 하고
    
//     var count = 0;
//     for(var i = 1 ; i < nums.length ; i++){
//         if(nums[count] != nums[i]){
//             count++;
//             nums[count] = nums[i];
//         }
//     }    
//     return ++count;
    
// };

// 27. Remove Element

/**
 * @param {number[]} nums
 * @param {number} val
 * @return {number}
 */
// var removeElement = function(nums, val) {
//     // Given nums = [3,2,2,3], val = 3, 3 을 배열에서 제거 하고
//     // nums = [2,2] 배열에 길이는 2가 반환
    
//     // Given nums = [0,1,2,2,3,0,4,2], val = 2,
//     // nums = [0,1,3,0,4] 길이가 5가 반환
    
// //     let res = nums.filter( cur => cur !== val );
// //     return res.length;
    
//     for(let i=0; i<nums.length; i++) {
        
//         if (nums[i] === val) { 
//             nums.splice(i, 1);
//             i--;
//         }
        
//     }
    
//     return nums.length;
    
// };


// 1285. Element Appearing More Than 25% In Sorted Array
/**
 * @param {number[]} arr
 * @return {number}
 */
// var findSpecialInteger = function(arr) {
//     // 배열중 25% 이상 나타는것 정수로 반화하기
//     // 배열을 한번씩 돌면서 해쉬에 넣고 키(숫자) 값(증가값)을 만들면
    
//     let hashMap = {};
//     let max = 1;
    
//     for(let i=0; i<arr.length; i++) {
//         if(hashMap[arr[i]]) {
//             hashMap[arr[i]]++;
//         } else {
//             hashMap[arr[i]] = 1;
//         }
//     }
    
    
//     for (let char in hashMap) {
//       if (hashMap[char] > max) {
//         // max = hashMap[char];
//           max = char;
//       }
//     }
    
//     return max;
// };


// 17. Letter Combinations of a Phone Number

// /**
//  * @param {string} digits
//  * @return {string[]}
//  */
// var letterCombinations = function(digits) {₩
    
//     // digits = 23
//     // 배열 반환 2 와 3 에 해당하는 배열의 조합을 반환
//     // ad, ae, af // bd, be, bf // cd, ce, cf
//     // 이거는 서로 막연결 하나? 방법이 안떠오르네...
//     // 먼저 해쉬 만들고, 해쉬는 만들고 나서 항상 헷갈린다.
    
//     // 2 - abc
//     // 3 - def
//     // 4 - ghi
//     // 5 - jkl
//     // 6 - mno
//     // 7 - pqrs 
//     // 8 - tuv
//     // 9 - wxyz
    
//     let obj = {
//         1: '',
//         2: 'abc',
//         3: 'def',
//         4: 'ghi',
//         5: 'jkl',
//         6: 'mno',
//         7: 'pqrs',
//         8: 'tuv',
//         9: 'wxyz'
//     }
// };

// function reverseStr(str) {
//     if( str === '' ) return '';
//     return reverseStr(str.substring(1)) + str[0];
// }
  
// console.log( reverseStr('cat') );

// const getLetters = (digit) => {
//     const m = {
//       '2': 'abc', '3': 'def',
//       '4': 'ghi', '5': 'jkl', '6': 'mno',
//       '7': 'pqrs', '8': 'tuv', '9': 'wxyz' 
//     }
//     return m[digit];
//   }
  
//   const letterCombinations  = (digits) => {
//     if(digits.length === 0)  return [];
//     const letters = getLetters(digits[0]).split('');
//     const comb = letterCombinations(digits.slice(1))
//     return comb.length === 0 
//       ? letters.slice(0) 
//       : letters.reduce((acc, letter) => {
//         const tmp = comb.map(ele => letter + ele)
//         return [...acc, ...tmp]
//       }, []);
//   }

// 18. 4Sum
// /**
//  * @param {number[]} nums
//  * @param {number} target
//  * @return {number[][]}
//  */
// var fourSum = function(nums, target) {
    
//     //nums = [1, 0, -1, 0, -2, 2], target = 0 이면
//     // 2차원 배열을 4개를 합쳐서 0이 되는 배열을 반환 한다.
//     // 요롷게
//     // [
//     //   [-1,  0, 0, 1],
//     //   [-2, -1, 1, 2],
//     //   [-2,  0, 0, 2]
//     // ]
    
// };

// 1->2->3->4->5 에서 n=2 이라면 뒤에서 두번째 것을 제거 하면
// 4를 제거 하고 1->2->3->5 를 반환한다.
// 19. Remove Nth Node From End of List
// var removeNthFromEnd = function(head, n) {
//     let runner = head;
//     let curr = head;
//     let prev = head;
//     let i = 0;
//     let counter = 0;
    
//     if(n === 0) return head;
    
//     while(runner) {
//         if(i<n) {
//             i++;
//         } else if(i === n) {
//             prev = curr;
//             curr = curr.next;
//         }
//         runner = runner.next;
//         counter++;
//     }
    
//     if(n === counter) {
//         return head.next;
//     }
    
//     prev.next = curr.next;
    
//     return head;
// }


//  링크드 리스트
// function Node(data) { 
//     this.data = data; 
//     this.next = null; 
// }
// function LinkedList() { 
//     var _length = 0; 
//     var _head = null; 
// }


// LinkedList.prototype.append = function(data) { 
//     var node = new Node(data); 
//     var curr; 
//     if( this._head == null ) { 
//         this._head = node; 
//     } else { 
//         curr = this._head; 
//         while( curr.next ) { 
//             curr = curr.next; 
//         } 
//         curr.next = node; 
//     } 
//     this._length ++; 
// }; 

// var list = new LinkedList(); 
// list.append(15); 
// list.append(10);

// LinkedList.prototype.removeAt = function(pos) { 
//     if( pos > -1 && pos < this._length ) { 
//         var curr = this._head; 
//         var prev, index = 0; 
//         if( pos === 0 ) { 
//             this._head = curr.next; 
//         } else { 
//             while( index++ < pos ) { 
//                 prev = curr; 
//                 curr = prev.next; 
//             } 
//             prev.next = curr.next; 
//         } 
//         this._length --; 
//         curr.next = null; 
//         return curr.data; 
//     } 
//     return null; 
// };


// 1299. Replace Elements with Greatest Element on Right Side
// Given an array arr, replace every element in that array with the greatest element among the elements to its right, and replace the last element with -1.

// After doing so, return the array.

// /**
//  * @param {number[]} arr
//  * @return {number[]}
//  */
// var replaceElements = function(arr) {
//     // 뭘 하라는 건지?
// };

// 20. Valid Parentheses
// Given a string containing just the characters '(', ')', '{', '}', '[' and ']', determine if the input string is valid.
// /**
//  * @param {string} s
//  * @return {boolean}
//  */
// var isValid = function(s) {
//     // 열고 닫고가 순서에 입각해서 매칭 하면  true 반환 아리면 false
//     // 입력 캐릭터의 숫자와 순서
//     // 도대체 이런 프로그래밍이 왜 필요 한지 모르겠다...ㅋㅋ
//     // 방법을 찾았다.
//     // 입력되는 s 를 배열에 push 를 한다. 그런데 경우에 따라 다시 꺼낸다.
//     // 여기서 핵심은 나열된 번호가 정해져 있다. 합이 5 가 된다. 
//     // 예를 들어 ( ==> 0, ) ==> 5, [ ==> 1, ] ==> 4 
//     // 첫번째 것은 스택에 넣고, 2번째 것은 합쳐서 5가 되면 
//     // 배열의 길이가 0 이면 합격
    
//     let stack = [];
//     for(let char of s) {
//         let i = '([{}])'.indexOf(char);
        
//         // 여기서 i 값을 잘 이용 하여야 한다.
//         if( i > -1 ) {
        
//             if (  i + stack[stack.length - 1] === 5 ) {
//                 stack.length--;
//             } else{
//                 stack.push(i);
//             }
               
//         }
        
//     }
//     return stack.length === 0;    
// };

// 21. Merge Two Sorted Lists

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
// var mergeTwoLists = function(l1, l2) {
//     if (l1 === null) {
//         return l2
//     } else if (l2 === null) {
//         return l1
//     }
    
//     if (l1.val > l2.val) {
//         [l1, l2] = [l2, l1] // Swap in place
//     }
//     l1.next = mergeTwoLists(l1.next, l2)
    
//     return l1 || l2
// };

// 22. Generate Parentheses
/**
 * @param {number} n
 * @return {string[]}
 */
// var generateParenthesis = function(n) {
//     // 3 개의 캐릭터가 묶여서 서로 다르게 반환 되게..그런데 몇 줄?
//     // 서로 다르게 나올 수 있는 경우의 수를 만들어야 하는 구나!!
//     // 일단 다음에 계속, DP 를 이용하기
//     let solution = [];
//     let genP = (leftP, rightP, partial) => {
        
//         if(leftP > rightP) return;
//         if(!leftP && !rightP) solution.push(partial);
//         if(leftP > 0) genP(leftP-1, rightP, partial+'(')
//         if(rightP > 0) genP(leftP, rightP-1, partial+')')
//     }
//     genP(n,n,''); 
//     return solution;
// };

// 45. Jump Game II
/**
 * @param {number[]} nums
 * @return {number}
 */
// var jump = function(nums) {
//     //  무슨 말인지 모르겠다. DP
    
// };


// length : i  1 2 3 4 5   6  7  8  9 
// price  : Pi 1 5 8 9 10 17 17 20 24

// var p = [0, 1, 5, 8, 9, 10, 17, 17, 20, 24, 30];
// function cutRod(p, n) {
//   var r = [0];
//   for (var j = 1; j <= n; j++) {
//     q = -1;
//     for (var i = 1; i <= j; i++) {
//       q = Math.max(q, p[i] + r[j - i]);
//     }
//     r[j] = q;
//   }
//   return r[n];
// }
// cutRod(p, 2); // 5
// cutRod(p, 3); // 8
// cutRod(p, 4); // 10
// cutRod(p, 7); // 18

// R4 = (R4+P0, R3+P1, R2+P2, R1+P3, R0+P4) ==> (4+0, 3+1,2+5, 1+8, 0+9)


// R3 = max(R3+P0, 2+1, 1+5, 0+8) = 8입니다. 그런데 여기서 R3을 계산하기 위해서는 R2가 필요하다는 걸 알 수 있습니다. 그리고 R2를 계산 하기 위해서는 R1이 필요 하다. 이것이 DP 

// R0 = 0입니다. 길이가 0이면 뭘 팝니까? P0 = 0입니다. 
// R1 = 1입니다. R1 = P1이니까요. 참 조각의 가격을 Pi이라고 합시다. 위 표에도 그렇게 적어놨네요. 

// R2 = max(R2+P0, R1+P1, R0+P2) 입니다. R2 + P0 = R2 + 0 = R2 본인 자신이니까 첫 항은 삭제합니다. 
// R2 = max(R2+P0,    1+1,   0+5) 이니까, R2 = 5가 됩니다. 
// https://www.youtube.com/watch?v=TwsP3C4bJ9s


// 23. Merge k Sorted Lists
// Merge k sorted linked lists and return it as one sorted list. Analyze and describe its complexity.

/**
 * Definition for singly-linked list.
 * function ListNode(val) {
 *     this.val = val;
 *     this.next = null;
 * }
 */
/**
 * @param {ListNode[]} lists
 * @return {ListNode}
 */
// var mergeKLists = function(lists) {
//     // 이건 무슨 말인지도 모르겠다.
// };

// 5307. Convert Integer to the Sum of Two No-Zero Integers
/**
 * @param {number} n
 * @return {number[]}
 */
// var getNoZeroIntegers = function(n) {
//      입력이 2 라면, 출력은 배열 [1, 1]   
//   };

// 24. Swap Nodes in Pairs
/**
 * Definition for singly-linked list.
 * function ListNode(val) {
 *     this.val = val;
 *     this.next = null;
 * }
 */
/**
 * @param {ListNode} head
 * @return {ListNode}
 */
// var swapPairs = function(head) {
//      
//
// };


// Graph: 알고리즘은 변하지 않고 그래프 화해서 처리 한다.
// 저장 방법 인접 행렬, 인접 리스트 

// Graph 탐색 목적: 임의의 Vertex 에서 시작 해서 연결 되어 있는 Vertex를 한번씩 모두 방문 하는것, 만약 두번 방문 하면 Graph 아니다.
// BFS: 수평 : Queue, Graph 제일 중요, 
// BFS는 모든 가중치가 1일때 최단 거리를 구할 수 있다.



// BFS: simple code : O(E)
// queuq<int> q;
// check[1] = true; q.push(1);
// while(!q.empty()) {
    // int x = q.fornt(); q.pop();
    // for(int i=1; i<=n; i++) {
    // if(a[x][i] == 1 && check[i] == false) {
        //     check[i] = true;
        //     q.push(i);
        // }
    // }
// }

// BFS 인접 리스트 방법 무존껀 좋다
// queuq<int> q;
// check[1] = true; q.push(1);
// while(!q.empty()) {
    // int x = q.fornt(); q.pop();
    // for(int i=0; i<=a[x].size; i++) {
    // int y = a[x][i];    
    // if(check[y] == false) {
        // check[y] = true; q.push(y);
        // }
    // }
// }
            
            
// DFS: 수직 : Stack O(V ^ 2)
// 인접 행렬 방법
// void dfs(int x) {
    // check[x] = true;
    // for(int i=1; i<n; i++) {
        // if(a[x][i] == 1 && check[i] == false) {
            // dfs(i);
        // }
    // }
// }

// 인접 리스트 방법: Stack O(V + E) or O(E)
// 차이점은 다음 정점을 찾는다.
// void dfs(int x) {
    // check[x] = true;
    // for(int i=1; i<a[x].size(); i++) {
        // int y = a[x][i];
        // if(check[y] == false) {
            // dfs(y);
        // }
    // }
// }

// 트리는 그래프이기도 하다
// 자료구조
// 사이클이 없는 연결 그래프
// 루트의 정의가 없다 그렇지만 루트가 있을 수 있다. (젤 중요)
// 정점의 개수 V
// 간선의 개수 V-1
// 그래프 표현과 같은 방식으로 저장 할 수 있다.
// 트리에서 루트가 있다면 트리만의 방식으로 저장 할 수 있다.

// 트리의 순회
// 그래프의 경우는 DFS, BFS 라면
// 트리는 DFS, BFS 그리고
// 프리오더(DFS), 인오더(잘 안쓴다), 포스트 오더(젤 중요, DP, 세그먼트)를 쓸수 있다.
// 차이는 노드를 언제 방문 할꺼냐
// 프리오더 ( 왼쪽 자식노드를 루트, 또는 오른쪽 자식으로 루트로 지정)
// 인오더: ( 왼쪽 자식노드를 루트, 또는 오른쪽 자식으로 루트로 지정)
// 포스트 오더 ( 왼쪽 자식노드를 루트, 또는 오른쪽 자식으로 루트로 지정)


// 인오더
//        A
//      B    C
//  D     E     F
//     G
// DBGEACF

// 포스트 오더
//        A
//      B    C
//  D     E     F
//     G
// DGEBFCA

// 프리오더
//        A
//      B    C
//  D     E F   G
//     
// ABDECFG

// 힙, 큐           8
// 해시, 스택        9
// 탐색             8
// 정렬, DP        11

// let fs = require('fs');
// let input = fs.readFileSync('/dev/stdin').toString().split(' ');
// let a = parseInt(input[0]);
// let b = parseInt(input[1]);
// console.log(a+b);


/**
 * @param {number[]} nums
 * @return {void} Do not return anything, modify nums in-place instead.
 */
// 이코드는 이해 하고 외워두자!!
// var nextPermutation = function(nums) {
    
//     // 문제의 의미는 다음 순열을 뽑아 내는 것이다.
//     // 1,2,3 의 다음 순열은 1,3,2
//     if (nums.length < 2) return nums;
    
//     // find the i point to the element right before the decreas string
//     var i = nums.length - 2;
//     while(i >= 0 && nums[i] >= nums[i + 1]) {
//         i--;
//     }
      
//     if (i < 0) return nums.reverse();
    
//     // find j to swap
//     var j = i + 1;
//     for (j; j < nums.length; j++) {
//         if (nums[j] <= nums[i]) {
//             break;
//         };
//     }
//     --j;
 
//     //swap i, j
//     [nums[i], nums[j]] = [nums[j], nums[i]];
//     // reverse the decreasing string
//     reverse(nums, i + 1, nums.length - 1);
//  };
 
//  function reverse(nums, left, right) {
//     while(left < right) {
        
//         [nums[left], nums[right]] = [nums[right], nums[left]];
//         left++;
//         right--;
//     }
//  }

// DP  N으로 표현
// function solution(N, number) {
//     var answer = 0;
//     return answer;
// }

// 46. Permutations
/**
 * @param {number[]} nums
 * @return {number[][]}
 */
// var permute = function(nums) {
    // const res = [];

    // const go = (cur, rest) => {
    //     if (!rest.length) {
    //     res.push(cur);
    //     return;
    //     }

    //     for (let i = 0; i < rest.length; i++) {
    //     // note if using array push and splice here, it will cause mutation
    //     go(
    //         [...cur, rest[i]],
    //         [...rest.slice(0, i), ...rest.slice(i + 1)],
    //     );
    //     }
    // };

    // go( [], nums );
    // return res;
// };

//33. Search in Rotated Sorted Array
/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number}
 */
// var search = function(nums, target) {
//     let l = 0;
//     let r = nums.length - 1;
  
//     while (l <= r) {
//       const m = ~~((l + r) / 2);
  
//       if (nums[m] === target) return m;
  
//       // When dividing the rotated array into two halves, one must be sorted
//       // Check if the left side is sorted
//       if (nums[l] <= nums[m]) {
//         if (nums[l] <= target && target <= nums[m]) r = m - 1; // target is in the left
//         else l = m + 1; // target is in the right
//       } else {
//         if (nums[m] <= target && target <= nums[r]) l = m + 1; // target is in the right
//         else r = m - 1; // target is in the left
//       }
//     }
//     return -1;
//   };

// 1342. Number of Steps to Reduce a Number to Zero
/**
 * @param {number} num
 * @return {number}
 */
// var numberOfSteps  = function(num) {
//     var i = 0;
    
//     while(num != 0) {
//         if ( (num % 2) == 0 ) {
//            i++; 
//             num = num / 2;
//         } else {
//             i++;
//             num -= 1;
//         } 
//     }
//     return i;
// };

// 70. Climbing Stairs
/**
 * @param {number} n
 * @return {number}
 */

// var memo = [];
// var climbStairs = function(n) {
    
//     if(n <= 2) return n;
//     else if (memo[n] > 0) {
//         return memo[n];
//     }
//     memo[n] = climbStairs(n - 1) + climbStairs(n - 2);
//     return memo[n];
// };

// var rob = function(nums) {
    
//     var memo = [];
//     memo[0] = 0;
//     memo[1] = nums[0];
    
//     for(var i=1; i<nums.length; i++) {
//         // 햐 참 기가 차다. 이걸 처음 생각해 낸 놈은!!
//         memo[i+1] = Math.max(memo[i], memo[i - 1] + nums[i]);
//     }
    
//     return memo[nums.length];
// };


// var uniquePaths = function(m, n) {
//     let dp=[];
//     for (let i = 0; i <= m; i++) {
//         dp[i] = [];
//     }
//     dp[0][0]=0;
//     for(let i=1;i<=m;i++){
//         for(let j=1;j<=n;j++){
//         if(i===1) dp[i][j]=1;
//         if(j===1) dp[i][j]=1;
//         if(i!==1&&j!==1) dp[i][j]=dp[i][j-1]+dp[i-1][j];
//         }
//     }
//     return dp[m][n];
// };

// var smallerNumbersThanCurrent = function(nums) {
    
//     var l = [];
//     var ret = [];
    
//     for(let i=0; i<nums.length; i++) {       
//         l = nums.filter( c => c < nums[i] );
//         ret.push(l.length);
//     }
//     return ret;
// };

// var uniquePathsWithObstacles = function(obstacleGrid) {
//     console.log(obstacleGrid);
// };

// return (BigInt(digits.join('')) + 1n).toString().split(''); 

// for(let i of num1) {
//     result = result + i;
// }

// for(let j of num2) {
//     result = result + j;
// }


// var isSameTree = function(p, q) {
//     if (!p && !q) return true;
//     if (!p || !q || p.val !== q.val) return false;

//     return isSameTree(p.left, q.left) && isSameTree(p.right, q.right);
// };

// var isSymmetric = function(root) {
//     // 이건 도대체 어떻게 푸는거냐?
//     // binary tree or not check 
//      return helper(root, root)
// };

// const helper = function(p, q) {
//     if (p == null && q == null)
//         return true
//     if (p == null || q == null)
//         return false
//     return p.val == q.val && helper(p.left, q.right) && helper(p.right, q.left)
// }