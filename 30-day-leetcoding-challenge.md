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
