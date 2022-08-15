### Single Number
Input: [2,2,1] <br />
Output: 1 <br />

```
var singleNumber = function(nums) {
    
    var total = 0;
    
    for(var i = 0; i < nums.length; i++){
        var num = nums[i];
        total ^= num;
    }
    
    return total;
     
};
```

### Maximum Subarray
Input: [-2,1,-3,4,-1,2,1,-5,4] <br />
Output: 6 <br />

```
var maxSubArray = function(nums) {
    var sum = 0;
    var maxSum = -Infinity;
    
    for(var i = 0; i < nums.length; i++){
        sum += nums[i];
        maxSum = Math.max(maxSum, sum);
        
        if(sum < 0){
            sum = 0;
        }
    }
    
    return maxSum;
};
```



### Middle of the Linked List

```
var middleNode = function(head) {
    let fast = slow = head;
    while (fast && fast.next) {
        fast = fast.next.next;
        slow = slow.next;
    }
    return slow;
};
```

### Backspace String Compare
```
var backspaceCompare = function(S, T) {
    
    // 반복문, 불변식
    // 초기 조건
    let SS = [];
    for(let i=0; i<S.length; i++) {
        if( S[i] !== '#' ) {
            SS.push( S[i] );
        } else {
            SS.pop( S[i] );
        }
    }
    
    let TT = [];
    for(let j=0; j<T.length; j++) {
        if( T[j] !== '#' ) {
            TT.push( T[j] );
        } else {
            TT.pop( T[j] );
        }
    }
    // 유지 조건
    return (SS.join('') === TT.join(''));
    
};
```

### Min Stack

```
/**
 * initialize your data structure here.
 */
var MinStack = function() {
    this.elements = [];
};

/** 
 * @param {number} x
 * @return {void}
 */
MinStack.prototype.push = function(x) {
  this.elements.push({
    value: x,
    min: this.elements.length === 0 ? x : Math.min(x, this.getMin()),
  });
};
/**

 @return {void}
 */
MinStack.prototype.pop = function() {
  this.elements.pop();
};
/**

 @return {number}
 */
MinStack.prototype.top = function() {
  return this.elements[this.elements.length - 1].value;
};
/**

 @return {number}
 */
MinStack.prototype.getMin = function() {
  return this.elements[this.elements.length - 1].min;
};
```


### Last Stone Weight
```
var lastStoneWeight = function(stones) {
    if(!stones || stones.length == 0) return 0
    
    while(stones.length > 1) {
        stones.sort((a, b) => b - a)
        let x = stones.shift() - stones.shift()
        stones.push(x)
    }
    
    return stones[0]
};
```

### Contiguous Array
```
var findMaxLength = function(nums) {
    if (nums.length < 2) return 0;
    const sums = [0];
    const maxIndexes = { '0': 0 };
    for (let i = 0; i < nums.length; i++) {
        sums.push(sums[i] + (nums[i] || -1));
        maxIndexes[sums[i + 1]] = i + 1;
    }
    let max = 0;
    for (let i = 0; i < sums.length; i++) {
        max = Math.max(max, maxIndexes[sums[i]] - i);
        if (max >= sums.length - i - 1) break;
    }
    return max;
};
```

## Product of Array Except Self
```
var productExceptSelf = function(nums) {
    
    var output = [];
    var leftMult = 1;
    var rightMult = 1;
    for (var i=nums.length - 1; i >= 0; i--) {
        output[i] = rightMult;
        rightMult *= nums[i];
    }
    for (var j=0; j < nums.length; j++) {
        output[j] *= leftMult;
        leftMult *= nums[j];
    }
    return output;
    
};
```


###  Valid Parenthesis String
```
let stack = 0;
    for (let i = 0; i < s.length; i ++) {
        let character = s[i];
        if (character === '(' || character === '*') {
            stack ++;
        } else if (character === ')') {
            if (stack < 1) {
                return false;
            } else {
                stack --;
            }
        }
    }
    
    stack = 0;
    for (let i = s.length - 1; i >= 0; i --) {
        let character = s[i];
        if (character === ')' || character === '*') {
            stack ++;
        } else if (character === '(') {
            if (stack < 1) {
                return false;
            } else {
                stack --;
            }
        }
    }
    
    return true
```


### Minimum Path Sum
```
var minPathSum = function(grid) {
    // Get the two dimensions of the grid
    const n = grid.length;
    const m = grid[0].length;
    
	// Calculate the distance travelled within the first column
	// This is because each square depends on the one above
	// And the one to the left. However there is nothing left
	// of the first column so we can calculate it by adding
	// the current square to the square above it
    for(let i=1; i<n; i++) {
        grid[i][0] += grid[i-1][0];
    }
    
	// The same goes for the first row. There is nothing above the 
	// first row. So we just calculate the distance by what is to the left
	// of it
    for(let j=1; j<m; j++) {
        grid[0][j] += grid[0][j-1];
    }
    
	// Start one row and one column in because we've precomputed
	// those above
    for(let i=1; i<n; i++) {
        for(let j=1; j<m; j++) {
			// The distance to the grid at i,j is equal to itself plus the minimum
			// of the two grid spaces (one above, one to the left)
            grid[i][j] += Math.min(grid[i-1][j], grid[i][j-1]);
        }
    }
    
	// Return the distance bottom right corner
    return grid[n-1][m-1];
};
```

