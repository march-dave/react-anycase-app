### 알고리즘
알고 있어야 하는것 ^^

### 시간 복잡도
시간 복잡도 O(N)
```
var sum = 0;
for(var i=0; i<N; i++) {
    sum += i;
}
```

시간 복잡도 O(N 제곱) : 두번 루프를 돌고 있으므로 제곱
```
var sum = 0;
for(var i=0; i<N; i++) {
    for(var j=0; i<N; j++) {
        if (i === j) {
            sum += j;
        }
    }
}
```

시간 복잡도 O(1)
var sum = 0;
sum = N * (N+1) / 2;


### 스택
```
var stack = [];
stack.push(1);
stack.push(2);
var i = stack.pop();
console.log(i); //  displays 1
```

### 큐
```
var queue = [];
queue.push(1);
queue.push(2);
var i = queue.shift();
console.log(i);  displays 2
```

### 대문자 > 소문자
32 - space(공백) <br />
65 - A <br /> 
90 - Z <br />
97 - a <br />
48 - 0 <br />
122 - z

### Swap 알고리즘 [Swap link](https://repl.it/@DavidSS1/swap)
장점 : 간지남. 한줄코딩가능 ex) if(A > B) A ^= B ^= A ^= B; <br />
단점 : 코드를 이해하기 어렵다.  <br />

var A = 5; <br />
var B = 23;

A = A ^ B; <br />
B = A ^ B; <br />
A = A ^ B;



### 소수 (Prime number) [link](https://repl.it/@DavidSS1/Primenumber)
약수가 1과 자기 자신 밖에 없는 수<br />
자기 자신보다 작은 수들을 나누어봐서, 하나라도 나누어지면 소수가 아닌 것 <br />
1 과 자신만 으로 분류 되는것 <br />
N이 소수가 되려면, 2보다 크거나 같고, 루트N 보다 작거나 같은 자연수로 나누어 떨어지면
안된다. <br />>
i.e) 1 과 2,  1, 3,  1, 5
```
function is_prime(x) {
    if (x < 2) {
        return false;
    }
    for (var i=2; i*i <= x; i++) {
        if (x % i == 0) {
            return false;
        }
    }
    return true;
}
```

### 약수 (Divisor)
% 나눠서 나머지가 0이면 약수. <br />
여러개가 나올 수 있다.

### 최대공약수 (GCD)
약수중에서 가장 큰수 <br />
i.e) 10, 5 ==> 5
```
var g = 1;
for (int i=2; i<=Math.min(a,b); i++) {
    if (a % i == 0 && b % i == 0) {
        g = i;
    }
}
```

재귀함수 + 유클리드 호제법을 이용
```
function gcd(x, y) {
    if (y == 0) return x;
    else return gcd(y, x%y);
}
```

### 최소공배수 (LCM)
i.e) 10, 5 ==> 10 <br />
```
function gcd(x, y) {
    if (y == 0) return x;
    return gcd(y, x%y);
}

var g = gcd(a,b);
console.log(a * b / g); <--- LCM
```

### 그냥 피보나치
```
function fibonacci(n) {
    if(n <= 1) return n;
    return fibonacci(n-1) + fibonacci(n-2);
}
```

### 피보나치 수열 dp 방식
2, 1짜리로 n을 채우는 경우의 수 문제는 피보나치 수열로 풀 수 있다고 보면 된다.<br />
ex) 점프 2,1 n칸 건너기, 타일링 2x1 짜리로 n칸 채우기<br />

1) 이건 피보나치
```
var memo = [];
function fibonacci(n){
   if(n === 1) return 1;
   if(n === 2) return 2;
   if(memo[n] != 0) return memo[n];
   return memo[n] = fibonacci[n - 1] + fibonacci[n - 2];
}
```

2) 좀 더 보기 좋은 피보나치
```
var memo = [];
function fibonacci(n){
    if(n<=1) return n;
    else if(memo[n] > 0) { 
        return memo[n];
    }
    memo[n] = fibonacci(n-1) + fibonacci(n-2);
    return memo[n];
}
```
3) 피보나치 Top Down 방식 재귀 호출, 큰 문제를 작은 문제로 나누고 푼다
```
var memo = [];
function fibonacci(n) {
    if (n<= 1) {
        return n;
    } else {
        return memo[n] = fibonacci(n - 1) + fibonacci(n - 2);
    }
}
```
3) 피보나치 Bottom Up 방식 for 문, 작은 문제 부터 차례로 푼다. 점화식이 뭔지 잘 숙지
```
function fibonacci(n) {
    var d[];

    d[0] = 0;
    d[1] = 1;
    for(var i=2; i<=n; i++) {
        d[i] = d[i-1] + d[i-2];
    }
    return d[n];
}
```

