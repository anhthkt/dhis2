var p2ild = p2ild || {
    /**Create by P2ild
     *  Asynchronize load row
     * 
     * */
}

p2ild['reports_CopdHenDB'] = CopdHenDB();

function CopdHenDB() {
    var desURL;
    const teiMetaData_book = [
        {
            id: "xBoLC0aruyJ", title: "Họ tên"
            , col: 1
        },
        {
            id: "rwreLO34Xg7", title: "Giới tính"
            , col: 2
            , isOption: true
        },
        {
            id: "C7USC9MC8yH", title: "Năm sinh"
            , col: 3
            , convertOutputValue: (metaData) => {
                let { jsonHeaders, event, teiData, foundCol } = metaData
                let data = event[jsonHeaders[foundCol.id]];
                return '' != data ? moment(event[jsonHeaders[foundCol.id]]).format("DD/MM/YYYY") : data
            }
        },
        {
            id: "JHb1hzseNMg", title: "Mã BHYT"
            , col: 4
            , convertOutputValue: (metaData) => {
                let { jsonHeaders, event, teiData } = metaData
                let bhyt = event[jsonHeaders['JHb1hzseNMg']];
                let cmt = event[jsonHeaders['ZQ93P672wQR']];
                return bhyt != '' ? bhyt : cmt
            }
        },
        {
            id: "ZQ93P672wQR", title: "Số CMT"
        },
        {
            id: "mZbgWADLTKY", title: "SĐT"
            , col: 5
        }
    ];

    const coreDhisMetadata_book = [
        {
            id: "executiondate", title: ""
            , col: 6
            , sqlSorting: true
            , convertOutputValue: (metaData) => {
                let { jsonHeaders, event, teiData, foundCol } = metaData
                let data = event[jsonHeaders[foundCol.id]];
                return '' != data ? moment(event[jsonHeaders[foundCol.id]]).format("DD/MM/YYYY") : data
            }
        },
        {
            id: "ouname", title: "Nơi khám"
            , col: 7
        }
    ]

    const eventHenMetadata_book = [
        {
            id: "udwtZvJMnVL", title: "Chẩn đoán"
            , col: 8
        },
        {
            id: "G6kqlsUyuQe", title: "Hút thuốc lá"
            , isOption: true
            , col: 9
        },
        // {
        //     id: "qP2JSpTIP8V", title: "Mức độ khó thở"
        //     , isOption: true
        //     , col: 9
        // },
        // {
        //     id: "be1BbXNkuPD", title: "Làm việc và sinh hoạt"
        //     , isOption: true
        //     , col: 10
        // },
        {
            id: "X5jejsNMkjR", title: "Lưu lượng đỉnh + FEV1"
            , col: 10
            , convertOutputValue: (metaData) => {
                let { foundCol, jsonHeaders, event, jsonMetaData } = metaData
                let fev1 = getValueAsOptionName({ foundCol, jsonHeaders, event, jsonMetaData, de: 'gXBZFnSzFlP' }) || undefined
                let lld = getValueAsOptionName({ foundCol, jsonHeaders, event, jsonMetaData, de: 'X5jejsNMkjR' }) || undefined
                switch (true) {
                    case ![fev1, lld].includes(''):
                        resultStr = fev1
                        break;
                    default:
                        resultStr = `${fev1 || ''}${lld || ''}`
                        break
                }
                return resultStr;
            }
        },
        {
            id: "gXBZFnSzFlP", title: "FEV1"
            // , isOption: true
            // , col: 10
        },
        {
            id: "agZdCCAUFKx", title: "Kết quả điều trị"
            // , isOption: true
            , col: 11
        },
        {
            id: "kwmNWt51frC", title: "Thuốc"
            , col: 12
        },
        {
            id: "mVdtFRM2gFX", title: "Nhận xét"
            , col: 13
            , convertOutputValue: (metaData) => {
                let { foundCol, jsonHeaders, event, jsonMetaData } = metaData;
                let bienChung = event[jsonHeaders['X0kBm02Gyft']] || "";
                let ghiRoBienChung = event[jsonHeaders['hfGTym6BfK1']] || "";
                let nhanxet = getValueAsOptionName({ jsonMetaData, event, jsonHeaders, de: 'fBj7BCdA665' }) || "";
                nhanxet = nhanxet ? `Nhận xét: ${nhanxet}` : '';
                let resultStr = '';
                resultStr = bienChung == '2'//Co
                    ? `Có biến chứng: ${ghiRoBienChung}<br>` : '';
                resultStr += `${nhanxet}`
                return resultStr;
            }
        }//NhanXet 
        , {
            id: "X0kBm02Gyft", title: "biến chứng"
        },
        {
            id: "hfGTym6BfK1", title: "Ghi rõ biến chứng"
        },
        {
            id: "fBj7BCdA665", title: "Nhận xét"
        }//YBSKhamBenh

    ];

    const eventCOPDMetadata_book = [
        {
            id: "udwtZvJMnVL", title: "Chẩn đoán"
            , col: 8
        },
        {
            id: "G6kqlsUyuQe", title: "Hút thuốc lá"
            , isOption: true
            , col: 9
        },
        // {
        //     id: "qP2JSpTIP8V", title: "Mức độ khó thở theo mMRC"
        //     , isOption: true
        //     , col: 8
        // },
        // {
        //     id: "VVrV0g5UtR3", title: "Điểm CAT"
        //     // , isOption: true
        //     , col: 9
        // },
        // {
        //     id: "R9ZarnuuMbs", title: "Số đợt cấp/12 tháng"
        //     , isOption: true
        //     , col: 10
        // },
        {
            id: "gXBZFnSzFlP", title: "FEV1"
            , isOption: true
            , col: 10
        },
        {
            id: "z84g8TVEuCW", title: "Mức độ nặng"
            , isOption: true
            , col: 11
        },
        {
            id: "agZdCCAUFKx", title: "Kết quả điều trị"
            , col: 12
        },
        {
            id: "kwmNWt51frC", title: "Thuốc"
            , col: 13
        },
        {
            id: "mVdtFRM2gFX", title: "Ghi chú"
            , col: 14
            , convertOutputValue: (metaData) => {
                let { foundCol, jsonHeaders, event, jsonMetaData } = metaData
                let bienChung = event[jsonHeaders['X0kBm02Gyft']] || ""
                let ghiRoBienChung = event[jsonHeaders['hfGTym6BfK1']] || ""
                let nhanxet = getValueAsOptionName({ jsonMetaData, event, jsonHeaders, de: 'fBj7BCdA665' }) || ""
                nhanxet = nhanxet ? `<br>Nhận xét: ${nhanxet}` : '';
                let resultStr = '';
                resultStr = bienChung == '2'//Co
                    ? `Có biến chứng: ${ghiRoBienChung}` : ''
                resultStr += `${nhanxet}`
                return resultStr;
            }
        }//NhanXet 
        , {
            id: "X0kBm02Gyft", title: "biến chứng"
        },
        {
            id: "hfGTym6BfK1", title: "Ghi rõ biến chứng"
        },
        {
            id: "fBj7BCdA665", title: "Nhận xét"
        }
    ];

    const TT37Metadata = [
        {
            id: "xBoLC0aruyJ", title: "Họ tên"
            , col: 1
        },
        {
            id: "rwreLO34Xg7", title: "Giới tính"
            , col: 2
            , convertOutputValue: (metaData) => {
                let { jsonHeaders, event, teiData, foundCol, arrOutput, rawValue } = metaData;
                let age = event[jsonHeaders['C7USC9MC8yH']];
                age = (new Date(age)).getFullYear();
                let isMale = event[jsonHeaders['rwreLO34Xg7']] == '01';

                !isMale ? arrOutput[foundCol.col + 1] = age : {}//Col: 3
                return isMale ? arrOutput[foundCol.col] = age : ''
            }
        },
        {
            id: "C7USC9MC8yH", title: "Năm sinh"
        },
        {
            id: "Bxp1Lhr8ZeN", title: "Địa chỉ"
            , col: 4
        },
        {
            id: "L4djJU4gMyb", title: "Nghề nghiệp"
            , col: 5
        },
        {
            id: "p3qT2PpuLFS", title: "Ngày phát hiện"
            , col: 6
            , convertOutputValue: (metaData) => {
                let { foundCol, jsonHeaders, event } = metaData;
                let data = event[jsonHeaders[foundCol.id]];
                return '' != data ? moment(event[jsonHeaders[foundCol.id]]).format("DD/MM/YYYY") : data
            }
        },
        {
            id: "DFHdfkyZaZO", title: "Nơi phát hiện"
            , col: 7
            , isOption: true
        },
        {
            id: "agZdCCAUFKx", title: "Kết quả điều trị"
        },
        // {
        //     id: "col_executiondate", title: ""
        //     , sqlSorting: "asc"
        // },
        {
            id: "rIVl8YPZrW1", title: "Phân loại bệnh"
            , col: 8
            , isOption: true
            , sqlSorting: "asc"
        },
        {
            title: "firstMonth_to_lastMonth"
            , col: 9 // col 9->20 use same convertOutput value for month 
            , month: 1
            , convertOutputValue: (metaData) => {
                let { monthDataTT37, foundCol, arrOutput } = metaData
                let currentMonthValue;
                for (let i = 0; i < 12; i++) {
                    let eventsOfMonth = monthDataTT37.filter(e => e.month == (i + 1))?.pop()//start at i = 0 => offset 1 month
                    if (eventsOfMonth && eventsOfMonth.dataDatMTDT && eventsOfMonth.diseaseType) {
                        let { dataDatMTDT, diseaseType } = eventsOfMonth;
                        let monthData = ''
                        if (diseaseType == 1) {//COPD
                            monthData = ['Đạt'].includes(dataDatMTDT) ? 'C' : 'K'
                        }
                        else if (diseaseType == 2) {//HEN
                            monthData = ['Đạt'].includes(dataDatMTDT) ? 'C' : 'K'
                        }
                        arrOutput[i + foundCol.col] = monthData
                        i == 0 ? currentMonthValue = monthData : {}
                    }
                }
                return currentMonthValue || ''
            }
        },
        {
            id: 'iXw1Eq7HqjS'
            , title: "Ghi chú"
            , col: 21
            , convertOutputValue: (metaData) => {
                let { foundCol, jsonHeaders, event, jsonMetaData, rawValue } = metaData
                // let patientType = getValueAsOptionName({ jsonMetaData, event, jsonHeaders, de: foundCol.id }) || ""

                return ''
                // ["3", "4"].includes(rawValue)//Chuyen,chet
                // ? patientType : ''
            }
        }
    ];

    function onDocumentReady() {

    }

    var requestApiManager = [], intergrateObject;
    //Table3
    async function loadReport() {
        let mapBaseUrl = {
            "daotao.tkyt.vn": window.parent.location.origin + "/kln",
            "kln.tkyt.vn": window.parent.location.origin
        }

        desURL = debugging ? "http://daotao.tkyt.vn/kln" : mapBaseUrl[window.parent.location.hostname];

        let rqContent;
        p2ild.asyncLoadSupport ? rqContent = p2ild.asyncLoadSupport.createManager() : {};

        requestApiManager['content'] = rqContent;
        rqContent.setHandleSuccessAll(lastLoad)

        // // COPD
        // rqContent.createWorker().createHolderTitleRow('copd', `table_id1`
        //     , prepareDataTable(await getEventByTeiByOuCOPD(), listColumn = [...teiMetaData_book, ...eventCOPDMetadata_book, ...coreDhisMetadata_book]))

        // //HEN
        // rqContent.createWorker().createHolderTitleRow('hen', `table_id2`
        //     , prepareDataTable(await getEventByTeiByOuHEN(), listColumn = [...teiMetaData_book, ...eventHenMetadata_book, ...coreDhisMetadata_book]))

        //TT37
        rqContent.createWorker().createHolderTitleRow('tt37', `table_id3`
            , prepareDataTable(await getEventByTeiByOuTT37(), listColumn = TT37Metadata))
        rqContent.triggleAllNetworkTask();
    }

    async function getEventByTeiByOuCOPD() {
        let programID = `gPWs4FRX9dj`
        //get credential user
        let userCredential = await pull(`api/me`)

        let fetchTeiByOU = await pull(`api/trackedEntityInstances.json?&ou=${orgUnitSelectedID}&program=${programID}&ouMode=DESCENDANTS&paging=false`, {
            credentials: "include"
        })
        teiByOu = fetchTeiByOU.trackedEntityInstances.map(tei => tei.trackedEntityInstance)
        let queryCopd = {
            "auth": {
                "userID": userCredential.userCredentials.id
                , "lastLogin": userCredential.userCredentials.lastLogin
                , "originInstance": desURL
            }
            , "dataInstance": desURL
            , "payload": {
                "program": programID
                , "dimension": ["col_tei", "col_monthly", "col_yearly", "col_executiondate", "col_ouname", ...teiMetaData_book.map(e => e.id), ...eventCOPDMetadata_book.map(e => e.id)]
                , "filterBoth": { "pe": periods.split(';') }
                , "filterSql": {
                    "tei": teiByOu,
                    "rIVl8YPZrW1": ["1"],//COPD
                    "iXw1Eq7HqjS:not in": ["4"]//Except dead
                }
            }
        };
        let fetchData = await fetch('http://kln.tkyt.vn/p2ild/public/analyticsEvent', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(queryCopd)
        })
        return fetchData.json()
    }

    async function getEventByTeiByOuHEN() {
        let programID = `gPWs4FRX9dj`
        //get credential user
        let userCredential = await pull(`api/me`)

        let fetchTeiByOU = await pull(`api/trackedEntityInstances.json?&ou=${orgUnitSelectedID}&program=${programID}&ouMode=DESCENDANTS&paging=false`, {
            credentials: "include"
        })
        teiByOu = fetchTeiByOU.trackedEntityInstances.map(tei => tei.trackedEntityInstance)
        let queryCopd = {
            "auth": {
                "userID": userCredential.userCredentials.id
                , "lastLogin": userCredential.userCredentials.lastLogin
                , "originInstance": desURL
            }
            , "dataInstance": desURL
            , "payload": {
                "program": programID
                , "dimension": ["col_tei", "col_monthly", "col_yearly", "col_executiondate", "col_ouname", ...teiMetaData_book.map(e => e.id), ...eventHenMetadata_book.map(e => e.id)]
                , "filterBoth": { "pe": periods.split(';') }
                , "filterSql": {
                    "tei":
                        teiByOu
                    ,
                    "rIVl8YPZrW1": ["2"],//HEN
                    "iXw1Eq7HqjS:not in": ["4"]//Except dead
                }
            }
        };
        let fetchData = await fetch('http://kln.tkyt.vn/p2ild/public/analyticsEvent', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(queryCopd)
        })
        return fetchData.json()
    }

    async function getEventByTeiByOuTT37() {
        let programID = `gPWs4FRX9dj`
        //get credential user
        let userCredential = await pull(`api/me`)

        let fetchTeiByOU = await pull(`api/trackedEntityInstances.json?&ou=${orgUnitSelectedID}&program=${programID}&ouMode=DESCENDANTS&paging=false`, {
            credentials: "include"
        })
        teiByOu = fetchTeiByOU.trackedEntityInstances.map(tei => tei.trackedEntityInstance)
        let queryCopd = {
            "auth": {
                "userID": userCredential.userCredentials.id
                , "lastLogin": userCredential.userCredentials.lastLogin
                , "originInstance": desURL
            }
            , "dataInstance": desURL
            , "payload": {
                "program": programID
                , "dimension": ["col_tei", "col_monthly", "col_yearly", "col_executiondate", "col_ouname", ...TT37Metadata.filter(e => e.id != undefined).map(e => e.id)]
                , "filterBoth": { "pe": [periods.split(';')[0].substring(0, 4)] }
                , "orderBy": TT37Metadata.filter(e => e.sqlSorting != undefined).map(e => { let rs = {}; rs[e.id] = e.sqlSorting; return rs })
                , "filterSql": {
                    "tei": teiByOu,
                    "rIVl8YPZrW1": ["1", "2"],//COPD + HEN
                    "iXw1Eq7HqjS:not in": ["4"]//Except dead
                }
            }
        };


        let fetchData = await fetch('http://kln.tkyt.vn/p2ild/public/analyticsEvent', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(queryCopd)
        })
        return fetchData.json()
    }



    function prepareDataTable(json, listColumn) {
        function excuteFuncWithIdRowAnchor(idRowAnchor, thisApi) {
            (async () => {
                let dataByRow = []
                let jsonHeaders = json.headers
                let data = _.groupBy(json.rows, jsonHeaders.tei)
                let idx = 0;
                let isTT37 = idRowAnchor == 'table_id3' ? true : false

                Object.keys(data).forEach((key, stt) => {
                    let initRow = getTeiEventToArray({ oriJson: json, jsonHeaders, stt: ++stt, teiData: data[key], listColumn, isTT37 });
                    dataByRow = dataByRow.concat(initRow)
                })
                // }

                //Group by diseaseType

                let tableData = {
                    data: dataByRow,
                    "columnDefs": [{
                        "searchable": false,
                        "orderable": false,
                        "targets": 0
                    }],

                    dom: 'Bfrtip',
                    // sort: false,
                    buttons: [
                        'excel', 'print'
                    ]
                }


                if (isTT37) {
                    tableData['order'] = listColumn.filter(e => e.sqlSorting != undefined).map(e => { let rs = []; rs = [e.col, e.sqlSorting]; return rs })
                }
                let t = $(`#${idRowAnchor}`).DataTable(tableData)
                t.on('order.dt search.dt', function () {
                    t.column(0, { search: 'applied', order: 'applied' }).nodes().each(function (cell, i) {
                        cell.innerHTML = i + 1;
                    });
                }).draw();
                thisApi.getOwnerManager().setRequestStatusByRowID(idRowAnchor, p2ild.asyncLoadSupport.STATUS_API.SUCCESS)
            })()
        }
        return { excuteFuncWithIdRowAnchor }
    }

    function getTeiEventToArray(data) {
        let { oriJson, jsonHeaders, stt, teiData, listColumn, isTT37 } = data
        //Get monthDataTT37 for tt37

        //prepare each tei tt37
        if (isTT37) {
            let monthDataTT37 = teiData.map(e => {
                let eventDate = new Date(e[jsonHeaders['executiondate']]);
                let dataDatMTDT = e[jsonHeaders['agZdCCAUFKx']]
                let diseaseType = e[jsonHeaders['rIVl8YPZrW1']]
                return {
                    eventDate,
                    month: eventDate.getMonth()
                        + 1,//offset for start index at 0,
                    year: eventDate.getFullYear(),

                    dataDatMTDT,
                    oriEvent: e,
                    diseaseType
                }
            })
            let filterSameYearPicked = monthDataTT37.filter(e => { return periods.split(';')[0].includes(e.year) })

            //Group type of disease. tei appear multi row
            let groupByDiseaseType = _.groupBy(filterSameYearPicked, "diseaseType")
            return Object.keys(groupByDiseaseType).reduce((rs, codeBenh, idx, oriArr) => {
                monthByDisease = groupByDiseaseType[codeBenh].sort((a, b) => { return a.eventDate - b.eventDate })
                rs.push(getRowData(stt, defaultTeiInfo = monthByDisease[0].oriEvent, listColumn, monthByDisease))
                return rs;
            }, [])

        }

        //Prepare each event data book
        return teiData.reduce((rs, event, idx, arr) => {
            let colData = getRowData(stt, event, listColumn)
            return rs.push(colData), rs
        }, [])

        function getRowData(stt, event, listColumn, monthDataTT37) {
            event = event.map(e => { return e ? e : "" });
            listColumn = listColumn.filter(e => { return e.col != undefined })
            let maxCol = listColumn.sort((a, b) => { return a.col - b.col });
            maxCol = maxCol[maxCol.length - 1].col + 1
            return Array(maxCol).fill('').map((value, colIdx, arrOutput) => {
                if (value != undefined && value != '') return value
                if (colIdx == 0) return stt//return stt

                let foundCol = listColumn.find(e => e.col == colIdx)
                if (!foundCol) { return ''; }
                /**
                 * Specific dx,attr
                 **/
                let rawValue = event[jsonHeaders[foundCol.id]];
                switch (true) {
                    case foundCol.isOption:
                        rawValue == ''
                            ? value = ''
                            : value = getValueAsOptionName({ jsonMetaData: oriJson.metaData, event, jsonHeaders, de: foundCol.id })

                        break;
                    case foundCol.month:
                    case foundCol.convertOutputValue != undefined:
                        let paramsCallback = { jsonMetaData: oriJson.metaData, jsonHeaders, event, teiData, foundCol, rawValue, arrOutput }
                        foundCol.month ? paramsCallback['monthDataTT37'] = monthDataTT37 : {}
                        value = foundCol.convertOutputValue(paramsCallback)
                        break
                    default:
                        value = rawValue
                        break;
                }

                return value
            }).map(e => { return e ? e : "" });
        }
    }

    function getValueAsOptionName(data) {
        let { jsonMetaData, event, jsonHeaders, de } = data
        return jsonMetaData.dimensions[de]
            ?.map(e => jsonMetaData.items[e])
            .find(e => e.code == event[jsonHeaders[de]])?.name || ""
    }

    function lastLoad() {
        $("#overlay").fadeOut(300);
        document.getElementById("defaultOpen").click();
        if (intergrateObject) {
            intergrateObject.createButtonWithPosition($("#printing"))
        }
        //On load all requests success
    }

    return {
        requestApiManager: requestApiManager,
        intergrateObject: intergrateObject,
        loadReport: loadReport,
        onDocumentReady: onDocumentReady,
    }
}