import React, { useEffect } from 'react'
import { Text, View, StyleSheet } from 'react-native'
import { Audio } from 'expo-av'


export default function Contador(props) {

    var done = false

    useEffect(() => {
        const timer = setInterval(() => {

            props.setSeconds(props.seconds - 1);
            if (props.seconds <= 0) {
                if (props.minutes > 0) {
                    props.setMinutes(setMinutes - 1)
                    props.setSeconds(59)
                }
                else {
                    if (!done) {
                        Audio.
                            done = true;

                        playSound();
                        resetar();
                    }
                }
            }
        }, 1000)

        return () => clearInterval(timer);
    })

    function findChoosenAlarmSound() {
        var alarm = props.alarms.find((val) => val.selected == true)
        return alarm.sound
    }

    function getFile() {

        var sound = findChoosenAlarmSound();
        switch (sound) {
            case 'alarm1': return require('../assets/sounds/alarme1.mp3');
            case 'alarm2': return require('../assets/sounds/alarme2.mp3');
            default:
                return require('../assets/sounds/alarme3.mp3');
        }
    }

    async function playSound() {
        //return;
        const soundObject = new Audio.Sound();

        /*  const soundObject = await Audio.Sound.createAsync(
             { uri: sound },
             { shouldPlay: true }
         ); */
        try {
            //await soundObject.loadAsync(require('../assets/sounds/alarme1.mp3'));
            await soundObject.loadAsync(getFile());
            await soundObject.playAsync();
            // Your sound is playing!

            // Don't forget to unload the sound from memory
            // when you are done using the Sound object
            //await soundObject.unloadAsync();
        } catch (error) {
            // An error occurred!
            console.log(error)
        }

    }

    const resetar = () => {
        props.setStatus(0)
        props.setMinutes(0);
        props.setSeconds(1);
    }

    const formatarNumero = (number) => {

        var finalNumber = "";
        if (number < 10) {
            finalNumber = "0" + number
        } else {
            finalNumber = number
        }
        return finalNumber
    }

    var segundo = formatarNumero(props.seconds);
    var minuto = formatarNumero(props.minutes)




    return (
        <View style={{ flexDirection: 'column', alignItems: 'center' }}>
            <Text style={styles.textTitle}>Timer iniciado</Text>
            <Text style={styles.textContador}> {minuto} : {segundo}</Text>
        </View>
    )
}
const styles = StyleSheet.create({
    textTitle: {
        color: '#ccc',
        fontSize: 40
    },
    textContador: {
        color: 'white',
        fontSize: 40
    }
})