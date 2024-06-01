import zim from "https://zimjs.org/cdn/016/zim";
const {Frame, Rectangle, Button, Ticker, Circle} = zim;

const frame = new Frame(FIT, 1920, 1080, "#ffe");

frame.on("ready", ()=>{

    // Fixed Magnet.
    const fixedMagnet = new Rectangle(200, 100).centerReg();
    const fixedMagnetN = new Rectangle(100, 100, "#fc2b1c");
    const fixedMagnetS = new Rectangle(100, 100, "#347cf7");
    fixedMagnetS.x = 100;
    new Label({text: "N", color: "white", bold: true}).center(fixedMagnetN).mov(-20);
    new Label({text: "S", color: "white", bold: true}).center(fixedMagnetS).mov(20);
    fixedMagnet.addChild(fixedMagnetN, fixedMagnetS);


    // Draggable Magnet.
    const dragMagnet = new Rectangle(200, 100).centerReg().pos(50, null).drag();
    const dragMagnetN = new Rectangle(100, 100, "#fc2b1c");
    const dragMagnetS = new Rectangle(100, 100, "#347cf7");
    dragMagnetS.x = 100;
    new Label({text: "N", color: "white", bold: true}).center(dragMagnetN).mov(-20);
    new Label({text: "S", color: "white", bold: true}).center(dragMagnetS).mov(20);
    dragMagnet.addChild(dragMagnetN, dragMagnetS);

    
    const btn = new Button({label: "Flip", width: 75, height: 50}).reg(37.5, 25);

    btn.on("click", ()=>{
        let rotation = dragMagnet.rotation;

        if (rotation === 180){
            rotation = 0;
        }
        else {
            rotation = 180
        }

        dragMagnet.animate({
            rotation: rotation,
            time: 0.1,
            ease: "linear",
        });
        timeout(1, updateMagnets)
    });

    Ticker.add(()=>{
        btn.x = dragMagnet.x;
        btn.y = dragMagnet.y;
        S.addChild(btn);
    });


    dragMagnet.on("pressmove", ()=>{
        magnetsRotation();
        drawLines();
    });

    dragMagnet.on("pressup", ()=>{
        removeLines();
        updateMagnets();
    });


    
    const lines = [];
    function drawLines(){
        removeLines();

        const positions = getMagnetsGlobalPosition();
        const distances = calculateDistances();
        const angles = calculateAngles();

        const line1 = new Rectangle(distances.dragNfixedN, 5, "black").pos(positions.dragMagnetN).rot(angles.dragNfixedN);
        lines.push(line1);

        const line2 = new Rectangle(distances.dragNfixedS, 5, "green").pos(positions.dragMagnetN).rot(angles.dragNfixedS);
        lines.push(line2);

        const line3 = new Rectangle(distances.dragSfixedN, 5, "teal").pos(positions.dragMagnetS).rot(angles.dragSfixedN);
        lines.push(line3);

        const line4 = new Rectangle(distances.dragSfixedS, 5, "brown").pos(positions.dragMagnetS).rot(angles.dragSfixedS);
        lines.push(line4);
    }

    function removeLines(){
        lines.forEach(line => {
            line.removeFrom();
        });
    }

    function magnetsRotation(){
        const distances = calculateDistances();
        const angles = calculateAngles();

        if(distances.minDistance > 400){
            return;
        }

        if(distances.minDistance === distances.dragNfixedN){
            if(angles.dragNfixedN < 30 || angles.dragNfixedN > 330){
                fixedMagnet.animate({
                    rotation: 180,
                })
            }
            else if(angles.dragNfixedN < 210 && angles.dragNfixedN > 150){
                fixedMagnet.animate({
                    rotation: 0,
                })
            }
        }
        else if(distances.minDistance === distances.dragNfixedS){
            

        }
        else if(distances.minDistance === distances.dragSfixedN){
            
            
        }
        else{
            if(angles.dragSfixedS < 30 || angles.dragSfixedS > 330){
                fixedMagnet.animate({
                    rotation: 0,
                })
            }
            else if(angles.dragSfixedS < 210 && angles.dragSfixedS > 150){
                fixedMagnet.animate({
                    rotation: 180,
                })
            }
        }

    }

    function updateMagnets(){
        const distances = calculateDistances();
        const angles = calculateAngles();

        if(distances.minDistance > 400){
            return;
        }

        let x = dragMagnet.x;
        let y = dragMagnet.y;

        if(distances.minDistance === distances.dragNfixedN){
            if(angles.dragNfixedN < 45 || angles.dragNfixedN > 315){
                x = dragMagnet.x - (500 - distances.minDistance);
                y = dragMagnet.y;
            }
            else if(angles.dragNfixedN < 225 && angles.dragNfixedN > 135){
                x = dragMagnet.x + (500 - distances.minDistance);
                y = dragMagnet.y;
            }
            else if(angles.dragNfixedN >= 45 && angles.dragNfixedN <= 135){
                x = dragMagnet.x;
                y = dragMagnet.y - (450 - distances.minDistance);
            }
            else if(angles.dragNfixedN >= 225 && angles.dragNfixedN <= 315){
                x = dragMagnet.x;
                y = dragMagnet.y + (450 - distances.minDistance);
            }

            dragMagnet.animate({
                props: {x: x, y: y}
            });
        }
        else if(distances.minDistance === distances.dragNfixedS){
            if(angles.dragNfixedS < 45 || angles.dragNfixedS > 315){
                x = fixedMagnet.x-200;
                y = fixedMagnet.y;
            }
            else if(angles.dragNfixedS < 225 && angles.dragNfixedS > 135){
                x = fixedMagnet.x+200;
                y = fixedMagnet.y;
            }
            else if(angles.dragNfixedS >= 45 && angles.dragNfixedS < 70){
                x = fixedMagnet.x-100;
                y = fixedMagnet.y-100;
            }
            else if(angles.dragNfixedS >= 70 && angles.dragNfixedS < 90){
                x = fixedMagnet.x;
                y = fixedMagnet.y-100;
            }
            else if(angles.dragNfixedS >= 90 && angles.dragNfixedS < 135){
                x = fixedMagnet.x+100;
                y = fixedMagnet.y-100;
            }
            else if(angles.dragNfixedS >= 225 && angles.dragNfixedS < 250){
                x = fixedMagnet.x+100;
                y = fixedMagnet.y+100;
            }
            else if(angles.dragNfixedS >= 250 && angles.dragNfixedS < 280){
                x = fixedMagnet.x;
                y = fixedMagnet.y+100;
            }
            else if(angles.dragNfixedS >= 280 && angles.dragNfixedS < 315){
                x = fixedMagnet.x-100;
                y = fixedMagnet.y+100;
            }
            
            dragMagnet.animate({
                props: {x: x, y: y}
            })

        }
        else if(distances.minDistance === distances.dragSfixedN){
            if(angles.dragSfixedN < 45 || angles.dragSfixedN > 315){
                x = fixedMagnet.x-200;
                y = fixedMagnet.y;
            }
            else if(angles.dragSfixedN < 225 && angles.dragSfixedN > 135){
                x = fixedMagnet.x+200;
                y = fixedMagnet.y;
            }
            else if(angles.dragSfixedN >= 45 && angles.dragSfixedN <= 105){
                x = fixedMagnet.x-100;
                y = fixedMagnet.y-100;
            }
            else if(angles.dragSfixedN >= 90 && angles.dragSfixedN <= 135){
                x = fixedMagnet.x+100;
                y = fixedMagnet.y-100;
            }
            else if(angles.dragSfixedN >= 250 && angles.dragSfixedN < 315){
                x = fixedMagnet.x-100;
                y = fixedMagnet.y+100;
            }
            else if(angles.dragSfixedN >= 225 && angles.dragSfixedN < 315){
                x = fixedMagnet.x+100;
                y = fixedMagnet.y+100;
            }
    
    
            dragMagnet.animate({
                props: {x: x, y: y}
            });
            
        }
        else{
            if(angles.dragSfixedS < 45 || angles.dragSfixedS > 315){
                x = dragMagnet.x - (500 - distances.minDistance);
                y = dragMagnet.y;
            }
            else if(angles.dragSfixedS < 225 && angles.dragSfixedS > 135){
                x = dragMagnet.x + (500 - distances.minDistance);
                y = dragMagnet.y;
            }
            else if(angles.dragSfixedS >= 45 && angles.dragSfixedS <= 135){
                x = dragMagnet.x;
                y = dragMagnet.y - (450 - distances.minDistance);
            }
            else if(angles.dragSfixedS >= 225 && angles.dragSfixedS <= 135){
                x = dragMagnet.x;
                y = dragMagnet.y + (450 - distances.minDistance);
            }

            dragMagnet.animate({
                props: {x: x, y: y}
            })
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