### Search in Rotated Sorted Array
```
var search = function(nums, target) {
  let l = 0;
  let r = nums.length - 1;

  while (l <= r) {
    const m = ~~((l + r) / 2);

    if (nums[m] === target) return m;

    // When dividing the rotated array into two halves, one must be sorted
    // Check if the left side is sorted
    if (nums[l] <= nums[m]) {
      if (nums[l] <= target && target <= nums[m]) r = m - 1; // target is in the left
      else l = m + 1; // target is in the right
    } else {
      if (nums[m] <= target && target <= nums[r]) l = m + 1; // target is in the right
      else r = m - 1; // target is in the left
    }
  }
  return -1;
};
```


### Construct Binary Search Tree from Preorder Traversal
```
var bstFromPreorder = function(preorder) {
    
    if (!preorder.length) return null
    
    const [root, ...rest] = preorder
    
    const rootNode = new TreeNode(root)
    rootNode.left = bstFromPreorder(rest.filter(n => n < root))
    rootNode.right = bstFromPreorder(rest.filter(n => n > root))
    
    return rootNode
};

```

###  Leftmost Column with at Least a One
```

```

### Subarray Sum Equals K
```
var subarraySum = function(nums, k) {
    if (!nums || !nums.length) return 0;
  
    var sums = {0:1};
  
    var currentSum = 0;
    var count = 0;
    for(var i = 0; i < nums.length; i++){
        
  	    currentSum += nums[i];
         if(sums[currentSum - k]) count += sums[currentSum - k];
        sums[currentSum] = (sums[currentSum] ? sums[currentSum] + 1 : 1);
    }
    return count;
};
```


### Bitwise AND of Numbers Range
```
var rangeBitwiseAnd = function(m, n) {
    // number of shifts we had to make
    let i = 0;
	
    // go until m and n are equal
    while (m !== n) {
        // right shift both m and n
        m >>= 1;
        n >>= 1;
        // that's 1 more shift
        i++;
    }
	
    // pad 0's on right of m by right shifting by i
    return (m <<= i);
};
```

### Jumpe Game 
``
var canJump = function(nums) {
  let idx = 0;
  let max = 0;
  let target = nums.length - 1;

  while(idx < nums.length) {
    max = Math.max(max, idx + nums[idx]);
    
    if (max >= target) {
      return true;
    }
    
    if (max <= idx && nums[idx] === 0) {
      return false;
    }
    
    idx++;
  }
  
  return false;
};
``

###  Longest Common Subsequence
```

```

### Maximal Square
```

```

### First Unique Number
```

```

### Binary Tree Maximum Path Sum
```
var max = -Number.MAX_VALUE;
  getMaxSum(root);
  return max;
  function getMaxSum(node) {
    if (!node) return 0;
    var leftSum = getMaxSum(node.left);
    var rightSum = getMaxSum(node.right);
    max = Math.max(max, node.val + leftSum + rightSum);
    return Math.max(0, node.val + leftSum, node.val + rightSum);
  }
```

### Check If a String Is a Valid Sequence from Root to Leaves Path in a Binary Tree
```

```

### No more access for 30 Days coding challenge

### No more access for 30 Days coding challenge

### No more access for 30 Days coding challenge

### No more access for 30 Days coding challenge

### No more access for 30 Days coding challenge

### No more access for 30 Days coding challenge

### No more access for 30 Days coding challenge

### No more access for 30 Days coding challenge

### No more access for 30 Days coding challenge

### No more access for 30 Days coding challenge

### No more access for 30 Days coding challenge

### No more access for 30 Days coding challenge

### No more access for 30 Days coding challenge

### No more access for 30 Days coding challenge

### No more access for 30 Days coding challenge

### No more access for 30 Days coding challenge

### No more access for 30 Days coding challenge

### No more access for 30 Days coding challenge

### No more access for 30 Days coding challenge

### No more access for 30 Days coding challenge

### No more access for 30 Days coding challenge

### No more access for 30 Days coding challenge

### No more access for 30 Days coding challenge

### No more access for 30 Days coding challenge

### No more access for 30 Days coding challenge

### No more access for 30 Days coding challenge

### No more access for 30 Days coding challenge

### No more access for 30 Days coding challenge

### No more access for 30 Days coding challenge

### No more access for 30 Days coding challenge

### No more access for 30 Days coding challenge

### No more access for 30 Days coding challenge

### No more access for 30 Days coding challenge

### No more access for 30 Days coding challenge

### No more access for 30 Days coding challenge

### No more access for 30 Days coding challenge

