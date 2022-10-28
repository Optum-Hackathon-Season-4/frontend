var myHeaders = new Headers();
myHeaders.append("Authorization", `Token ${JSON.parse(localStorage.getItem('token'))}`);
var requestOptions = {
  method: 'GET',
  headers: myHeaders,
  redirect: 'follow'
};

fetch("http://localhost:8000/operations/", requestOptions)
  .then((response) => response.text())
  .then((result) => {
    let data = JSON.parse(result)
    console.log(data);
    data.forEach((elem) => {
        const e1 = document.createElement('div');
        let cnt=0;
        e1.innerHTML=`
        <div class="card">
            <div class="leftcard">
                <div class="dateissue">
                    <p>25 October<br>2022</p>
                </div>
            </div>
            <div class="midcard">
                <div>
                    <p>Operation id: ${elem.id}</p>
                </div>
                <div>
                    <p>Date to be paid off: ${elem.payment_deadline === null?'N/A' : elem.payment_deadline}</p>
                </div>
                <div>
                    <p>Doctor id : ${elem.doctor}</p>
                </div>
            </div>
            <div class="rightcard">
                <button onclick="fun('myModal${cnt}','buttn${cnt}','close${cnt}')"id="buttn${cnt}">
                    Details
                </button>
            </div>
            <div id="myModal${cnt}" class="modal">
                <div class="modal-content">
                  <span id="close${cnt}">&times;</span>
                  <table class="tabb" >
                    <tr><th>Operation</th><th>Recommendation</th><th>Cost</th></tr>
                    <tr><td>Paracetamol 50 mg</td><td>1 time a day in morning for 1 week</td><td>$12</td></tr>
                    <tr><td>Paracetamol 50 mg</td><td>1 time a day in morning for 1 week</td><td>$12</td></tr>
                    <tr><td>Paracetamol 50 mg</td><td>1 time a day in morning for 1 week</td><td>$12</td></tr>
                  </table>
                </div>
            </div>
        `
        console.log(e1);
        let meds=elem.operations;
        let putt=`
        <tr><th>Operation</th><th>Recommendation</th><th>Cost</th></tr>`;
        meds.forEach((med)=>{
            let str=`<tr>`;
            str+=`<th>${med.name}</th>`;
            str+=`<th>${med.recommendation}</th>`;
            str+=`<th>${med.cost}</th>`
            str+=`</tr>`
            putt+=str;
        })
        console.log(e1.getElementsByClassName('tabb')[0].innerHTML);
        console.log(putt);
        e1.getElementsByClassName('tabb')[0].innerHTML=putt;
        console.log(e1);
        document.getElementById("prescriptionlist").appendChild(e1);
        console.log(document.getElementById('prescriptionlist'));
        cnt+=1;
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
