import React,{useState} from 'react';
import bridge from '@vkontakte/vk-bridge';
import {
	View,
	Panel,
	PanelHeader,
	Avatar,
  Group,
  SimpleCell,
  Switch,
  Header,
  PanelHeaderBack,
  Placeholder,
} from "@vkontakte/vkui";

import Icon28PhoneOutline from '@vkontakte/icons/dist/28/phone_outline';
import Icon28SettingsOutline from '@vkontakte/icons/dist/28/settings_outline';

const Settings = props => {
    const {fetchedUser, setActiveModal } = props

    const [activePanel, setActivePanel] = useState('settings')
    
    function Notification() {
            bridge.send("VKWebAppAllowNotifications")
    }

return(
  <View id="settings" activePanel={activePanel}>
    <Panel id="settings">
      <PanelHeader>
        Настройки
      </PanelHeader>

      <Group>
        <Header mode="secondary">Меню</Header>
        <SimpleCell onClick={() => setActivePanel('general')} expandable before={<Icon28SettingsOutline />}>Основные</SimpleCell>
        <SimpleCell onClick={setActiveModal} before={<Icon28PhoneOutline />}>Сменить номер</SimpleCell>

      </Group>

      <Group>
        <Header mode="secondary">Push-уведомления</Header>
        <SimpleCell  after={<Switch onClick={Notification}/>} >Включить уведомления об акциях</SimpleCell>
      </Group>

      <Group>
        <Header mode="secondary">Лучше всех сегодня</Header>
        <SimpleCell before={<Avatar size={40} src={fetchedUser.photo_100} />}>
            {fetchedUser.first_name} {fetchedUser.last_name}
        </SimpleCell>
      </Group>

    </Panel>

    <Panel id="general">
      <PanelHeader left={<PanelHeaderBack onClick={() => setActivePanel('settings')}/>}>
        Основные настройки
      </PanelHeader>
      <Placeholder>
        Тут ничего нет
      </Placeholder>
    </Panel>
  </View>
)}


export default Settings;
