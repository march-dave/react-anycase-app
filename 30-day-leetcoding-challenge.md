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


### 647. Palindromic Substrings
Input: s = "abc" <br />
Output: 3 <br />
```
var countSubstrings = function(s) {
   
    let n = s.length;
    let dp = [...Array(n)].map( () => Array(n).fill(false));
    let count = 0;
    
    // 1
    for(let i=0; i<n; i++) {
        dp[i][i] = true;
        count++
    }
    
    // 2
    for(let i=0; i<n-1; i++) {
        dp[i][i+1] = s[i] === s[i+1]
        dp[i][i+1] && count++
    }
    
    // more than 3
    for(let len=3; len<=n; len++) {
        let start = 0, end = start + len - 1
        while(start < n) {
            dp[start][end] = s[start] === s[end] && dp[start+1][end-1]
            dp[start][end] && count++
            
            console.log('start, end: ', start, end)
            start++, end++
        }
    }
    
    return count
};
```

### No more access for 30 Days coding challenges


### 91. Decode Ways
Input: s = "12" <br />
Output: 2 <br />
```
var numDecodings = function(s) {
    if (s == null || s.length === 0) return 0;
    if (s[0] === '0') return 0;

    const dp =[...Array(s.length+1)].fill(0)
    
    dp[0] = 1;
    dp[1] = 1;

    for (let i = 2; i <= s.length; i++) {
    const a = Number(s.slice(i - 1, i));  // last one digit
    if (a >= 1 && a <= 9) {
      dp[i] += dp[i - 1];
    }

    const b = Number(s.slice(i - 2, i));  // last two digits
        if (b >= 10 && b <= 26) {
          dp[i] += dp[i - 2];
        }
    }

    return dp[s.length];
};

```

### No more access for 30 Days coding challenges


### 322. Coin Change
Input: coins = [1,2,5], amount = 11 <br />
Output: 3 <br />
```
var coinChange = function(coins, amount) {
    let dp = new Array(amount + 1).fill(amount + 1);
    dp[0] = 0;
    
    for (let i = 0; i < coins.length; i++) {
        for (let j = coins[i]; j <= amount; j++) {
            dp[j] = Math.min(dp[j], dp[j - coins[i]] + 1);
        }   
    }
    return dp[amount] === amount + 1 ? -1 : dp[amount];
};
```

### 139. Word Break
Input: s = "leetcode", wordDict = ["leet","code"] <br />
Output: true <br />

Input: s = "applepenapple", wordDict = ["apple","pen"] <br />
Output: true <br />

```
var wordBreak = function(s, wordDict) {
    let dp = new Array(s.length + 1).fill(false);
    dp[0] = true;

    for(let i = 0; i <= s.length; i++){
        if(dp[i] === true){
            for(let word of wordDict){
                if(s.slice(i, i + word.length) === word){
                    dp[i + word.length] = true;
                }
            }
        }
    }
    return dp[s.length];
};
```

### No more access for 30 Days coding challenges


### 300. Longest Increasing Subsequence
Input: nums = [10,9,2,5,3,7,101,18] <br />
Output: 4 <br />

```
var lengthOfLIS = function(nums) {
    let dp = new Array(nums.length).fill(1)
    let longest = 1;
    
    for(let i=0; i<nums.length; i++) {
        for(let j=0; j<i; j++) {
            if(nums[j] < nums[i]) {
                dp[i] = Math.max(dp[i], dp[j] + 1)
                longest = Math.max(dp[i], longest)
            }
        }
    }
    
    return longest
};
```

### 62. Unique Paths
Input: m = 3, n = 2 <br />
Output: 3 <br />

```
var uniquePaths = (m, n) => {
    let dp = new Array(n + 1).fill(1);
    
    for(let row = m - 1; row > 0; row--){
        for(let col = n - 1; col > 0; col--){
            dp[col] = dp[col] + dp[col + 1];
        }
    }
    return dp[1];
};


var uniquePaths = (m, n) => {
    let dp = Array(m).fill(Array(n).fill(1))

    for(let i=0; i<m; i++) {
        for(let j=0; j<n; j++) {
            if(i == 0 || j == 0) {
                dp[i][j] = 1;
            } else {
                 dp[i][j] =  dp[i-1][j] + dp[i][j-1]; 
            }
        }
    }

    return  dp[m-1][n-1]
};
```

