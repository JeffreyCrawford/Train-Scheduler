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

$(".submit").on("click", function() {
    var trainName = $(".train-name").val().trim();
    var destination = $(".destination").val().trim();
    var firstTime = $(".first-time").val().trim();
    var frequency = $(".frequency").val().trim();

    console.log(trainName)
    console.log(destination)
    console.log(firstTime)
    console.log(frequency)

})