### 홀수/짝수 간단한 코드
num & 1 ? "Odd" : "Even";

### 순열에서 (Permutation)
{ 1, 2, 3 } 과 { 1, 3, 2 } , { 2, 1, 3 } 등.. 모두 다른 결과를 가져온다

### 조합은  (Combination)
순서가 상관이 없는 모임을 의미한다. 순서가 상관 없기 때문에 <br />
{ 1, 2, 3 }, { 1, 3, 2 } , { 2, 1, 3} 모두 같은것으로 취급을 한다.

### 중복 조합 (combination with repetition)
{1, 1} , { 1, 2 } , {1, 3 } , {2, 2 }, {2, 3}, {3, 3} <br />
i.e) 조합: { 1, 2 } , { 1, 3 } , { 2, 3 }

### 중복 순열 (permutation with repetition)
{ 1, 1 } , { 1, 2}, {1, 3}, { 2, 1 } , {2, 2 }... 이런식으로 진행될 것이다. <br />
i.e) 순열의 경우 { 1, 2 } , {1, 3} , { 2, 1} , {2, 3}, { 3, 1}, {3 , 2} 를 출력

### Greedy 알고리즘


### 그래프 (Graph)
연결되어 있는 객체 간의 관계를 표현 하는 자료 구조 <br />
도시의 연결, 지하철 노선도 <br />
1800 년경에 오일러에 코니히스베르크 다리문제 의해서 한번에 다리 건너기에서 창안 <br />
 

### 가중치(Weighted Graph) 가 있으면 Network라고 한다.
간선에 비용(Cost)  

### Tree는 그래프의 특수한 구조
<br />
<br />

```
    -   5   -   4   -   6  
1       |       |
    -   2   -   3
```

DFS: 깊이 우선 탐색
1, 2, 3, 4, 5, 6

재귀 호출 방법
```
void dfs(int x) {

check[x] = true;
for (int i=1; i<=n; i++) {
        if (a[x][i] == 1 && check[i] == false) {
            dfs(i);
        }
    }
}
```

인접행렬 호출 방법
```
void dfs (int x) {

check[x] = true;
for(int i=0; i<a[x].size(); i++) {

    int y = a[x][i];
    if (check[y] == false) {
        dfs(y);
        }
    }
}
```

```
    -   5   -   4   -   6  
1       |       |
    -   2   -   3
```

BFS: 넓이 우선 탐색
1, 2, 5, 3, 4, 6

BFS: 인접 행렬
```
queue<int> q;
check[1] = true; q.push(1);

while (!q.empty()) {
    int x = q.front(); q.pop();
    for (int i=1; i<=n; i++) {
        if (a[x][i] == 1 && check[i] == false) {
            check[i] = true;
            q.push(i);
        }
    }
}
```

BFS: 인접 리스트
```
queue<int> q;
check[1] = true; q.push(1);

while (!q.empty()) {
    int x = q.front(); q.pop();
    for(int i=0; i<a[x].size(); i++) {
        int y = a[x][i];
        if (check[y] == false) {
            check[y] = true; q.push(y);
        }
    }
}
```

### Two Pointers




### 참고한 비디오들
[다이나믹 프로그래밍 1, 2, 3로만 더하기](https://www.youtube.com/watch?v=R9WCxrPs2b8) <br />
[다익 스트라 알고리즘](https://www.youtube.com/watch?v=tZu4x5825LI) <br />
[Big-0](https://www.youtube.com/watch?v=6Iq5iMCVsXA) <br />
[그래프의 유래](https://www.youtube.com/watch?v=P6vjjXP-yhc&list=LL28_8NbyylxPevE5pt9gYpg&index=5&t=2088s) <br />
[한붓 그리기](https://www.youtube.com/watch?v=l1UbRWLS7ec&t=109s) 무조건 홀수 그리기에서 시작 해야함 <br />


### A leetcode a day, keeps unemployment away.