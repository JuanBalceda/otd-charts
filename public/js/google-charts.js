function drawOracleChart(datos) {
    // Load the Visualization API and the corechart package.
    google.charts.load('current', {
        'packages': ['corechart'],
        'language': 'es'
    });

    // Set a callback to run when the Google Visualization API is loaded.
    google.charts.setOnLoadCallback(drawChart);

    // Callback that creates and populates a data table,
    // instantiates the pie chart, passes in the data and
    // draws it.
    function drawChart() {

        // Create the data table.
        var data = new google.visualization.DataTable();

        data.addColumn('number', 'X');
        data.addColumn('number', 'Percent Idle');
        data.addColumn('number', 'Percent Kernel');
        data.addColumn('number', 'Percent User');

        for (var i = 0; i < datos.length; i++) {
            var obj = datos[i];
            console.log(obj);
            data.addRow([
                parseFloat(obj["@attributes"].cpu), 
                parseFloat(obj["@attributes"].percentIdle), 
                parseFloat(obj["@attributes"].percentKernel), 
                parseFloat(obj["@attributes"].percentUser)
            ]);
        }

        var options = {
            hAxis: {
                title: 'CPU',
                textStyle: {
                    color: '#607d8b',
                    bold: true,
                    italic: true
                },
                titleTextStyle: {
                    color: '#607d8b',
                    bold: false,
                    italic: true
                }
            },
            vAxis: {
                title: 'Popularity',
                textStyle: {
                    color: '#607d8b',
                    bold: true
                },
                titleTextStyle: {
                    color: '#607d8b',
                    bold: true
                }
            },
            width: 900,
            height: 500,
            colors: ['#4caf50', '#03a9f4']
        };
        var chart = new google.visualization.LineChart(document.getElementById('chart_div'));
        chart.draw(data, options);
    }
}