### 1143. Longest Common Subsequence
Input: text1 = "abcde", text2 = "ace" <br />
Output: 3  <br />

```
var longestCommonSubsequence = function(text1, text2) {
    let dp = Array(text1.length+1).fill(0).map( ()  => Array(text2.length+1).fill(0))
    
    for(let i=1; i<=text1.length; i++) {
        for(let j=1; j<=text2.length; j++) {
            if (text1[i-1] == text2[j-1]) {
                dp[i][j] = dp[i-1][j-1] + 1    
            } else {
                dp[i][j] = Math.max(dp[i-1][j], dp[i][j-1])
            }
                
        }
    }
    
    return dp[text1.length][text2.length]
    
};

```

### 226. Invert Binary Tree
Input: root = [4,2,7,1,3,6,9] <br />
Output: [4,7,2,9,6,3,1] <br />

```
var invertTree = function(root) {
    
    if(root == null) return;
        
    let temp = root.left;
    root.left = root.right;
    root.right = temp;
    
    invertTree(root.left);
    invertTree(root.right);
    
    return root;
};
```

### 104. Maximum Depth of Binary Tree
Input: root = [3,9,20,null,null,15,7] <br />
Output: 3  <br />

DFS(Recursion)
```
var maxDepth = function(root) {
    if(root == null) return 0;
    return 1 + Math.max(maxDepth(root.left), maxDepth(root.right));
};
```

BFS
```
var maxDepth = function(root) {
    if(!root) return 0;
    // using BFS and counting levels
    // not recommended to use array as queue
    let levels = 0, queue = [];
    queue.push(root);
    
    while(queue.length > 0){
        let count = queue.length;
        
        for(let i = 0; i < count; i++){
            const node = queue.shift();
            if(node.left) queue.push(node.left);
            if(node.right) queue.push(node.right);
        }
        levels++;
    }
    return levels;
};
```

### 100. Same Tree
Input: p = [1,2,3], q = [1,2,3] <br />
Output: true <br />

```
var isSameTree = function(p, q) {
    if (p === null && q === null) return true
    if( (p === null && q) || (p && q === null) || (p.val !== q.val) ) return fals
    return isSameTree(p.left, q.left) && isSameTree(p.right, q.right)
};
```

### 572. Subtree of Another Tree
Input: root = [3,4,5,1,2], subRoot = [4,1,2] <br />
Output: true <br />

```
var isSubtree = function(root, subRoot) {
    if (root === null) return false;  
    if(isSameTree(root, subRoot)) return true;
    return isSubtree(root.left, subRoot) || isSubtree(root.right, subRoot);
};

function isSameTree(root, subRoot) {
    if(root === null && subRoot === null) return true;
    if(root === null || subRoot === null ) return false;
    if(root.val != subRoot.val) return false;
    
    return isSameTree(root.left, subRoot.left) && isSameTree(root.right, subRoot.right);
}
```

### 235. Lowest Common Ancestor of a Binary Search Tree
Input: root = [6,2,8,0,4,7,9,null,null,3,5], p = 2, q = 8 <br />
Output: 6 <br />

```
var lowestCommonAncestor = function(root, p, q) {
    if(root === null){
        return null;
    }
    if(p.val<root.val && q.val<root.val) {
        return lowestCommonAncestor(root.left, p, q);
    } else if(p.val>root.val && q.val>root.val) {
        return lowestCommonAncestor(root.right, p, q);
    } else {
        return root;
    }
};
```

### 102. Binary Tree Level Order Traversal
Input: root = [3,9,20,null,null,15,7] <br />
Output: [[3],[9,20],[15,7]] <br />

```
var levelOrder = function(root) {
    if(!root) return [];
 
    let queue = [root];
    let output = []
    
    while(queue.length){
        let count = queue.length;
        let temp = []
        for(let i = 0; i<count; i++){
            const node = queue.shift();
            console.log('node.val', node.val)
            temp.push(node.val)
            if(node.left) queue.push(node.left);
            if(node.right) queue.push(node.right);
        }
        output.push(temp)
    }
    return output;
};
```

### 98. Validate Binary Search Tree
Input: root = [2,1,3] <br />
Output: true <br />

```
// T.C: O(N)
// S.C: O(H)
var isValidBST = function (root) {
    return validate(root, null, null);
};

function validate(root, max, min) {
    if (!root) {
        return true;
    } else if (
        (max !== null && root.val >= max) ||
        (min !== null && root.val <= min)
    ) {
        return false;
    } else
        return (
            validate(root.left, root.val, min) &&
            validate(root.right, max, root.val)
        );
}
```

