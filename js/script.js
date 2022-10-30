// getting all required elements
const searchWrapper = document.querySelector(".search-input");
const inputBox = searchWrapper.querySelector("input");
const suggBox = searchWrapper.querySelector(".autocom-box");
const icon = searchWrapper.querySelector(".icon");
let linkTag = searchWrapper.querySelector("a");
let webLink;
let curitem=[];
// if user press any key and release
inputBox.onkeyup = (e)=>{
    let userData = e.target.value; //user enetered data
    let emptyArray = [];
    if(userData){
        icon.onclick = ()=>{
            webLink = `https://www.google.com/search?q=${userData}`;
            linkTag.setAttribute("href", webLink);
            linkTag.click();
        }
        emptyArray = suggestions.filter((data)=>{
            //filtering array value and user characters to lowercase and return only those words which are start with user enetered chars
            return data.toLocaleLowerCase().startsWith(userData.toLocaleLowerCase());
        });
        emptyArray = emptyArray.map((data)=>{
            // passing return data inside li tag
            return data = `<li>${data}</li>`;
        });
        searchWrapper.classList.add("active"); //show autocomplete box
        showSuggestions(emptyArray);
        let allList = suggBox.querySelectorAll("li");
        for (let i = 0; i < allList.length; i++) {
            //adding onclick attribute in all li tag
            allList[i].setAttribute("onclick", "select(this)");
        }
    }else{
        searchWrapper.classList.remove("active"); //hide autocomplete box
    }
}
function select(element){
    let selectData = element.textContent;
    inputBox.value="";
    curitem.push(selectData);
    document.getElementById("selectedlist").innerHTML+=`<li class='selectbox'>${selectData}<span class='close'  onclick="this.parentElement.style.display = 'none'; curitem=curitem.filter(function(item){return item!=${selectData}});">&times;</span></li>`;
    icon.onclick = ()=>{
        recommendd();
    }
    searchWrapper.classList.remove("active");
}
function showSuggestions(list){
    let listData;
    if(!list.length){
        userValue = inputBox.value;
        listData = `<li>${userValue}</li>`;
    }else{
      listData = list.join('');
    }
    suggBox.innerHTML = listData;
}



function recommendd(){
    // for(i=0;i<curitem.length;i++){
    //     console.log(curitem[i]);
    // }
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    var obj={};
    for(i=0;i<curitem.length;i++){
        obj[curitem[i]]=1;
    }
    var raw = JSON.stringify(obj);

    var requestOptions = {
    method: 'POST',
    headers: myHeaders,
    body: raw,
    redirect: 'follow'
    };
    document.getElementById("loading").innerHTML = "Loading Please Wait.."
    document.getElementById("")

    fetch("http://localhost:8000/doctor_recommendation", requestOptions)
    .then(response => response.text())
    .then((result) => {
        let result1 = JSON.parse(result)
        document.getElementById("loading").innerHTML = ""
        document.getElementById("result").innerHTML = `Disease Detected : ${result1.Symptomps} <br> Specialization : ${result1.Specialization}`


    })
    .catch((error) => {
        document.getElementById("loading").innerHTML = ""
        document.getElementById("error").innerHTML = "There was Some Error !! Please try Again"


    });
}