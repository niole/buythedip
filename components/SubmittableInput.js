import React from 'react';
import { shape, func, string } from 'prop-types';
import { View, Button, TextInput } from 'react-native';

const elementPropTypes = {
	buttonProps: shape({...Button.propTypes, onPress: func }),
	textInputProps: shape(TextInput.propTypes),
};

const withStatePropTypes = {
	onSubmit: func,
	text: string,
	...elementPropTypes,
};

export class SubmittableInputWithState extends React.PureComponent {
	constructor(props) {
		super(props);
		this.state = {
			text: props.text,
		};
	}

	onButtonClick = () => {
		const { onSubmit } = this.props;
		if (onSubmit) {
			const { text } = this.state;
			if (text) {
				onSubmit(text);
			}
		}
	}

	onTextChange = text => {
		this.setState({ text });
	}

	render() {
		const {
			textInputProps,
			buttonProps,
		} = this.props;
		const { text } = this.state;
		return (
			<SubmittableInput
				textValue={text}
				onButtonClick={this.onButtonClick}
				onTextChange={this.onTextChange}
				textInputProps={textInputProps}
				buttonProps={buttonProps}
			/>
		);
	}
}

SubmittableInputWithState.propTypes = withStatePropTypes;

const submittableInputPropTypes = elementPropTypes;
const SubmittableInput = props => (
	<View>
		<TextInput
			{...props.textInputProps}
			value={props.textValue}
			onChangeText={props.onTextChange}
		/>
		<Button
			{...props.buttonProps}
			onPress={props.onButtonClick}
		/>
	</View>
);
SubmittableInput.propTypes = {
	...submittableInputPropTypes,
	textValue: string,
	onButtonClick: func,
	onTextChange: func,
};

export default SubmittableInput;
