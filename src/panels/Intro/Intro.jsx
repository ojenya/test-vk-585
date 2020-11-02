import React, { useState } from 'react';

import {
	ModalPage,
	Root,Search,ScreenSpinner,
	CardGrid,CardF,Text,Div,
	List,Tabs,HorizontalScroll,TabsItem,
	Panel,Group,Avatar,FixedLayout,Button,
	PanelHeader,IS_PLATFORM_IOS,IS_PLATFORM_ANDROID,
	Epic,Tabbar,TabbarItem, ModalRoot,ModalPageHeader,
	PanelHeaderButton,
	Checkbox, CellButton, View} from "@vkontakte/vkui";
import './Intro.css';


export const Intro = (props) => {

	const { id, setActiveModal,fetchedUser, userHasSeenIntro } = props

	return(


	<Panel id={id} centered={true}>
		<PanelHeader>585 ЗОЛОТОЙ</PanelHeader>
		{(fetchedUser && !userHasSeenIntro) &&
			<>
				<Group>
					<Div className='User'>
						{fetchedUser.photo_200 ? <Avatar src={fetchedUser.photo_200}/> : null}
						<h2>Привет, {fetchedUser.first_name}!</h2>
						<h3>Этот сервис для получения карты 585 ЗОЛОТОЙ<br/> А еще много акций <br/>Просто нажми на кнопку</h3>
					</Div>
				</Group>
				<FixedLayout vertical='bottom'>
					<Div>
						
					</Div>
					<Div>
						<Button mode='commerce' size="xl" level="2" onClick={() => setActiveModal()}>
							ОК, всё понятно
						</Button>
					</Div>
				</FixedLayout>
			</>
		}
	</Panel>

	)
	
};
export default Intro;
