import React,{useEffect} from 'react';
import bridge from '@vkontakte/vk-bridge';
import {
	View,
	Panel,
	PanelHeader,
	Group,
    Button,
    Banner,
    Header,
} from "@vkontakte/vkui";

const Stock = props => {
  const {stockList} = props
  useEffect(() => {
    bridge.send("VKWebAppSetLocation", {"location": "stock"});
  }, [])
return(
    
    
    <View activePanel="stock">
      <Panel id="stock">
        <PanelHeader>Акции</PanelHeader>
        
        <Group
          header={<Header mode="secondary">Header группы акций</Header>}
        >
          {
            stockList
            ?
            stockList.map(
              el => 
              <Banner
              key={el.id}
              mode="image"
              size="m"
              header={el.title}
              subheader={<span>{el.desc}</span>}
              background={
                <div
                  style={{
                    backgroundColor: `${el.bgColor}`,
                    backgroundImage: `${el.bgUrl}`,
                    backgroundPosition:`${el.bgPos}`,
                    backgroundSize:`${el.bgSize}`,
                    backgroundRepeat: 'no-repeat',
                  }}
                />
              }
              actions={<Button mode="overlay_primary" size="l">Подробнее</Button>}
            />
              )
            
            :
            <Banner
              mode="image"
              size="m"
              header="Акций нет"
              subheader="От слова совсем"
              background={
                <div
                  style={{
                    backgroundColor: '#5b9be6',
                    backgroundImage: 'url(https://sun9-31.userapi.com/PQ4UCzqE_jue9hAINefBMorYCdfGXvcuV5nSjA/eYugcFYzdW8.jpg)',
                    backgroundPosition: 'right bottom',
                    backgroundSize: '102%',
                    backgroundRepeat: 'no-repeat',
                  }}
                />
              }
              // asideMode="dismiss"
              actions={<Button mode="overlay_primary" size="l">Подробнее</Button>}
            />
          }
        </Group>

      </Panel>
    </View>
    )
}


export default Stock;
