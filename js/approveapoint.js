function approveapoin(pid){
    var myHeaders = new Headers();
    myHeaders.append("Authorization",`Token ${localStorage.getItem('token')}`);
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
    "id": pid
    });

    var requestOptions = {
    method: 'PUT',
    headers: myHeaders,
    body: raw,
    redirect: 'follow'
    };

    fetch("http://localhost:8000/appointments/", requestOptions)
    .then(response => response.text())
    .then((result)=>{
        console.log(result);
        console.log('done');
    })
    .catch(error => console.log('error', error));
}

