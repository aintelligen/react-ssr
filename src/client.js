import React from 'react';
import {BrowserRouter, HashRouter} from 'react-router-dom';
import {render} from 'react-dom';
import App, {store} from './components/App'
import {api} from './configuration/axios.instance'
import {showToast} from './ar/toast.ar'

window.addEventListener('error', (event)=> {
	event.preventDefault();
	api.post('/clientlogs', {
		message: event.error.message,
		stack: event.error.stack
	});
	store.dispatch(showToast({
		type: 'error',
		message: event.message
	}));
	return false;
}, false);

if (__SPA__) {
	render(
		<HashRouter>
			<App/>
		</HashRouter>
		, document.getElementById('view')
	);
}
else {
	render(
		<BrowserRouter>
			<App/>
		</BrowserRouter>
		, document.getElementById('view')
	);
}
