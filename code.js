const api = 'https://provinces.open-api.vn/api/?depth=3';
const cityArr = new Array();
const distArr = new Array();
const wardArr = new Array();

async function fetchAsync () {
    let response = await fetch(api);
    let data = await response.json();
    return(data);
  }

    fetchAsync()
        .then(data => window.onload = main(data))     // if(data) => print data
        .catch(reason => console.log(reason.message)) // if(!data) => print error

    function main(data){
        getDist(data);
        getWard(data);
        listCity(data);
        listDistricts(data,distArr);
        listWards(data);
    }


    function getDist(data){
        for(var i=0; i<data.length; i++){
            distArr.push(data[i]['districts']);
        }return distArr;
    }

    function getWard(data){
        for(var i=0; i<data.length; i++){
            for(var j=0; j<data[i]['districts'].length; j++){
                wardArr.push(data[i]['districts'][j]['wards']);
            }
        }
        return wardArr;
    }


    function listCity(data) {
        let temp = "";    
        data.forEach((itemData) => {
            temp += `<tr>`;
            temp += `<td>${itemData['code']}</td>`;
            temp += `<td>${itemData['name']}</td>`;
            temp += `<td>${itemData['codename']}</td>`;
            temp += `<td>${itemData['division_type']}</td>`;
            temp += `<td>${itemData['phone_code']}</td>`;
            temp += `</tr>`;
        });
        document.getElementById('tablelist').innerHTML = temp;
    }

    function listDistricts(data,distArr) {
        let temp = "";    

        for(var k=0; k<data.length; k++){
            for(var i=0; i<distArr.length; i++){
                for(var j=0; j<distArr[i].length; j++){
                    temp += `<tr>`;
                    temp += `<td>${j+1}</td>`;
                    temp += `<td>${data[i]['name']}</td>`;
                    temp += `<td>${distArr[i][j]['code']}</td>`;
                    temp += `<td>${distArr[i][j]['name']}</td>`;
                    temp += `<td>${distArr[i][j]['codename']}</td>`;
                    temp += `<td>${distArr[i][j]['division_type']}</td>`;
                    temp += `<td>${distArr[i][j]['short_codename']}</td>`;
                    temp += `</tr>`; 
                }           
            }
        }
        document.getElementById('distlist').innerHTML = temp;
    }

    function listWards(data){
        let temp = "";
        for (const property of data) {
            var arr = new Array(property["districts"]);
            for (var i =0; i<arr.length; i++) { 
                for(var j =0;j<arr[i].length; j++) {              
                    var a2 = new Array(arr[i][j]["wards"])
                    for(var k =0; k<a2[0].length; k++){
                        temp += `<tr>`;
                        temp += `<td>${k+1}</td>`;
                        temp += `<td>${property["name"]}</td>`;
                        temp += `<td>${arr[i][j]["name"]}</td>`;
                        temp += `<td>${a2[0][k]["name"]}</td>`;
                        temp += `<td>${a2[0][k]["code"]}</td>`;
                        temp += `<td>${a2[0][k]["codename"]}</td>`;
                        temp += `<td>${a2[0][k]["division_type"]}</td>`;
                        temp += `<td>${a2[0][k]["short_codename"]}</td>`;
                        temp += `</tr>`; 
                    }
                }                    
            }
        } document.getElementById('wardlist').innerHTML=temp;
    }
