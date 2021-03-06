//http://103.124.60.43:8080/api/29/analytics/enrollments/query/CL81ILBz33P.json?dimension=pe:THIS_YEAR&dimension=ou:VzIpVQtKSOe&dimension=E5gcQKCVBYF&dimension=odbi8kvORWA&dimension=CNBy0oqz15Q&dimension=E5gHlFCUrZT&dimension=h75XDpxMRkU&dimension=anx92HCTNpL&dimension=kQwVUXKFUhT&dimension=ZhDl61ply9E&dimension=BeHItQa3k9F&dimension=evzdUjya6u4&dimension=kC0fOb4nC3B&dimension=y3l8eZwgtDG&stage=jBye5wUgSOP&displayProperty=NAME&outputType=ENROLLMENT&desc=enrollmentdate&pageSize=100&page=1
const axios = require('axios');
const fs = require('fs');


axios.get('http://103.124.60.43:8080/api/29/analytics/events/query/CL81ILBz33P.json?dimension=pe:THIS_YEAR&dimension=ou:VzIpVQtKSOe&dimension=jBye5wUgSOP.KbDnSKz23BT&dimension=KJDd8lq06Lj&stage=jBye5wUgSOP&displayProperty=NAME&outputType=EVENT&desc=eventdate&pageSize=100&page=1', {
    auth: {
        username: 'anhth',
        password: '123456aA@'
    }
}).then(res => {
    //console.log(res);
    let arrDataRows = res.data.rows   
    let arrItems = Object.entries(res.data.metaData.items)
    // let listVanTai = getListVanTai(objItems);
    // let sumValue = sumValueByCodeVanTai(res);
    //let result = listVanTai.map((item, i) => Object.assign({}, item, sumValue[i]))
    //exportResult(res);
    let result = mapResult(arrItems, arrDataRows)
    // let month1 = getValueByMonth('6', result[0])
});


Array.prototype.insert = function ( index, item ) {
    this.splice( index, 0, item );
};
function formatNumber(string){
    let phanNguyen = string.substr(0, string.indexOf('E'));
    let soMu = string.slice(string.lastIndexOf('E') + 1);
    return parseInt(parseFloat(phanNguyen) * Math.pow(10,soMu))
}

function sumValueByCodeVanTai(arrDataRows){
    //let arrDataRows = res.data.rows;
    // format Array Rows
    arrDataRows.forEach(e => {
        e[0] = e[13]
        e[1] = parseInt(e[2].substr(5, 2));
        e[2] = parseInt(e[14]);
        e.splice(3, 12);
    })
    // Sum cong no theo thang
    let temp = {};
    let resultSum = arrDataRows.reduce(function(r, o) {
        let key = o[0] + '-' + o[1];
        if(!temp[key]) {
            temp[key] = Object.assign({}, o);// create a copy of o
            r.push(temp[key]);
        } else {       
            // helper[key][6] += 1;
            temp[key][2] = parseInt(temp[key][2])+ parseInt(o[2]);
            //temp[key][14] = parseInt(temp[key][2])+ parseInt(o[2]);
        }
        return r;
    }, []);
    // group by van tai
    let temp1 = {};
    let resultGroupVT = [];
    let resultGroup = resultSum.reduce(function(r, o) {
        let key = o[0];
        if(!temp1[key]) {
            temp1[key] = Object.assign({}, o);// create a copy of o
            r.push(temp1[key]);
            let dataDx = [];
            dataDx.push({
                key: o[1], 
                value: o[2]
            })
            temp1[key] = ({
                0: o[0],
                1: o[2],
                2: dataDx
            }); 
            resultGroupVT.push(temp1[key]);
        } else {
            temp1[key][1] = parseInt(temp1[key][1]) + parseInt(o[2]);
            temp1[key][2].push({
                key: o[1],
                value: o[2]
            })
        }
        return r;
    }, []);
    return resultGroupVT;
}

function getListVanTai (arr){
    let result = [];
    arr.forEach(e => {
        if(e[1].code != undefined){
            if(e[1].code.includes("VT")){
                result.push({0: e[1].code, 1: e[1].name})
            }
        }
    })
    return result
}

function mapResult(arrItems, arrDataRows){
    //let objItems = Object.entries(res.data.metaData.items)
    //let listVanTai = getListVanTai(objItems);
    let listVanTai = getListVanTai(arrItems);
    let sumValue = sumValueByCodeVanTai(arrDataRows);
    //let result = [...listVanTai, ...sumValue];
    listVanTai.forEach(e => {
        for(i = 0; i < sumValue.length; i++) {
            if(e[0] == sumValue[i][0]){
                e[2] = sumValue[i][1]
                e[3] = sumValue[i][2]
            }
        }
    })
    return listVanTai;
}

function getValueByMonth(month, row){
    let result = 0;
    row[3].forEach(e => {
        if(e.key == month) {
            result = e.value;
        }
    })
    return result;
}

function getValueByYear(row){
    if(row[2] == undefined){
        result = 0
    }else{
        result = row[2]
    }
    return result;
}