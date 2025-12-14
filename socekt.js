
import {PHI} from "/@phi/src/script/PHI.js"

const phi = new PHI("canvas");

export function online(){
    window.sc = new WebSocket('ws://127.0.0.1:3000/')
    window.roomCode = null; 

    sc.onopen = () => {
        console.log('✅ 서버에 연결 되었습니다!')
    }
    
    
    sc.onmessage = (event) => {
        let msg = JSON.parse(event.data);
        if (msg.code == '0.1.1') {
            console.log(`✅ 로그인성공: ${window.nickname}`)
            newSignal(`✅ 로그인성공`)

            window.login = true
            window.profile = msg.profile
            window.description = msg.description
            window.skin = msg.skin
            window.level = msg.level
            window.rank = msg.rank

            window.sceneStartFlag = false
            window.scene = 'menu-game'

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
            const pName0 = playersName[0]
            const pName1 = playersName[1]
            const pName2 = playersName[2]
            const pName3 = playersName[3]
            
            window.playersDeck[pName0] = [];
            window.playersDeck[pName1] = [];
            window.playersDeck[pName2] = [];
            window.playersDeck[pName3] = [];

            window.posList = {
               [pName0]:posList.p0,
               [pName1]:posList.p1,
               [pName2]:posList.p2,
               [pName3]:posList.p3,
            }


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
            window.changeShape = msg.cahngeshape

            console.log('✅ 센터카드 받음!')

        }else if (msg.code == '0.4.1.1'){
            window.drawPile = msg.deck
            console.log('✅ 드로우파일 받음!')

        }else if (msg.code == '0.4.2.0'){
            window.turn = msg.turn
            window.dropFlag = false
            
        }else if (msg.code == '0.4.3.0'){
            if (msg.state == true || msg.state == false){
                window.isAttack = msg.state
                if (window.isAttack){
                    console.log('✅ 공격 시작')
                } else {
                    console.log('✅ 공격 중단')
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
        }else if (msg.code == '0.2.0.0'){
            newSignal('❌ 이미사용중인 이름입니다')

            console.log('❌ 가입실패. 닉네임 중복')
            
        }else if (msg.code == ''){
            
        }


    }
     
    sc.onerror = (err) => {
        console.log('‼️ 에러발생:'+ err)
    }
    
    sc.onclose = () => {
        console.log('❗ 서버와의 연결이 종료 되었습니다.')
        console.log('❗ 자동새로고침을 실행합니다.')
        window.location.reload();
    }
    
    sc.addEventListener('open', () => {
        window.sceneStartFlag = false
        window.scene = 'menu-main';
        // ============================== debug ============================== //
        // window.scene = 'menu-sign-up';

        //TODO  ============================== debug ============================== //
        
        if (window.dev){
            // window.scene = 'menu-ga'
            window.nickname = `USER${phi.random(0,500)}`
            window.password = '0000'

            sc.send(JSON.stringify({ 
                code:"0.1",
                nickname: window.nickname,
                password: window.password, 
                // anonymous:true 
            }));

        }

        
    });
}