### 230. Kth Smallest Element in a BST
Input: root = [3,1,4,null,2], k = 1 <br />
Output: 1 <br />

```
var kthSmallest = function (root, k) {
	let stack = [];
	dfs(root);
	return stack[k - 1];

	function dfs(root) {
		if (!root) {
			return null;
		}

		dfs(root.left);
		stack.push(root.val);
		dfs(root.right);
	}
};
```

### 105. Construct Binary Tree from Preorder and Inorder Traversal
Input: preorder = [3,9,20,15,7], inorder = [9,3,15,20,7] <br />
Output: [3,9,20,null,null,15,7] <br />

```
function buildTree(preorder, inorder) {
    if (!preorder.length || !inorder.length) return null;

    let root = new TreeNode(preorder[0]);
    let mid = inorder.indexOf(preorder[0]);

    root.left = buildTree(preorder.slice(1, mid + 1), inorder.slice(0, mid));
    root.right = buildTree(preorder.slice(mid + 1), inorder.slice(mid + 1));
    return root;
}
```

### 124. Binary Tree Maximum Path Sum
Input: root = [-10,9,20,null,null,15,7] <br />
Output: 42 <br />

```
var maxPathSum = function(root) {
  let max = -Number.MAX_VALUE;
  getMaxSum(root);
  return max;

  function getMaxSum(node) {
    if (!node) return 0;
    let leftSum = getMaxSum(node.left);
    let rightSum = getMaxSum(node.right);
    max = Math.max(max, node.val + leftSum + rightSum);
    return Math.max(0, node.val + leftSum, node.val + rightSum);
  }
};
```


### 297. Serialize and Deserialize Binary Tree

### 200. Number of Islands
Input: grid = [
  ["1","1","1","1","0"],
  ["1","1","0","1","0"],
  ["1","1","0","0","0"],
  ["0","0","0","0","0"]
] <br />
Output: 1 <br />

```
var numIslands = function(grid) {
    let count = 0;
    
    for(let i=0; i<grid.length; i++) {
        for(let j=0; j<grid[i].length; j++) {
            if(grid[i][j] == '1') {
                count++;
                DFS(grid, i, j);
            }
        }
    }
    
    return count;
};

function DFS(grid, i, j) {
    if(i<0 || j<0 || i >= grid.length || j >= grid[i].length) {
        return;
    }
    
    if(grid[i][j] === '0') return;
    
    if(grid[i][j] === '1')
        grid[i][j] = '0';
  
    DFS(grid, i, j+1);
    DFS(grid, i, j-1);
    DFS(grid, i+1, j);
    DFS(grid, i-1, j);
}
```

### 133. Clone Graph
Input: adjList = [[2,4],[1,3],[2,4],[1,3]] <br />
Output: [[2,4],[1,3],[2,4],[1,3]] <br />

```
var cloneGraph = function(node) {
    var hash = {};
    let dfs = function(node) {
        if (!node) return node;
        if (hash[node.val] != null) return hash[node.val];
        
        let clone = new Node(node.val);
        hash[node.val] = clone;

        for (let n of node.neighbors) {
            clone.neighbors.push(dfs(n));
        }
         
        return clone;
    }
    
    return dfs(node);
};
```


### 417. Pacific Atlantic Water Flow
Input: heights = [[1,2,2,3,5],[3,2,3,4,4],[2,4,5,3,1],[6,7,1,4,5],[5,1,1,2,4]] <br />
Output: [[0,4],[1,3],[1,4],[2,2],[3,0],[3,1],[4,0]] <br />

