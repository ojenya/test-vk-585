import React, { useState, useEffect } from 'react';
import bridge from '@vkontakte/vk-bridge';
import View from '@vkontakte/vkui/dist/components/View/View';
import ScreenSpinner from '@vkontakte/vkui/dist/components/ScreenSpinner/ScreenSpinner';
import '@vkontakte/vkui/dist/vkui.css';

import Home from './panels/Home';
import Card from './panels/Card';

const App = () => {
	const [activePanel, setActivePanel] = useState('home');
	const [fetchedUser, setUser] = useState(null);
	const [phone,setPhone] = useState('')
	const [popout, setPopout] = useState(<ScreenSpinner size='large' />);

	function Phone(){
		bridge.send("VKWebAppGetPhoneNumber", {})
		.then(
			e => setPhone(e.phone_number),
			err=>console.log(err)
		)
	}

	useEffect(() => {

		bridge.subscribe(({ detail: { type, data }}) => {
			if (type === 'VKWebAppUpdateConfig') {
				const schemeAttribute = document.createAttribute('scheme');
				schemeAttribute.value = data.scheme ? data.scheme : 'client_light';
				document.body.attributes.setNamedItem(schemeAttribute);
			}

		});
		async function fetchData() {
			const user = await bridge.send('VKWebAppGetUserInfo');
			Phone();
			setUser(user);
			setPopout(null);
		}

		fetchData();

	}, []);

	const go = e => {
		setActivePanel(e.currentTarget.dataset.to);
	};

	return (
		<View activePanel={activePanel} popout={popout}>
			<Home id='home' fetchedUser={fetchedUser} go={go}/>

			<Card id='card' go={go} phone={phone}/>
		</View>
	);
}

export default App;

