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


function change(button){
    console.log(button.textContent);
    if(button.textContent=="Click to mark this as paid"){
        button.textContent="This has been paid";
    }
}



 function changedate(button){
//     console.log(button.value);
//     console.log(button.previousElementSibling.value);
//     console.log(button.parentElement);
//     console.log(button.parentElement.previousElementSibling.previousElementSibling.lastElementChild.firstElementChild.textContent);
    var store=button.previousElementSibling.value;
    // console.log(store);
    // console.log(typeof store);
    // console.log(`date to be paid off: ${store}`);
    button.parentElement.previousElementSibling.previousElementSibling.lastElementChild.firstElementChild.textContent=`Date to be paid off: ${(store)}`;
}