```
var pacificAtlantic = function(matrix) {
 if (matrix.length === 0) return [];
  
  const pacific = [];
  const atlantic = [];
  const result = [];
  
  for (let i = 0; i < matrix.length; i++) {
    pacific[i] = Array(matrix[0].length).fill(0);
    atlantic[i] = Array(matrix[0].length).fill(0);
  }
  
  // top and botom
  for (let i = 0; i < matrix[0].length; i++) {
    dfs(matrix, 0, i, Number.MIN_SAFE_INTEGER, pacific);
    dfs(matrix, matrix.length - 1, i, Number.MIN_SAFE_INTEGER, atlantic);
  }
  
  // left and right
  for (let i = 0; i < matrix.length; i++) {
    dfs(matrix, i, 0, Number.MIN_SAFE_INTEGER, pacific);
    dfs(matrix, i, matrix[0].length - 1, Number.MIN_SAFE_INTEGER, atlantic);
  }
  
  for (let i = 0; i < matrix.length; i++) {
    for (let j = 0; j < matrix[0].length; j++) {
      if (pacific[i][j] === 1 && atlantic[i][j] === 1) {
        result.push([i, j]);
      }
    }
  }
  
  return result;
};

function dfs(matrix, row, col, previous, ocean) {
  // if we're looking at a valid matrix position
  if (!isValid(matrix, row, col)) return;
  
  // ocean can't reach
  if (matrix[row][col] < previous) return;

  // the ocean was already here
  if (ocean[row][col] === 1) return;
  
  ocean[row][col] = 1;
  dfs(matrix, row + 1, col, matrix[row][col], ocean);
  dfs(matrix, row - 1, col, matrix[row][col], ocean);
  dfs(matrix, row, col + 1, matrix[row][col], ocean);
  dfs(matrix, row, col - 1, matrix[row][col], ocean);
}

function isValid(matrix, row, col) {
  const rowIsValid = row >= 0 && row < matrix.length;
  const colIsValid = col >= 0 && col < matrix[0].length;
  return rowIsValid && colIsValid;
};
```

### 207. Course Schedule
Input: numCourses = 2, prerequisites = [[1,0]] <br />
Output: true <br />

```
var canFinish = function(numCourses, prerequisites) {
    let indegree = Array(numCourses).fill(0);
    let queue = []
    let count = 0;
    
    for(let [course, prereq] of prerequisites) {
        indegree[course] += 1;
    }
    
    for(let i=0; i<indegree.length; i++) {
        if(indegree[i] == 0) {
            queue.push(i);
        }
    }
    
    while(queue.length != 0) {
        let c = queue.pop();
        count += 1;
        
        for(let [course, prereq] of prerequisites) {
            if(prereq == c) {
                indegree[course] -= 1;
                if (indegree[course] == 0) {
                    queue.push(course);
                }
            }
        }
        
    }
    
    return count == numCourses;
  };
  ```


### 1448. Count Good Nodes in Binary Tree
Input: root = [3,1,4,3,null,1,5] <br />
Output: 4 <br />

```
var goodNodes = function(root) {
    let good = 0;n.n
    function trav(node, max){
        if(!node) return;
        if(node.val >= max) ++good;
        max = Math.max(max, node.val);
        trav(node.left, max);
        trav(node.right, max); 
    }
    trav(root, root.val);
    return good;
};
```

### 637. Average of Levels in Binary Tree
Input: root = [3,9,20,null,null,15,7] <br />
Output: [3.00000,14.50000,11.00000] <br />

```
var averageOfLevels = function(root) {
    if(!root) return [];
 
    let queue = [root];
    let output = []
    
    while(queue.length) {
        let count = queue.length;
        let temp = []
        let sum = 0;
        
        for(let i = 0; i<count; i++){
            const node = queue.shift();
            sum += node.val;
            temp.push(node.val)
            if(node.left) queue.push(node.left);
            if(node.right) queue.push(node.right);            
        }
        output.push( sum / count )
    }
    return output;
};
```

### 33. Search in Rotated Sorted Array

Input: nums = [4,5,6,7,0,1,2], target = 0 <br />
Output: 4 <br />

```
var search = function(nums, target) {
    let left = 0;
    let right = nums.length - 1;
    
    while(left <= right) {
        let mid = Math.floor((left+right) / 2);
        
        if(nums[mid] == target) {
            return mid;
        }
        
        if(nums[left] <=nums[mid]) {
            if(nums[left] <= target && target <= nums[mid]) {
                right = mid - 1;
            } else {
                left = mid + 1
            }
        }
        else {
            if(nums[mid] < target && target <= nums[right]) {
                left = mid + 1;
            } else {
                right = mid - 1;
            }
        }
    }
    
    return -1;
};
```


### No more access for 30 Days coding challenge
### No more access for 30 Days coding challenge

