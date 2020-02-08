### 대문자 > 소문자

32 - space(공백)
65 - A
90 - Z
97 - a
122 - z

### Swap 알고리즘
장점 : 간지남. 한줄코딩가능 ex) if(A > B) A ^= B ^= A ^= B;
단점 : 코드를 이해하기 어렵다.

int A = 5;
int B = 23;

A = A ^ B;
B = A ^ B;
A = A ^ B;

### 소수 (Prime number)
자기 자신보다 작은 수들을 나누어봐서, 하나라도 나누어지면 소수가 아닌 것
1 과 자신만 으로 분류 되는것
i.e) 1 과 2,  1, 3,  1, 5

### 약수 (Divisor)
% 나눠서 나머지가 0이면 약수.
여러개가 나올 수 있다.

### 최대공약수 (GCD)
약수중에서 가장 큰수 
i.e) 10, 5 ==> 5

### 최소공배수 (LCM)
i.e) 10, 5 ==> 10

### 피보나치 수열 dp 방식
var arr = [];
function fibonacci(n){
    if(n<=1) return n;
    else if(m[n]) return m[n];
    else return m[n] = fibonacci(n-1)+fibonacci(n-2);
}