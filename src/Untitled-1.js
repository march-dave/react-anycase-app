var moveZeroes = function(nums) {
    
    let y = 0; // y is none zero pointer

    // y only increase when i found a none zero number
    // i only swap if i found a none zero number
    for (var i = 0; i < nums.length; i++) {
        if (nums[i] !== 0) {
            var tmp = nums[i];
            nums[i] = nums[y];
            nums[y] = tmp;
            y++;
        }
    }

};