### 21. Merge Two Sorted Lists
Input: list1 = [1,2,4], list2 = [1,3,4] <br />
Output: [1,1,2,3,4,4] <br />
```
var mergeTwoLists = function(list1, list2) {
    if (list1 === null) {
        return list2
    } else if (list2 === null) {
        return list1
    }
    
    if (list1.val > list2.val) {
        [list1, list2] = [list2, list1] // Swap in place
    }
    list1.next = mergeTwoLists(list1.next, list2)
    
    return list1;
};

var mergeTwoLists = function(list1, list2) {
    const head = new ListNode(null);
    let dummy = head;
    
    while(list1 && list2) {
        if(list1.val < list2.val) {
            dummy.next = list1;
            list1 = list1.next;
        } else {
            dummy.next = list2;
            list2 = list2.next;
        }
        
        dummy = dummy.next;
    }
    
    if(list1) {
     dummy.next = list1;
    }
    
    if(list2) {
        dummy.next = list2;
    }
    
    return head.next;
    
};
```


### 141. Linked List Cycle
Input: head = [3,2,0,-4], pos = 1 <br />
Output: true <br />

```
var hasCycle = function(head) {
    let fast = head;
    while(fast && fast.next) {
        head = head.next;
        fast = fast.next.next;
        if(head == fast) return true;
    }
    
    return false;
};
```

### No more access for 30 Days coding challenges
### No more access for 30 Days coding challenges
### No more access for 30 Days coding challenges


### 136. Single Number
Input: nums = [2,2,1] <br />
Output: 1 <br />
```
var singleNumber = function(nums) {
    
    let output = 0;
    for(let i=0; i<nums.length; i++) {
        output ^= nums[i]
    }
    
    return output;
};
```

### No more access for 30 Days coding challenges
### 1626. Best Team With No Conflicts

