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