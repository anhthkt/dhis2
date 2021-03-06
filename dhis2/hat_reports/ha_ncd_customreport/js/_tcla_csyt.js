var p2ild = p2ild || {
    /**Create by P2ild
     *  Asynchronize load row
     * 
     * */
}

p2ild['reports_TCLACsyt'] = TCLACsyt();

function TCLACsyt() {

    const teiMetaData = [
        {
            col: 1, id: "xBoLC0aruyJ", title: "Họ tên"
        },
        {
            col: 2, id: "rwreLO34Xg7", title: "Giới tính"
            , isOption: true
        },
        {
            col: 3, id: "C7USC9MC8yH", title: "Năm sinh"
            , convertOutputValue: (metaData) => {
                let { jsonHeaders, event, teiData, foundCol } = metaData
                return moment(event[jsonHeaders[foundCol.id]]).format("DD/MM/YYYY")
            }
        },
        {
            col: 4, id: "JHb1hzseNMg", title: "Mã BHYT"
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
            col: 5, id: "mZbgWADLTKY", title: "SĐT"
        }
    ];

    const coreDhisMetadata = [
        {
            col: 6, id: "eventdate", title: ""
            , convertOutputValue: (metaData) => {
                let { jsonHeaders, event, teiData, foundCol } = metaData
                return moment(event[jsonHeaders[foundCol.id]]).format("DD/MM/YYYY")
            }
        },
    ]

    const eventTCMetadata = [
        {
            id: "udwtZvJMnVL", title: "Chẩn đoán"
            , col: 7
        },
        {
            col: 8, id: "G6kqlsUyuQe", title: "Hút thuốc lá"
            , isOption: true
        },
        {
            col: 9, id: "vVs8M3PXMX1", title: "Mức Mức độ uống rượu bia"
            , isOption: true
        },
        {
            col: 10, id: "Y21iPpLFLEk", title: "Có ý tưởng/ hành vi tự sát"
            , isOption: true
        },
        {
            col: 11, id: "tdXMscfrp5a", title: "Điểm PHQ9"
        },
        {
            col: 12, id: "uhgWbum6R2v", title: "Điểm BECK"
        },
        // {
        //     col: 9, id: "X5jejsNMkjR", title: "Lưu lượng đỉnh"
        //     , convertOutputValue: (metaData) => {
        //         let { foundCol, jsonHeaders, event, jsonMetaData } = metaData
        //         let fev1 = getValueAsOptionName({ foundCol, jsonHeaders, event, jsonMetaData, de: 'gXBZFnSzFlP' }) || undefined
        //         let lld = getValueAsOptionName({ foundCol, jsonHeaders, event, jsonMetaData, de: 'X5jejsNMkjR' }) || undefined
        //         switch (true) {
        //             case fev1 && lld:
        //                 resultStr = fev1
        //                 break;
        //             default:
        //                 resultStr = `${fev1 || ''}${lld || ''}`
        //                 break
        //         }
        //         return resultStr;
        //     }
        // },
        // {
        //     id: "gXBZFnSzFlP", title: "FEV1"
        // },
        {
            col: 13, id: "agZdCCAUFKx", title: "Kết quả điều trị"
            // , isOption: true
        },
        {
            col: 14, id: "iihmh4K0k18", title: "Thuốc"
        },
        {
            col: 15, id: "mVdtFRM2gFX", title: "Nhận xét"
            , convertOutputValue: (metaData) => {
                let { foundCol, jsonHeaders, event, jsonMetaData } = metaData
                let bienChung = event[jsonHeaders['X0kBm02Gyft']] || ""
                let ghiRoBienChung = event[jsonHeaders['hfGTym6BfK1']] || ""
                let nhanxet = getValueAsOptionName({ jsonMetaData, foundCol, de: 'fBj7BCdA665' }) || ""
                let resultStr = ''
                resultStr = bienChung == '2'//Co
                    ? ghiRoBienChung : ''
                resultStr += nhanxet
                return resultStr;
            }
        }//NhanXet + YBSKhamBenh
        , {
            id: "X0kBm02Gyft", title: "biến chứng"
        },
        {
            id: "hfGTym6BfK1", title: "Ghi rõ biến chứng"
        },
        {
            id: "mOguWgQg1or", title: "Y bác sỹ khám bệnh"
        }
    ];

    const eventLAMetadata = [
        {
            id: "udwtZvJMnVL", title: "Chẩn đoán"
            , col: 7
        },
        {
            col: 8, id: "G6kqlsUyuQe", title: "Hút thuốc lá"
            , isOption: true
        },
        {
            col: 9, id: "vVs8M3PXMX1", title: "Mức Mức độ uống rượu bia"
            , isOption: true
        },
        {
            col: 10, id: "PfsxYCRh9Pk", title: "Điểm GAD7"
        },
        {
            col: 11, id: "VuIZM4XyVSf", title: "Điểm ZUNG"
        },
        // {
        //     col: 9, id: "X5jejsNMkjR", title: "Lưu lượng đỉnh"
        //     , convertOutputValue: (metaData) => {
        //         let { foundCol, jsonHeaders, event, jsonMetaData } = metaData
        //         let fev1 = getValueAsOptionName({ foundCol, jsonHeaders, event, jsonMetaData, de: 'gXBZFnSzFlP' }) || undefined
        //         let lld = getValueAsOptionName({ foundCol, jsonHeaders, event, jsonMetaData, de: 'X5jejsNMkjR' }) || undefined
        //         switch (true) {
        //             case fev1 && lld:
        //                 resultStr = fev1
        //                 break;
        //             default:
        //                 resultStr = `${fev1 || ''}${lld || ''}`
        //                 break
        //         }
        //         return resultStr;
        //     }
        // },
        // {
        //     id: "gXBZFnSzFlP", title: "FEV1"
        // },
        {
            col: 12, id: "agZdCCAUFKx", title: "Kết quả điều trị"
            // , isOption: true
        },
        {
            col: 13, id: "iihmh4K0k18", title: "Thuốc"
        },
        {
            col: 14, id: "mVdtFRM2gFX", title: "Nhận xét"
            , convertOutputValue: (metaData) => {
                let { foundCol, jsonHeaders, event, jsonMetaData } = metaData
                let bienChung = event[jsonHeaders['X0kBm02Gyft']] || ""
                let ghiRoBienChung = event[jsonHeaders['hfGTym6BfK1']] || ""
                let nhanxet = getValueAsOptionName({ jsonMetaData, foundCol, de: 'fBj7BCdA665' }) || ""
                let resultStr = ''
                resultStr = bienChung == '2'//Co
                    ? ghiRoBienChung : ''
                resultStr += nhanxet
                return resultStr;
            }
        }//NhanXet + YBSKhamBenh
        , {
            id: "X0kBm02Gyft", title: "biến chứng"
        },
        {
            id: "hfGTym6BfK1", title: "Ghi rõ biến chứng"
        },
        {
            id: "mOguWgQg1or", title: "Y bác sỹ khám bệnh"
        }
    ];

    function onDocumentReady() {

    }

    var requestApiManager = [], intergrateObject;
    //Table3
    async function loadReport() {
        var requestApiManager = [];
        let rqContent;
        p2ild.asyncLoadSupport ? rqContent = p2ild.asyncLoadSupport.createManager() : {};

        requestApiManager['content'] = rqContent;
        rqContent.setHandleSuccessAll(lastLoad)
        
        let urlApiTC = [
            `api/analytics/events/query/WmEGO8Ipykm.json?dimension=pe:${periods}&dimension=ou:${orgUnitSelectedID}`,
            `dimension=Mbxbdi53AwF.jd8vkowkM7G:IN:3`,
            `dimension=Mbxbdi53AwF.iXw1Eq7HqjS:NE:4`,
            teiMetaData.map(
                e => e.id.split('_').map(x => "dimension=" + x).join('&')
            ).join("&"),
            eventTCMetadata.map(
                e => e.id.split('_').map(x => "dimension=" + x).join('&')
            ).join("&"),
            "desc=EVENTDATE"
        ].join('&');

        let urlApiLA = [
            `api/analytics/events/query/WmEGO8Ipykm.json?dimension=pe:${periods}&dimension=ou:${orgUnitSelectedID}`,
            `dimension=Mbxbdi53AwF.jd8vkowkM7G:IN:5`,
            `dimension=Mbxbdi53AwF.iXw1Eq7HqjS:NE:4`,
            teiMetaData.map(
                e => e.id.split('_').map(x => "dimension=" + x).join('&')
            ).join("&"),
            eventLAMetadata.map(
                e => e.id.split('_').map(x => "dimension=" + x).join('&')
            ).join("&"),
            "desc=EVENTDATE"
        ].join('&');

        //Trầm cảm
        rqContent.createWorker().createHolderTitleRow('tc', `table_id1`
            , prepareDataTable(await pull(urlApiTC), listColumn = [...teiMetaData, ...eventTCMetadata, ...coreDhisMetadata]))
        //Lo âu
        rqContent.createWorker().createHolderTitleRow('la', `table_id2`
            , prepareDataTable(await pull(urlApiLA), listColumn = [...teiMetaData, ...eventLAMetadata, ...coreDhisMetadata]))
        rqContent.triggleAllNetworkTask();
    }

    function prepareDataTable(json, listColumn) {
        function excuteFuncWithIdRowAnchor(idRowAnchor, thisApi) {
            (async () => {
                let dataByRow = []
                let jsonHeaders = p2ild.dvu.defineHeader(json.headers, true)
                let data = _.groupBy(json.rows, jsonHeaders.tei)
                let idx = 0;
                //For list tei
                Object.keys(data).forEach((key, stt) => {
                    let initRow = getTeiEventToArray({ oriJson: json, jsonHeaders, stt: ++stt, teiData: data[key], listColumn, isTT37: idRowAnchor == 'table_id3' ? true : false });
                    dataByRow = dataByRow.concat(initRow)
                })
                console.log(dataByRow)

                $(`#${idRowAnchor}`).DataTable({
                    data: dataByRow,
                    "columnDefs": [],
                    dom: 'Bfrtip',
                    buttons: [
                        'excel', 'print'
                    ]
                })
                thisApi.getOwnerManager().setRequestStatusByRowID(idRowAnchor, p2ild.asyncLoadSupport.STATUS_API.SUCCESS)
            })()
        }
        return { excuteFuncWithIdRowAnchor }
    }

    function getTeiEventToArray(data) {
        let { oriJson, jsonHeaders, stt, teiData, listColumn } = data
        //Get monthDataTT37 for tt37

        //Prepare each event data book
        return teiData.reduce((rs, event, idx, arr) => {
            let colData = getRowData(stt, event, listColumn)
            return rs.push(colData), rs
        }, [])

        function getRowData(stt, event, listColumn, monthDataTT37) {
            event = event.map(e => { return e ? e : "" });
            listColumn = listColumn.filter(e => { return e.col })
            let maxCol = listColumn.sort((a, b) => { return a.col - b.col });
            maxCol = maxCol[maxCol.length - 1].col + 1
            return Array(maxCol).fill('').map((value, colIdx, arrOutput) => {
                if (value != undefined && value != '') return value
                if (colIdx == 0) return stt

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
                    case foundCol.convertOutputValue != undefined:
                        let paramsCallback = { jsonMetaData: oriJson.metaData, jsonHeaders, event, teiData, foundCol, rawValue, arrOutput }
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