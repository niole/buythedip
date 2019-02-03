import protobuf from 'react-native-rocks-protobufjs';
import rpcImplementation from './utilities/rpcImplementation';

/**
	* @param StocksAPI.News[] news - news from the iex nodejs stock api
	*	@return string - news strings
	*/
function getContents(news) {
	return news.map(({ headline, summary }) => `${headline} ${summary}`).join(' ');
}

/**
	* @param StocksAPI.News[] news - news from the iex nodejs stock api
	* @return Promise<number> - double sentiment score out of 1
	*/
export function getNewsSentimentScore(news) {
	const contents = getContents(news);
	return protobuf.load('./apiDefinitions/newsscore')
		.then(root => {
			console.log('found root');
				const Service = root.lookup('SentimentService');
				const service = Service.create(rpcImplementation, false, false);
				return service.getScore({ summary: contents });
		})
		.catch(error => {
			console.error('failed to load newssscore.proto', error);
		});
//	return Promise.resolve(0.5);
}
