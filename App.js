import { StatusBar } from 'expo-status-bar';

import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient'
import Timer from './components/Timer'
import Contador from './components/Contador';
import * as Permissions from 'expo-permissions';



export default function App() {

  const [statusTimer, setStatusTimer] = useState(0)
  const [seconds, setSeconds] = useState(1)
  const [minutes, setMinutes] = useState(0)
  const [permission, askPermission, getPermission] = Permissions.usePermissions(Permissions.AUDIO_RECORDING, { ask: true });

  
  const [alarmSound, setAlarmSound] = useState([
    {
      selected: true,
      sound: 'alarm1',
      file: '../assets/sounds/alarme1.mp3'
    },
    {
      selected: false,
      sound: 'alarm2',
      file: '../assets/sounds/alarme2.mp3'
    },
    {
      selected: false,
      sound: 'alarm3',
      file: '../assets/sounds/alarme3.mp3'
    }
  ])

 

  useEffect(() => {
    (async () => {
      console.log(`Minutos: ${minutes}`)
    })()
  }, [minutes]) 

  


  const handleChooseAlarm = (sound) => {
    let newArray = [...alarmSound]
    newArray.forEach((element, idx) => {
      if (element.sound == sound) {

        element.selected = true
      } else {
        element.selected = false;
      }
    });
    setAlarmSound([...newArray]);
  }
  const handleStartTimer = () => {
    if (statusTimer == 0)
      setStatusTimer(1)
    else
      setStatusTimer(0)
  }

  return (
    <View style={containerStyle.mainStyle}>
      <StatusBar style="light" />
      <LinearGradient
        // Background Linear Gradient
        colors={['rgba(0,0,0,0.8)', 'transparent']}
        style={{
          position: 'absolute',
          left: 0,
          right: 0,
          top: 0,
          height: "100%",
        }}
      />
      {statusTimer == 0 ?
        <Timer seconds={seconds} minutes={minutes} handleChangeSeconds={setSeconds} askPermission={askPermission} handleChangeMinutes={setMinutes} alarms={alarmSound} handleChooseAlarm={handleChooseAlarm} style={styles} />
        :
        <Contador seconds={seconds} minutes={minutes} setStatus={setStatusTimer} setSeconds={setSeconds} setMinutes={setMinutes}  alarms={alarmSound} />
      }
      <TouchableOpacity onPress={() => handleStartTimer()} style={styles.btnStart}>
        <Text style={styles.textBtnStart}>{statusTimer == 0 ? 'Iniciar' : 'Parar'}</Text>
      </TouchableOpacity>

    </View>

  );
}

const containerStyle = StyleSheet.create({
  mainStyle: {
    flex: 1,
    backgroundColor: '#04579b',
    alignItems: 'center',
    justifyContent: 'center',

  }
})

const styles = StyleSheet.create({

  btnStart: {
    marginTop: 20,
    height: 100, width: 100, alignItems: 'center', backgroundColor: '#ccc', borderRadius: 50,
    paddingTop: 34, borderWidth: 3, borderColor: 'white'
  },
  textBtnStart: {
    color: '#04579b',
    fontSize: 20,
    fontWeight: '500',
    alignItems: 'center'
  },
});
