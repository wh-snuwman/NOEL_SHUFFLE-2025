
import {PHI} from "/@phi/src/script/PHI.js"
import  {onecard_attackCard,onecard_attackCardAmount,onecard_cards} from '/card.js'

const phi = new PHI("canvas");

export function online(){
    // const wsUrl =window.location.protocol === 'https:'
    //     ? `wss://${window.location.host}/ws`
    //     : `ws://${window.location.host}/ws`;

    const wsUrl = 'ws://localhost:3000';



    // ===================== dev =====================  // 
    window.devMode = true
    // ===================== dev =====================  // 
    if (window.devMode){
        console.log('‼️ 현재 개발모드입니다')
    }




    window.sc = new WebSocket(wsUrl)
    window.roomCode = null; 

    function gameReset(msg){
        window.winner = msg.winner
        window.ready = false
        window.gameSet = true;
        // window.scene = 'menu-winner'
        window.playersDeck = {}
        window.drawPile = []
        window.centerDeck = ''
        window.players = structuredClone(players_unedit)
        window.posList = {
            'p0':[innerWidth/2,innerHeight-((window.cardSize[1]/2)*3)],
            'p1':[300,500],
            'p2':[innerWidth/2,400],
            'p3':[innerWidth-300,500],
        }
        resetUI()

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
    }



    sc.onopen = () => {
        console.log('✅ 서버에 연결 되었습니다!')
    }
    
    
    sc.onmessage = (event) => {
        let msg = JSON.parse(event.data);
        if (msg.code == '0.1.1') {
            window.nickname = msg.nickname
            window.login = true
            window.profile = msg.profile
            window.description = msg.description
            window.skin = msg.skin
            window.level = msg.level
            window.rank = msg.rank
            window.sceneStartFlag = false
            window.scene = 'menu-game'

            if (!eventMode){
                console.log(`✅ 로그인성공: ${window.nickname}`)
                newSignal(`✅ 로그인성공`)
            } else {
                newSignal(`🎁 이벤트용 계정으로 접속하였습니다. ${window.nickname}`)
            }

        } else if (msg.code == '0.1.0'){   
            console.log(`❌ 로그인실패 TIP: ${msg.tip}`)
            newSignal(`❌ ${msg.tip}`)


        } else if (msg.code == '0.3.0.1') {
            window.roomCode = msg.roomcode
            window.sceneStartFlag = false
            window.scene = 'menu-waiting-room'
            
            window.sc.send(JSON.stringify({
                code:'0.3.1',
                roomcode:window.roomCode
            }))
            
            
        } else if (msg.code == '0.3.1.0') {
            window.roomCode = msg.roomcode
            console.log(`✅ 룸에 참가했습니다! ${window.roomCode}`)
            window.sceneStartFlag = false
            window.scene = 'menu-waiting-room'

        } else if (msg.code == '0.3.1.1' || msg.code == '0.3.1.2'){
            window.players[msg.nickname] = {
                nickname:msg.nickname,
                profile:msg.profile,
                level:msg.level,
                rank:msg.rank,
                skin:msg.skin,
                description:msg.description,
                ready:false,
            }
        
        } else if (msg.code == '0.3.1.3') {
            console.log(`✅ ${msg.nickname}님이 룸에서 나가셨습니다`)
            delete window.players[msg.nickname]
        } else if (msg.code == '0.3.3') {
            window.game = true;
            window.sceneStartFlag = false
            window.scene = 'ingmae-onecard'
            
            window.players_unedit = structuredClone(window.players)

            const rotatedPlayers = {};
            let keys = Object.keys(window.players);
            while (keys.length > 0 && keys[0] !== nickname) {
                const firstKey = keys.shift(); 
                keys.push(firstKey);           
            }
            for (const key of keys) {
                rotatedPlayers[key] = window.players[key]; 
            }
            window.players = rotatedPlayers;
            console.log(`🎲 플레이어 딕셔너리 수정완료: ${Object.keys(window.players)}`)
            
            const playersName = Object.keys(window.players);


            for (let i in playersName){
                window.playersDeck[playersName[i]] = [];
                window.posList[playersName[i]] = posList[`p${i}`]
            }
 
            for (let i=0; i < 4; i++){
                delete window.posList[`p${i}`]
            }
            
            // console.log(playersDeck)
            // console.log(posList)
            // console.log(playersName,posList)

            
            

        } else if (msg.code == '0.4.0.0') {
            // window.playersDeck[msg.player].push(msg.card)
            addCard(msg.player,msg.card)
            // console.log(msg.card)


        } else if (msg.code == '0.4.0.1') {
            const index = window.playersDeck[msg.player].indexOf(msg.card)
            window.playersDeck[msg.player].splice(index,1)
            window.resetFixPos = true
            


        }else if (msg.code == '0.4.1.0'){
            window.centerDeck = msg.card
            window.changeShape = msg.changeshape
            console.log(changeShape)
            console.log(msg.card)

            if (msg.ischange){
                let text = ''
                if (msg.turn == window.nickname){
                    text = '당신의 차례입니다'
                } else {
                    text = `${msg.turn}님의 차례입니다`
                }

                if(changeShape == 'S'){
                    newSignal(`❗모양이 바뀌었습니다 : ♠️ ${text}`)

                } else if(changeShape == 'D'){
                    newSignal(`❗모양이 바뀌었습니다 : ♦️ ${text}`)
                    
                } else if(changeShape == 'H'){
                    newSignal(`❗모양이 바뀌었습니다 : ♥️ ${text}`)
                    
                } else {
                    newSignal(`❗모양이 바뀌었습니다 : ♣️ ${text}`)
                }

                window.turn = msg.turn
                window.dropFlag = false
            } else {
                console.log(msg)
                window.turn = msg.turn
                window.dropFlag = false
                if (msg.turn == window.nickname){
                    newSignal(`✅ 당신의 차례입니다`)
                } else {
                    newSignal(`✅ ${msg.turn}님의 차례입니다`)
                }
            }

            console.log('✅ 센터카드 받음!')


        }else if (msg.code == '0.4.1.1'){
            window.drawPile = msg.deck
            console.log('✅ 드로우파일 받음!')

        }else if (msg.code == '0.4.2.0'){
            window.turn = msg.turn
            window.dropFlag = false
            if (msg.turn == window.nickname){
                newSignal(`✅ 당신의 차례입니다`)
            } else {
                newSignal(`✅ ${msg.turn}님의 차례입니다`)
            }

            
        }else if (msg.code == '0.4.3.0'){
            if (msg.state == true || msg.state == false){
                window.isAttack = msg.state
                if (window.isAttack){
                    console.log('✅ 공격 시작')
                    newSignal('❗플레이어가 공격을 하였습니다!')
                } else {                    
                    console.log('✅ 공격 중단')
                    newSignal('✅ 공격이 중단되었습니다!')
                }
            } else {
                console.log('‼️  처리불가능 데이터 수신. 즉시 연결 중단.')
                console.log('‼️  이메세지를 보면 즉시 신고해주세요.')
            }

        }else if (msg.code == '0.4.3.1'){
           window.attackAmount = msg.amount
            

        }else if (msg.code == '0.2.1'){
            console.log('✅ 가입성공! 이제 로그인해주세요')
            newSignal('✅ 가입성공! 이제 로그인해주세요')
            window.scene = 'menu-main'
            window.sceneStartFlag = false

            
            if (window.anonymous){
                sc.send(JSON.stringify({ 
                    code:"0.1",
                    nickname: window.nickname,
                    password: window.password, 
                    anonymous:true 
                }));
            } 

        }else if (msg.code == '0.2.0.0'){
            newSignal('❌ 이미사용중인 이름입니다')

            console.log('❌ 가입실패. 닉네임 중복')
            
        }else if (msg.code == '0.4.4.1.0'){
            window.scene = 'menu-winner'
            gameReset(msg)

        }else if (msg.code == '0.3.1.4'){
            newSignal(`❌ 참가실패. 룸이 꽉찼습니다`)
        }else if (msg.code == '0.3.1.4'){
            newSignal(`❌ 참가실패. 이미 게임중입니다`)
        
        }else if (msg.code == '0.4.4.1.1'){
            if (msg.turn == window.nickname){
                newSignal(`✅ ${msg.passplayer}님이 패스 하였습니다. 당신의 차례입니다`)

            } else {
                newSignal(`✅ ${msg.passplayer}님이 패스 하였습니다. ${msg.turn}님 차례입니다`)

            }
            
        }else if (msg.code == '0.4.4.1.2'){
            
            window.scene = 'menu-game'
            gameReset(msg)
            newSignal(`❗${msg.player}님의 이탈로 인하여 게임이 종료되었습니다`)



        }else if (msg.code == ''){
            
        }

    }
     
    sc.onerror = (err) => {
        // console.log('‼️ 에러발생:'+ err)
    }
    
    sc.onclose = () => {
        console.log('❗ 서버와의 연결을 실패 했습니다')
    }
    
    sc.addEventListener('open', () => {
        window.sceneStartFlag = false
        window.scene = 'menu-main'; 
        
        // ===================== dev ==========s===========  // 
        // if (window.devMode){
        //     window.sc.send(JSON.stringify({
        //         'code':'0.1',
        //         "nickname":`USER${phi.random(0,500)}`,
        //         'password':'0000',
        //     }))
        // }
        // ===================== dev =====================  // 



    });

}

