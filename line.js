import zim from "https://zimjs.org/cdn/016/zim";
const {Frame, Rectangle, Button, Ticker,Line} = zim;

const frame = new Frame(FIT, 1920, 1080, "#ffe");

frame.on("ready", ()=>{

    // Fixed Magnet.
    const fixedMagnet = new Rectangle(200, 100).centerReg();
    const fixedMagnetN = new Rectangle(100, 100, "#fc2b1c");
    const fixedMagnetS = new Rectangle(100, 100, "#347cf7");
    fixedMagnetS.x = 100;
    new Label({text: "N", color: "white", bold: true}).centerReg(fixedMagnetN).mov(-20).rot(90);
    new Label({text: "S", color: "white", bold: true}).centerReg(fixedMagnetS).mov(20).rot(-90);
 

    fixedMagnet.addChild(fixedMagnetN, fixedMagnetS);


    // Draggable Magnet.
    const dragMagnet = new Rectangle(200, 100).centerReg().pos(50, null).drag();
    const dragMagnetN = new Rectangle(100, 100, "#fc2b1c");
    const dragMagnetS = new Rectangle(100, 100, "#347cf7");
    dragMagnetS.x = 100;
    new Label({text: "N", color: "white", bold: true}).centerReg(dragMagnetN).mov(-20).rot(90);
    new Label({text: "S", color: "white", bold: true}).centerReg(dragMagnetS).mov(20).rot(-90);
    dragMagnet.addChild(dragMagnetN, dragMagnetS);

    
    const btn = new Button({label: "Flip", width: 75, height: 50}).reg(37.5, 25);

    let isFlipped = false;
    btn.on("click", ()=>{
        isFlipped = isFlipped?false:true;
        dragMagnet.animate({
            rotation: dragMagnet.rotation - 180,
            time: 0.1,
            ease: "linear"
        });
        updateMagnets();
    });

    Ticker.add(()=>{
        btn.x = dragMagnet.x;
        btn.y = dragMagnet.y;
        S.addChild(btn);
    });



    dragMagnet.on("pressdown", ()=>{
        dragMagnet.on("pressmove", ()=>{
            drawLines();
            updateMagnets();
        });

        dragMagnet.on("pressup", ()=>{
            removeLines();
            
        });
    });


    
    const lines = [];
    function drawLines(){
        removeLines();

        const positions = getMagnetsGlobalPosition();
        const distances = calculateDistances();
        const angles = calculateAngles();

        const line1 = new Line(distances.dragNfixedN, 5, "black").pos(positions.dragMagnetN).rot(angles.dragNfixedN);
        lines.push(line1);

        const line2 = new Line(distances.dragNfixedS, 5, "green").pos(positions.dragMagnetN).rot(angles.dragNfixedS);
        lines.push(line2);

        const line3 = new Line(distances.dragSfixedN, 5, "teal").pos(positions.dragMagnetS).rot(angles.dragSfixedN);
        lines.push(line3);

        const line4 = new Line(distances.dragSfixedS, 5, "brown").pos(positions.dragMagnetS).rot(angles.dragSfixedS);
        lines.push(line4);
    }

    function removeLines(){
        lines.forEach(line => {
            line.removeFrom();
        });
        lines.length = 0;
    }


     function updateMagnets(){

        const distances = calculateDistances();
        const angles = calculateAngles();


        
        if(distances.minDistance <= 250){
            if(distances.minDistance === distances.dragNfixedN){
                repulsionNN(angles.dragNfixedN);

            }
            else if(distances.minDistance === distances.dragNfixedS){
                attractionNS(angles.dragNfixedS);

            }
            else if(distances.minDistance === distances.dragSfixedN){
                attractionSN(angles.dragSfixedN);
                
            }
            else{
                
                repulsionSS(angles.dragSfixedS);
            }
        }
    }


    function repulsionNN(angle){
        if(angle >= 0 && angle <= 20 || angle <= 360 && angle >= 335){
     

            fixedMagnet.animate({
                target: fixedMagnet,
                props: {rotation: 180},
                time: 1,
                ease: "quadOut",
                call: ()=>
                    {
                        dragMagnet.animate({
                            target: dragMagnet,
                            props: {x:fixedMagnet.x-fixedMagnet.width, y:fixedMagnet.y},
                            time: 0.25,
                            ease: "quadOut",
                        });
                    }
            });
        }
        else if(angle > 20 && angle <= 80 ){
            fixedMagnet.animate({
                target: fixedMagnet,
                props: {rotation: 180},
                time: 1,
                ease: "quadOut",
                call: ()=>
                    {
                        dragMagnet.animate({
                            target: dragMagnet,
                            props: {x:fixedMagnet.x-fixedMagnet.width, y:fixedMagnet.y},
                            time: 0.25,
                            ease: "quadOut",
                        });
                    }
            });
        }

        else if(angle >= 285 && angle < 335){
            fixedMagnet.animate({
                target: fixedMagnet,
                props: {rotation: 180},
                time: 1,
                ease: "quadInOut",
                call: ()=>
                    {
                        dragMagnet.animate({
                            target: dragMagnet,
                            props: {x:fixedMagnet.x-fixedMagnet.width, y:fixedMagnet.y},
                            time: 0.25,
                            ease: "quadInOut",
                        });
                    }
            });
        }
    }

 
    function repulsionSS(angle){
        if(angle >= 0 && angle <= 20 || angle <= 360 && angle >= 335){
            fixedMagnet.animate({
                target: fixedMagnet,
                props: {rotation: 0},
                time: 1,
                ease: "quadOut",
                call: ()=>
                    {
                        dragMagnet.animate({
                            target: dragMagnet,
                            props: {x:fixedMagnet.x+fixedMagnet.width, y:fixedMagnet.y},
                            time: 0.25,
                            ease: "quadOut",
                        });
                    }
            });
        }
        else if(angle > 20 && angle <= 80 ){
            fixedMagnet.animate({
                target: fixedMagnet,
                props: {rotation: 0},
                time: 1,
                ease: "quadOut",
                call: ()=>
                    {
                        dragMagnet.animate({
                            target: dragMagnet,
                            props: {x:fixedMagnet.x+fixedMagnet.width, y:fixedMagnet.y},
                            time: 0.25,
                            ease: "quadOut",
                        });
                    }
            });
        }

        else if(angle >= 285 && angle < 335){
            fixedMagnet.animate({
                target: fixedMagnet,
                props: {rotation: 0},
                time: 1,
                ease: "quadInOut",
                call: ()=>
                    {
                        dragMagnet.animate({
                            target: dragMagnet,
                            props: {x:fixedMagnet.x+fixedMagnet.width, y:fixedMagnet.y},
                            time: 0.25,
                            ease: "quadInOut",
                        });
                    }
            });
        }
    
    }
    
    // function attractionSN(angle){
    //     if(angle >=180 && angle <= 225 || angle <= 180 && angle >= 135){
    //         dragMagnet.animate({
    //             target: dragMagnet,
    //             props: {x:fixedMagnet.x+200, y:fixedMagnet.y},
    //             time: 0.2,
    //             ease: "quadOut",
    //         });
    //     }
    //     else if(angle >= 70 && angle < 135){
    //         dragMagnet.animate({
    //             target: dragMagnet,
    //             props: {x:fixedMagnet.x+100, y:fixedMagnet.y-100},
    //             time: 0.2,
    //             ease: "quadOut",
    //         });
    //     }
    //     else if(angle > 225 && angle < 285){
    //         dragMagnet.animate({
    //             target: dragMagnet,
    //             props: {x:fixedMagnet.x+100, y:fixedMagnet.y+100},
    //             time: 0.2,
    //             ease: "quadOut",
    //         });
    //     }
    //     else if(angle < 70){
    //         dragMagnet.animate({
    //             target: dragMagnet,
    //             props: {x:fixedMagnet.x, y:fixedMagnet.y-100},
    //             time: 0.2,
    //             ease: "quadOut",
    //         });
    //     }
    //     else if(angle > 280){
    //         dragMagnet.animate({
    //             target: dragMagnet,
    //             props: {x:fixedMagnet.x, y:fixedMagnet.y+100},
    //             time: 0.2,
    //             ease: "quadOut",
    //         });
    //     }
    // }


  
    

    // function attractionNS(angle){
    //     if(angle >=180 && angle <= 225 || angle <= 180 && angle >= 135){
    //         dragMagnet.animate({
    //             target: dragMagnet,
    //             props: {x:fixedMagnet.x-200, y:fixedMagnet.y},
    //             time: 0.2,
    //             ease: "quadOut",
    //         });
    //     }
    // }


    function attractionSN(angle){
        if(angle >= 0 && angle <= 20 || angle <= 360 && angle >= 335){
            fixedMagnet.animate({
                target: fixedMagnet,
                props: {rotation: 0},
                time: 1,
                ease: "quadOut",
                call: ()=>
                    {
                        dragMagnet.animate({
                            target: dragMagnet,
                            props: {x:fixedMagnet.x+fixedMagnet.width, y:fixedMagnet.y},
                            time: 0.25,
                            ease: "quadOut",
                        });
                    }
            });
        }

        else if(angle > 20 && angle <= 80 ){
            fixedMagnet.animate({
                target: fixedMagnet,
                props: {rotation: 0},
                time: 1,
                ease: "quadOut",
                call: ()=>
                    {
                        dragMagnet.animate({
                            target: dragMagnet,
                            props: {x:fixedMagnet.x+fixedMagnet.width, y:fixedMagnet.y},
                            time: 0.25,
                            ease: "quadOut",
                        });
                    }
            });
        }
            
            else if(angle >= 285 && angle < 335){
                fixedMagnet.animate({
                    target: fixedMagnet,
                    props: {rotation: 0},
                    time: 1,
                    ease: "quadInOut",
                    call: ()=>
                        {
                            dragMagnet.animate({
                                target: dragMagnet,
                                props: {x:fixedMagnet.x+fixedMagnet.width, y:fixedMagnet.y},
                                time: 0.25,
                                ease: "quadInOut",
                            });
                        }
                });
            }
    }

    function attractionNS(angle){
        if(angle >= 0 && angle <= 20 || angle <= 360 && angle >= 335){
            fixedMagnet.animate({
                target: fixedMagnet,
                props: {rotation: 180},
                time: 1,
                ease: "quadOut",
                call: ()=>
                    {
                        dragMagnet.animate({
                            target: dragMagnet,
                            props: {x:fixedMagnet.x-fixedMagnet.width, y:fixedMagnet.y},
                            time: 0.25,
                            ease: "quadOut",
                        });
                    }
            });
        }

        else if(angle > 20 && angle <= 80 ){
            fixedMagnet.animate({
                target: fixedMagnet,
                props: {rotation: 180},
                time: 1,
                ease: "quadOut",
                call: ()=>
                    {
                        dragMagnet.animate({
                            target: dragMagnet,
                            props: {x:fixedMagnet.x-fixedMagnet.width, y:fixedMagnet.y},
                            time: 0.25,
                            ease: "quadOut",
                        });
                    }
            });
        }

        else if(angle >= 285 && angle < 335){
            fixedMagnet.animate({
                target: fixedMagnet,
                props: {rotation: 180},
                time: 1,
                ease: "quadInOut",
                call: ()=>
                    {
                        dragMagnet.animate({
                            target: dragMagnet,
                            props: {x:fixedMagnet.x-fixedMagnet.width, y:fixedMagnet.y},
                            time: 0.25,
                            ease: "quadInOut",
                        });
                    }
            });
        }
    }




    function calculateDistances(){
        const magnetPos = getMagnetsGlobalPosition();
        const distances = {}

        distances.dragNfixedN = zim.dist(magnetPos.dragMagnetN.x, magnetPos.dragMagnetN.y, magnetPos.fixedMagnetN.x, magnetPos.fixedMagnetN.y);
        distances.dragNfixedS = zim.dist(magnetPos.dragMagnetN.x, magnetPos.dragMagnetN.y, magnetPos.fixedMagnetS.x, magnetPos.fixedMagnetS.y);
        distances.dragSfixedN = zim.dist(magnetPos.dragMagnetS.x, magnetPos.dragMagnetS.y, magnetPos.fixedMagnetN.x, magnetPos.fixedMagnetN.y);
        distances.dragSfixedS = zim.dist(magnetPos.dragMagnetS.x, magnetPos.dragMagnetS.y, magnetPos.fixedMagnetS.x, magnetPos.fixedMagnetS.y);

        distances.minDistance = Math.min(distances.dragNfixedN, distances.dragNfixedS, distances.dragSfixedN, distances.dragSfixedS);

        return distances;
    }

    function calculateAngles(){
        const magnetPos = getMagnetsGlobalPosition();
        const angles = {}

        angles.dragNfixedN = zim.angle(magnetPos.dragMagnetN.x, magnetPos.dragMagnetN.y, magnetPos.fixedMagnetN.x, magnetPos.fixedMagnetN.y);
        angles.dragNfixedS = zim.angle(magnetPos.dragMagnetN.x, magnetPos.dragMagnetN.y, magnetPos.fixedMagnetS.x, magnetPos.fixedMagnetS.y);
        angles.dragSfixedN = zim.angle(magnetPos.dragMagnetS.x, magnetPos.dragMagnetS.y, magnetPos.fixedMagnetN.x, magnetPos.fixedMagnetN.y);
        angles.dragSfixedS = zim.angle(magnetPos.dragMagnetS.x, magnetPos.dragMagnetS.y, magnetPos.fixedMagnetS.x, magnetPos.fixedMagnetS.y);
        angles.centerToCenter = zim.angle(dragMagnet.x, dragMagnet.y, fixedMagnet.x, fixedMagnet.y);

        return angles;
    }

    function getMagnetsGlobalPosition(){
        const magnetPos = {};
        // Convert local position to global position
        magnetPos.fixedMagnetN = fixedMagnetN.localToGlobal(50, 50);
        magnetPos.fixedMagnetS = fixedMagnetS.localToGlobal(50, 50);
        magnetPos.dragMagnetN = dragMagnetN.localToGlobal(50, 50);
        magnetPos.dragMagnetS = dragMagnetS.localToGlobal(50, 50);

        return magnetPos;
    }

});
