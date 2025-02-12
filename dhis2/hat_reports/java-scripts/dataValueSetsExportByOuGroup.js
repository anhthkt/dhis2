const _axios = require("axios");
const _lodash = require("lodash");
const dotenv = require("dotenv");
const ExcelJS = require('exceljs');

const fs = require("fs");

dotenv.config()
//CONSTANT  
const baseUrl = `http://nhanluc.tkyt.vn`;
// const baseUrl = `http://dev.tkyt.vn/nhanluc`;
// const baseUrl = `https://baocao.tkyt.vn`;
// const baseUrl = `http://103.124.60.92/baocao`;
// const baseUrl = `http://daotao.tkyt.vn`;
const orgs = [
  {
    "name": "Việt Nam",
    "id": "LOdti1gATwC"
  },
  // {
  //   "name": "An Giang",
  //   "id": "uAsdFJIqElU"
  // },
  // {
  //   "name": "Bà Rịa - Vũng Tàu",
  //   "id": "BHQmfUcKfm1"
  // },
  // {
  //   "name": "Bình Dương",
  //   "id": "FSr4tndBddw"
  // },
  // {
  //   "name": "Bình Phước",
  //   "id": "ECXvzGHClbu"
  // },
  // {
  //   "name": "Bình Thuận",
  //   "id": "aheT3Akf5kM"
  // },
  // {
  //   "name": "Bình Định",
  //   "id": "TqoasbvLrM5"
  // },
  // {
  //   "name": "Bạc Liêu",
  //   "id": "g2S76y4JDTo"
  // },
  // {
  //   "name": "Bắc Giang",
  //   "id": "bvuFKVVCZxg"
  // },
  // {
  //   "name": "Bắc Kạn",
  //   "id": "X9S3sMrxHkI"
  // },
  // {
  //   "name": "Bắc Ninh",
  //   "id": "kxJqRG6smMB"
  // },
  // {
  //   "name": "Bến Tre",
  //   "id": "uf7ebucWAG0"
  // },
  // {
  //   "name": "Cao Bằng",
  //   "id": "rnDtB1wpoGc"
  // },
  // {
  //   "name": "Cà Mau",
  //   "id": "tkjhRCAQn8b"
  // },
  //   {
  //     "name": "Các đơn vị thuộc Bộ",
  //     "id": "rY8ZzbdZcim"
  //   },
  //   {
  //     "name": "Các đơn vị trực thuộc Bộ",
  //     "id": "ISsmukUNfU8"
  //   },
  // {
  //   "name": "Cần Thơ",
  //   "id": "OQ3zNIHUm6b"
  // },
  // {
  //   "name": "Gia Lai",
  //   "id": "lXnhf8MolUv"
  // },
  // {
  //   "name": "Hà Giang",
  //   "id": "nmijk75Nfap"
  // },
  // {
  //   "name": "Hà Nam",
  //   "id": "Ysn2ITT5OZR"
  // },
  // {
  //   "name": "Hà Nội",
  //   "id": "kyTR47jtla2"
  // },
  // {
  //   "name": "Hà Tĩnh",
  //   "id": "rVwEOBkBMc5"
  // },
  // {
  //   "name": "Hòa Bình",
  //   "id": "HKWxMJZWw2y"
  // },
  // {
  //   "name": "Hưng Yên",
  //   "id": "WOzUSf72GLJ"
  // },
  // {
  //   "name": "Hải Dương",
  //   "id": "ZDnpYf8xF3N"
  // },
  // {
  //   "name": "Hải Phòng",
  //   "id": "jdW4qKTHtRd"
  // },
  // {
  //   "name": "Hậu Giang",
  //   "id": "e3WipXxPCgj"
  // },
  // {
  //   "name": "Hồ Chí Minh",
  //   "id": "oVBHhZ43yPD"
  // },
  // {
  //   "name": "Khánh Hòa",
  //   "id": "xs3U9jOo6T0"
  // },
  // {
  //   "name": "Kiên Giang",
  //   "id": "pbBzw7Mxdcp"
  // },
  // {
  //   "name": "Kon Tum",
  //   "id": "wewvAuC7kVe"
  // },
  // {
  //   "name": "Lai Châu",
  //   "id": "f16CpwI7Z8b"
  // },
  // {
  //   "name": "Long An",
  //   "id": "vFyCX3tmIlN"
  // },
  // {
  //   "name": "Lào Cai",
  //   "id": "Loz5sNNUEKt"
  // },
  // {
  //   "name": "Lâm Đồng",
  //   "id": "EStgnLIUVcQ"
  // },
  // {
  //   "name": "Lạng Sơn",
  //   "id": "VjdV70J3HnU"
  // },
  // {
  //   "name": "Nam Định",
  //   "id": "tAGHn8IltiO"
  // },
  // {
  //   "name": "Nghệ An",
  //   "id": "ZJAerHIZ8Ch"
  // },
  // {
  //   "name": "Ninh Bình",
  //   "id": "ptFYxVC01Dh"
  // },
  // {
  //   "name": "Ninh Thuận",
  //   "id": "oHhDOTe7fB3"
  // },
  // {
  //   "name": "Phú Thọ",
  //   "id": "Z7CRWOY8WZM"
  // },
  // {
  //   "name": "Phú Yên",
  //   "id": "jpN36u4t33g"
  // },
  // {
  //   "name": "Quảng Bình",
  //   "id": "m7LXwFuxtUy"
  // },
  // {
  //   "name": "Quảng Nam",
  //   "id": "W449B0OhNyD"
  // },
  // {
  //   "name": "Quảng Ngãi",
  //   "id": "T6PENxhvy8Z"
  // },
  // {
  //   "name": "Quảng Ninh",
  //   "id": "LNFIrnLxCxk"
  // },
  // {
  //   "name": "Quảng Trị",
  //   "id": "LaCv5lKNIBi"
  // },
  // {
  //   "name": "Sóc Trăng",
  //   "id": "ArAFMKW35CK"
  // },
  // {
  //   "name": "Sơn La",
  //   "id": "pajSJ8hWr1F"
  // },
  // {
  //   "name": "Thanh Hóa",
  //   "id": "KbhAlx7J8c7"
  // },
  // {
  //   "name": "Thái Bình",
  //   "id": "ZF5pyHp7GUK"
  // },
  // {
  //   "name": "Thái Nguyên",
  //   "id": "d5GgtJKn0Px"
  // },
  // {
  //   "name": "Thừa Thiên Huế",
  //   "id": "N9g8JZ96gOs"
  // },
  // {
  //   "name": "Tiền Giang",
  //   "id": "BeoEarCsP0N"
  // },
  // {
  //   "name": "Trà Vinh",
  //   "id": "wJorKSdTSu2"
  // },
  // {
  //   "name": "Tuyên Quang",
  //   "id": "uglfBEIDXHY"
  // },
  // {
  //   "name": "Tây Ninh",
  //   "id": "mlcepxdsrJK"
  // },
  // {
  //   "name": "Vĩnh Long",
  //   "id": "MDVatffMnzo"
  // },
  // {
  //   "name": "Vĩnh Phúc",
  //   "id": "VOIqdFpPXFq"
  // },
  // {
  //   "name": "Yên Bái",
  //   "id": "DJptEDkQmc4"
  // },
  // {
  //   "name": "Điện Biên",
  //   "id": "GeDxqlWLx9Q"
  // },
  // {
  //   "name": "Đà Nẵng",
  //   "id": "QqvBYSvbeNj"
  // },
  // {
  //   "name": "Đắk Lắk",
  //   "id": "Y2AZV0a1Oyj"
  // },
  // {
  //   "name": "Đắk Nông",
  //   "id": "eyKD8PvVOO4"
  // },
  // {
  //   "name": "Đồng Nai",
  //   "id": "mQwBhiRXAqY"
  // },
  // {
  //   "name": "Đồng Tháp",
  //   "id": "T4hQeKvy8KI"
  // }
]

