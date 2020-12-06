import React from 'react'
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'

import { Picker } from '@react-native-picker/picker'

export default Timer = (props) => {


    let numeros = [];
    for (var i = 1; i <= 60; i++) {
        numeros.push(i)
    }
    return (
        <React.Fragment>




            <Text style={{ color: 'white', fontSize: 30 }}>Select your time: </Text>
            <View style={{ flexDirection: "row", alignItems: "center" }}>

                <Text style={styles.labelpicker}>Min</Text>
                <Picker
                    style={styles.picker}
                    selectedValue={props.minutes}
                    onValueChange={(itemValue, itemIdx) => props.handleChangeMinutes(itemValue)}
                >
                    <Picker.Item label={'0'} value={'0'}></Picker.Item>
                    {
                        numeros.map(function (item, idx) {
                            return (<Picker.Item label={item.toString()} value={item.toString()}></Picker.Item>)
                        })
                    }
                </Picker>
                <Text style={styles.labelpicker}>Sec:</Text>
                <Picker style={styles.picker}
                    selectedValue={props.seconds}
                    onValueChange={(itemValue) => props.handleChangeSeconds(itemValue)}


                >
                    {
                        numeros.map(function (item, idx) {
                            return (<Picker.Item label={item.toString()} value={item.toString()}></Picker.Item>)
                        })
                    }
                </Picker>
            </View>


            <View style={styles.chooseView}>
                {
                    props.alarms.map(function (val) {
                        return (<TouchableOpacity onPress={() => { props.askPermission(); props.handleChooseAlarm(val.sound);}} style={val.selected ? styles.btnChooseSelected : styles.btnChoose}>
                            <Text style={{ color: 'white' }}>{val.sound}</Text>
                        </TouchableOpacity>)
                    })
                }
            </View>

        </React.Fragment>
    )
}

const styles = StyleSheet.create({

    btnChoose: {
        padding: 5,
        width: 100,
        backgroundColor: 'rgb(0,112,185)',
        alignItems: 'center',
        marginRight: 5,
        height: 30
    },
    btnChooseSelected: {
        backgroundColor: 'rgba(0,112,185,0.4)',
        padding: 5,
        width: 100,
        color: '#000',
        alignItems: 'center',
        textAlignVertical: 'center',
        marginRight: 5,
        height: 30,
        borderColor: 'white',
        borderWidth: 1
    },

    chooseView: {
        flexDirection: 'row'
    },
    labelpicker: {
        color: 'white',
        fontSize: 16,
        fontWeight: "500",
        marginRight: 5
    },
    picker: {
        height: 50,
        width: 100,
        color: 'white',

    }
})