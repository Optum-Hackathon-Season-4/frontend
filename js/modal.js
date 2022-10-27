var myHeaders = new Headers();
myHeaders.append("Authorization", `Token ${localStorage.getItem('token')}`);

var requestOptions = {
  method: 'GET',
  headers: myHeaders,
  redirect: 'follow'
};

fetch("http://localhost:8000/prescriptions/", requestOptions)
  .then((response) => response.text())
  .then((result) => {
    let data = JSON.parse(result)
    data.forEach((elem) => {
        const e1 = document.createElement(`
        <div class="split right">
        <div class="card">
            <div class="leftcard">
                <div class="dateissue">
                    <p>25 October<br>2022</p>
                </div>
            </div>
            <div class="midcard">
                <div>
                    <p>Prescription id: ${elem.id}</p>
                </div>
                <div>
                    <p>Date to be paid off: ${elem.payment_deadline === null?'N/A' : elem.payment_deadline}</p>
                </div>
                <div>
                    <p>Symptomps : ${elem.symptoms}</p>
                </div>
                <div>
                    <p>Follow Up : ${elem.follow_up}</p>
                </div>
                <div>
                    <p>No. of Days : ${elem.days}</p>
                </div>
            </div>
            <div class="rightcard">
                <button onclick="fun('myModal1','buttn1','close1')"id="buttn1">
                    Details
                </button>
            </div>
            <div id="myModal1" class="modal">
                <div class="modal-content">
                  <span id="close1">&times;</span>
                  <table class="tabb">
                    <tr><th>Medicine</th><th>Dosage</th><th>Cost</th></tr>
                    <tr><td>Paracetamol 50 mg</td><td>1 time a day in morning for 1 week</td><td>$12</td></tr>
                    <tr><td>Paracetamol 50 mg</td><td>1 time a day in morning for 1 week</td><td>$12</td></tr>
                    <tr><td>Paracetamol 50 mg</td><td>1 time a day in morning for 1 week</td><td>$12</td></tr>
                  </table>
                </div>
              
            </div>
        </div>`)
        document.getElementById("prescriptionlist").appendChild(e1)
    });
  })
  .catch((error) => {
    console.log(error)
  });


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