const authentication = {
  auth: {
    username: process.env.username,
    password: `Csdl2018@)!*`
  }
}

function wirteJsonToExcel(data, fileName) {
  // Tạo một workbook mới và một worksheet trong đó
  const workbook = new ExcelJS.Workbook();
  const worksheet = workbook.addWorksheet('Data');

  // Định dạng tiêu đề cho worksheet (tùy chọn)
  worksheet.columns = [
    { header: 'Tỉnh', key: 'nameTinh', width: 15 },
    { header: 'id Tỉnh', key: 'idParentLv2', width: 15 },
    { header: 'idOrg', key: 'idOrglv2', width: 15 },
    { header: 'Name', key: 'name', width: 25 },

    { header: 'Loại hình đơn vị', key: 'lhdv2019', width: 10 },
    { header: 'Thủ trưởng đơn vị', key: 'ttdv2019', width: 10 },
    { header: 'Điện thoại', key: 'dt2019', width: 10 },
    { header: 'Email', key: 'email2019', width: 10 },

    { header: 'Loại hình đơn vị', key: 'lhdv2020', width: 10 },
    { header: 'Thủ trưởng đơn vị', key: 'ttdv2020', width: 10 },
    { header: 'Điện thoại', key: 'dt2020', width: 10 },
    { header: 'Email', key: 'email2020', width: 10 },

    { header: 'Loại hình đơn vị', key: 'lhdv2021', width: 10 },
    { header: 'Thủ trưởng đơn vị', key: 'ttdv2021', width: 10 },
    { header: 'Điện thoại', key: 'dt2021', width: 10 },
    { header: 'Email', key: 'email2021', width: 10 },

    { header: 'Loại hình đơn vị', key: 'lhdv2022', width: 10 },
    { header: 'Thủ trưởng đơn vị', key: 'ttdv2022', width: 10 },
    { header: 'Điện thoại', key: 'dt2022', width: 10 },
    { header: 'Email', key: 'email2022', width: 10 },

    { header: 'Loại hình đơn vị', key: 'lhdv2023', width: 10 },
    { header: 'Thủ trưởng đơn vị', key: 'ttdv2023', width: 10 },
    { header: 'Điện thoại', key: 'dt2023', width: 10 },
    { header: 'Email', key: 'email2023', width: 10 },
  ];

  // Ghi dữ liệu từ mảng JSON vào worksheet
  for (let item in data){
      console.log(data[item]);
      worksheet.addRow({
        nameTinh: data[item].orgUnitInfo.parent.parent.name,
        idParentLv2: data[item].orgUnitInfo.parent.name,
        idOrglv2: data[item].orgUnitInfo.id,
        name: data[item].orgUnitInfo.name,
        
        lhdv2019: data[item][2019]?.find(entry => entry.dataElement === 'Ag9MuxmjxKG')?.value || null,
        ttdv2019: data[item][2019]?.find(entry => entry.dataElement === 'UBe7y0Eh1Hg')?.value || null,
        dt2019: data[item][2019]?.find(entry => entry.dataElement === 'JWIhTQu3Gtp')?.value || null,
        email2019: data[item][2019]?.find(entry => entry.dataElement === 'S0Iv6iuTs5R')?.value || null,
  
        lhdv2020: data[item][2020]?.find(entry => entry.dataElement === 'Ag9MuxmjxKG')?.value || null,
        ttdv2020: data[item][2020]?.find(entry => entry.dataElement === 'UBe7y0Eh1Hg')?.value || null,
        dt2020: data[item][2020]?.find(entry => entry.dataElement === 'JWIhTQu3Gtp')?.value || null,
        email2020: data[item][2020]?.find(entry => entry.dataElement === 'S0Iv6iuTs5R')?.value || null,
  
        lhdv2021: data[item][2021]?.find(entry => entry.dataElement === 'Ag9MuxmjxKG')?.value || null,
        ttdv2021: data[item][2021]?.find(entry => entry.dataElement === 'UBe7y0Eh1Hg')?.value || null,
        dt2021: data[item][2021]?.find(entry => entry.dataElement === 'JWIhTQu3Gtp')?.value || null,
        email2021: data[item][2021]?.find(entry => entry.dataElement === 'S0Iv6iuTs5R')?.value || null,
  
        lhdv2022: data[item][2022]?.find(entry => entry.dataElement === 'Ag9MuxmjxKG')?.value || null,
        ttdv2022: data[item][2022]?.find(entry => entry.dataElement === 'UBe7y0Eh1Hg')?.value || null,
        dt2022: data[item][2022]?.find(entry => entry.dataElement === 'JWIhTQu3Gtp')?.value || null,
        email2022: data[item][2022]?.find(entry => entry.dataElement === 'S0Iv6iuTs5R')?.value || null,

        lhdv2023: data[item][2023]?.find(entry => entry.dataElement === 'Ag9MuxmjxKG')?.value || null,
        ttdv2023: data[item][2023]?.find(entry => entry.dataElement === 'UBe7y0Eh1Hg')?.value || null,
        dt2023: data[item][2023]?.find(entry => entry.dataElement === 'JWIhTQu3Gtp')?.value || null,
        email2023: data[item][2023]?.find(entry => entry.dataElement === 'S0Iv6iuTs5R')?.value || null
      });
    }

  // Lưu workbook vào một file Excel
  workbook.xlsx.writeFile(`${fileName}.xlsx`)
    .then(function () {
      console.log('File đã được lưu.');
    })
    .catch(function (error) {
      console.error('Lỗi:', error);
    });
}

