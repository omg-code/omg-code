{
    init: function(elevators, floors) {

        function cleanQueue(destinationQueue) {

            var newDestinationQueue = [];

            console.log("destinationQueue:");
            for (destination of destinationQueue) {
                console.log(destination);
                if (destinationQueue.indexOf(destination) === -1) newDestinationQueue.push(destination);
            }

            destinationQueue = newDestinationQueue;

            return destinationQueue;
        }

        for (elevator of elevators) {

            elevator.on("idle", function() {

                elevator.goToFloor(0);
                // console.log("idle");
            });

            elevator.on("floor_button_pressed", function(floorNum) {

                elevator.destinationQueue.push(floorNum);
                // elevator.destinationQueue = cleanQueue(elevator.destinationQueue);
                // elevator.destinationQueue.sort();
                elevator.checkDestinationQueue();

                // console.log("floor_button_pressed");
            });

            elevator.on("passing_floor", function(floorNum, direction) {

                // console.log("passing_floor " + floorNum + " going " + direction);
            });

            elevator.on("stopped_at_floor", function(floorNum) {

                // console.log("stopped_at_floor " + floorNum);
            });
        };

        for (floor of floors) {

            floor.on("up_button_pressed", function() {

                // elevator.destinationQueue.push(floor.floorNum());
                // elevator.destinationQueue = cleanQueue(elevator.destinationQueue);
                // elevator.destinationQueue.sort();
                // elevator.checkDestinationQueue();

                elevator.goToFloor(floor.floorNum());

                // console.log("up_button_pressed on floor [" + floor.floorNum() + "]");
            });

            floor.on("down_button_pressed", function() {

                // elevator.destinationQueue.push(floor.floorNum());
                // elevator.destinationQueue = cleanQueue(elevator.destinationQueue);
                // elevator.destinationQueue.sort();
                // elevator.checkDestinationQueue();

                elevator.goToFloor(floor.floorNum());

                // console.log("down_button_pressed on floor [" + floor.floorNum() + "]");
            });
        };
    },
    update: function(dt, elevators, floors) {
        ///

        for (elevator of elevators) {
            console.log(elevator.destinationQueue.toString());
        }
    }
}
