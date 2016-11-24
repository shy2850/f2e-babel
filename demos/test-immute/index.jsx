"use strict";
const Immutable = require('immutable');

let data = {
	status: "ok",
	total: 1324,
	page: 23,
	pagesize: 10,
	list: [
		{name: "lucy", age: 20, male: true},
		{name: "lily", age: 21, male: true},
		{name: "lily", age: 21, male: true},
		{name: "lily", age: 21, male: true},
		{name: "lily", age: 21, male: true, brother: {name: 'tom', age: 17, male: false}},
		{name: "lily", age: 21, male: true},
		{name: "lily", age: 21, male: true},
		{name: "lily", age: 21, male: true},
		{name: "lily", age: 21, male: true},
		{name: "lily", age: 21, male: true}
	]
};

let immute = Immutable.fromJS(data);

let t0 = Date.now();

for (let i = 0; i < 100000; i++) {
	immute = immute.set('total', 3939).set('other', {
		v: 1,
		t: [1,2,3]
	});
}

let t1 = Date.now();
console.log('set:', t1 - t0);

for (let i = 0; i < 100000; i++) {
	immute = immute.merge({
		total: 3939,
		other: {
			v: 1,
			t: [1,2,3]
		}
	});
}
let t2 = Date.now();
console.log('merge:', t2 - t1);
console.log('result:', immute.toJS());


