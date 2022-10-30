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



function fetchDetails(event){
  event.preventDefault()
  let patientID = document.getElementById("patientid").value 
  var myHeaders = new Headers();

    myHeaders.append("Authorization", `Token ${localStorage.getItem('token')}`);

  var requestOptions = {
    method: 'GET',
    headers: myHeaders,
    redirect: 'follow'
  };

  fetch(`http://localhost:8000/prescriptions/${patientID}`, requestOptions)
    .then(response => response.text())
    .then((result) => {
      
      let data = JSON.parse(result)

      console.log(data)
      data.forEach((elem) => {
        document.getElementById("prescription").innerHTML += 
        `
        <div >
                
        <div class="details">
            
            <div style="text-align:center; font-size: 22px;"><b>${elem.date}</b></div>
            <br>
            <div><b>Prescription ID:</b> #${elem.id}</div>
            <div><b>Follow Up:</b> ${elem.follow_up}</div>
            <div><b>Days </b> ${elem.days}</div>
            <div><b>Symptoms:</b> ${elem.symptoms}</div>
            <div style="align-items: center;">
                <button class="bookbtn" onclick="fun('myModal1','buttn1','close1')"id="buttn1">Details</button>
            </div>
            <div id="myModal1" class="modal">
                <div class="modal-content">
                  <span id="close1">&times;</span>
                  <table class="tabb">
                    <tr><th>Name</th><th>Dosage</th><th>Cost</th></tr>
                    ${elem.medicines.map((el)=>{
                      return (
                        `<tr><td>${el.name}</td><td>${el.time_to_taken}</td><td>${el.cost}</td></tr>
                        `
                      )
                    })}
            
                  </table>
                </div>
            </div>
        </div>
    </div>
        
        
        `
      });
    })
    .catch((error) => {
      console.log(error)
      document.getElementById("error").innerHTML = "There was some Error!!"
    });

}

function addMedicine(){
   let name = document.getElementById("medicinename").value 
   let cost = document.getElementById("cost").value 
   let dosage = document.getElementById("dosage").value 

   let table = document.getElementById("medicines");
   var row = table.insertRow();

   var cell1 = row.insertCell(0);
   var cell2 = row.insertCell(1);
   var cell3 = row.insertCell(2)



   cell1.innerHTML = name
   cell2.innerHTML = dosage 
   cell3.innerHTML = cost
   
}


function submitPrescription(){
  let patientID = document.getElementById("patientid1").value 
  let symptoms = document.getElementById("symptoms").value
  let followup = document.getElementById("followup").checked 
  let days = document.getElementById("days").value 
  // console.log(patientID)
  // console.log(symptoms)
  // console.log(followup)
  // console.log(days)

  if(patientID == "" || symptoms == "" || followup == "" || days == ""){
    document.getElementById("error").innerHTML = "Fields are Missing"
    return ;
  }

  let medicineData = []
let  table = document.getElementById("medicines");
for (var i = 1, row; row = table.rows[i]; i++) {
   //iterate through rows
   //rows would be accessed using the "row" variable assigned in the for loop
  let name = row.cells[0].innerHTML
  let dosage = row.cells[1].innerHTML
  let cost = row.cells[2].innerHTML
  medicineData.push({
    name : name, 
    time_to_taken : dosage, 
    cost : cost
  })
}


let data = {
  medicines : medicineData,
  days : days,
  follow_up : followup, 
  symptoms : symptoms,
  patient : patientID
}

var myHeaders = new Headers();
myHeaders.append("Authorization", `Token ${localStorage.getItem('token')}`);
myHeaders.append("Content-Type", "application/json");

var raw = JSON.stringify(data);

var requestOptions = {
  method: 'POST',
  headers: myHeaders,
  body: raw,
  redirect: 'follow'
};

fetch("http://localhost:8000/prescriptions/", requestOptions)
  .then(response => response.text())
  .then((result) => {
    document.getElementById("message").innerHTML = "Submitted Successfully!!!"
  })
  .catch((error) => {
    document.getElementById("error").innerHTML = "There was some Error"


  });

}