import  {onecard_attackCard,onecard_attackCardAmount,onecard_cards} from '/card.js'


export function canDrop(card_,centerDeck_,isAttack_=false){
    const shape1 = card_[0]
    const number1 = card_[1]
    const shape2 = centerDeck_[0]
    const number2 = centerDeck_[1]
    // to. 이걸보는 개발자분
    // 로직짜기 귀찮아서 하드코딩 했습다. 나중에 고치겠슴다. 죄송함다. 


    if (isAttack_){
        if (onecard_attackCardAmount[card_] >= onecard_attackCardAmount[centerDeck_]){
            if (card_ == 'JB'){
                if (shape2 == 'C' || shape2 == 'S'){return true;}
                return false;

            } else if (card_ == 'JC'){
            if (shape2 == 'D' || shape2 == 'H'){ return true;}
                return false;
            }


            if (centerDeck_ == 'JB'){
                if (shape1 == 'C' || shape1 == 'S'){return true;}
                return false;

            } else if (centerDeck_ == 'JC'){
            if (shape1 == 'D' || shape1 == 'H'){ return true;}
                return false;
            }
        


            if (shape1 == shape2 || number1 == number2){
                return true;

            } else {
                return false;

            }
        }
    } else {
        if (card_ == 'JB'){
            if (shape2 == 'C' || shape2 == 'S'){return true;}
            return false;
    
        } else if (card_ == 'JC'){
          if (shape2 == 'D' || shape2 == 'H'){ return true;}
            return false;
        }
    
    
        if (centerDeck_ == 'JB'){
            if (shape1 == 'C' || shape1 == 'S'){return true;}
            return false;
    
        } else if (centerDeck_ == 'JC'){
          if (shape1 == 'D' || shape1 == 'H'){ return true;}
            return false;
        }
     
    
    
        if (shape1 == shape2 || number1 == number2){
            return true;
    
        } else {
            return false;
    
        }

    }

}