async function createExcel() {
  let url = ``
  url = baseUrl + `/api/dataValueSets.json?dataSet=MQJjDw7mR73&orgUnitGroup=yqvDZQJVy6M&period=2019,2020,2021,2022,2023&dataElementGroup=jhrhb3BltI5`
  // +"&filter=id:in:[UPKEou47AtY]";
  let data = {};
  await _axios.get(url, authentication).then(jsonResult => {
    let resData = jsonResult.data;
    data = resData;
  })
 
  const groupedByOrgUnitAndPeriod = data.dataValues.reduce((acc, item) => {
    if (!acc[item.orgUnit]) {
        acc[item.orgUnit] = {};
    }
    if (!acc[item.orgUnit][item.period]) {
        acc[item.orgUnit][item.period] = [];
    }
    acc[item.orgUnit][item.period].push(item);
    return acc;
}, {});

  let orgUnits = [];
  url = baseUrl + `/api/organisationUnitGroups.json?paging=false&filter=id:eq:yqvDZQJVy6M&fields=:owner,organisationUnits[id,name,parent[id,name,parent[id,name]]]`
  await _axios.get(url, authentication).then(jsonResult => {
    let resData = jsonResult.data;
    orgUnits = resData.organisationUnitGroups[0].organisationUnits
  })

  const enrichedGroupedData = Object.keys(groupedByOrgUnitAndPeriod).reduce((acc, orgUnitId) => {
    const orgUnitInfo = orgUnits.find(orgUnit => orgUnit.id === orgUnitId);
    if (orgUnitInfo) {
        acc[orgUnitId] = {
            ...groupedByOrgUnitAndPeriod[orgUnitId],
            orgUnitInfo
        };
    } else {
        acc[orgUnitId] = groupedByOrgUnitAndPeriod[orgUnitId];
    }
    return acc;
}, {});

  // console.log(JSON.stringify(enrichedGroupedData));
  let ttc= `Thong tin chung`;

  // for (let item in enrichedGroupedData){
  //   console.log(enrichedGroupedData[item]);
  // }
  wirteJsonToExcel(enrichedGroupedData, ttc);
};

// Main function
(async () => {
  // for (const org of orgs) {
  //   console.log(org);
  //   await createExcel(org);
  // }
  await createExcel();
})();