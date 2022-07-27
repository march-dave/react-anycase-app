### Promise 

```
var p = new Promise(
    function(resolve, reject) {
        setTimeout(function() {
            var num = Math.round(Math.round()*20);
            var isValid = num % 2;
            if(isValid) { resolve(num); }
            else { reject(num); }
        }, 1000);
    });

    p.then(function(num) {
        console.log('Resolve 1', num);
    }).then(function(num) {
        console.log('Resolve 2', num);
    }).then(function(num) {
         console.log('Resolve 3', num);
    }).catch(function(error) {
         console.log('Catch', error);
    })
```
    
### Promise.all() all에서 모두 기다린 후 처리
```
var req1 = new Promise( function(resolve, reject) {
    setTimeout(function() {resolve('작업1');  }, 3000);
}  );

var req2 = new Promise( function(resolve, reject) {
    setTimeout(function() {resolve('작업2');  }, 3000);
}  );

Promise.all( [req1, req2] ).then( function(results) {
    console.log('Then', results);
}).catch(function(err) {
    console.log('Catch', err);
})
```

### Promise.race() 하나라도 완료 되면 처리
```
var req1 = new Promise( function(resolve, reject) {
    setTimeout(function() {resolve('작업1');  }, 3000);
}  );

var req2 = new Promise( function(resolve, reject) {
setTimeout(function() {resolve('작업2');  }, 1000);
}  );

Promise.race( [req1, req2] ).then( function(results) {
    console.log('Resolve', results);
}).catch(function() {
    console.log('Reject', err);
})
```