/*
let user = {
  name: "Tony",
  age: 25,
  address: {
    city: "Mumbai",
    pin: 400001
  }
};

let str = JSON.stringify(user);
console.log(str);
Output (STRING):
'{"name":"Tony","age":25,"address":{"city":"Mumbai","pin":400001}}'

let newObj = JSON.parse(str);
console.log(newObj);

Output (OBJECT again):
{
  name: "Tony",
  age: 25,
  address: {
    city: "Mumbai",
    pin: 400001
  }
}

🔁 Combined (Deep Copy trick)

let deepCopy = JSON.parse(JSON.stringify(user));
deepCopy.address.city = "Delhi";
console.log(user.address.city); // ✅ Mumbai (not changed)


🔹. Shallow Copy (IMPORTANT)
let copy = { ...user };
copy.address.city = "Pune";
console.log(user.address.city); // ❗ Pune (changed)
*/