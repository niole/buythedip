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
	return Promise.resolve(0.5);
}