Input: scores = [1,3,5,10,15], ages = [1,2,3,4,5] <br />
Output: 34 <br />
```
var bestTeamScore = function (scores, ages) {
	const players = ages
			.map((age, i) => ({ age, score: scores[i] }))
			.sort((a, b) => {
				if (a.age < b.age) return -1;
				if (a.age === b.age && a.score < b.score) return -1;
				return 0;
			}),
		dp = players.map(p => p.score);
	for (let i = 1; i < players.length; i++)
		for (let j = 0; j < i; j++)
			if (
				(players[i].score >= players[j].score ||
					players[i].age === players[j].age) &&
				dp[i] < players[i].score + dp[j]
			)
				dp[i] = players[i].score + dp[j];

	return Math.max(...dp);
};


### No more access for 30 Days coding challenges
### No more access for 30 Days coding challenges
### No more access for 30 Days coding challenges
### No more access for 30 Days coding challenges
### No more access for 30 Days coding challenges
### No more access for 30 Days coding challenges
### No more access for 30 Days coding challenges
### No more access for 30 Days coding challenges
### No more access for 30 Days coding challenges
### No more access for 30 Days coding challenges
### No more access for 30 Days coding challenges
### No more access for 30 Days coding challenges
### No more access for 30 Days coding challenges
### No more access for 30 Days coding challenges
### No more access for 30 Days coding challenges
### No more access for 30 Days coding challenges
### No more access for 30 Days coding challenges
### No more access for 30 Days coding challenges
### No more access for 30 Days coding challenges
### No more access for 30 Days coding challenges
### No more access for 30 Days coding challenges
### No more access for 30 Days coding challenges
### No more access for 30 Days coding challenges
### No more access for 30 Days coding challenges
### No more access for 30 Days coding challenges
### No more access for 30 Days coding challenges
### No more access for 30 Days coding challenges
### No more access for 30 Days coding challenges
### No more access for 30 Days coding challenges
### No more access for 30 Days coding challenges
### No more access for 30 Days coding challenges
### No more access for 30 Days coding challenges
### No more access for 30 Days coding challenges
### No more access for 30 Days coding challenges
### No more access for 30 Days coding challenges
### No more access for 30 Days coding challenges
### No more access for 30 Days coding challenges
### No more access for 30 Days coding challenges
### No more access for 30 Days coding challenges
### No more access for 30 Days coding challenges
### No more access for 30 Days coding challenges
### No more access for 30 Days coding challenges
### No more access for 30 Days coding challenges
### No more access for 30 Days coding challenges
### No more access for 30 Days coding challenges
### No more access for 30 Days coding challenges
### No more access for 30 Days coding challenges
### No more access for 30 Days coding challenges
### No more access for 30 Days coding challenges
### No more access for 30 Days coding challenges
### No more access for 30 Days coding challenges
### No more access for 30 Days coding challenges
### No more access for 30 Days coding challenges
### No more access for 30 Days coding challenges
### No more access for 30 Days coding challenges
### No more access for 30 Days coding challenges
### No more access for 30 Days coding challenges
### No more access for 30 Days coding challenges
### No more access for 30 Days coding challenges
### No more access for 30 Days coding challenges
### No more access for 30 Days coding challenges
### No more access for 30 Days coding challenges
### No more access for 30 Days coding challenges
### No more access for 30 Days coding challenges
### No more access for 30 Days coding challenges
### No more access for 30 Days coding challenges
### No more access for 30 Days coding challenges
### No more access for 30 Days coding challenges
### No more access for 30 Days coding challenges
### No more access for 30 Days coding challenges
### No more access for 30 Days coding challenges
### No more access for 30 Days coding challenges
### No more access for 30 Days coding challenges
### No more access for 30 Days coding challenges
### No more access for 30 Days coding challenges
### No more access for 30 Days coding challenges
### No more access for 30 Days coding challenges
### No more access for 30 Days coding challenges
### No more access for 30 Days coding challenges
### No more access for 30 Days coding challenges
### No more access for 30 Days coding challenges
### No more access for 30 Days coding challenges
### No more access for 30 Days coding challenges
### No more access for 30 Days coding challenges
### No more access for 30 Days coding challenges
### No more access for 30 Days coding challenges
### No more access for 30 Days coding challenges
### No more access for 30 Days coding challenges
### No more access for 30 Days coding challenges
### No more access for 30 Days coding challenges
### No more access for 30 Days coding challenges
### No more access for 30 Days coding challenges
### No more access for 30 Days coding challenges
### No more access for 30 Days coding challenges
### No more access for 30 Days coding challenges
### No more access for 30 Days coding challenges
### No more access for 30 Days coding challenges
### No more access for 30 Days coding challenges
### No more access for 30 Days coding challenges
### No more access for 30 Days coding challenges
### No more access for 30 Days coding challenges
### No more access for 30 Days coding challenges
### No more access for 30 Days coding challenges
### No more access for 30 Days coding challenges
### No more access for 30 Days coding challenges
### No more access for 30 Days coding challenges
### No more access for 30 Days coding challenges
### No more access for 30 Days coding challenges
### No more access for 30 Days coding challenges
### No more access for 30 Days coding challenges
### No more access for 30 Days coding challenges
### No more access for 30 Days coding challenges
### No more access for 30 Days coding challenges
### No more access for 30 Days coding challenges
### No more access for 30 Days coding challenges
### No more access for 30 Days coding challenges
### No more access for 30 Days coding challenges
### No more access for 30 Days coding challenges
### No more access for 30 Days coding challenges
### No more access for 30 Days coding challenges
### No more access for 30 Days coding challenges
### No more access for 30 Days coding challenges
### No more access for 30 Days coding challenges
### No more access for 30 Days coding challenges
### No more access for 30 Days coding challenges
### No more access for 30 Days coding challenges
### No more access for 30 Days coding challenges
### No more access for 30 Days coding challenges
### No more access for 30 Days coding challenges
### No more access for 30 Days coding challenges
### No more access for 30 Days coding challenges
### No more access for 30 Days coding challenges
### No more access for 30 Days coding challenges
### No more access for 30 Days coding challenges
### No more access for 30 Days coding challenges
### No more access for 30 Days coding challenges
### No more access for 30 Days coding challenges
### No more access for 30 Days coding challenges
### No more access for 30 Days coding challenges
### No more access for 30 Days coding challenges
### No more access for 30 Days coding challenges
### No more access for 30 Days coding challenges
### No more access for 30 Days coding challenges
### No more access for 30 Days coding challenges
### No more access for 30 Days coding challenges
### No more access for 30 Days coding challenges
### No more access for 30 Days coding challenges
### No more access for 30 Days coding challenges
### No more access for 30 Days coding challenges
### No more access for 30 Days coding challenges
### No more access for 30 Days coding challenges
### No more access for 30 Days coding challenges
### No more access for 30 Days coding challenges
### No more access for 30 Days coding challenges
### No more access for 30 Days coding challenges
### No more access for 30 Days coding challenges
### No more access for 30 Days coding challenges
### No more access for 30 Days coding challenges
### No more access for 30 Days coding challenges
### No more access for 30 Days coding challenges
### No more access for 30 Days coding challenges
### No more access for 30 Days coding challenges
