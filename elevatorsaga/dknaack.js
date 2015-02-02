{
    init: function(elevators, floors) {         
        
        var dispatchCall = function(floor){
            var needStop = true;
                
            // Is the requested floor already an eleveator destination?
            elevators.forEach(function(ev){
                if((ev.destinationQueue.indexOf(floor)>-1)&&(ev.loadFactor<1)){
                    needStop = false;
                }
            });
               
            if(needStop){
                var pickedE = 0;
                elevators.forEach(function(ele){
                    if(ele.destinationQueue.length < elevators[pickedE].destinationQueue.length)
                        pickedE = ele.num;
                });
                
                elevators[pickedE].goToFloor(floor);
            }
            
            elevators.forEach(function(ele){
                ele.doQ();
            });
        };
       
        elevators.forEach(function(e,num){
            var elevator = e; 
            elevator.num = num;

            elevator.goingUpIndicator(true);
            elevator.goingDownIndicator(true);
        
            elevator.doQ = function(){
                elevator.getPressedFloors().forEach(function(n) {
                    if((elevator.loadFactor() < 1) && (elevator.destinationQueue.indexOf(n)==-1)){
                        elevator.goToFloor(n)
                        elevator.destinationQueue.sort()
                        elevator.checkDestinationQueue()
                    }
                });
            };
        });
        
        floors.forEach(function(f,n){
            f.on("up_button_pressed", function() { dispatchCall(n);  });
            f.on("down_button_pressed", function() { dispatchCall(n); });
        });
    },
    update: function(dt, elevators, floors) {}
}
