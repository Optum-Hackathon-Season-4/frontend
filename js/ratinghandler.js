$(':radio').change(function() {
    console.log('New star rating: ' + this.value);
  });
  
//fetch all doctors first 

  //feedback post

  // var myHeaders = new Headers();
  // myHeaders.append("Authorization", `Token ${JSON.parse(localStorage.getItem('token'))}`);
  // myHeaders.append("Content-Type", "application/json");
  
  // var raw = JSON.stringify({
  //   "doctor": 1,
  //   "availability": 10,
  //   "collaboration_rating": 10,
  //   "communication_rating": 10,
  //   "treatment_rating": 10,
  //   "reviews": "sdadasd"
  // });
  
  // var requestOptions = {
  //   method: 'POST',
  //   headers: myHeaders,
  //   body: raw,
  //   redirect: 'follow'
  // };
  
  // fetch("http://localhost:8000/feedback/", requestOptions)
  //   .then(response => response.text())
  //   .then((result)=>{
  //     let data = JSON.parse(result)
  //   })
  //   .catch((error)=>{
  //     console.log(error)
  //     document.getElementById("message1").innerHTML = "Login Failed"
  //   });