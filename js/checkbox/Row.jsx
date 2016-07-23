import React from 'react'

const checkAll = (e) => {
	let checked = e.target.checked;
	let ul = e.target.parentNode.nextElementSibling;

	if (ul && ul.querySelectorAll) {
		let children = ul.querySelectorAll('input[type=checkbox]');

		[].slice.call(children).forEach(function (el) {
			el.checked = checked;
		});
	}
};

const allChecked = (e) => {
	let checkedAll = e.currentTarget.previousElementSibling.children[0];
	let children = e.currentTarget.querySelectorAll('input[type=checkbox]');
	for (var i = 0; i < children.length; i++) {
		if (!children[i].checked) {
			checkedAll.checked = false;
			return;
		}
	}
	checkedAll.checked = true;
};

export const Row = ({label, children}, index) => {
	return (
	<li key={index}>
		<label>
			<input type="checkbox" onClick={checkAll}/>
			{label}
		</label>
		{children && 
			<ul onClick={allChecked}>
			{children.map((data, index) => {
				return Row(data, index);
			})}
			</ul>
		}
	</li>);
};