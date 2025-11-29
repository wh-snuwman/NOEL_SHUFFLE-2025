import {PHI} from "/@phi/src/script/PHI.js"
// import '/socekt.js'


let mousePos = [0,0];
let click = false;



(async () => {

    const sc = window.sc
    const phi = new PHI("canvas");
    const textCanvas = document.getElementById('text-canvas')
    textCanvas.width = innerWidth
    textCanvas.height = innerHeight
    const ctx = textCanvas.getContext('2d')
    ctx.font = "20px Arial"; // 글자 크기 + 폰트
    ctx.fillStyle = "blue"; // 글자 색
    
    phi.display([innerWidth,innerHeight]);
    
    const deck = {
        BACK:await phi.imgLoad('/src/img/deck/BACK.png'),
        TEST:await phi.imgLoad('/src/img/deck/TEST.png'),

        C1:await phi.imgLoad('/src/img/deck/C1.png'),
        C2:await phi.imgLoad('/src/img/deck/C2.png'),
        C3:await phi.imgLoad('/src/img/deck/C3.png'),
        C4:await phi.imgLoad('/src/img/deck/C4.png'),
        C5:await phi.imgLoad('/src/img/deck/C5.png'),
        C6:await phi.imgLoad('/src/img/deck/C6.png'),
        C7:await phi.imgLoad('/src/img/deck/C7.png'),
        C8:await phi.imgLoad('/src/img/deck/C8.png'),
        C9:await phi.imgLoad('/src/img/deck/C9.png'),
        C10:await phi.imgLoad('/src/img/deck/C10.png'),
        CJ:await phi.imgLoad('/src/img/deck/CJ.png'),
        CQ:await phi.imgLoad('/src/img/deck/CQ.png'),
        CK:await phi.imgLoad('/src/img/deck/CK.png'),
        CA:await phi.imgLoad('/src/img/deck/CA.png'),


        H1:await phi.imgLoad('/src/img/deck/H1.png'),
        H2:await phi.imgLoad('/src/img/deck/H2.png'),
        H3:await phi.imgLoad('/src/img/deck/H3.png'),
        H4:await phi.imgLoad('/src/img/deck/H4.png'),
        H5:await phi.imgLoad('/src/img/deck/H5.png'),
        H6:await phi.imgLoad('/src/img/deck/H6.png'),
        H7:await phi.imgLoad('/src/img/deck/H7.png'),
        H8:await phi.imgLoad('/src/img/deck/H8.png'),
        H9:await phi.imgLoad('/src/img/deck/H9.png'),
        H10:await phi.imgLoad('/src/img/deck/H10.png'),
        HJ:await phi.imgLoad('/src/img/deck/HJ.png'),
        HQ:await phi.imgLoad('/src/img/deck/HQ.png'),
        HK:await phi.imgLoad('/src/img/deck/HK.png'),
        HA:await phi.imgLoad('/src/img/deck/HA.png'),

        D1:await phi.imgLoad('/src/img/deck/D1.png'),
        D2:await phi.imgLoad('/src/img/deck/D2.png'),
        D3:await phi.imgLoad('/src/img/deck/D3.png'),
        D4:await phi.imgLoad('/src/img/deck/D4.png'),
        D5:await phi.imgLoad('/src/img/deck/D5.png'),
        D6:await phi.imgLoad('/src/img/deck/D6.png'),
        D7:await phi.imgLoad('/src/img/deck/D7.png'),
        D8:await phi.imgLoad('/src/img/deck/D8.png'),
        D9:await phi.imgLoad('/src/img/deck/D9.png'),
        D10:await phi.imgLoad('/src/img/deck/D10.png'),
        DJ:await phi.imgLoad('/src/img/deck/DJ.png'),
        DQ:await phi.imgLoad('/src/img/deck/DQ.png'),
        DK:await phi.imgLoad('/src/img/deck/DK.png'),
        DA:await phi.imgLoad('/src/img/deck/DA.png'),

        S1:await phi.imgLoad('/src/img/deck/S1.png'),
        S2:await phi.imgLoad('/src/img/deck/S2.png'),
        S3:await phi.imgLoad('/src/img/deck/S3.png'),
        S4:await phi.imgLoad('/src/img/deck/S4.png'),
        S5:await phi.imgLoad('/src/img/deck/S5.png'),
        S6:await phi.imgLoad('/src/img/deck/S6.png'),
        S7:await phi.imgLoad('/src/img/deck/S7.png'),
        S8:await phi.imgLoad('/src/img/deck/S8.png'),
        S9:await phi.imgLoad('/src/img/deck/S9.png'),
        S10:await phi.imgLoad('/src/img/deck/S10.png'),
        SJ:await phi.imgLoad('/src/img/deck/SJ.png'),
        SQ:await phi.imgLoad('/src/img/deck/SQ.png'),
        SK:await phi.imgLoad('/src/img/deck/SK.png'),
        SA:await phi.imgLoad('/src/img/deck/SA.png'),

    }

    let rank = [];
    const res = await fetch("rank.json")
    const data = await res.json()
    rank = [...data.rank]
    const deckSizeRatio = 0.5
    const cardSize = [deck.BACK.width*deckSizeRatio,deck.BACK.height*deckSizeRatio]
    const cardsInf = []
    for (let i = 0; i<52; i++){
        cardsInf.push({
            obj : phi.object(deck.TEST,[(innerWidth - cardSize[0])/2,(innerHeight - cardSize[1])/2],cardSize),
            aprObj : phi.object(deck[rank[i]],[(innerWidth - cardSize[0])/2,(innerHeight - cardSize[1])/2],cardSize),
            isSelect: false,
            posFixFlag:false,
            pos1:[0,0],
            pos2:[0,0],
            rank:rank[i],
            show:true,
            owner:null,
            preClick:false,
        })
    }
    let playersDeck = {
        'p0':['SA','SK','SQ','SJ','S10','S9'],
        'p1':['DA','DK','DQ','DJ','D10','D9'],
        'p2':['HA','HK','HQ','HJ','H10'],
        'p3':['CA','CK','CQ','CJ','C10'],
        // 중복카드가 있으면 오류남. 주의! 
    }

    let posList = {
        'p0':[innerWidth/2,innerHeight-((cardSize[1]/2)*3)],
        'p1':[300,500],
        'p2':[innerWidth/2,300],
        'p3':[innerWidth-300,500],
    }
    const centerDeckPos = [(innerWidth - cardSize[0])/2 - 100,(innerHeight - cardSize[1])/2 + 100]
    const ver_line = phi.object(deck.TEST,[innerWidth/2,0],[1,innerHeight])
    function Text(text,pos){
        ctx.fillText(text, pos[0],pos[1]);
    }

    let selectCard = null; 
    let lastCard = 'C2'

    
    window.scrollTo({
        top:1512,
        behavior:'smooth'
    });

    phi.mainLoop(() => {
        ctx.clearRect(0, 0, textCanvas.width, textCanvas.height);
        phi.fill(0.1,0.1,0.1,1)
        
        phi.blit(ver_line)
        
        

        for (let inf of cardsInf){
            let obj = inf.obj
            let apr_obj = inf.aprObj
            let rank = inf.rank
            let owner = inf.owner
            let show = inf.show

            for (let pName in playersDeck){
                const myDeck = playersDeck[pName]
                if (myDeck.includes(rank)){
                    const cardNumber = myDeck.indexOf(rank)

                    if (pName !== 'p0'){
                        phi.Goto(obj,
                            [(posList[pName][0] - (myDeck.length * cardSize[0])/3.25) + cardNumber * cardSize[0]/2, 
                            posList[pName][1]]
                        )
                        phi.rotate(obj,20- obj.angle)
                        
                    } else {
                        phi.Goto(obj,
                            [(posList[pName][0] - (myDeck.length * cardSize[0])/2) + cardNumber * cardSize[0], 
                            posList[pName][1]]
                        )
                        if (!inf.posFixFlag){
                            inf.pos1 = [obj.x,obj.y]
                            inf.posFixFlag = true
                        }
                    }

                    owner = pName
                }

                if (owner == 'p0' && (phi.isEncounterPos(obj,mousePos) && click)){
                    inf.isSelect  = !inf.isSelect
                    if (inf.isSelect){
                        selectCard = rank
                    }
                }
                
                console.log(selectCard)


                if (owner == 'p0'){
                    if (selectCard == rank){
                        phi.Goto(obj,[inf.pos1[0],inf.pos1[1]-40])
                    } else {
                        phi.Goto(obj,[inf.pos1[0],inf.pos1[1]])
                        
                    }
                }

                
                if (owner !== 'p0'){
                    show = false
                } else {
                    show = true
                }

                if (owner == null){
                    if (lastCard == rank){
                        phi.Goto(obj,
                            [centerDeckPos[0]+cardSize[0]*1.5,centerDeckPos[1]]
                        )
                        show = true
                    } else {
                        phi.Goto(obj,
                            centerDeckPos
                        )
                    }
                }

                
            }



            phi.moveX(apr_obj,((obj.x) - apr_obj.x) / 7)
            phi.moveY(apr_obj,((obj.y) - apr_obj.y) / 7)
            phi.rotate(apr_obj,((obj.angle) - apr_obj.angle) / 7)
            Text(rank+' '+owner,[obj.x,obj.y+30])
            if (show){
                phi.blit(apr_obj)
            } else {
                const obj_ = {...apr_obj}
                obj_.img = deck.BACK
                phi.blit(obj_)
            }
            // phi.blit(obj)

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



