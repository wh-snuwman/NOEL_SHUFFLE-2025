import {PHI} from "/@phi/src/script/PHI.js"
import {online} from '/socekt.js'
import {canDrop} from '/canDrop.js'
import  {onecard_attackCard,onecard_attackCardAmount,onecard_cards} from '/card.js'


let mousePos = [0,0];
let click = false;
let downKey = null;
const alphabet = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");

(async () => {
    const phi = new PHI("canvas");
    const textCanvas = document.getElementById('text-canvas')
    const ctx = textCanvas.getContext('2d')
    const font = new FontFace('PF스타더스트', 'url(/src/font/PF스타더스트.ttf)');
    await font.load();
    document.fonts.add(font);
    
    function Text(text,pos,size='20px',color='white',font='basic'){
        if (font == 'basic'){
            ctx.font = `${size} PF스타더스트`;
        }
        ctx.fillStyle = color
        ctx.fillText(text, pos[0],pos[1]);
    }
    
    textCanvas.width = innerWidth
    textCanvas.height = innerHeight
    phi.display([innerWidth,innerHeight]);

    const deck = {
        JB:await phi.imgLoad('/src/img/deck/JB.png'),
        JC:await phi.imgLoad('/src/img/deck/JC.png'),

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

        BACK:await phi.imgLoad('/src/img/deck/BACK.png'),
        TEST:await phi.imgLoad('/src/img/deck/TEST.png'),
        

    }

    const skinImg = [
        await phi.imgLoad('/src/img/skin/0.png'),
        await phi.imgLoad('/src/img/skin/1.png'),
        await phi.imgLoad('/src/img/skin/2.png'),
    ]

    const skin = {
        'test0':{
            nomarl:phi.object(skinImg[0],[180,230],null),
            speak:phi.object(skinImg[0],[0,0],null),
        },
        'test1':{
            nomarl:phi.object(skinImg[1],[870,130],null),
            speak:phi.object(skinImg[1],[0,0],null),
        },
        'test2':{
            nomarl:phi.object(skinImg[2],[1530,230],null),
            speak:phi.object(skinImg[2],[0,0],null),
        },
    }

    const profileImg = {
        'noplayer':await phi.imgLoad('/src/img/profile/noplayer.png'),
        'test0':await phi.imgLoad('/src/img/profile/test0.png'),
        'test1':await phi.imgLoad('/src/img/profile/test1.png'),
        'test2':await phi.imgLoad('/src/img/profile/test2.png'),
        'test3':await phi.imgLoad('/src/img/profile/test3.png'),
    }

    const uiImg = {
        back_box : await phi.imgLoad('/src/img/ui/back_box.png'),
        char_box : await phi.imgLoad('/src/img/ui/char_box.png'),
        long_bar: await phi.imgLoad('/src/img/ui/long_bar.png'),
        main_menu_btn : await phi.imgLoad('/src/img/ui/main_menu_btn.png'),
        make_room_btn : await phi.imgLoad('/src/img/ui/make_room_btn.png'),
        join_btn : await phi.imgLoad('/src/img/ui/join_btn.png'),
        rect : await phi.imgLoad('/src/img/ui/rect.png'),
        dev_inf_btn : await phi.imgLoad('/src/img/ui/dev_inf_btn.png'),
        short_bar : await phi.imgLoad('/src/img/ui/short_bar.png'),
        ready_btn : await phi.imgLoad('/src/img/ui/ready_btn.png'),
        ready_cancel_btn : await phi.imgLoad('/src/img/ui/ready_cancel_btn.png'),
        main_title : await phi.imgLoad('/src/img/ui/main_title.png'),
    }

    const backLoopImg = [
        await phi.imgLoad('src/img/brckground/loop/0.png'),
        await phi.imgLoad('src/img/brckground/loop/1.png'),
        await phi.imgLoad('src/img/brckground/loop/2.png'),
        await phi.imgLoad('src/img/brckground/loop/3.png'),
        await phi.imgLoad('src/img/brckground/loop/4.png'),
        await phi.imgLoad('src/img/brckground/loop/5.png'),
        await phi.imgLoad('src/img/brckground/loop/6.png'),
        await phi.imgLoad('src/img/brckground/loop/7.png'),
        await phi.imgLoad('src/img/brckground/loop/8.png'),
        await phi.imgLoad('src/img/brckground/loop/9.png'),
        await phi.imgLoad('src/img/brckground/loop/10.png'),
        await phi.imgLoad('src/img/brckground/loop/11.png'),
    ]

    let backLoopNum = []
    let backLoopObj = []

    function addLoopObj(img,pos=[0,0]){
        backLoopNum.push(0)
        backLoopObj.push(phi.object(img,pos,null))
    }

    function loopSet(type=0,num,num1,Y){
        if (type == 0){
            backLoopNum[num] += 0.5;
            if (backLoopNum[num] > backLoopObj[num].width){
                backLoopNum[num] = 0
            }
            phi.Goto(backLoopObj[num],[backLoopNum[num],Y])
            phi.blit(backLoopObj[num])

            backLoopNum[num1] += 0.5;
            if (backLoopNum[num1] > backLoopObj[num1].width){
                backLoopNum[num1] = 0
            }
            phi.Goto(backLoopObj[num1],[backLoopNum[num1]-backLoopObj[num1].width+2,Y])
            phi.blit(backLoopObj[num1])
        

        } else if (type == 1){
            backLoopNum[num] -= 0.5;
            if (backLoopNum[num] < -backLoopObj[num].width){
                backLoopNum[num] = 0
            }
            phi.Goto(backLoopObj[num],[backLoopNum[num],Y])
            phi.blit(backLoopObj[num])

            backLoopNum[num1] -= 0.5;
            if (backLoopNum[num1] < -backLoopObj[num1].width){
                backLoopNum[num1] = 0
            }
            phi.Goto(backLoopObj[num1],[backLoopNum[num1]+backLoopObj[num1].width,Y])
            phi.blit(backLoopObj[num1])
        }



    }

    
    console.log(backLoopObj)

    const mainMenuBtnMargin = 40;
    window.oneCardSet = [];
    window.oneCardSet = [...onecard_cards]
    window.deckSizeRatio = 0.5
    window.cardSize = [deck.BACK.width*window.deckSizeRatio,deck.BACK.height*window.deckSizeRatio]
    window.cardsInf = []
    for (let i = 0; i<54; i++){
        cardsInf.push({
            obj : phi.object(deck.TEST,[(innerWidth - window.cardSize[0])/2,(innerHeight - window.cardSize[1])/2],window.cardSize),
            aprObj : phi.object(deck[window.oneCardSet[i]],[(innerWidth - window.cardSize[0])/2,(innerHeight - window.cardSize[1])/2],window.cardSize),
            isSelect: false,
            posFixFlag:false,
            pos1:[0,0],
            pos2:[0,0],
            rank:window.oneCardSet[i],
            show:true,
            owner:null,
            preClick:false,
        })
    }

    window.players = {}
    window.playersDeck = {}
    window.drawPile = []


    window.posList = {
        'p0':[innerWidth/2,innerHeight-((window.cardSize[1]/2)*3)],
        'p1':[300,500],
        'p2':[innerWidth/2,400],
        'p3':[innerWidth-300,500],
    }
    const centerDeckPos = [(innerWidth - window.cardSize[0])/2 - 75,(innerHeight - window.cardSize[1])/2 + 150]
    const ver_line = phi.object(deck.TEST,[innerWidth/2,0],[1,innerHeight])
    let selectCard = null; 
    window.centerDeck = ''

    window.scrollTo({
        top:1274,
        behavior:'smooth'
    });
    

    window.nickname = `USER${phi.random(0,200)}`;
    window.password = '0000';
    window.login = false;
    window.profile = null;
    window.description = null;
    window.skin = null;
    window.level = null;
    window.oneCardSet = null;
    window.sceneStartFlag = false
    window.ready = false
    window.game = false;

    window.isAttack = false;
    window.attackAmount = 0


    let selectFlag = false
    let selectUI = null;
    let selectDelay = 0
    let selectLock = false


    // ================== TODO ================ //
    window.dev = false;
    // ================== TODO ================ //

    window.addCard = (player,card) =>{
        window.resetFixPos = true
        window.playersDeck[player].push(card)
    }

    window.turn = null;
    window.dropFlag = false
    const centerDeckObj = phi.object(deck['TEST'],centerDeckPos,window.cardSize)
    online();
    let codeInputSelect = false;
    let codeInput = '';
    if (window.dev){
        codeInput = 'AAAAA'
    }
    window.resetFixPos = false
    let cusorDelay = 0;
    let cusor = '';     
    
    
    window.scene = 'ofline';
    // window.scene = 'menu-waiting-room';

    let uiSet = {}
    function resetUI(){ 
        uiSet = {
            gameMenuUI : {
                back_box : phi.object(uiImg.back_box,[(innerWidth-uiImg.back_box.width)/2,(innerHeight-uiImg.back_box.height)/2],null),
                long_bar : phi.object(uiImg.long_bar,[(innerWidth-uiImg.long_bar.width)/2,(innerHeight-uiImg.back_box.height)/2 + 50],null),
                join_btn : phi.object(uiImg.join_btn,[(innerWidth-uiImg.join_btn.width)/2 - uiImg.join_btn.width*1.5 - mainMenuBtnMargin*1.5,(innerHeight-uiImg.back_box.height)/2 + 180],null),
                make_room_btn : phi.object(uiImg.make_room_btn,[(innerWidth-uiImg.make_room_btn.width)/2 - uiImg.make_room_btn.width*0.5 - mainMenuBtnMargin/2,(innerHeight-uiImg.back_box.height)/2 + 180],null),
                dev_inf_btn : phi.object(uiImg.dev_inf_btn,[(innerWidth-uiImg.dev_inf_btn.width)/2 + uiImg.dev_inf_btn.width*0.5 + mainMenuBtnMargin/2,(innerHeight-uiImg.back_box.height)/2 + 180],null),
                main_menu_btn : phi.object(uiImg.main_menu_btn,[(innerWidth-uiImg.main_menu_btn.width)/2 + uiImg.main_menu_btn.width*1.5 + mainMenuBtnMargin*1.5,(innerHeight-uiImg.back_box.height)/2 + 180],null),
            },


            waitingRoomUI:{
                back_box : phi.object(uiImg.back_box,[(innerWidth-uiImg.back_box.width)/2,(innerHeight-uiImg.back_box.height)/2],null),
                long_bar : phi.object(uiImg.long_bar,[(innerWidth-uiImg.long_bar.width)/2,(innerHeight-uiImg.back_box.height)/2 + 50],null),
                ready_btn : phi.object(uiImg.ready_btn,[(innerWidth-uiImg.ready_btn.width)/2 + 100,(innerHeight-uiImg.back_box.height)/2 + 180],null),
                user_profile_0 : phi.object(uiImg.rect,[(innerWidth-uiImg.back_box.width)/2 + 50,(innerHeight-uiImg.back_box.height)/2 + 170],null),
                user_profile_1 : phi.object(uiImg.rect,[(innerWidth-uiImg.back_box.width)/2 + 50,(innerHeight-uiImg.back_box.height)/2 + 270],null),
                user_profile_2 : phi.object(uiImg.rect,[(innerWidth-uiImg.back_box.width)/2 + 50,(innerHeight-uiImg.back_box.height)/2 + 370],null),
                user_profile_3 : phi.object(uiImg.rect,[(innerWidth-uiImg.back_box.width)/2 + 50,(innerHeight-uiImg.back_box.height)/2 + 470],null),
                user_infbar_0 : phi.object(uiImg.short_bar,[(innerWidth-uiImg.back_box.width)/2 + 150,(innerHeight-uiImg.back_box.height)/2 + 170],null),
                user_infbar_1 : phi.object(uiImg.short_bar,[(innerWidth-uiImg.back_box.width)/2 + 150,(innerHeight-uiImg.back_box.height)/2 + 270],null),
                user_infbar_2 : phi.object(uiImg.short_bar,[(innerWidth-uiImg.back_box.width)/2 + 150,(innerHeight-uiImg.back_box.height)/2 + 370],null),
                user_infbar_3 : phi.object(uiImg.short_bar,[(innerWidth-uiImg.back_box.width)/2 + 150,(innerHeight-uiImg.back_box.height)/2 + 470],null),
                
            }
        }
    }
    resetUI()
    window.addEventListener('resize',(e)=>{
        phi.reSizeDisplay()
        resetUI()
        textCanvas.width  = innerWidth;
        textCanvas.height = innerHeight;
    })
    
    
    addLoopObj(backLoopImg[1]);
    addLoopObj(backLoopImg[1]);
    addLoopObj(backLoopImg[1]);
    addLoopObj(backLoopImg[1]);
    addLoopObj(backLoopImg[0]);
    addLoopObj(backLoopImg[0]);
    addLoopObj(backLoopImg[0]);
    addLoopObj(backLoopImg[0]);


    for (let i=0; i < ((window.innerWidth / 120)+2)/2; i++){
        const randint = phi.random(2,10)
        console.log([i*120 - backLoopImg[randint].width/2, - backLoopImg[randint].height/2])
        addLoopObj(backLoopImg[randint],[i*240 - backLoopImg[randint].width/2, - backLoopImg[randint].height/2]);
    }


    
    phi.mainLoop(() => {

        
        ctx.clearRect(0, 0, textCanvas.width, textCanvas.height);
        phi.fill(51/255,173/255,91/255,1)
        
        loopSet(1,0,1,10);
        loopSet(1,2,3,innerHeight-10-backLoopObj[1].height);
        loopSet(0,4,5,(innerHeight-backLoopObj[1].height)*0.9);
        loopSet(0,6,7,(innerHeight-backLoopObj[1].height)*0.1);
        
        for (let i=8; i<backLoopObj.length;i++){
            phi.moveX(backLoopObj[i],0.5)
            if (backLoopObj[i].x > innerWidth){
                phi.moveX(backLoopObj[i],-innerWidth - 200)
            }
            phi.moveY(backLoopObj[i],innerHeight*0.4 - backLoopObj[i].y)
            phi.blit(backLoopObj[i])
        }

        if (window.scene == 'ingmae-onecard'){
            for(let pName in window.players){
                let playerInf = window.players[pName]
                const nickname = playerInf.nickname
                const profile = playerInf.profile
                const description = playerInf.description
                const playerSkin = playerInf.skin
                const level = playerInf.level
                const playerRank = playerInf.rank
                
                if (nickname){
                    if (pName !== window.nickname){
                        phi.blit(skin[playerSkin].nomarl)
                    }
                }
            }

            for (let inf of window.cardsInf){
                let obj = inf.obj
                let apr_obj = inf.aprObj
                let rank = inf.rank
                let owner = inf.owner
                let show = inf.show
                
                
                for (let pName in window.playersDeck){
                    const myDeck = window.playersDeck[pName]
                    
                    if (myDeck.includes(rank)){
                        const cardNumber = myDeck.indexOf(rank)
    
                        if (pName !== window.nickname){
                            phi.Goto(obj,
                                [(window.posList[pName][0] - (myDeck.length * window.cardSize[0])/3.25) + cardNumber * window.cardSize[0]/2, 
                                window.posList[pName][1]]
                            )

                            phi.rotate(obj,20- obj.angle)
                            
                        } else {
                            
                            phi.Goto(obj, [
                                window.posList[pName][0] - (window.cardSize[0] * (myDeck.length - 1) / 2)
                                + (cardNumber * window.cardSize[0]),
                                window.posList[pName][1]
                            ])

                            phi.rotate(obj,10- obj.angle)
    
                            if (!inf.posFixFlag){
                                inf.pos1 = [obj.x,obj.y]
                                inf.posFixFlag = true
                            }
    
                            if (window.resetFixPos){
                                inf.posFixFlag = false
                            }
                        }
    
                        owner = pName
                    }
    
                    if (owner == window.nickname && phi.isEncounterPos(obj, mousePos) && click){
                        inf.isSelect = true
                        selectCard = rank
                    }
    
                    if (owner == window.nickname){
                        if (selectCard == rank){
                            phi.Goto(obj,[inf.pos1[0],inf.pos1[1]-40])
                            if (click && canDrop(selectCard,window.centerDeck,false) && !window.dropFlag && turn == window.nickname){
                                

                                if (window.isAttack){
                                    if (onecard_attackCard.includes(selectCard) && canDrop(selectCard,window.centerDeck,false)){
                                        window.dropFlag = true;
                                        window.sc.send(JSON.stringify({
                                            code:"0.4.0.1.0",
                                            card:selectCard
                                        }))
                                    }
                                } else {
                                    window.dropFlag = true;
                                    window.sc.send(JSON.stringify({
                                        code:"0.4.0.1.0",
                                        card:selectCard
                                    }))
                                }

                                
                            }


                        } else {
                            phi.Goto(obj,[inf.pos1[0],inf.pos1[1]])
                            
                        }
                    }
    
                    
                    if (owner !== window.nickname){
                        show = false
                    } else {
                        show = true
                    }
    


                    if (owner == null){
                        phi.rotate(obj,0 - obj.angle)
                        if (window.centerDeck == rank){
                            phi.Goto(obj,
                                [centerDeckPos[0]+window.cardSize[0]*1.5,centerDeckPos[1]]
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
                phi.rotate(apr_obj,((obj.angle) - apr_obj.angle) /10)
                if (show){
                    phi.blit(apr_obj)
                } else {
                    const obj_ = {...apr_obj}
                    obj_.img = deck.BACK
                    phi.blit(obj_)
                }
                // phi.blit(obj)
            }

            
            if (phi.isEncounterPos(centerDeckObj,mousePos) && click && turn == window.nickname) {
                window.sc.send(JSON.stringify({
                    code:"0.4.0.0.0",
                }))
                
            }
            if (turn == window.nickname){
                Text('당신의 차례 입니다!',[20,40],'40px','green')
            } else {
                Text('당신의 차례가 아닙니다',[20,40],'40px','red')
            }



            console.log(window.isAttack)
            if (!window.isAttack){
                Text('공격이 없습니다',[20,100],'40px','green')
            } else {
                Text(`공격을 받았습니다!${window.attackAmount}`,[20,100],'40px','red')
            }


        } else if (window.scene == 'menu-game'){
            if(!window.sceneStartFlag){
                for(let name in uiSet.gameMenuUI){
                    const ui = uiSet.gameMenuUI[name]
                    phi.moveY(ui,10)
                }
                window.sceneStartFlag = true
            }

            for(let name in uiSet.gameMenuUI){
                const ui = uiSet.gameMenuUI[name]
                let fixObj = phi.object(ui.img,[ui.startX,ui.startY],null)
                if(window.dev && name == 'join_btn'){
                    window.sc.send(JSON.stringify({
                        code:'0.3.1',
                        roomcode:codeInput.toUpperCase()
                    }))
                    console.log('💻 방에 참가요청을 보냄')
                    selectFlag = false;
                    selectLock = false;
                }

                if (name != 'back_box' && phi.isEncounterPos(fixObj,mousePos)){
                        phi.moveY(ui,(ui.startY-10 -ui.y)/7)
                    
                    if (name == 'make_room_btn'){
                        if (click && !selectLock){
                            if (!selectFlag){
                                selectDelay = Date.now() + 300;
                                selectFlag = true;
                                selectLock = true;
                                selectUI = name
                                phi.moveY(ui,5)
                            }
                        }

                    } else if (name == 'long_bar'){
                        if (click && !selectLock){
                            phi.moveY(ui,5)
                            codeInputSelect = true
                        }
                    
                    } else if (name == 'join_btn'){

                        if (click && !selectLock){
                            if (!selectFlag){
                                selectDelay = Date.now() + 300;
                                selectFlag = true;
                                selectLock = true;
                                selectUI = name
                                phi.moveY(ui,5)
                            }
                        }
                    }


                } else {
                    phi.moveY(ui,(ui.startY -ui.y)/10)
                } 

                phi.blit(ui)
            }

            if (selectUI == 'make_room_btn'){
                if (selectFlag && (selectDelay < Date.now())){
                    window.sc.send(JSON.stringify({
                        code:'0.3.0',
                    }))
                    selectFlag = false;
                    selectLock = false;
                }
            } else if (selectUI == 'join_btn'){
                if (selectFlag && (selectDelay < Date.now())){
                    if (codeInput.length == 5){
                        window.sc.send(JSON.stringify({
                            code:'0.3.1',
                            roomcode:codeInput.toUpperCase()
                        }))
                        console.log('⭐ 방에 참가요청을 보냄')
                        selectFlag = false;
                        selectLock = false;
                        
                    } else {
                        alert('룸코드는 5자리여야 합니다.')
                        selectFlag = false;
                        selectLock = false;
                        
                    }
                }
            
            } else if (selectUI == 'long_bar'){
                if (!phi.isEncounterPos(fixObj,mousePos) && click){
                    codeInputSelect = false
                }
            }

            if (codeInputSelect && downKey){
                if (downKey  == 'Backspace'){
                    codeInput = codeInput.slice(0,-1)
                    phi.moveY(uiSet.gameMenuUI['long_bar'],4)
                } else if (alphabet.includes(downKey) && codeInput.length < 5){
                    codeInput = codeInput + downKey
                    codeInput.toUpperCase()
                    phi.moveY(uiSet.gameMenuUI['long_bar'],-4)

                }
            }


            if (codeInputSelect){
                if (cusorDelay < Date.now()){
                    cusorDelay = Date.now() + 500
                    if (cusor){
                        cusor = '';
                    } else {
                        cusor = '|'
                    }
                    if (codeInput.length == 5){
                        cusor = ''
                    }
                }
            } else {
               cusor = ''
            }

            Text('룸코드:' + codeInput.toUpperCase() + cusor, [(uiSet.gameMenuUI['long_bar'].x + 400),uiSet.gameMenuUI['long_bar'].y+52], '50px', 'black')



        } else if (window.scene == 'menu-waiting-room'){
            if(!window.sceneStartFlag){
                for(let name in uiSet.waitingRoomUI){
                    const ui = uiSet.waitingRoomUI[name]
                    phi.moveY(ui,10)
                }
                window.sceneStartFlag = true
            }


            for(let name in uiSet.waitingRoomUI){
                const ui = uiSet.waitingRoomUI[name]
                phi.blit(ui)
                
                let fixObj = phi.object(ui.img,[ui.startX,ui.startY],null)
                if (name != 'back_box' && phi.isEncounterPos(fixObj,mousePos)){
                    phi.moveY(ui,(ui.startY-10 -ui.y)/7)
                    
                } else {
                    phi.moveY(ui,(ui.startY -ui.y)/10)
                }
                
                let barNum = -1
                for(let pName in window.players){
                    barNum ++;

                    if (name == `user_infbar_${barNum}`){
                        if (window.players[pName]){
                            let text = window.players[pName].nickname

                            Text(text,[ui.x+30,ui.y+30],'24px','black')
                            
                            text = window.players[pName].level
                            Text('레벨:'+text,[ui.x+300,ui.y+30],'20px','orange')

                            text = window.players[pName].rank
                            Text('랭크:'+text,[ui.x+300,ui.y+55],'20px','red')

                            text = window.players[pName].description
                            Text(text,[ui.x+25,ui.y+55],'17px','black')

                        } else {
                            Text('[플레이어 없음]',[ui.x+15,ui.y+44],'30px','black')
                        }
                    }
                    
                    if (name == `user_profile_${barNum}`){
                        if (window.players[pName].profile){
                            const obj = phi.object(profileImg[window.players[pName].profile],[ui.x,ui.y])
                            phi.reSizeBy(obj,ui.width/obj.width)
                            phi.blit(obj)
                        } else {
                            const obj = phi.object(profileImg['noplayer'],[ui.x,ui.y],null)
                            phi.reSizeBy(obj,ui.width/obj.width)
                            phi.blit(obj)
                            
                        }
                    }
                }
                if (name == 'long_bar'){
                    Text('룸코드:' + window.roomCode, [(uiSet.waitingRoomUI['long_bar'].x + 400),uiSet.waitingRoomUI['long_bar'].y+52], '50px', 'black')
                } else if (name == 'ready_btn'){

                    if (phi.isEncounterPos(fixObj,mousePos) && click ){
                        phi.moveY(ui,7)
                        window.ready = !window.ready
                        
                        window.sc.send(JSON.stringify({
                            code:'0.3.2',
                            ready:window.ready
                        }))

                        if (window.ready){
                            ui.img = uiImg.ready_cancel_btn
                        } else {
                            ui.img = uiImg.ready_btn

                        }
                    }

                }   

            }
        }

        if(downKey){downKey=null}
        if(click){click=false;}
        if(window.resetFixPos){window.resetFixPos=false;}


    });

})();


document.addEventListener('mousemove',(e)=>{
    mousePos = [e.offsetX,e.offsetY];
})


document.addEventListener('click',()=>{
    click=true;
})


document.addEventListener('keydown',(e)=>{
    downKey = e.key
})

