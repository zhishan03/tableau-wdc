console.log("This is working!");

(function () {
  var myConnector = tableau.makeConnector();

  myConnector.getSchema = function (schemaCallback) {
    const covidCols = [
      {
        id: "ID",
        dataType: tableau.dataTypeEnum.string,
      },
      {
        id: "Lane_name",
        dataType: tableau.dataTypeEnum.int,
      },
      {
        id: "Title",
        dataType: tableau.dataTypeEnum.string,
      },
      {
        id: "Actual_start_date",
        dataType: tableau.dataTypeEnum.date,
      },
      {
        id: "Actual_finish_Date",
        dataType: tableau.dataTypeEnum.date,
      },
      {
        id: "Time_savings_hours_annually",
        dataType: tableau.dataTypeEnum.int,
      },
      {
        id: "Financial_value_opportunity_annually",
        dataType: tableau.dataTypeEnum.int,
      },
      {
        id: "Customer",
        dataType: tableau.dataTypeEnum.string,
      },
      {
        id: "Build_team",
        dataType: tableau.dataTypeEnum.string,
      },
      {
        id: "Defined_solution",
        dataType: tableau.dataTypeEnum.string,
      },
    ];

    let covidTableSchema = {
      id: "RIVM",
      alias: "Dutch Corona Cases since start",
      columns: covidCols,
    };

    schemaCallback([covidTableSchema]);
  };

  myConnector.getData = function (table, doneCallback) {
    let tableData = [];

    const url = "https://kanban.jnj.com/api/v2/board/kanbanBoardDetails?id=1249";
    const data = { username: 'zchen128', "password": "Victoria2012" };

    fetch(url, {mathod:'GET',
        headers: {'Authorization': 'Basic ' + btoa(data.username + ":" + data.password)}})
        .then((resp) => resp.json())
        .then(function(data) {
            cards = data.cards
                console.log(data)
                tableData = [];
                for (i = 0, len = cards.length; i < len; i++) {
                    if ("Time Savings (Hours Annually)" in cards[i].custom) {
                        time_savings = cards[i].custom['Time Savings (Hours Annually)'];
                    } else {
                        time_savings = 0;
                    }

                    if ("Financial Value Opportunity (Annually)" in cards[i].custom) {
                        financial_value = cards[i].custom['Financial Value Opportunity (Annually)'];
                    } else {
                        financial_value = 0;
                    }

                    if ("JJT Defined Product & Solution" in cards[i].custom) {
                        solution = cards[i].custom['JJT Defined Product & Solution'];
                    } else {
                        solution = "";
                    }
                    
                    tableData.push({
                        ID: cards[i].id,
                        Lane_name: cards[i].lane_id,
                        Title: cards[i].title,
                        Actual_start_date: cards[i].actual_start_date,
                        Actual_finish_date: cards[i].actual_finish_date,
                        Time_savings_hours_annually: time_savings,
                        Financial_value_opportunity_annually: financial_value, 
                        Customer: cards[i].custom['Customer(s)'],
                        Build_team: cards[i].custom['Build Team (Internal or Vendor)'],
                        Defined_solution: solution,
                    });
                }
            table.appendRows(tableData);
            doneCallback();
        })
        .catch(function(error) {
            console.log(error);
        });
};

  tableau.registerConnector(myConnector);
})();

document.querySelector("#getData").addEventListener("click", getData);

function getData() {
  tableau.connectionName = "Dutch Corona Numbers";
  tableau.submit();
}


// console.log("this is working"); 

// (function () {
//     var myConnector = tableau.makeConnector();

//     myConnector.getSchema = function (schemaCallback) {
//         const cardCols = [
//             {
//                 id: "ID",
//                 dataType: tableau.dataTypeEnum.int,
//             },
//             {
//                 id: "Lane_name",
//                 dataType: tableau.dataTypeEnum.string,
//             },
//             {
//                 id: "Title",
//                 dataType: tableau.dataTypeEnum.string,
//             },
//             {
//                 id: "Actual_start_date",
//                 dataType: tableau.dataTypeEnum.date,
//             },
//             {
//                 id: "Actual_finish_date",
//                 dataType: tableau.dataTypeEnum.date,
//             },
//             {
//                 id: "Card_type",
//                 dataType: tableau.dataTypeEnum.string,
//             },
//             {
//                 id: "Customer",
//                 dataType: tableau.dataTypeEnum.string,
//             },
//             {
//                 id: "Time_savings__hours_annually_",
//                 dataType: tableau.dataTypeEnum.int,
//             },
//             {
//                 id: "Financial_value_opportunity__annually_",
//                 dataType: tableau.dataTypeEnum.int,
//             },
//             {
//                 id: "Build_team__internal_or_vendor_",
//                 dataType: tableau.dataTypeEnum.string,
//             },
//             {
//                 id: "Jjt_defined_product___solution",
//                 dataType: tableau.dataTypeEnum.string,
//             },
//         ];

//         let cardSchema = {
//             id: "1249",
//             alias: "Cards details",
//             column: cardCols,
//         };

//         schemaCallback([cardSchema]);
//     };

//     myConnector.getData = function (table, doneCallback) {
//         tableData = [];

//         fetch(url, {mathod:'GET',
//             headers: {'Authorization': 'Basic ' + btoa(data.username + ":" + data.password)}})
//             .then((resp) => resp.json())
//             .then(function(data) {
//                 for (i = 0, len = data.length; i < len; i++) {
//                     if ("Time Savings (Hours Annually)" in data[i].custom) {
//                         time_savings = data[i].custom['Time Savings (Hours Annually)'];
//                     } else {
//                         time_savings = 0;
//                     }

//                     if ("Financial Value Opportunity (Annually)" in data[i].custom) {
//                         financial_value = data[i].custom['Financial Value Opportunity (Annually)'];
//                     } else {
//                         financial_value = 0;
//                     }

//                     if ("JJT Defined Product & Solution" in data[i].custom) {
//                         solution = data[i].custom['JJT Defined Product & Solution'];
//                     } else {
//                         solution = "";
//                     }
                        
//                     tableData.push({
//                         ID: data[i].id,
//                         Lane_name: data[i].lane_id,
//                         Title: data[i].title,
//                         Assigned_user: data[i].assigned_user,
//                         Actual_start_date: data[i].actual_start_date,
//                         Actual_finish_date: data[i].actual_finish_date,
//                         Card_type: data[i].card_type,
//                         Customer: data[i].custom['Customer(s)'],
//                         Time_savings__hours_annually_: time_savings,
//                         Financial_value_opportunity__annually_: financial_value, 
//                         Build_team__internal_or_vendor_: data[i].custom['Build Team (Internal or Vendor)'],
//                         Jjt_defined_product___solution: solution,
//                     });
//                 }
//                 table.appendRows(tableData);
//                 doneCallback();
//             })
//             .catch(function(error) {
//                 console.log(error);
//             });
//     };

//     tableau.registerConnector(myConnector);
// })();

// document.querySelector("#getData").addEventListener("click", getData);

// function getData() {
//   tableau.connectionName = "Dutch Corona Numbers";
//   tableau.submit();
// }
