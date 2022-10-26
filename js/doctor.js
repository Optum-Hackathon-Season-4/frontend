function fun(modalid,buttonid,closeid){
    var modal = document.getElementById(modalid);
    var btn = document.getElementById(buttonid);
    var span = document.getElementById(closeid);
    modal.style.display = "block";
    span.onclick = function() {
        modal.style.display = "none";
      }
    window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
    }
}


function myFunction() {
    var x = document.getElementById('password');
    if (x.type === 'password') {
      x.type = 'text';
    } else {
      x.type = 'password';
    }
  }

  function pagehandler(value, idd) {
    if (value == 'User') {
      window.location.href = 'loginsignupuser.html';
    } else if (value == 'Admin') {
      window.location.href = 'loginsignupadmin.html';
    } else if (value == 'Doctor') {
      window.location.href = 'loginsignupdoctor.html';
    }
    document.getElementById(idd).selectedIndex = -1;
  }