### No more access for 30 Days coding challenge

### No more access for 30 Days coding challenge

### No more access for 30 Days coding challenge

### No more access for 30 Days coding challenge

### No more access for 30 Days coding challenge

### No more access for 30 Days coding challenge

### No more access for 30 Days coding challenge

### No more access for 30 Days coding challenge

### No more access for 30 Days coding challenge

### No more access for 30 Days coding challenge

### No more access for 30 Days coding challenge

### No more access for 30 Days coding challenge

### No more access for 30 Days coding challenge

### No more access for 30 Days coding challenge

### No more access for 30 Days coding challenge

### No more access for 30 Days coding challenge

### No more access for 30 Days coding challenge

### No more access for 30 Days coding challenge

### No more access for 30 Days coding challenge

### No more access for 30 Days coding challenge

### No more access for 30 Days coding challenge

### No more access for 30 Days coding challenge

### No more access for 30 Days coding challenge

### No more access for 30 Days coding challenge

### No more access for 30 Days coding challenge

### No more access for 30 Days coding challenge

### No more access for 30 Days coding challenge

### No more access for 30 Days coding challenge

### No more access for 30 Days coding challenge

### No more access for 30 Days coding challenge

### No more access for 30 Days coding challenge

### No more access for 30 Days coding challenge

### No more access for 30 Days coding challenge

### No more access for 30 Days coding challenge

### No more access for 30 Days coding challenge

### No more access for 30 Days coding challenge

### No more access for 30 Days coding challenge

### No more access for 30 Days coding challenge

### No more access for 30 Days coding challenge

### No more access for 30 Days coding challenge

### No more access for 30 Days coding challenge

### No more access for 30 Days coding challenge

### No more access for 30 Days coding challenge

### No more access for 30 Days coding challenge

### No more access for 30 Days coding challenge

### No more access for 30 Days coding challenge

### No more access for 30 Days coding challenge

### No more access for 30 Days coding challenge

### No more access for 30 Days coding challenge

### No more access for 30 Days coding challenge

### No more access for 30 Days coding challenge

### No more access for 30 Days coding challenge

### No more access for 30 Days coding challenge

### No more access for 30 Days coding challenge

### No more access for 30 Days coding challenge

### No more access for 30 Days coding challenge

### No more access for 30 Days coding challenge

### No more access for 30 Days coding challenge

### No more access for 30 Days coding challenge

### No more access for 30 Days coding challenge

### No more access for 30 Days coding challenge

### No more access for 30 Days coding challenge

### No more access for 30 Days coding challenge

### No more access for 30 Days coding challenge

### No more access for 30 Days coding challenge

### No more access for 30 Days coding challenge

### No more access for 30 Days coding challenge

### No more access for 30 Days coding challenge

### No more access for 30 Days coding challenge

### No more access for 30 Days coding challenge

### No more access for 30 Days coding challenge
## master branch

### 213. House Robber II
Input: nums = [2,3,2] <br />
Output: 3 <br />
```
var rob = function(nums) {
  let length = nums.length;
  if (length == 0) return 0;
  if (length == 1) return nums[0];
  
  let dp = [nums[0], Math.max(nums[0], nums[1])] ;
  let dp2 = [0, nums[1]];
  
  for(let i=2; i<nums.length; i++) {
      dp[i] = i == (length - 1) ? dp[i-1] : Math.max(dp[i-1], dp[i - 2] + nums[i])
      dp2[i] = Math.max(dp2[i-1]  , dp2[i - 2] + nums[i])
  }
  
  return Math.max(dp[length-1], dp2[length-1])
};
```

### No more access for 30 Days coding challenge

### No more access for 30 Days coding challenge

### No more access for 30 Days coding challenge

### No more access for 30 Days coding challenge

### No more access for 30 Days coding challenge

### No more access for 30 Days coding challenge

### No more access for 30 Days coding challenge

### No more access for 30 Days coding challenge


### 5. Longest Palindromic Substring
Input: s = "babad" <br />
Output: "bab" <br />
```
var longestPalindrome = function(s) {
    let maxSub = '';
    
    const bubbleFromCenter = (left, right) => {
        while(left >= 0 && right < s.length && s[left] === s[right]) {
            left--;
            right++;
        }
        return s.slice(left+1, right)
    }
    
    for(let i = 0; i < s.length; i++) {
        const sub1 = bubbleFromCenter(i, i);        // odd palindrome
        const sub2 = bubbleFromCenter(i, i+1);      // even palindrome
        const sub = sub1.length > sub2.length ? sub1 : sub2
        if(sub.length > maxSub.length) {
            maxSub = sub
        }
    }
    return maxSub
};
```

### No more access for 30 Days coding challenge

### No more access for 30 Days coding challenge
### No more access for 30 Days coding challenge

### No more access for 30 Days coding challenge
### No more access for 30 Days coding challenge
   
### No more access for 30 Days coding challenge
### No more access for 30 Days coding challenges
