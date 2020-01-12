import axios from 'axios';

export default axios.create({
	baseURL: 'https://api.unsplash.com',
	headers: {
		Authorization: 
			'Client-ID 0376f7bdc7927e38e94bea972bf43d3e541b95ed7bc6ef331c8942600e4b2193'
	}
});