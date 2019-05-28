import React, { Component } from 'react';

import {
    StyleSheet,
    Button,
    View,
    Text,
    AsyncStorage
} from 'react-native';

import t from 'tcomb-form-native';
import moment from 'moment';
import FBProvider from '../FirebaseProvider';
const Form = t.form.Form;

let myFormatFunction = (format, date) => {
    return moment(date).format(format);
};

const AccDetail = t.struct({
    inckey: t.String,
    title: t.String,
    detail: t.String,
    date: t.String,
    latitude: t.Number,
    longitude: t.Number,
});

const formStyles = {
    ...Form.stylesheet, // copy over all of the default styles
    formGroup: {
        normal: {
            marginBottom: 10
        },
    },
    controlLabel: {
        normal: {
            color: 'blue',
            fontSize: 18,
            marginBottom: 7,
            fontWeight: '600'
        },
        // the style applied when a validation error occours
        error: {
            color: 'red',
            fontSize: 18,
            marginBottom: 7,
            fontWeight: '600'
        }
    }
}

const options = {
    fields: {
        inckey: {
            hidden: true
        },
        date: {
            label: 'Accident Date',
            mode: 'date',
            config: {
                format: (date) => myFormatFunction("DD MMM YYYY", date)
            }
        },
        detail: {
            multiline: true,
        }
    },
    stylesheet: formStyles,
}

class AddAccident extends Component {

    constructor(props) {
        super(props)

        this.state = {
            value: {
                inckey: (new Date().valueOf()).toString(),
                date: myFormatFunction("YYYY-MM-DD", new Date),
                detail: '',
                image: '',
                latitude: null,
                longitude: null,
                title: '',
            }
        };

        this.incRef = FBProvider.getIncidentRef("accidents");
    };

    static navigationOptions = ({ navigation }) => {
        return {
            title: 'Report Accident',
            headerRight: (
                <Button
                    title="Save"
                    onPress={navigation.getParam('saveAccident')} />
            ),
        };
    }

    _saveAccident = async () => {
        const value = this.refs._form.getValue();

        // if (value.expkey) {
        //     FBProvider.updateIncident(this.incRef, value.inckey,
        //         {
        //             date: moment(value.expdate).format("YYYY-MM-DD"),
        //             detail: value.detail,
        //             image: value.image,
        //             latitude: value.latitude,
        //             longitude: value.longitude,
        //             title: value.title,
        //         });
        // } else {
            FBProvider.addIncident(this.incRef,
                {
                    date: moment(value.expdate).format("YYYY-MM-DD"),
                    detail: value.detail,
                    // image: value.image,
                    latitude: value.latitude,
                    longitude: value.longitude,
                    title: value.title,
                });
        // }
        alert("Save");
        this.props.navigation.goBack();
    }

    _load = (latitude, longitude) => {
        this.setState({
            value: {
                inckey: (new Date().valueOf()).toString(),
                date: myFormatFunction("YYYY-MM-DD", new Date),
                detail: '',
                image: '',
                latitude: latitude,
                longitude: longitude,
                title: '',
            }
        });
    }

    componentWillMount() {
        this.props.navigation.setParams({ saveAccident: this._saveAccident });
        coordinateOb = this.props.navigation.state.params.coordinate
        coordinate = JSON.stringify(this.props.navigation.state.params.coordinate)
        latitude = coordinateOb.latitude
        longitude = coordinateOb.longitude
        latitudeDelta = coordinateOb.latitudeDelta
        longitudeDelta = coordinateOb.longitudeDelta
        this._load(latitude, longitude);
        console.log(latitude)
        console.log(longitude)
        console.log(coordinate)
    }

    render() {
        return (
            <View style={styles.container}>
                <Form
                    ref="_form"
                    type={AccDetail}
                    options={options}
                    value={this.state.value}
                />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
});

export default AddAccident;