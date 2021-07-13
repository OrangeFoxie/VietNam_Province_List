const api = 'https://provinces.open-api.vn/api/?depth=3';

async function fetchAsync () {
    let response = await fetch(api);
    let data = await response.json();
    return data;
  }

    fetchAsync()
        .then(data => 
            console.log(data)+
            main(data))              // if(data) => print data
        .catch(reason => console.log(reason.message)) // if(!data) => print error

    function main(data){
        getCity(data);
        listProvinces(data);
    }
    
    function listProvinces(data) {
        let temp = "";
    
        data.forEach((itemData) => {
            temp += `<tr>`;
            temp += `<td>${itemData}</td>`;
            temp += `</tr>`;
        });
        document.getElementById('tablelist').innerHTML = temp;
    }

    const cityArr = new Array();
    function getCity(data){
        data.forEach(element => {
            cityArr.push(element['districts','name'])});
        console.log(cityArr);
    }