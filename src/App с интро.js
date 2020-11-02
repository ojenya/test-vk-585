import React, { useState, useEffect } from 'react';
import bridge from '@vkontakte/vk-bridge';
import '@vkontakte/vkui/dist/vkui.css';

import {
	ModalPage,
	Root,
	Text,
	ModalRoot,ModalPageHeader,
	PanelHeaderButton,FormLayoutGroup,
	Epic,
	Tabbar,
	TabbarItem,
	Button,
	Input,
	ScreenSpinner,
	FormLayout,
	Div,
	IS_PLATFORM_ANDROID,
	IS_PLATFORM_IOS,
	Snackbar,
	Avatar,
} from "@vkontakte/vkui";


import Card from './panels/CardDiscount';
import Stock from './panels/Stock';
import Settings from './panels/Settings';
import Intro from '../src/panels/Intro/Intro'

import Icon28LogoVkOutline from '@vkontakte/icons/dist/28/logo_vk_outline';
import Icon24Cancel from '@vkontakte/icons/dist/24/cancel';
import Icon24Done from '@vkontakte/icons/dist/24/done';

import Icon28SettingsOutline from '@vkontakte/icons/dist/28/settings_outline';
import Icon28PaymentCardOutline from '@vkontakte/icons/dist/28/payment_card_outline';

import '@vkontakte/vkui/dist/vkui.css';
import Icon28FireOutline from '@vkontakte/icons/dist/28/fire_outline';
import {
} from "@vkontakte/vkui";

import Icon24Error from '@vkontakte/icons/dist/24/error';

