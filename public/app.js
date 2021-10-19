(function () {
    var myConnector = tableau.makeConnector();

    myConnector.getSchema = function (schemaCallback) {
        const cardCols = [
            {
                id: "id",
                dataType: tableau.dataTypeEnum.int,
            },
            {
                id: "lane_name",
                dataType: tableau.dataTypeEnum.string,
            },
            {
                id: "title",
                dataType: tableau.dataTypeEnum.string,
            },
            {
                id: "assigned_user",
                dataType: tableau.dataTypeEnum.string,
            },
            {
                id: "actual_start_date",
                dataType: tableau.dataTypeEnum.date,
            },
            {
                id: "actual_finish_date",
                dataType: tableau.dataTypeEnum.date,
            },
            {
                id: "card_type",
                dataType: tableau.dataTypeEnum.string,
            },
            {
                id: "customer",
                dataType: tableau.dataTypeEnum.string,
            },
            {
                id: "card_type",
                dataType: tableau.dataTypeEnum.string,
            },
            {
                id: "time_savings__hours_annually_",
                dataType: tableau.dataTypeEnum.int,
            },
            {
                id: "financial_value_opportunity__annually_",
                dataType: tableau.dataTypeEnum.int,
            },
            {
                id: "build_team__internal_or_vendor_",
                dataType: tableau.dataTypeEnum.string,
            },
            {
                id: "jjt_defined_product___solution",
                dataType: tableau.dataTypeEnum.string,
            },
        ];

        let cardSchema = {
            id: "1249",
            alias: "Cards details",
            column: cardCols,
        };

        schemaCallback([cardSchema]);
    };

    myConnector.getData = function (table, doneCallback) {

    };

    tableau.registerConnector(myConnector);
})();

document.querySelector("#getData").addEventListener('click', getData)

function getData() {
    tableau.connectionName = "Kanban Board 1249";
    tableau.submit();
}
