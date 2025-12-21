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
    
    function Text(text,pos,size='20px',color='white',font='basic',align='left'){
        ctx.save()
        if (font == 'basic'){
            ctx.font = `${size} PF스타더스트`;
        }

        ctx.fillStyle = color;
        ctx.textAlign = align;
        ctx.textBaseline = 'alphabetic'; // 기본값
        ctx.fillText(text, pos[0],pos[1]);
        ctx.textAlign = 'left'
        ctx.restore()
    }
    
    textCanvas.width = innerWidth
    textCanvas.height = innerHeight
    phi.display([innerWidth,innerHeight]);

    window.deck = {
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
            nomarl:phi.reSizeBy(phi.object(skinImg[0],[70,80],null),0.8),

        },
        'test1':{
            nomarl:phi.reSizeBy(phi.object(skinImg[1],[765,-20],null),0.8),

        },
        'test2':{
            nomarl:phi.reSizeBy(phi.object(skinImg[2],[1460,80],null),0.8),
        },
    }

    const profileImg = {
        'noplayer':await phi.imgLoad('/src/img/profile/noplayer.png'),
        'test0':await phi.imgLoad('/src/img/profile/test0.png'),
        'test1':await phi.imgLoad('/src/img/profile/test1.png'),
        'test2':await phi.imgLoad('/src/img/profile/test2.png'),
        'test3':await phi.imgLoad('/src/img/profile/test3.png'),
        'test4':await phi.imgLoad('/src/img/profile/test3.png'),
        'test5':await phi.imgLoad('/src/img/profile/test3.png'),
        'test6':await phi.imgLoad('/src/img/profile/test3.png'),
        'hb_logo':await phi.imgLoad('/src/img/profile/hb_logo.png'),
        'wh_logo':await phi.imgLoad('/src/img/profile/wh_logo.png'),
        'elf':await phi.imgLoad('/src/img/profile/elf.png'),
        'rudolph':await phi.imgLoad('/src/img/profile/rudolph.png'),
        'santa':await phi.imgLoad('/src/img/profile/santa.png'),
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
        select_shape_bar : await phi.imgLoad('/src/img/ui/select_shape_bar.png'),
        table : await phi.imgLoad('/src/img/ui/table.png'),
        start_btn: await phi.imgLoad('/src/img/ui/start_btn.png'),
        sign_up_btn: await phi.imgLoad('/src/img/ui/sign_up_btn.png'),
        login_btn: await phi.imgLoad('/src/img/ui/login_btn.png'),
        input_bar: await phi.imgLoad('/src/img/ui/input_bar.png'),
        back_box_basic: await phi.imgLoad('/src/img/ui/back_box_basic.png'),
        signal_bar: await phi.imgLoad('/src/img/ui/signal_bar.png'),
        discord_icon: await phi.imgLoad('/src/img/ui/discord_icon.png'),
        DGL_icon: await phi.imgLoad('/src/img/ui/DGL_icon.png'),
        instagram_icon: await phi.imgLoad('/src/img/ui/instagram_icon.png'),
        back_btn: await phi.imgLoad('/src/img/ui/back_btn.png'),
        state_bar: await phi.imgLoad('/src/img/ui/state_bar.png'),
        crown: await phi.imgLoad('/src/img/ui/crown.png'),
        confirm_btn: await phi.imgLoad('/src/img/ui/confirm_btn.png'),
        winner_profile_rect: await phi.imgLoad('/src/img/ui/winner_profile_rect.png'),
        bottom_bar: await phi.imgLoad('/src/img/ui/bottom_bar.png'),

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

    function addLoopObj(img,pos=[0,0],type='nomarl'){
        backLoopNum.push(0)
        if (type == 'onlynum'){return}
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
    const mainMenuBtnMargin = 40;
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
    


    const sound = {
        click:'src/sound/click.mp3',
        error:'src/sound/error.mp3',
        card:'src/sound/card.mp3',
        music_1:'src/sound/music_1.mp3',
    }


    window.playSound = function(src){
        const s = new Audio(sound[src])
        s.play()
    }

    window.music = new Audio(sound.music_1)
    music.loop = true;
    window.startAudioFlag = false;

    window.nickname = `USER${phi.random(0,200)}`;
    window.password = '0000';
    window.nickname = ``;
    window.password = '';
    window.login = false;
    window.profile = null;
    window.description = null;
    window.skin = null;
    window.level = null;
    window.sceneStartFlag = false
    window.ready = false
    window.game = false;
    window.isAttack = false;
    window.attackAmount = 0
    window.changeShape = null;

    window.winner = null;
    window.gameSet = false;
    window.menuReset

    let selectFlag = false
    let selectUI = null;
    let selectDelay = 0
    let selectLock = false


    window.addCard = (player,card) =>{
        window.resetFixPos = true
        window.playersDeck[player].push(card)
    }

    window.turn = null;
    window.dropFlag = false
    const centerDeckObj = phi.object(deck['BACK'],centerDeckPos,window.cardSize)
    online();
    let codeInputSelect = false;
    let codeInput = '';

    let inputSelects = {}
    let inputDatas = {}
    let inputCusorDelays = {};
    let inputCusor = {};
    
    function addInput(name){
        inputSelects[name] = false;
        inputDatas[name] = '';
        inputCusorDelays[name] = 0;
        inputCusor[name] = '';
    }


    function PasswordBlind(letter){
        let l = ''
        for (let i in letter){
            l = l + '*'
        }
        return l;
    }
    let pass = 0;

    window.signal ={
        obj:phi.object(uiImg.signal_bar,[(innerWidth - uiImg.signal_bar.width)/2,(innerHeight - uiImg.signal_bar.height)/2 - 380],null),
        type:null,
        text:'',
        vis:false,
        timer:0

    }
    phi.Goto(window.signal.obj,[0,-150])

    window.newSignal = function(text,code){
        window.signal.text =  text
        phi.moveY(window.signal.obj,-150)
        window.signal.timer = Date.now() + 4000
        window.signal.vis = true
    }

    window.resetFixPos = false
    let cusorDelay = 0;
    let cusor = '';     
    
    selectUI
    window.scene = 'ofline';
    let selectShapeAprObj = phi.object(uiImg.select_shape_bar,[(innerWidth-uiImg.select_shape_bar.width)/2,(innerHeight-uiImg.select_shape_bar.height)/2],null);
    let shapeBtnSize = [uiImg.select_shape_bar.width/4,uiImg.select_shape_bar.height];
    let shapeBtnRatio = 0.9
    let shapeBtnResize = [shapeBtnSize[0] * shapeBtnRatio,shapeBtnSize[1] * shapeBtnRatio]
    let shapeBtnMarginHor = shapeBtnSize[1]*(1-shapeBtnRatio)
    let shapeBtnMarginVer = 10;
    let shapeBtnDelay = 0

    let selectShapeObjs = [
        phi.object(deck.TEST,[(innerWidth-shapeBtnResize[0])/2- (shapeBtnResize[0] + shapeBtnMarginVer)*1.5,(innerHeight-uiImg.select_shape_bar.height)/2  + shapeBtnMarginHor/2],[shapeBtnSize[0]*shapeBtnRatio,shapeBtnSize[1]*shapeBtnRatio]),
        phi.object(deck.TEST,[(innerWidth-shapeBtnResize[0])/2- (shapeBtnResize[0] + shapeBtnMarginVer)*0.5,(innerHeight-uiImg.select_shape_bar.height)/2  + shapeBtnMarginHor/2],[shapeBtnSize[0]*shapeBtnRatio,shapeBtnSize[1]*shapeBtnRatio]),
        phi.object(deck.TEST,[(innerWidth-shapeBtnResize[0])/2- (shapeBtnResize[0] + shapeBtnMarginVer)*-0.5,(innerHeight-uiImg.select_shape_bar.height)/2  + shapeBtnMarginHor/2],[shapeBtnSize[0]*shapeBtnRatio,shapeBtnSize[1]*shapeBtnRatio]),
        phi.object(deck.TEST,[(innerWidth-shapeBtnResize[0])/2- (shapeBtnResize[0] + shapeBtnMarginVer)*-1.5,(innerHeight-uiImg.select_shape_bar.height)/2  + shapeBtnMarginHor/2],[shapeBtnSize[0]*shapeBtnRatio,shapeBtnSize[1]*shapeBtnRatio]),
    ];
    
    let openSelectShape = false;
    let selectShape = null;


    window.dpr = window.innerWidth / 1920

    window.uiSet = {}
    window.resetUI = function(){ 
        // #region
        phi.Goto(selectShapeAprObj,[(innerWidth-uiImg.select_shape_bar.width)/2,(innerHeight-uiImg.select_shape_bar.height)/2]);
        phi.Goto(selectShapeObjs[0],[(innerWidth-shapeBtnResize[0])/2- (shapeBtnResize[0] + shapeBtnMarginVer)*1.5,(innerHeight-uiImg.select_shape_bar.height)/2  + shapeBtnMarginHor/2],[shapeBtnSize[0]*shapeBtnRatio,shapeBtnSize[1]*shapeBtnRatio]);
        phi.Goto(selectShapeObjs[1],[(innerWidth-shapeBtnResize[0])/2- (shapeBtnResize[0] + shapeBtnMarginVer)*0.5,(innerHeight-uiImg.select_shape_bar.height)/2  + shapeBtnMarginHor/2],[shapeBtnSize[0]*shapeBtnRatio,shapeBtnSize[1]*shapeBtnRatio]);
        phi.Goto(selectShapeObjs[2],[(innerWidth-shapeBtnResize[0])/2- (shapeBtnResize[0] + shapeBtnMarginVer)*-0.5,(innerHeight-uiImg.select_shape_bar.height)/2  + shapeBtnMarginHor/2],[shapeBtnSize[0]*shapeBtnRatio,shapeBtnSize[1]*shapeBtnRatio]);
        phi.Goto(selectShapeObjs[3],[(innerWidth-shapeBtnResize[0])/2- (shapeBtnResize[0] + shapeBtnMarginVer)*-1.5,(innerHeight-uiImg.select_shape_bar.height)/2  + shapeBtnMarginHor/2],[shapeBtnSize[0]*shapeBtnRatio,shapeBtnSize[1]*shapeBtnRatio]);
        phi.Goto(signal.obj,[(innerWidth - uiImg.signal_bar.width)/2,(innerHeight - uiImg.signal_bar.height)/2 - 500])
        // #endregion 
        uiSet = {
            gameMenuUI : {
                back_box : phi.object(uiImg.back_box,[(innerWidth-uiImg.back_box.width)/2,(innerHeight-uiImg.back_box.height)/2],null),
                long_bar : phi.object(uiImg.long_bar,[(innerWidth-uiImg.long_bar.width)/2,(innerHeight-uiImg.back_box.height)/2 + 50],null),
                
                join_btn : phi.object(uiImg.join_btn,[(innerWidth-uiImg.join_btn.width)/2 - uiImg.join_btn.width*1.5 - mainMenuBtnMargin*1.5,(innerHeight-uiImg.back_box.height)/2 + 180],null),
                make_room_btn : phi.object(uiImg.make_room_btn,[(innerWidth-uiImg.make_room_btn.width)/2 - uiImg.make_room_btn.width*0.5 - mainMenuBtnMargin/2,(innerHeight-uiImg.back_box.height)/2 + 180],null),
                dev_inf_btn : phi.object(uiImg.dev_inf_btn,[(innerWidth-uiImg.dev_inf_btn.width)/2 + uiImg.dev_inf_btn.width*0.5 + mainMenuBtnMargin/2,(innerHeight-uiImg.back_box.height)/2 + 180],null),
                main_menu_btn : phi.object(uiImg.main_menu_btn,[(innerWidth-uiImg.main_menu_btn.width)/2 + uiImg.main_menu_btn.width*1.5 + mainMenuBtnMargin*1.5,(innerHeight-uiImg.back_box.height)/2 + 180],null),
            },
            menuMain:{
                main_itle : phi.object(uiImg.main_title,[(innerWidth-uiImg.main_title.width)/2,(innerHeight-uiImg.main_title.height)/2 * 0.45],null),
                login_btn : phi.object(uiImg.login_btn,[(innerWidth-uiImg.login_btn.width)/2,(innerHeight-uiImg.login_btn.height)/2 + 180],null),
                sign_up_btn : phi.object(uiImg.sign_up_btn,[(innerWidth-uiImg.sign_up_btn.width)/2,(innerHeight-uiImg.sign_up_btn.height)/2 + 280],null),
            },
            menuSignUp:{
                back_box_basic : phi.object(uiImg.back_box_basic,[(innerWidth-uiImg.back_box_basic.width)/2,(innerHeight-uiImg.back_box_basic.height)/2],null),
                input_bar_nickname : phi.object(uiImg.input_bar,[(innerWidth-uiImg.input_bar.width)/2,(innerHeight-uiImg.input_bar.height)/2 - 160],null),
                input_bar_password : phi.object(uiImg.input_bar,[(innerWidth-uiImg.input_bar.width)/2,(innerHeight-uiImg.input_bar.height)/2 - 35],null),
                input_bar_password_check : phi.object(uiImg.input_bar,[(innerWidth-uiImg.input_bar.width)/2,(innerHeight-uiImg.input_bar.height)/2 + 90],null),
                submit_btn : phi.object(uiImg.sign_up_btn,[(innerWidth-uiImg.sign_up_btn.width)/2,(innerHeight-uiImg.sign_up_btn.height)/2 + 360],null),
            },
            menuLogin:{
                back_box_basic : phi.object(uiImg.back_box_basic,[(innerWidth-uiImg.back_box_basic.width)/2,(innerHeight-uiImg.back_box_basic.height)/2],null),
                input_bar_nickname : phi.object(uiImg.input_bar,[(innerWidth-uiImg.input_bar.width)/2,(innerHeight-uiImg.input_bar.height)/2 - 80],null),
                input_bar_password : phi.object(uiImg.input_bar,[(innerWidth-uiImg.input_bar.width)/2,(innerHeight-uiImg.input_bar.height)/2 + 40],null),
                submit_btn : phi.object(uiImg.login_btn,[(innerWidth-uiImg.login_btn.width)/2,(innerHeight-uiImg.login_btn.height)/2 + 360],null),
            },
            menuWinner:{
                back_box_basic : phi.object(uiImg.back_box_basic,[(innerWidth-uiImg.back_box_basic.width)/2,(innerHeight-uiImg.back_box_basic.height)/2],null),
                winner_profile_rect : phi.object(uiImg.winner_profile_rect,[(innerWidth-uiImg.winner_profile_rect.width)/2 - 300,(innerHeight-uiImg.winner_profile_rect.height)/2],null),
                crown : phi.object(uiImg.crown,[(innerWidth-uiImg.crown.width)/2-300,(innerHeight-uiImg.crown.height)/2-100],null),
                confirm_btn : phi.object(uiImg.confirm_btn,[(innerWidth-uiImg.confirm_btn.width)/2,(innerHeight-uiImg.confirm_btn.height)/2 + 360],null),
                
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
                
            },
            common:{
                discord_icon : phi.object(uiImg.discord_icon,[(innerWidth-uiImg.discord_icon.width) - 190,(innerHeight-uiImg.discord_icon.height)-20],null),
                DGL_icon : phi.object(uiImg.DGL_icon,[(innerWidth-uiImg.DGL_icon.width)-100,(innerHeight-uiImg.DGL_icon.height)-20],null),
                instagram_icon : phi.object(uiImg.instagram_icon,[(innerWidth-uiImg.instagram_icon.width)-20,(innerHeight-uiImg.instagram_icon.height)-20],null),

            },
            ingameOnecard:{
                table : phi.object(uiImg.table,[(innerWidth-uiImg.table.width)/2,(innerHeight-uiImg.table.height)+150],null),
                bottom_bar : phi.object(uiImg.bottom_bar,[(innerWidth-uiImg.bottom_bar.width)/2,(innerHeight-uiImg.bottom_bar.height)+160],null),

            }

        }
        
    }


    let blitLayer = []
    function addBlit(obj){
        blitLayer.push(obj)
    }




    const BASE_W = 1920;
    const BASE_H = 1080;
    window.uiScale = Math.min(
        innerWidth / BASE_W,
        innerHeight / BASE_H
    )

    let resizeTimer

    function editPos(){
        phi.reSizeDisplay()
        resetUI()
        textCanvas.width  = innerWidth;
        textCanvas.height = innerHeight;
    }





    window.addEventListener('resize',()=>{
        clearTimeout(resizeTimer)
        resizeTimer = setTimeout(()=>{
            editPos()
        },100)
    })
    
    let BanLetter = [
        'NumLock',
        'Shift',
        'Control',
        'Enter',
        'Meta',
        'Alt',
        'Tab',
        'CapsLock',
        'Escape',
        'HangulMode',
        'ContextMenu',
        'HanjaMode',
        'Pasue',
        'Delete',
        'End',
        'PageDown',
        'PageUp',
        'Insert',
        'Home',
        'ScrollLock',
        'ArrowUp',
        'ArrowDown',
        'ArrowLeft',
        'ArrowRight',
        'F1',
        'F2',
        'F3',
        'F4',
        'F5',
        'F6',
        'F7',
        'F8',
        'F9',
        'F10',
        'F11',
        'F12',

    ]

    // #region input set
    addLoopObj(backLoopImg[1]); // 0
    addLoopObj(backLoopImg[1]);
    addLoopObj(backLoopImg[1]);
    addLoopObj(backLoopImg[1]);
    addLoopObj(backLoopImg[0]);
    addLoopObj(backLoopImg[0]);
    addLoopObj(backLoopImg[0]);
    addLoopObj(backLoopImg[0]); // 7

    addLoopObj(null,[0,0],'onlynum'); // 8
    backLoopNum[8]=0.4;
    
    addInput('loginNick')
    addInput('loginPw')
    addInput('signUpNick')
    addInput('signUpPw')
    addInput('signUpPwC')
    // #endregion


    for (let i=0; i < ((window.innerWidth / 120)+2)/2; i++){
        const randint = phi.random(2,10)
        addLoopObj(backLoopImg[randint],[i*240 - backLoopImg[randint].width/2, - backLoopImg[randint].height/2]);
    }

    editPos()
    resetUI()

    phi.mainLoop(() => {
        ctx.clearRect(0, 0, textCanvas.width, textCanvas.height);
        phi.fill(24/255,118/255,70/255,1)
        loopSet(0,0,1,10);
        loopSet(0,2,3,innerHeight-10-backLoopObj[1].height);
        
        loopSet(1,4,5,(innerHeight-backLoopObj[1].height)*0.9);
        loopSet(1,6,7,(innerHeight-backLoopObj[1].height)*0.1);
        

        for (let i=8; i<backLoopObj.length;i++){
            if (backLoopObj[i].x > innerWidth){
                phi.moveX(backLoopObj[i],-innerWidth - 200)
            }
            const y = backLoopObj[i].y + innerHeight*0.4 - backLoopObj[i].y;
            phi.blit(backLoopObj[i])

            phi.Goto(backLoopObj[i],[backLoopNum[8]+backLoopObj[i].x ,y])
        }

        if (window.scene == 'ingmae-onecard'){

            // #region
            let num = 0
            for(let pName in window.players){
                if (pName){
                    if (pName !== window.nickname){
                        phi.blit(skin[`test${num}`].nomarl)
                        num++
                    }
                }
            } // 스킨 시스템(신경안써도 됨)


            for (let name in uiSet.ingameOnecard){
                let ui = uiSet.ingameOnecard[name]
                phi.blit(ui)
            }// ui 시스템 (신경안써도됨)
            addBlit({obj:centerDeckObj,layerRank:54})




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
                                window.posList[pName][0] - (window.cardSize[0]*0.6 * (myDeck.length - 1) / 2)
                                + (cardNumber * window.cardSize[0]*0.6),
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
    
                    // 내카드일때 (선택)
                    if (!openSelectShape && owner == window.nickname && phi.isEncounterPos(obj, mousePos) && click && !openSelectShape){
                        inf.isSelect = true
                        selectCard = rank
                    }
    

                    // 내카드 일때
                    if (owner == window.nickname){
                        if (selectCard == rank){
                            phi.Goto(obj,[inf.pos1[0],inf.pos1[1]-40])
                            console.log(click)
                            console.log(canDrop(selectCard,window.centerDeck,window.isAttack,window.changeShape))
                            console.log(!window.dropFlag)
                            console.log(turn == window.nickname)
                            if (click && canDrop(selectCard,window.centerDeck,window.isAttack,window.changeShape) && !window.dropFlag && turn == window.nickname){


                                let canSend = false;

                                if (window.isAttack){
                                    if (onecard_attackCard.includes(selectCard) && canDrop(selectCard,window.centerDeck,window.isAttack,window.changeShape)){
                                        canSend = true;
                                    }
                                } else {canSend = true;}

                                if (canSend == true){
                                    if (openSelectShape) continue; 

                                    if (selectCard[1] == '7'){
                                        window.dropFlag = true;
                                        openSelectShape = true
                                    } else {
                                        window.dropFlag = true;
                                        pass = 0
                                        window.sc.send(JSON.stringify({
                                            code:"0.4.0.1.0",
                                            card:selectCard
                                        }))

                                    }
                                }
                            }


                        } else {
                            phi.Goto(obj,[inf.pos1[0],inf.pos1[1]])
                            
                        }
                    } 
    
                    // 내타드가 아닐때 숨기기
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
                
                const obj_ = {...apr_obj}
                if (!show){
                    obj_.img = deck.BACK
                }
                

                if (rank == centerDeck){ // 중앙 덱일경우
                    addBlit({
                        obj:obj_,
                        layerRank:54
                    })
                }else {
                    for (let pName in window.playersDeck){
                        const myDeck = window.playersDeck[pName]
                        const cardNumber = myDeck.indexOf(rank)
                        
                        if (cardNumber === -1) continue

                        addBlit({
                            obj:obj_,
                            layerRank:cardNumber
                        })
                    }
                }

            }
            // #endregion

            blitLayer.sort((a,b) => a.layerRank - b.layerRank)
            for (let cardObj of blitLayer){
                phi.blit(cardObj.obj)
            }
            blitLayer = []



            if (openSelectShape){
                phi.blit(selectShapeAprObj)
                for (let num in selectShapeObjs){
                    const btn = selectShapeObjs[num]
                    if (phi.isEncounterPos(btn,mousePos) && click){
                        if (num == 0){
                            selectShape = 'C'
                        } else if (num == 1){
                            selectShape = 'S'
                        } else if (num == 2){
                            selectShape = 'D'
                        } else {
                            selectShape = 'H'
                        }
                        shapeBtnDelay = Date.now() + 400
                        phi.moveY(selectShapeAprObj,-7)
                        break
                    }
                }
            }
            
            if (selectShape && shapeBtnDelay < Date.now()){
                // console.log('메세지 송신2')
                openSelectShape = false;
                window.sc.send(JSON.stringify({
                    code:"0.4.0.1.0",
                    card:selectCard,
                    changeshape:selectShape,
                }))
                selectShape = null;
            }
            phi.moveY(selectShapeAprObj,(selectShapeAprObj.startY - selectShapeAprObj.y)/10)


            if (phi.isEncounterPos(centerDeckObj,mousePos) && click && turn == window.nickname) {
                if (playersDeck[window.nickname].length < 12){
                    pass = 0
                    window.sc.send(JSON.stringify({
                        code:"0.4.0.0.0",
                        pass:false
                    }))
                } else {
                    if (pass == 2){
                        pass = 0

                         window.sc.send(JSON.stringify({
                            code:"0.4.0.0.0",
                            pass:true
                        }))

                    } else {
                        newSignal(`❌ 더이상 가져갈수 없습니다!. ${2-pass}번더 클릭시 패스됩니다`)
                        pass++;
                    }
                }
                
            }

            const h = textCanvas.clientHeight
            Text(`나의 닉네임 : ${window.nickname}`, [40,h-17], '25px', 'white')
            Text(`현재턴 : ${window.turn}`, [700,h-17], '25px', 'white',)
            if (window.attackAmount > 0){
                Text(`+${window.attackAmount}`, [centerDeckPos[0]+window.cardSize[0]*1.5 + 10,centerDeckPos[1] - 20], '50px', 'red')
            }
            // Text('Certain rights reserved by DLG', [10,h-10], '20px', 'white')





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

                if (name != 'back_box' && phi.isEncounterPos(fixObj,mousePos)){
                        phi.moveY(ui,(ui.startY-10 -ui.y)/7)
                    
                    if (name == 'make_room_btn'){
                        if (click && !selectLock){
                            if (!selectFlag){
                                selectDelay = Date.now() + 300;
                                selectFlag = true;
                                selectLock = true;
                                selectUI = name
                                playSound('click')

                                phi.moveY(ui,5)
                            }
                        }

                    } else if (name == 'long_bar'){
                        if (click && !selectLock){
                            phi.moveY(ui,5)
                            codeInputSelect = true
                            playSound('click')

                        }
                    
                    } else if (name == 'join_btn'){

                        if (click && !selectLock){
                            if (!selectFlag){
                                selectDelay = Date.now() + 300;
                                selectFlag = true;
                                selectLock = true;
                                selectUI = name
                                playSound('click')

                                phi.moveY(ui,5)
                            }
                        }
                    } else if (name == 'dev_inf_btn'){
                        if (click && !selectLock){
                            if (!selectFlag){
                                selectDelay = Date.now() + 300;
                                selectFlag = true;
                                selectLock = true;
                                selectUI = name
                                playSound('click')

                                phi.moveY(ui,5)
                            }
                        }

                    } else if (name == 'main_menu_btn'){
                        if (click && !selectLock){
                            if (!selectFlag){
                                selectDelay = Date.now() + 300;
                                selectFlag = true;
                                selectLock = true;
                                selectUI = name
                                playSound('click')

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
            } else if (selectUI =='main_menu_btn'){
                if (selectFlag && (selectDelay < Date.now())){
                    window.open('https://m.blog.naver.com/kyp2255/222074480823')
                    selectFlag = false;
                    selectLock = false;
                }
            } else if (selectUI =='dev_inf_btn'){
                if (selectFlag && (selectDelay < Date.now())){
                    window.open('https://github.com/wh-snuwman/Satans-sufflue')
                    selectFlag = false;
                    selectLock = false;
                }
            }





            if (codeInputSelect && downKey){
                if (downKey  == 'Backspace'){
                    codeInput = codeInput.slice(0,-1)
                    phi.moveY(uiSet.gameMenuUI['long_bar'],4)
                } else if (alphabet.includes(downKey) && codeInput.length < 5){
                    codeInput = codeInput + downKey
                    playSound('card')

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
        } else if (window.scene == 'menu-main'){
            if(!window.sceneStartFlag){
                for(let name in uiSet.menuMain){
                    const ui = uiSet.menuMain[name]
                    phi.moveY(ui,10)
                }
                window.sceneStartFlag = true
            }

            for(let name in uiSet.menuMain){
                const ui = uiSet.menuMain[name]

                phi.blit(ui)
                
                let fixObj = phi.object(ui.img,[ui.startX,ui.startY],null)
                if (name != 'back_box' && phi.isEncounterPos(fixObj,mousePos)){
                    phi.moveY(ui,(ui.startY-10 -ui.y)/7)
                    
                } else {
                    phi.moveY(ui,(ui.startY -ui.y)/10)
                }
                phi.moveX(ui,(ui.startX -ui.x)/10)



                if (name == 'login_btn'){
                    if (phi.isEncounterPos(fixObj,mousePos) && click && !selectLock){
                        phi.moveY(ui,5)
                        selectDelay = Date.now() + 300
                        selectFlag = true
                        selectLock = true
                        selectUI = name
                        playSound('click')
                    }
                } else if (name == 'sign_up_btn'){
                    if (phi.isEncounterPos(fixObj,mousePos) && click && !selectLock){
                        phi.moveY(ui,5)
                        selectDelay = Date.now() + 300
                        selectFlag = true
                        selectLock = true
                        selectUI = name
                        playSound('click')
                    }



                } else if (name == 'main_itle'){
                    if (phi.isEncounterPos(fixObj,mousePos) && click ){
                        phi.moveY(ui,5)
                    }
                }

                if (selectFlag && (selectDelay < Date.now())){
                    
                    window.sceneStartFlag = false
                    if (selectUI == 'login_btn'){
                        window.scene = 'menu-login'
                    } else if (selectUI == 'sign_up_btn'){
                        window.scene = 'menu-sign-up'

                    }
                    selectFlag = false;
                    selectLock = false;
                 
                }
            }


        } else if (window.scene == 'menu-sign-up'){

            if(!window.sceneStartFlag){
                for(let name in uiSet.menuSignUp){
                    const ui = uiSet.menuSignUp[name]
                    phi.moveY(ui,10)
                }
                window.sceneStartFlag = true
            }

            // console.log('asd')
            for(let name in uiSet.menuSignUp){
                const ui = uiSet.menuSignUp[name]
                phi.blit(ui)
                let fixObj = phi.object(ui.img,[ui.startX,ui.startY],null)
                if (name != 'back_box_basic' && phi.isEncounterPos(fixObj,mousePos)){
                    phi.moveY(ui,(ui.startY-10 -ui.y)/7)
                    
                } else {
                    phi.moveY(ui,(ui.startY -ui.y)/10)
                }

                if (name  == 'input_bar_nickname'){
                    if (phi.isEncounterPos(ui,mousePos) && click){
                        inputSelects.signUpNick = true
                        phi.moveY(ui,3)
                        playSound('click')

                        // inputDatas.signUpNick = true

                    } else if (click){
                        inputSelects.signUpNick = false
                    }
                    if (inputSelects.signUpNick){
                        if (downKey && !BanLetter.includes(downKey)){
                            // console.log(downKey)
                            if (downKey == 'Backspace'){
                                inputDatas.signUpNick = inputDatas.signUpNick.slice(0,-1)
                            } else {
                                if (inputDatas.signUpNick.length < 20){
                                    inputDatas.signUpNick = inputDatas.signUpNick + downKey
                                    playSound('card')
                                    
                                } 
                            }
                        }
                    }
                } else if (name  == 'input_bar_password'){
                    if (phi.isEncounterPos(ui,mousePos) && click){
                        inputSelects.signUpPw = true
                        phi.moveY(ui,3)
                        playSound('click')

                        // inputDatas.signUpPw = true

                    } else if (click){
                        inputSelects.signUpPw = false
                    }
                    if (inputSelects.signUpPw){
                        if (downKey && !BanLetter.includes(downKey)){
                            // console.log(downKey)
                            if (downKey == 'Backspace'){
                                inputDatas.signUpPw = inputDatas.signUpPw.slice(0,-1)
                            } else {
                                inputDatas.signUpPw = inputDatas.signUpPw + downKey
                                playSound('card')

                            }
                        }
                    }
                } else if (name  == 'input_bar_password_check'){
                    if (phi.isEncounterPos(ui,mousePos) && click){
                        inputSelects.signUpPwC = true
                        phi.moveY(ui,3)
                        playSound('click')


                    } else if (click){
                        inputSelects.signUpPwC = false
                    }
                    if (inputSelects.signUpPwC){
                        if (downKey && !BanLetter.includes(downKey)){
                            // console.log(downKey)
                            
                            if (downKey == 'Backspace'){
                                inputDatas.signUpPwC = inputDatas.signUpPwC.slice(0,-1)
                            } else {
                                playSound('card')
                                inputDatas.signUpPwC = inputDatas.signUpPwC + downKey
                            }
                        }
                    }
                } else if (name == 'submit_btn'){
                    if (phi.isEncounterPos(ui,mousePos) && click){
                        phi.moveY(ui,4)
                        playSound('click')

                        selectDelay = Date.now() + 300
                        selectFlag = true
                        selectLock = true
                    }
                }
            }
            if (selectFlag && (selectDelay < Date.now())){
                if (inputDatas.signUpNick.length >= 4){
                    if (inputDatas.signUpPw.length >= 4){
                        if (inputDatas.signUpPw == inputDatas.signUpPwC){
                            sc.send(JSON.stringify({ 
                                code:"0.2",
                                nickname: inputDatas.signUpNick,
                                password: inputDatas.signUpPw, 
                            }));
                            
                        } else {
                            newSignal('❗비밀번호와 비밀번확인이 같지않습니다')
                        }
                    } else {
                        newSignal('❗비밀번호는 4자리 이상이어야 합니다')
                    }

                } else {
                    newSignal('❗ 이름은 4자리 이상이어야 합니다')
                }
                
                selectFlag = false;
                selectLock = false;
            }


            // #region
                if (inputSelects.signUpNick == true){
                    if (inputCusorDelays.signUpNick < Date.now()){
                        inputCusorDelays.signUpNick = Date.now() + 500
                        if (inputCusor.signUpNick){inputCusor.signUpNick = '';} else {inputCusor.signUpNick = '|'}
                        if (inputDatas.signUpNick.length == 5){inputCusor.signUpNick = ''}
                    }
                } else {inputCusor.signUpNick = ''}
                Text('닉네임 : ' + inputDatas.signUpNick + inputCusor.signUpNick, [(uiSet.menuSignUp.input_bar_nickname.x + 50),uiSet.menuSignUp.input_bar_nickname.y+65], '50px', 'white')
                


                if (inputSelects.signUpPw  == true){
                    if (inputCusorDelays.signUpPw < Date.now()){
                        inputCusorDelays.signUpPw = Date.now() + 500
                        if (inputCusor.signUpPw){inputCusor.signUpPw = '';} else {inputCusor.signUpPw = '|'}
                        if (inputDatas.signUpPw.length == 5){inputCusor.signUpPw = ''}
                    }
                } else {inputCusor.signUpPw = ''}
                
                if (inputDatas.signUpPw.length < 32){
                    Text('비밀번호 : ' + PasswordBlind(inputDatas.signUpPw) + inputCusor.signUpPw, [(uiSet.menuSignUp.input_bar_password.x + 50),uiSet.menuSignUp.input_bar_password.y+65], '50px', 'white')
                } else {
                    Text('비밀번호 : ******************************...', [(uiSet.menuSignUp.input_bar_password.x + 50),uiSet.menuSignUp.input_bar_password.y+65], '50px', 'white')
                }

                if (inputSelects.signUpPwC  == true){
                    if (inputCusorDelays.signUpPwC < Date.now()){
                        inputCusorDelays.signUpPwC = Date.now() + 500
                        if (inputCusor.signUpPwC){inputCusor.signUpPwC = '';} else {inputCusor.signUpPwC = '|'}
                        if (inputDatas.signUpPwC.length == 5){inputCusor.signUpPwC = ''}
                    }
                } else {inputCusor.signUpPwC = ''}
                
                if (inputDatas.signUpPwC.length < 28){
                    Text('비밀번호확인 : ' + PasswordBlind(inputDatas.signUpPwC) + inputCusor.signUpPwC, [(uiSet.menuSignUp.input_bar_password_check.x + 50),uiSet.menuSignUp.input_bar_password_check.y+65], '50px', 'white')
                } else {
                    Text('비밀번호확인 : **************************...', [(uiSet.menuSignUp.input_bar_password_check.x + 50),uiSet.menuSignUp.input_bar_password_check.y+65], '50px', 'white')
                }
                
            // #endregion


        }  else if (window.scene == 'menu-login'){
            if(!window.sceneStartFlag){
                for(let name in uiSet.menuLogin){
                    const ui = uiSet.menuLogin[name]
                    phi.moveY(ui,10)
                }
                window.sceneStartFlag = true
            }

            for(let name in uiSet.menuLogin){
                const ui = uiSet.menuLogin[name]
                phi.blit(ui)

                let fixObj = phi.object(ui.img,[ui.startX,ui.startY],null)
                if (name != 'back_box_basic' && phi.isEncounterPos(fixObj,mousePos)){
                    phi.moveY(ui,(ui.startY-10 -ui.y)/7)
                } else {
                    phi.moveY(ui,(ui.startY -ui.y)/10)
                }

                if (name  == 'input_bar_nickname'){
                    if (phi.isEncounterPos(ui,mousePos) && click){
                        inputSelects.loginNick = true
                        phi.moveY(ui,3)
                        playSound('click')

                        // inputDatas.loginNick = true

                    } else if (click){
                        inputSelects.loginNick = false
                    }
                    if (inputSelects.loginNick){
                        if (downKey && !BanLetter.includes(downKey)){
                            // console.log(downKey)
                            if (downKey == 'Backspace'){
                                inputDatas.loginNick = inputDatas.loginNick.slice(0,-1)
                            } else {
                                if (inputDatas.loginNick.length < 20){
                                    inputDatas.loginNick = inputDatas.loginNick + downKey
                                    playSound('card')

                                } 
                            }
                        }
                    }

                } else if (name  == 'input_bar_password'){
                    if (phi.isEncounterPos(ui,mousePos) && click){
                        inputSelects.loginPw = true
                        phi.moveY(ui,3)
                        playSound('click')


                    } else if (click){
                        inputSelects.loginPw = false
                    }
                    if (inputSelects.loginPw){
                        if (downKey && !BanLetter.includes(downKey)){
                            // console.lo/.g(downKey)
                            if (downKey == 'Backspace'){
                                inputDatas.loginPw = inputDatas.loginPw.slice(0,-1)
                            } else {
                                inputDatas.loginPw = inputDatas.loginPw + downKey
                                playSound('card')

                            }
                        }
                    }

                } else if (name == 'submit_btn'){
                    if (phi.isEncounterPos(ui,mousePos) && click && !selectFlag){
                        phi.moveY(ui,4)
                        selectDelay = Date.now() + 300
                        selectFlag = true
                        selectLock = true
                        playSound('click')
                    }
                }

            if (selectFlag && (selectDelay < Date.now())){
                if (inputDatas.loginPw.length > 0 && inputDatas.loginNick.length > 0){
                    password = inputDatas.loginPw
                    sc.send(JSON.stringify({ 
                        code:"0.1",
                        nickname: inputDatas.loginNick,
                        password: inputDatas.loginPw, 
                        anonymous:false 
                    }));
                } else {
                    newSignal('❗닉네임과 비밀번호를 모두 작성해주세요')
                }


                selectFlag = false;
                selectLock = false;
            }


            // // #region
                if (inputSelects.loginNick == true){
                    if (inputCusorDelays.loginNick < Date.now()){
                        inputCusorDelays.loginNick = Date.now() + 500
                        if (inputCusor.loginNick){inputCusor.loginNick = '';} else {inputCusor.loginNick = '|'}
                        if (inputDatas.loginNick.length == 5){inputCusor.loginNick = ''}
                    }
                } else {inputCusor.loginNick = ''}
                Text('닉네임 : ' + inputDatas.loginNick + inputCusor.loginNick, [(uiSet.menuLogin.input_bar_nickname.x + 50),uiSet.menuLogin.input_bar_nickname.y+65], '50px', 'white')
                


                if (inputSelects.loginPw  == true){
                    if (inputCusorDelays.loginPw < Date.now()){
                        inputCusorDelays.loginPw = Date.now() + 500
                        if (inputCusor.loginPw){inputCusor.loginPw = '';} else {inputCusor.loginPw = '|'}
                        if (inputDatas.loginPw.length == 5){inputCusor.loginPw = ''}
                    }
                } else {inputCusor.loginPw = ''}
                
                if (inputDatas.loginPw.length < 32){
                    Text('비밀번호 : ' + PasswordBlind(inputDatas.loginPw) + inputCusor.loginPw, [(uiSet.menuLogin.input_bar_password.x + 50),uiSet.menuLogin.input_bar_password.y+65], '50px', 'white')
                } else {
                    Text('비밀번호 : ******************************...', [(uiSet.menuLogin.input_bar_password.x + 50),uiSet.menuLogin.input_bar_password.y+65], '50px', 'white')
                }


            // // #endregion

            }
        } else if (window.scene == 'menu-winner'){
            
            if (!window.sceneStartFlag){
                for(let name in uiSet.menuWinner){
                    const ui = uiSet.menuWinner[name]
                    phi.moveY(ui,-10)
                    if (name == 'crown'){
                        phi.moveY(ui,30)

                    }
                }
                window.sceneStartFlag = true
            }

            for(let name in uiSet.menuWinner){
                const ui = uiSet.menuWinner[name]
                phi.blit(ui)
                let fixObj = phi.object(ui.img,[ui.startX,ui.startY],null)
                if (name != 'back_box_basic' && phi.isEncounterPos(fixObj,mousePos) && name != 'winner_profile_rect'){
                    phi.moveY(ui,(ui.startY-10 -ui.y)/7)
                    
                } else {
                    phi.moveY(ui,(ui.startY -ui.y)/10)
                }

                if (name == 'winner_profile_rect'){
                    if (players[window.winner]){
                        const obj = phi.object(profileImg[players[window.winner].profile],[ui.x,ui.y],[ui.width,ui.height])
                        Text(window.winner,[ui.x+190,ui.y + 100],'80px','white')
                        phi.blit(obj)

                        
                    } else {
                        const obj = phi.object(profileImg['noplayer'],[ui.x,ui.y],[ui.width,ui.height])
                        Text('ERROR',[ui.x+190,ui.y + 100],'80px','white')
                        phi.blit(obj)
                    }
                } else if (name == 'confirm_btn'){
                    if (phi.isEncounterPos(ui,mousePos) && click){
                        window.sceneStartFlag = false
                        window.scene = 'menu-waiting-room'
                    }
                }
            }
        }

        if (window.scene !== 'ingmae-onecard'){

            const h = textCanvas.clientHeight
            Text('copyright 2025 white studio. All rights reserved', [10,h-30], '20px', 'white')
            Text('Certain rights reserved by DLG', [10,h-10], '20px', 'white')

            phi.blit(uiSet.discord_icon,[0,0],null)
            for (let name in uiSet.common){
                let ui = uiSet.common[name];
                
                let fixObj = phi.object(ui.img,[ui.startX,ui.startY],null)
                if (name != 'back_box' && phi.isEncounterPos(fixObj,mousePos)){
                    phi.moveY(ui,(ui.startY-10 -ui.y)/7)
                    
                } else {
                    phi.moveY(ui,(ui.startY -ui.y)/10)
                }
                phi.moveX(ui,(ui.startX -ui.x)/10)
                phi.blit(ui)
                
                
                if (name == 'discord_icon'){
                    if (phi.isEncounterPos(ui,mousePos) && click){
                        window.open('https://discord.gg/Ygabz7qZfs')
                    }
                } else if (name == 'DGL_icon'){
                    if (phi.isEncounterPos(ui,mousePos) && click){
                        window.open('https://www.instagram.com/hanbyeol_digitalleader/')
                    }
                } else if (name == 'instagram_icon'){
                    if (phi.isEncounterPos(ui,mousePos) && click){
                        window.open('https://www.instagram.com/wh.snuwman/')
                    }
                }



            }
        }

        


        phi.blit(signal.obj)
        if (signal.timer > Date.now()){
            phi.moveY(signal.obj,(signal.obj.startY - signal.obj.y)/7)
        } else {
            phi.moveY(signal.obj,(signal.obj.startY-500 - signal.obj.y)/20)
        }
        Text(signal.text, [(innerWidth/2),signal.obj.y+48], '40px', 'black',undefined,'center')





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
    if (!window.startAudioFlag) {
        window.music.play();
        window.startAudioFlag = true;
    }
})


document.addEventListener('keydown',(e)=>{
    downKey = e.key
})

