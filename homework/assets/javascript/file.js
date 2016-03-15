$(function() {

	var currentTrain = $(".table");
	var fireBase = new Firebase("https://howfaryatrain.firebaseio.com/");


	$("#submit").on("click", function (e) {
		var trainId = $("#train-name").val();
		var trainFB = new Firebase(fireBase + trainId);

		var destination = $("#destination").val(),
			arrival = $("#first-train").val(),
			mintues = $("#frequency").val();
		trainFB.set({
			name: trainId,
			destination: destination,
			frequency: mintues,
			arrival: arrival
		});
	});

	fireBase.on("child_added", function (snapshot) {

		var snapValue = snapshot.val();
		var newRow = $("<tr>");
		newRow.attr({id:snapValue.name});
		// ADD TIIME HERE
		[[snapValue.name, "name"], [snapValue.destination, "destination"], [snapValue.frequency, "mintues"],
		[snapValue.arrival, "arrival"]].forEach
		(function (snapitem) {
			var newRowItem = $("<td>");
			newRowItem. attr({class: snapitem[1]});

			newRowItem.text(snapitem[0])
			newRow.append(newRowItem);
		});
		currentTrain.append(newRow);
	});
});