$(document).ready(function() {

	var dataRef = new Firebase("https://howfayatrain.firebaseio.com/");

	
	$('#submit').on('click', function() {
	var trainId = $('#train-name').val().trim();
	var destination = $('#destination').val().trim();
	var arrival = $('#first-train').val().trim();
	var frequency = $('#frequency').val().trim();

		
		dataRef.push({
		name: trainId,
		destination: destination,
		frequency: frequency,
		firstTime: firstTimeConverted,
		minutesAway: tMinutesTillTrain,
		nextArrival: arrival
		});
});	
	// First Time (pushed back 1 year to make sure it comes before current time)
	var firstTimeConverted = moment(arrival,"hh:mm").subtract(1, "years");
		// console.log(firstTimeConverted);

	// Current Time
	var currentTime = moment();
		// console.log("CURRENT TIME: " + moment(currentTime).format("hh:mm"));

	var diffTime = moment().diff(moment(firstTimeConverted), "minutes");
		// console.log("DIFFERENCE IN TIME: " + diffTime);

	// Time apart (remainder)
	var tRemainder = diffTime % frequency; 
		// console.log("time remainder: " + tRemainder);

	// Minute Until Train
	var tMinutesTillTrain = frequency - tRemainder;
		// console.log("MINUTES TILL TRAIN: " + tMinutesTillTrain);

	// Next Train
	var nextTrain = moment().add(tMinutesTillTrain, "minutes");
		// console.log("ARRIVAL TIME: " + moment(nextTrain).format("hh:mm"));

	var arrival = moment(nextTrain).format("hh:mm");

	setInterval(date,1000);
	function date()	{
		$("#date").html(moment(new Date()).format('MMMM Do YYYY, h:mm:ss a'));
	};


	dataRef.on('child_added', function(snapShot) {


		$(".table > tbody").append("<tr><td>" + snapShot.val().name + "</td><td>" + snapShot.val().destination +
		 "</td><td>" + snapShot.val().frequency + "</td><td>" + snapShot.val().nextArrival + "</td><td>" + 
		 snapShot.val().minutesAway + "</td></tr>");
		});

	
}); 
