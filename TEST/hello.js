import zim from "https://zimjs.org/cdn/016/zim";
const {Frame, Rectangle, Button, Ticker, Circle} = zim;

const frame = new Frame(FIT, 1920, 1080, "#ffe");
frame.on("ready",()=>{
    // Fixed Magnet.
    const fixedMagnet = new Rectangle(200, 100).centerReg();
    const fixedMagnetN = new Rectangle(100, 100, "#fc2b1c");
    const fixedMagnetS = new Rectangle(100, 100, "#347cf7");
    fixedMagnetS.x = 100;
    new Label({text: "N", color: "white", bold: true}).center(fixedMagnetN).mov(-20);
    new Label({text: "S", color: "white", bold: true}).center(fixedMagnetS).mov(20);
    fixedMagnet.addChild(fixedMagnetN, fixedMagnetS);


    //outerrect
    const outerRect1 = new Rectangle(300,300,"red").pos(660,240).alp(.3);
    const outerRect2 = new Rectangle(300,300,"green").pos(960,240).alp(.3);
    const outerRect3 = new Rectangle(300,300,"yellow").pos(660,540).alp(.3);
    const outerRect4 = new Rectangle(300,300,"grey").pos(960,540).alp(.3);



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


    dragMagnet.on("pressmove",updateMagnets);

    function updateMagnets(){
      
    }



  
   
   


})