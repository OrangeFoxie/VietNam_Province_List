const api = 'https://provinces.open-api.vn/api/?depth=3';
const cityArr = new Array();
const distArr = new Array();
const wardArr = new Array();

async function fetchAsync () {
    let response = await fetch(api);
    let data = await response.json();
    return data;
  }

    fetchAsync()
        .then(data => window.onload = main(data))       // if(data) => print data
        .catch(reason => console.log(reason.message)) // if(!data) => print error

    function main(data){
        getDist(data);
        getWard(data);
        listProvinces(data);
        listDistricts(data,distArr);
        listWards(distArr,wardArr);
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
    
    function listProvinces(data) {
        let temp = "";    
        data.forEach((itemData) => {
            temp += `<tr>`;
            temp += `<td>${itemData['name']}</td>`;
            temp += `<td>${itemData['code']}</td>`;
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
                    temp += `<td>${data[i]['name']}</td>`;
                    temp += `<td>${distArr[i][j]['name']}</td>`;
                    temp += `<td>${distArr[i][j]['code']}</td>`;
                    temp += `<td>${distArr[i][j]['codename']}</td>`;
                    temp += `<td>${distArr[i][j]['division_type']}</td>`;
                    temp += `<td>${distArr[i][j]['short_codename']}</td>`;
                    temp += `</tr>`; 
                }           
            }
        }
        document.getElementById('distlist').innerHTML = temp;
    }

    function listWards(distArr,wardArr) {
        let temp = "";  
        for(var n=0; n<distArr.length; n++){
            for(var m=0; m<distArr[n].length; m++){
                for(var i=0; i<wardArr.length;i++){
                    for(var j=0; j<wardArr[i].length; j++){
                        temp += `<tr>`;
                        // temp += `<td>${wardArr[n][m]['name']}</td>`;
                        temp += `<td>${wardArr[i][j]['name']}</td>`;
                        temp += `<td>${wardArr[i][j]['name']}</td>`;
                        temp += `<td>${wardArr[i][j]['code']}</td>`;
                        temp += `<td>${wardArr[i][j]['codename']}</td>`;
                        temp += `<td>${wardArr[i][j]['division_type']}</td>`;
                        temp += `<td>${wardArr[i][j]['short_codename']}</td>`;
                        temp += `</tr>`; 
                    }
                }
            }
        }
        document.getElementById('wardlist').innerHTML = temp;
    }

