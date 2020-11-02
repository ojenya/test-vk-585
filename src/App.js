import React, { useState, useEffect } from 'react';
import bridge from '@vkontakte/vk-bridge';
import '@vkontakte/vkui/dist/vkui.css';

import {
	ModalPage,
	Root,
	Text,
	ModalRoot,
	ModalPageHeader,
	PanelHeaderButton,
	FormLayoutGroup,
	Epic,
	Tabbar,
	TabbarItem,
	Button,
	Input,
	ScreenSpinner,
	FormLayout,
	IS_PLATFORM_ANDROID,
	IS_PLATFORM_IOS,

} from "@vkontakte/vkui";

import Icon28LogoVkOutline from '@vkontakte/icons/dist/28/logo_vk_outline';
import Icon24Cancel from '@vkontakte/icons/dist/24/cancel';
import Icon24Done from '@vkontakte/icons/dist/24/done';
import Icon28SettingsOutline from '@vkontakte/icons/dist/28/settings_outline';
import Icon28PaymentCardOutline from '@vkontakte/icons/dist/28/payment_card_outline';
import Icon28FireOutline from '@vkontakte/icons/dist/28/fire_outline';

import '@vkontakte/vkui/dist/vkui.css';

import Card from './panels/CardDiscount';
import Stock from './panels/Stock';
import Settings from './panels/Settings';

const App = () => {
	const [activeStory,setActiveStory]=useState('card')
	const [modalHistory,setModalHistory]=useState([]);  
	const [activeModal,setModal]=useState(null);

	const [fetchedUser, setUser] = useState(null);
	const [score,setScore]=useState(null)
	const [stockList,setStockList]=useState([])
	const [phone,setPhone] = useState('')
	const [userPhone, setUserPhone] = useState('');
    const [switchNotification,setSwitch] = useState(false)
	const [initial,setInit]=useState(false)


	//PhoneHandle и Phone делаем запрос к API например zolotoy.ru/${e.phone_number} и он возвращает json
	const phoneHandle = (event) => {
		event.preventDefault();
		API(userPhone)
		modalBack()
	}

	const Phone = () => {
		bridge.send("VKWebAppGetPhoneNumber")
		.then(
			e => API(e.phone_number),
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

	//Выход из модального окна
	const modalBack = () => {
		setActiveModal(modalHistory[modalHistory.length - 2]);
	};

	//VK API
	const fetching = () =>{
		bridge.subscribe(({ detail: { type, data }}) => {
			if (type === 'VKWebAppUpdateConfig') {
				const schemeAttribute = document.createAttribute('scheme');
				schemeAttribute.value = data.scheme ? data.scheme : 'client_light';
				document.body.attributes.setNamedItem(schemeAttribute);
			}

		});
		//Делаем запрос к VK API и получаем данные пользлователя, такие как: id, first_name, last_name, sex, timezone.
		async function fetchData() {
			const user = await bridge.send('VKWebAppGetUserInfo',{});
			setUser(user);
			//Убираем спиннер
			setInit(true)
		}
		fetchData();
		}
	
	// example: fetch(`someAPI.ru/${phone}`)
	async function API (phone) {
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
			setPhone(data[0].phone)
			setScore(data[0].score)

		});
	}

	async function stock () {

		fetch('https://5f9bdf08856f4c00168c4a2d.mockapi.io/api/stock')
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
			data.forEach(el => {
				stockList.push(el)
			});
		});
	}

	useEffect(() => {
		fetching();
		stock();
	}, []);


	//Модальное окно вынес в отдельную переменную чтобы было понятнее
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
		<FormLayout onSubmit={phoneHandle}>
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
	
	//Таббары окно вынес в отдельную переменную чтобы было понятнее
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

	return (
		<Root modal={modal}>
			{
			initial === true 
			?
			<Epic activeStory={activeStory} tabbar={tabbar} >
				<Card  id="card" key="card" activePanel="card" phone={phone} score={score} setActiveModal={() => setActiveModal("card")}/>
				<Stock id="stock" key="stock" activePanel="stock" stockList={stockList}/>
				<Settings id="settings" key="settings" activePanel="settings" fetchedUser={fetchedUser} phone={phone} switchNotification={switchNotification} setActiveModal={()=> setActiveModal("card")} setSwitch={() => setSwitch()}/>
			</Epic>
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


