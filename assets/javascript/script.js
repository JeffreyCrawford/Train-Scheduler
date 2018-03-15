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

/* SUBMIT BUTTON ON CLICK EVENT */
$(".submit").on("click", function() {

    /* RETRIEVE INPUT VALUES AND STORE IN VARIABLES/OBJECT */
    var name = $(".train-name").val().trim();
    var destination = $(".destination").val().trim();
    var firstTime = $(".first-time").val().trim();
    var frequency = $(".frequency").val().trim();

    /* CONSOLE LOG INPUT VARIABLES */
    console.log(name)
    console.log(destination)
    console.log(firstTime)
    console.log(frequency)

    /* SET TRAIN OBJECT */
    var train = {
        name: name,
        destination: destination,
        firstTime: firstTime,
        frequency: frequency
    };

    /* PUSH INFO TO DATABASE */
    database.ref().push(train);

    /* RETRIEVE INFO FROM DATABASE */
    database.ref().on("child_added", function(trainSnapshot) {
        var trainName = trainSnapshot.val().name;
        var destination = trainSnapshot.val().destination;
        var firstTime = trainSnapshot.val().firstTime;
        var frequency = trainSnapshot.val().frequency;

        var first = function(firstTime) {
            isValid(firstTime)
        };

        var now = function() {
            getTime()
        };

        console.log(first);

        console.log(now);

    /* APPEND DATABASE INFO TO TABLE */
    $("table > tbody").append(
        "<tr><td>" + trainName +
        "</td><td>" + destination +
        "</td><td>" + frequency + 
        "</td><td>" + "" +
        "</td><td>" + "" +
        "</td></tr>"
    );
    });




})