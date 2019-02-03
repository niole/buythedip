export default function (method, requestData, callback) {
	console.log(arguments);
	callback(null, { score: 0.5 });
}
