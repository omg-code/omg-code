
{
    init: function(elevators, floors) {
        var elevator = elevators[0]; // Let's use the first elevator
        
        elevator.on("idle", function() {
        });

        elevator.doQ = function(){
             if(elevator.getPressedFloors().length > 0) {
                 elevator.getPressedFloors().forEach(function(n){
                     if(elevator.destinationQueue.indexOf(n)==-1){
                         console.log("queue is : " + elevator.destinationQueue );
                         console.log("adding "+n);
                        elevator.goToFloor(n)
                     }
                 });
                 console.log("queue: " + elevator.destinationQueue);
             }
        };
        
        floors.forEach(function(f,n){
           f.on("up_button_pressed", function() {
               elevator.goToFloor(n);
               console.log("call: up from " + n);
               elevator.doQ();
            });
           f.on("down_button_pressed", function(e) {
               elevator.goToFloor(n);
               console.log("call: dn from " + n);
               elevator.doQ();
           });
        });
        
    },
    update: function(dt, elevators, floors) {
        // We normally don't need to do anything here
    }
}
