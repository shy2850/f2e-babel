import React from 'react';
import ReactDOM from 'react-dom';
import {Row} from './Row';

const data = {
	label: '全国',
	children: [
		{
			label: '北京',
			children: [
				{
					label: '海淀'
				},
				{
					label: '朝阳'
				}
			]
		},
		{
			label: '山西',
			children: [
				{
					label: '太原'
				},
				{
					label: '大同'
				},
				{
					label: '长治'
				},
				{
					label: '晋城',
					children: [
						{label: '泽州'},
						{label: '阳城'},
						{label: '沁水'},
						{label: '高平'},
						{label: '陵川'}
					]
				}
			]
		}
	]
};

export const render = (id) => {
	ReactDOM.render(
		<ul>
			<Row label={data.label} children={data.children}/>
		</ul>,
		document.getElementById(id)
	);
};