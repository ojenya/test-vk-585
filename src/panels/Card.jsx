import React from 'react';
import PropTypes from 'prop-types';
import { platform, IOS } from '@vkontakte/vkui';
import Panel from '@vkontakte/vkui/dist/components/Panel/Panel';
import PanelHeader from '@vkontakte/vkui/dist/components/PanelHeader/PanelHeader';
import PanelHeaderButton from '@vkontakte/vkui/dist/components/PanelHeaderButton/PanelHeaderButton';
import Icon28ChevronBack from '@vkontakte/icons/dist/28/chevron_back';
import Icon24Back from '@vkontakte/icons/dist/24/back';


import './card.css';

const osName = platform();

const Card = props => (

	<Panel id={props.id}>
		<PanelHeader
			left={<PanelHeaderButton onClick={props.go} data-to="home">
				{osName === IOS ? <Icon28ChevronBack/> : <Icon24Back/>}
			</PanelHeaderButton>}
		>
			Карта
		</PanelHeader>
        
		<div className='description'>c39</div>
		<img className="img" src={`https://barcodes4.me/barcode/c39/${props.phone}.png`} alt="c39"/>
		<div className='description'>c128a</div>
		<img className="img" src={`https://barcodes4.me/barcode/c128a/${props.phone}.gif`} alt="c128a"/>
		<div className='description'>128b</div>
		<img className="img" src={`https://barcodes4.me/barcode/c128b/${props.phone}.gif`} alt="128b"/>
		<div className='description'>i2of5</div>
		<img className="img" src={`https://barcodes4.me/barcode/i2of5/${props.phone}.png`} alt="i2of5"/>
	</Panel>
);

Card.propTypes = {
	id: PropTypes.string.isRequired,
	go: PropTypes.func.isRequired,
};

export default Card;
