// Initialize Firebase
var config = {
    apiKey: "AIzaSyDMG73OD4CnFcSVdlPebDWQNH-AwJng2D0",
    authDomain: "otd-charts.firebaseapp.com",
    databaseURL: "https://otd-charts.firebaseio.com",
    projectId: "otd-charts",
    storageBucket: "otd-charts.appspot.com",
    messagingSenderId: "475041772600"
};
firebase.initializeApp(config);
var database = firebase.database();

async function doAjax() {
    let result;
    try {
        result = await $.ajax({
            url: "get-stats.xml", // path to file
            dataType: 'text' // type of file (text, json, xml, etc)
        });
        var parser = new DOMParser();
        var xml = parser.parseFromString(result, "text/xml");
        var json = xmlToJson(xml)
        return json;
    } catch (error) {
        console.error(error);
    }
}

function writeUserData(json) {
    var newPostKey = database.ref().push().key;
    var updates = {};
    updates['/otd/' + newPostKey] = json;
    database.ref().update(updates);
};

var saveData = document.getElementById("saveData");
saveData.addEventListener('click', function(){
    event.preventDefault();
    doAjax().then(function (data) {
        //console.log(data)
        writeUserData(data)
        alert("Datos guardados correctamente.")
    });
});

var showChart = document.getElementById("showChart");
showChart.addEventListener('click', function(){
    event.preventDefault();
    database.ref('otd').on('child_added', function(snapshot) {
        var datosCPU = snapshot.val().stats.server["cpu-info"];
        console.log(datosCPU);
        drawOracleChart(datosCPU)
      });
});
