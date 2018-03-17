/* FIREBASE INITILIZATION */
var config = {
    apiKey: "AIzaSyDtSW5yeuHiRdp3DWoS4bahwLTfm-mGFn4",
    authDomain: "train-scheduler-28189.firebaseapp.com",
    databaseURL: "https://train-scheduler-28189.firebaseio.com",
    projectId: "train-scheduler-28189",
    storageBucket: "",
    messagingSenderId: "731802922803"
};
firebase.initializeApp(config);

var database = firebase.database();

$(document).ready(
    
    /* INITIAL DATA PULL FROM FIREBASE */
    database.ref().on("child_added", function(snapshot) {
        var name = snapshot.val().name;
        var destination = snapshot.val().destination;
        var firstTime = snapshot.val().firstTime;
        var frequency = snapshot.val().frequency;

        /* CALCULATE ARRIVAL TIMES */
        var firstTimeMoment = moment(firstTime, "hh:mm A").subtract(1, "years");
        var now = moment();
        var diff = now.diff(moment(firstTimeMoment), "minutes");
        var remainder = diff % frequency;
        var timeRemaining = frequency - remainder;
        var nextTrain = moment().add(timeRemaining, "minutes").format("hh:mm A");

        /* APPEND DATABASE INFO TO TABLE */
        $("table > tbody").append(
            "<tr><td>" + name +
            "</td><td>" + destination +
            "</td><td>" + frequency + 
            "</td><td>" + nextTrain +
            "</td><td>" + timeRemaining +
            "</td></tr>"
        );
    }),


    /* PUSH NEW DATA TO FIREBASE ON CLICK */
    $(".submit").on("click", function() {

        /* RETRIEVE INPUT VALUES AND STORE IN VARIABLES/OBJECT */
        var name = $(".train-name").val().trim();
        var destination = $(".destination").val().trim();
        var firstTime = $(".first-time").val().trim();
        var frequency = $(".frequency").val().trim();

        /* SET TRAIN OBJECT */
        var train = {
            name: name,
            destination: destination,
            firstTime: firstTime,
            frequency: frequency
        };

        /* PUSH TRAIN OBJECT TO DATABASE */
        database.ref().push(train);

        /* EMPTIES THE FORM */
        $("input").val("")

    })

)