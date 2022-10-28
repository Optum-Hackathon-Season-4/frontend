function myFunction() {
    var x = document.getElementById("password");
    if (x.type === "password") {
      x.type = "text";
    } else {
      x.type = "password";
    }
  }

function pagehandler(value,idd){
  if(value=="User"){
    window.location.href="loginsignupuser.html";
  }else if(value=="Admin"){
    window.location.href="loginsignupadmin.html";
  }else if(value=="Doctor"){
    window.location.href="loginsignupdoctor.html";
  }
  document.getElementById(idd).selectedIndex=-1;
}



function Login(){
  let username = document.getElementById("username").value
  let password = document.getElementById("pass").value

  if(username == "" || password == ""){
    document.getElementById("message1").innerHTML = "Details Missing"
  }else{
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
      "username": username,
      "password": password
    });

    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: raw,
      redirect: 'follow'
    };

    fetch("http://localhost:8000/login/", requestOptions)
      .then(response => response.text())
      .then((result)=>{
        let data = JSON.parse(result)
        localStorage.clear()
        localStorage.setItem('token',data.token)
        localStorage.setItem('patient',true)
        window.location.replace("home.html")
      })
      .catch((error)=>{
        console.log(error)
        document.getElementById("message1").innerHTML = "Login Failed"

      }
    );
  }

}


function login1(){
  let username = document.getElementById("username").value
  let password = document.getElementById("pass").value

  if(username == "" || password == ""){
    document.getElementById("message1").innerHTML = "Details Missing"
  }else{
    var myHeaders = new Headers();
myHeaders.append("Content-Type", "application/json");

var raw = JSON.stringify({
  "username": username,
  "password": password
});

var requestOptions = {
  method: 'POST',
  headers: myHeaders,
  body: raw,
  redirect: 'follow'
};

fetch("http://localhost:8000/login/", requestOptions)
  .then(response => response.text())
  .then((result)=>{
    let data = JSON.parse(result)
    localStorage.clear()
    localStorage.setItem('token',data.token)
    localStorage.setItem('admin',true)
    window.location.replace("admin_add.html")
  })
  .catch((error)=>{
    console.log(error)
    document.getElementById("message1").innerHTML = "Login Failed"

  });
  }

}


function login3(){
  
  let username = document.getElementById("username").value
  let password = document.getElementById("pass").value
  
  if(username == "" || password == ""){
    document.getElementById("message1").innerHTML = "Details Missing"
  }else{
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
      "username": username,
      "password": password
    });

    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: raw,
      redirect: 'follow'
    };

    fetch("http://localhost:8000/login/", requestOptions)
      .then(response => response.text())
      .then((result)=>{
        let data = JSON.parse(result)
        localStorage.clear()
        localStorage.setItem('token',data.token)
        localStorage.setItem('dcotor',true)
        window.location.replace("doctor_home.html")
      })
      .catch((error)=>{
        console.log(error)
        document.getElementById("message1").innerHTML = "Login Failed"

      }
    );
  }
}








function submitDetails(){
  let name = document.getElementById("uname").value
  let username = document.getElementById("user").value
  let birthdate = document.getElementById("birthday").value
  let marital = document.getElementById("martialstat").value
  let gender = document.getElementById("gender").value
  let address = document.getElementById("address").value
  let contact = document.getElementById("contact").value
  let password = document.getElementById("password").value

  if(name == "" || username == "" || birthdate == "" || marital == "" || gender == "" 
|| address  == "" || contact == "" || password == "")
{
  document.getElementById("message").innerHTML = "Please Check if all Details are Valid"
}else{
  var myHeaders = new Headers();
myHeaders.append("Content-Type", "application/json");

var raw = JSON.stringify({
  "password": password,
  "username": username,
  "is_patient": true,
  "name": name,
  "gender": gender,
  "birth_date": birthdate,
  "marital_status": marital,
  "address": address,
  "phone_number": contact
});

var requestOptions = {
  method: 'POST',
  headers: myHeaders,
  body: raw,
  redirect: 'follow'
};

fetch("http://localhost:8000/signup/", requestOptions)
  .then(response => response.text())
  .then((result)=>{
    document.getElementById("message").style = "color: green;"
    document.getElementById("message").innerHTML = "User Succesfully Registered!!"

  })
  .catch((error)=>{
    document.getElementById("message").innerHTML = "There was some error please try later"

  });
} 
}

function submitDetailsdoctor(){
  let name = document.getElementById("uname").value
  let gender = document.getElementById("gender").value
  let birthdate = document.getElementById("birthday").value
  let hospital = document.getElementById("hospital").value
  let specialization = document.getElementById("specialization").value
  let phone = document.getElementById("phone").value
  let password = document.getElementById("password").value
  if(name == "" || hospital == "" || birthdate == "" || phone == "" || gender  == "" || specialization == "" || password == ""){
    document.getElementById("message").innerHTML = "Please Check if all Details are Valid"
  }else{
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
      "password": password,
      "username": name,
      "is_doctor": true,
      "name": name,
      "gender": gender,
      "specialization": specialization,
      "passkey": "connectodb",
      "phone_number": phone
    });

    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: raw,
      redirect: 'follow'
    };

    fetch("http://localhost:8000/signup/", requestOptions)
      .then(response => response.text())
      .then((result)=>{
        document.getElementById("message").style = "color: green;"
        document.getElementById("message").innerHTML = "User Succesfully Registered!!"
    
      })
      .catch((error)=>{
        document.getElementById("message").innerHTML = "There was some error please try later"
    
      });
      }
}