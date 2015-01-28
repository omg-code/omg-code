{
    init: function(elevators, floors) {
        function smartpush(floorNum) {
            if (elevator.destinationQueue.indexOf(floorNum) == -1) {
                elevator.destinationQueue.push(floorNum);
            }
            elevator.checkDestinationQueue();
        };
        var elevator = elevators[0]; // Let's use the first elevator
        elevator.on("idle", function() {
            console.log("idle " + elevator.destinationQueue);
            elevator.checkDestinationQueue();
        });
        elevator.on("floor_button_pressed", function(floorNum) {
            smartpush(floorNum);
            elevator.checkDestinationQueue();
        });
        floors.forEach(function(floor, floorNum) {
            floor.on("up_button_pressed", function() {
                console.log("up " + floor.floorNum());
                smartpush(floor.floorNum());
                elevator.checkDestinationQueue();
            })
            floor.on("down_button_pressed", function() {
                console.log("down " + floor.floorNum());
                smartpush(floor.floorNum());
                elevator.checkDestinationQueue();
            })
        });
        elevator.on("passing_floor", function(floorNum, direction) {
            console.log("passing floor " + floorNum);
            if (elevator.getPressedFloors().indexOf(floorNum) > -1 ||
                elevator.destinationQueue.indexOf(floorNum) > -1
            ) {
                console.log("WOOT " + floorNum + " of " + elevator.getPressedFloors());
                elevator.goToFloor(floorNum, true);
            }
            // either way remove this from the queue
            elevator.destinationQueue = elevator.destinationQueue.filter(
                function (value) {
                    return (value != floorNum);
                }
            );
            elevator.checkDestinationQueue();
        });
        elevator.on("stopped_at_floor", function(floorNum, direction) {
            if (elevator.getPressedFloors().indexOf(floorNum) > -1) {
                console.log("WOOT " + floorNum + " of " + elevator.getPressedFloors());
                elevator.goToFloor(floorNum, true);
            }
            // either way remove this from the queue
            elevator.destinationQueue = elevator.destinationQueue.filter(
                function (value) {
                    return (value != floorNum);
                }
            );
            elevator.checkDestinationQueue();
        });
    },
    update: function(dt, elevators, floors) {
        console.log("... dest queue is now " + elevators[0].destinationQueue);
        elevators[0].checkDestinationQueue();
    }
}

