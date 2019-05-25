import React, { Component } from 'react';

import {
	StyleSheet,
	Button,
	View,
	AsyncStorage
} from 'react-native';
import moment from 'moment';

class AccidentDetail extends Component {

	constructor(props) {
		super(props)

		this.state = {
			value: {
				
			}
		};
	};



	render() {
		return (
			<View style={styles.container}>
				
			</View>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
});


export default AccidentDetail;