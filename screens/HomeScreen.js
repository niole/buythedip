import React from 'react';
import {
	SectionList,
	Button,
	TextInput,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { IEXClient } from 'iex-api'
import { isNil } from 'ramda';

import { SubmittableInputWithState } from '../../components/SubmittableInput';
import { getNewsSentimentScore } from '../../api/NewSentimentAnalysis';

export default class HomeScreen extends React.Component {
  static navigationOptions = {
    header: null,
  };

	constructor(props) {
		super(props);
		this.iexClient = new IEXClient(fetch);
		this.state = {
			tickerSymbols: {},
			tickerAnalysisResults: {},
		};
	}
	
	handleGetNewTickerDetails = (text) => {
		const { tickerSymbols } = this.state;
		const newTickerKey = text.toUpperCase();
		const tickerDetails = tickerSymbols[newTickerKey];
		if (isNil(tickerDetails)) {
			this.iexClient.stockNews(newTickerKey)
				.then(company => {
					console.log(company);
					if (company !== 'Unknown symbol') {
						this.setState({ tickerSymbols: {...tickerSymbols, [newTickerKey]: company } }, () => {
							getNewsSentimentScore(company)
								.then(score => {
									const { tickerAnalysisResults } = this.state;
									this.setState({ tickerAnalysisResults: {...tickerAnalysisResults, [newTickerKey]: score } });
								});
						});
					}
				})
				.catch(error => {
					console.error('that\'s not a real symbol', error);			
				});
		}
	}

  render() {
		const { tickerSymbols, tickerAnalysisResults } = this.state;
    return (
      <View style={styles.container}>
        <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
          <View style={{ alignItems: 'center' }}>
						<Text>Select some stocks!</Text>
          </View>
					<SubmittableInputWithState
						onSubmit={this.handleGetNewTickerDetails}
						buttonProps={{ title: 'Submit' }}
					/>
          <SectionList
						renderItem={({item, index, section}) => <Text key={index}>{item}</Text>}
						renderSectionHeader={({section: {title}}) => (
									<Text style={{fontWeight: 'bold'}}>{title}</Text>
							)}
							sections={Object.entries(tickerSymbols).map(([key, value]) => ({ title: key, data: value.map(x => <Text>{x.headline}</Text>) }))}
							keyExtractor={(item, index) => item + index}
					/>
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  developmentModeText: {
    marginBottom: 20,
    color: 'rgba(0,0,0,0.4)',
    fontSize: 14,
    lineHeight: 19,
    textAlign: 'center',
  },
  contentContainer: {
    paddingTop: 30,
  },
  homeScreenFilename: {
    marginVertical: 7,
  },
  codeHighlightText: {
    color: 'rgba(96,100,109, 0.8)',
  },
  codeHighlightContainer: {
    backgroundColor: 'rgba(0,0,0,0.05)',
    borderRadius: 3,
    paddingHorizontal: 4,
  },
  tabBarInfoContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    ...Platform.select({
      ios: {
        shadowColor: 'black',
        shadowOffset: { height: -3 },
        shadowOpacity: 0.1,
        shadowRadius: 3,
      },
      android: {
        elevation: 20,
      },
    }),
    alignItems: 'center',
    backgroundColor: '#fbfbfb',
    paddingVertical: 20,
  },
  tabBarInfoText: {
    fontSize: 17,
    color: 'rgba(96,100,109, 1)',
    textAlign: 'center',
  },
  navigationFilename: {
    marginTop: 5,
  },
  helpContainer: {
    marginTop: 15,
    alignItems: 'center',
  },
  helpLink: {
    paddingVertical: 15,
  },
  helpLinkText: {
    fontSize: 14,
    color: '#2e78b7',
  },
});
