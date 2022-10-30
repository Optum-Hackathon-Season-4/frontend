function bookappoint(curele,popele, docid){
    console.log(curele.innerHTML);
    if(curele.innerHTML=="Book appointment"){
        curele.innerHTML="Confirm your Booking"
        console.log(curele)
        console.log(popele)
        
    popele.className='show';
    }else{
        
    popele.className='hide';
        curele.innerHTML="Book appointment"
        var myHeaders = new Headers();
        myHeaders.append("Authorization", `Token ${JSON.parse(localStorage.getItem('token'))}`);
        myHeaders.append("Content-Type", "application/json");
        const date = new Date();
        let day = date.getDate();
        let month = date.getMonth() ;
        let year = date.getFullYear();
        let currentDate = `${year}-${month}-${day}`;
        currentDate=popele.value;
        if(currentDate==""){
            alert('you didn"t enter date')
            return
        }
        console.log(currentDate)
        console.log(typeof currentDate);
        console.log(currentDate);
        var raw = JSON.stringify({
        "doctor": docid,
        "date": currentDate
        });

        var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
        };
        
        fetch("http://localhost:8000/appointments/", requestOptions)
        .then(response => response.text())
        .then((result) => {
            const data=JSON.parse(result)
            console.log(data);
            alert('Booking successful');
        })
        .catch((error)=>{
            alert('wrong format');
        });
        
    }
    
}
console.log('ok')