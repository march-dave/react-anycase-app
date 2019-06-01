let arr = [10,20,30,40];
let [a,b,c] = arr;
console.log(a, b, c);


let p1 = {name:"홍길동", age:20, gender:"M"};
let { name:n, age:a, gender } = p1;
console.log(n,a,gender);

function addContact({name, phone, email="이메일 없음", age=0}) {
    console.log("이름 : " + name);
    console.log("전번 : " + phone);
    console.log("이메일 : " + email);
    console.log("나이 : " + age);
}

addContact({
    name : "이몽룡", 
    phone : "010-3434-8989"
})