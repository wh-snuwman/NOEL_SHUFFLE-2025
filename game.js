import {PHI} from "/@phi/src/script/PHI.js"
// import '/socekt.js'


let mousePos = [0,0];
let click = false;



(async () => {

    const sc = window.sc

    const phi = new PHI("canvas");
    phi.display([innerWidth, innerHeight]);
    const textCanvas = document.getElementById('text-canvas')
    textCanvas.width = innerWidth
    textCanvas.height = innerHeight
    
    const deck = [
        await phi.imgLoad('/src/img/deck/TEST.png')
    ]

    const cardsInf = []
    for (let i = 0; i<54; i++){
        cardsInf.push({
            obj:phi.object(deck[0],[0,0],null)
        })
    }
    
    const ctx = textCanvas.getContext('2d')




 
    window.scrollTo({
        top:1255,
        behavior:'smooth'
    });

    phi.mainLoop(() => {
        ctx.clearRect(0, 0, textCanvas.width, textCanvas.height);
        phi.fill(0.1,0.1,0.1,1)

        for (let inf of cardsInf){
            phi.blit(inf.obj)
        }




        if(click){click=false;}


    });

})();


document.addEventListener('mousemove',(e)=>{
    mousePos = [e.offsetX,e.offsetY];
})


document.addEventListener('click',()=>{
    click=true;
})