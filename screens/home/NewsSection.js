import React from 'react';
import { number, string } from 'prop-types';
import { Text } from 'react-native';

const getScoreColor = score => {
	if (score < 0.5) {
		return 'red';
	}

	if (score > 0.5) {
		return 'green';
	}
	return 'yellow';
};

const NewsSection = ({ score, summary }) => (
	<Text>
		<Text>{summary}</Text>
		<Text style={{ color: getScoreColor(score) }}>
			{score}
		</Text>
	</Text>
);
NewsSection.propTypes = {
	summary: string.isRequired,
	score: number,
};
export default NewsSection;
