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

$(document).ready(function() {
    
    function update() {

        /* REMOVE THE EXISTING TABLE */
        $("td").remove();

        /* PULL DATA FROM FIREBASE */
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

            /* APPEND DATA TO TABLE */
            $("table > tbody").append(
                "<tr><td>" + name +
                "</td><td>" + destination +
                "</td><td>" + frequency + 
                "</td><td>" + nextTrain +
                "</td><td>" + timeRemaining +
                "</td></tr>"
            );
        })
    }

    /* UPDATES THE TABLE ON LOAD AND EVERY 10 SECONDS */
    update();
    setInterval(update, 10000)

    /* PUSH NEW DATA TO FIREBASE ON CLICK */
    $(".submit").on("click", function(event) {

        /* PREVENT REFRESH AND DEFINE DATA PULL/PUSH FUNCTION */
        event.preventDefault();

        function retrievePush() {

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
        }

        /* IF THE FORM IS FILLED, PULL/PUSH */
        if($(".train-name").val() && $(".destination").val() && $(".first-time").val() && $(".frequency").val()) {
            retrievePush();
        }
        else {}

        /* EMPTIES THE FORM AND UPDATES */
        $("input").val("");
        update();
    })

})