const App = () => {
	const [activeStory,setActiveStory]=useState('card')
	const [fetchedUser, setUser] = useState(null);
	const [phone,setPhone] = useState('')
	const [userPhone, setUserPhone] = useState('');
	const [popout, setPopout] = useState(<ScreenSpinner size='large' />);
	const [activeModal,setModal]=useState(null);
	const [modalHistory,setModalHistory]=useState([]);  
    const [switchNotification,setSwitch] = useState(false)
	const [initial,setInit]=useState(false)


	//добавил 30 10
	const [userHasSeenIntro, setUserHasSeenIntro] = useState(false);
	const [fetchedState, setFetchedState] = useState(null);
	const [group,setGroup]=useState({})
	const [snackbar, setSnackbar] = useState(null);

	const STORAGE_KEYS = {
		GROUP: 'group',
		STATUS: 'viewStatus',
	};
	




	const phoneSubmit = (event) => {
		event.preventDefault();
		setPhone(userPhone)
		modalBack()
	}

	const Phone = () => {
		bridge.send("VKWebAppGetPhoneNumber")
		.then(
			e => setPhone(e.phone_number),
			err=>console.log(err)
		)
		modalBack()
	}


	const onStoryChange = (e) => {
		setActiveStory(e.currentTarget.dataset.story)
	}

	const setActiveModal = (activeModal) => {
		activeModal = activeModal || null;
		let history = modalHistory ? [...modalHistory] : [];
	
			if (activeModal === null) {
				history = [];
			} 
			else if (history.indexOf(activeModal) !== -1) {
				history = history.splice(0, history.indexOf(activeModal) + 1);
			} 
			else {
				history.push(activeModal);
			}
	
		setModal(activeModal)
		setModalHistory(modalHistory)
	};

	const modalBack = () => {
		setActiveModal(modalHistory[modalHistory.length - 2]);
	};


	const fetching = (data) =>{
		bridge.subscribe(({ detail: { type, data }}) => {
			if (type === 'VKWebAppUpdateConfig') {
				const schemeAttribute = document.createAttribute('scheme');
				schemeAttribute.value = data.scheme ? data.scheme : 'client_light';
				document.body.attributes.setNamedItem(schemeAttribute);
			}

		});

		// async function fetchData() {
		// 	const user = await bridge.send('VKWebAppGetUserInfo',{});
		// 	setUser(user);
		// 	setPopout(null);
		// }

		// fetchData();



		async function fetchData() {
			const user = await bridge.send('VKWebAppGetUserInfo');
			const hasSeenIntro = await bridge.send("VKWebAppStorageGet", {"keys": [STORAGE_KEYS.GROUP, STORAGE_KEYS.STATUS]})
			if (Array.isArray(hasSeenIntro.keys)) {
				hasSeenIntro.keys.forEach(({ key, value }) => {
					try {
						switch (key) {
							case STORAGE_KEYS.STATUS:
								console.log(value)
								if (value.includes('true') ) {
									setUserHasSeenIntro(true);
								}
								break;
							default:
								break;
							}
						} catch (error) {
							setSnackbar(<Snackbar
								layout='vertical'
								onClose={() => setSnackbar(null)}
								before={<Avatar size={24} style={{backgroundColor: 'var(--dynamic_red)'}}><Icon24Error fill='#fff' width={14} height={14} /></Avatar>}
								duration={900}
							>
								Проблема с получением данных из Storage
							</Snackbar>
							);
							setFetchedState({});
						}
					});
					
				} 
				else {
					setFetchedState({});
				}
				setUser(user);
				setPopout(null);
			}
			fetchData();
		}

		
	
	
	async function API () {

		fetch('https://5f9bdf08856f4c00168c4a2d.mockapi.io/api/phone')
		.then((response) => {
			if (response.ok){
				return response.json();
			}
			else
			{
				return null
			}
		})
		.then((data) => {
			setInit(true)
			console.log(data);
		});
	}

	useEffect(() => {
		fetching();
		API();

	}, []);

	const modal = (
	<ModalRoot
	activeModal={activeModal}
	onClose={ modalBack}
	>
		<ModalPage
		id={"card"}
		onClose={modalBack}
		header={
			<ModalPageHeader
			left={IS_PLATFORM_ANDROID && <PanelHeaderButton onClick={ modalBack}><Icon24Cancel /></PanelHeaderButton>}
			right={<PanelHeaderButton onClick={ modalBack}>{IS_PLATFORM_IOS ? 'Готово' : <Icon24Done />}</PanelHeaderButton>}
			>
			Добавить карту
			</ModalPageHeader>
		}
		>
			<FormLayout onSubmit={phoneSubmit}>
				<FormLayoutGroup top="Необходимо указать номер телефона">
						<Input
							type='number'
							pattern="[0-9]{0,10}"
							status={phone ? 'valid' : 'error'}
							value={userPhone}
							onChange={e => setUserPhone(e.target.value)}
						/>
						<br/>
						<Button size="xl" level="2" type="submit" mode="secondary" >Добавить</Button>

				</FormLayoutGroup>
				<Text className="description">или</Text>
				<Button size="xl" level="2"  mode="primary" onClick={Phone} before={<Icon28LogoVkOutline/> }>Использовать VK Connect</Button>
			</FormLayout>
		</ModalPage>
	</ModalRoot>
	);
	
	const tabbar = (
	<Tabbar>
		<TabbarItem
			onClick={onStoryChange}
			selected={activeStory === 'card'}
			data-story="card"
			text="Карта"
		>
			<Icon28PaymentCardOutline />
		</TabbarItem>

		<TabbarItem
		onClick={onStoryChange}
		selected={activeStory === 'stock'}
		data-story="stock"
		label="2"
		text="Акции"
		>
			<Icon28FireOutline/>
		</TabbarItem>

		<TabbarItem
		onClick={onStoryChange}
		selected={activeStory === 'settings'}
		data-story="settings"
		text="Настройки"
		>
			<Icon28SettingsOutline />
		</TabbarItem>
	</Tabbar>
	);
	const epica = (
		userHasSeenIntro === false 
		? 
		<Intro fetchedUser={fetchedUser} userHasSeenIntro={userHasSeenIntro} setActiveModal={() => setActiveModal("card")}></Intro> 
		: 
		<Epic activeStory={activeStory} tabbar={tabbar} >
			<Card  id="card" activePanel="card" phone={phone} setActiveModal={() => setActiveModal("card")}/>
			<Stock id="stock" activePanel="stock" />
			<Settings id="settings" activePanel="settings" fetchedUser={fetchedUser} phone={phone} switchNotification={switchNotification} setActiveModal={()=> setActiveModal("card")} setSwitch={() => setSwitch()}/>
		</Epic>
	)
	return (
		<Root modal={modal}>
			{
			initial === true 
			?
			epica
			:
			<>
			{/* <Div style={{display:"flex",justifyContent:"center", alignItems:"bottom"}}>Устанавливаю соединение, может потребоваться немного времени...</Div> */}
			<ScreenSpinner size='large' />
			</>
			}
		</Root>
		
		);
}

export default App;


