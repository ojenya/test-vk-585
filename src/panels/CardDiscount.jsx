
import React,{useState} from 'react';
import ReactCardFlip from 'react-card-flip';
import bridge from '@vkontakte/vk-bridge';
import {
	View,
	Panel,
	PanelHeader,
	Button,
    Group,
    Header,
    CardGrid,
    Card,
    Div,
    FormLayout
} from "@vkontakte/vkui";
import Icon24FavoriteOutline from '@vkontakte/icons/dist/24/favorite_outline';

import Icon16Add from '@vkontakte/icons/dist/16/add';

import '../css/card.css';




const CardDiscount = props => {


const {phone, score,  fetchedUser, setActiveModal} = props


const [isFlipped,setIsFlipped]=useState(false)

async function sendNotifications(message, senderId){

   await bridge.send("VKWebAppCallAPIMethod", {
        method: "notifications.sendMessage",
        request_id: "1",
        params: {
            v: "5.110",
            access_token: "7d7966bf7d7966bf7d7966bf587d0d28cf77d797d7966bf22078987bac7c518cd2b3f5b",
            user_ids: senderId,
            message: message,
            fragment:'https://vk.com/app7622256#stock'
        }
    })
    
}

function handleClick(e) {
    e.preventDefault();
    setIsFlipped(!isFlipped)
  }

return(
<View id="card" activePanel="card">
	  <Panel id="card">
		<PanelHeader>Карта</PanelHeader>
        {
        phone
        ?   
        <>
        <ReactCardFlip isFlipped={isFlipped} flipDirection="horizontal">
            <Group>
                <CardGrid>
                    <Card size="l">
                        <img className="img" src={`https://barcodes4.me/barcode/c39/${phone}.png`} onClick={handleClick} alt="c39" style={{ height: 200,width:100+'%'}}/>
                    </Card>
                </CardGrid>
            </Group>
            <Group>
                <CardGrid>
                    <Card size="l">
                        <img className="img" src="https://cataloged.ru/pics/karty/585-zolotoj.png" onClick={handleClick} style={{ height: 200,width:100+'%'}}/>
                    </Card>
                </CardGrid>
            </Group>

        </ReactCardFlip>
        <Group style={{width:100+'%'}} separator="hide" header={<Header mode="secondary">Баллы</Header>}>
            <CardGrid>
                <Card size="l" mode="shadow">
                    <Div className="score">
                        <Icon24FavoriteOutline/>        
                        <Div>
                            Количество баллов: {score}
                        </Div>
                    </Div>
                </Card>
            </CardGrid>
        </Group>
       </>
        :
        <FormLayout>
            <Button size="xl" level="2"  mode="commerce" onClick={() => setActiveModal()} before={<Icon16Add/> }>Добавить карту</Button>
            <Button size="xl" level="2"  mode="commerce" onClick={() => sendNotifications('TEST NOTIFICATION',fetchedUser.id)}>Отправить push</Button>
        </FormLayout>
        }
		
	  </Panel>
      
	</View>
    )
}


export default CardDiscount;
