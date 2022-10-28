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


function fetchFeedBacks(event){
    event.preventDefault()
    let doctor = document.getElementById("patientid").value
    var myHeaders = new Headers();
myHeaders.append("Content-Type", "application/json");
myHeaders.append( 'Accept', 'application/json',)


var requestOptions = {
  method: 'GET',
  headers: myHeaders,
  redirect: 'follow'
};

fetch(`http://localhost:8000/openfeedback/${doctor}`, requestOptions)
  .then(response => response.text())
  .then((result) => {
    let data1 = JSON.parse(result)
    data1.forEach((elem)=>{
        document.getElementById("feedbacks").innerHTML+= `
        
        <div class="rating_card">
        <div class="topdet">
            <p class="txt">Prescription ID : ${elem.id}<br>Patient ID : ${elem.doctor} <br> Doctor ID : ${elem.patient} <br> Approved : ${elem.approved}</p>
        </div>
        <div class="botdet">
            <div class="ratings">
                <div class="treatment_rating">
                    <span class="iconselected">&#9733;</span>
                    <span class="iconselected">&#9733;</span>
                    <span class="icon">&#9733;</span>
                    <span class="icon">&#9733;</span>
                    <span class="icon">&#9733;</span>
                </div>
                <div class="communication_rating">
                    <span class="iconselected">&#9733;</span>
                    <span class="icon">&#9733;</span>
                    <span class="icon">&#9733;</span>
                    <span class="icon">&#9733;</span>
                    <span class="icon">&#9733;</span>
                </div>
                <div class="collaboration_rating">
                    <span class="iconselected">&#9733;</span>
                    <span class="icon">&#9733;</span>
                    <span class="icon">&#9733;</span>
                    <span class="icon">&#9733;</span>
                    <span class="icon">&#9733;</span>
                </div>
                <div class="availability">
                    <span class="iconselected">&#9733;</span>
                    <span class="iconselected">&#9733;</span>
                    <span class="icon">&#9733;</span>
                    <span class="icon">&#9733;</span>
                    <span class="icon">&#9733;</span>
                </div>
                <div class="commentfordoctor">
                    <button class="buttoncomment" onclick="approvefeedback(${elem.id})" id="buttonapprove">Approve Feedback</button>
                </div>
                <div id="myModal1" class="modal">
                    <div class="modal-content">
                      <span id="close1">&times;</span>
                      <p>${elem.reviews}</p>
                    </div>
                </div>
             </div>
             <div class="labelss">
                <div class="lab">Treatment rating</div>
                <div class="lab">Communication rating</div>
                <div class="lab">Collaboration rating</div>
                <div class="lab">Availability</div>
                <div class="lab">Comment for your doctor</div>
             </div>
        </div>
        <div class="decision">
              <div class="det">
              ${elem.reviews}
              </div> 
              <h5 style="color: green;" id="good${elem.id}"> </h5>
              <h5 style="color: red;" id="$bad${elem.id}">  </h5>
              
              <div>
                <button onclick="getReviews(\`${elem.reviews}\`,${elem.id})" class="buttonnlp">
                    analyse review
                </button>
              </div>
        </div>
    </div>
        `
    })
    
})
  .catch((error) => {
    document.getElementById("error").innerHTML="There was some Error"
});
}


function approvefeedback(id){
    var myHeaders = new Headers();
    myHeaders.append("Authorization", `Token ${localStorage.getItem('token')}`);
    myHeaders.append("Content-Type", "application/json");
    
    var raw = JSON.stringify({
      "id": 1
    });
    
    var requestOptions = {
      method: 'PUT',
      headers: myHeaders,
      body: raw,
      redirect: 'follow'
    };
    
    fetch("http://localhost:8000/feedback/", requestOptions)
      .then(response => response.text())
      .then((result) => {

        document.getElementById(`good${id}`).innerHTML = "Successfully Approved"
    })
      .catch((error) => {
        document.getElementById(`bad${id}`).innerHTML = "There was some error"

        
      });
}

function getReviews(text,id){
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        var raw = JSON.stringify({
        "text": text,
        });

        var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
        };

        fetch("http://localhost:8000/reviews/", requestOptions)
        .then(response => response.text())
        .then((result) => {
            let data = JSON.parse(result)
            document.getElementById(`good${id}`).innerHTML = `Review Type:  ${data.message}`
        })
        .catch((error) => {
        
            console.log('error', error)
        });
}


function adminCheck(event){
    event.preventDefault()
    console.log(document.getElementById("patientid1").value)

}