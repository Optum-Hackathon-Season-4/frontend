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