// Este é um aplicativo para usar o sensor de acelerometro do celular/dispositivo movel. ele irá calcular a força G e dizer o quanto o dipositivo está acelerando e quanta velocidade ele esta tendo

import React, { useState, useEffect } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Accelerometer } from "expo-sensors";

export default function App() {
  const [{ x, y, z }, setData] = useState({
    x: 0,
    y: 0,
    z: 0,
  });
  const [subscription, setSubscription] = useState(null);

  // aqui ele irá definir o intervalo para atualização dos valores X, Y e Z em segundos
  const _slow = () => Accelerometer.setUpdateInterval(400);
  const _fast = () => Accelerometer.setUpdateInterval(16);

  const _subscribe = () => {
    setSubscription(Accelerometer.addListener(setData));
  };

  const _unsubscribe = () => {
    subscription && subscription.remove();
    setSubscription(null);
  };

  useEffect(() => {
    _subscribe();
    return () => _unsubscribe();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.text}>
        Accelerometer: (in gs where 1g = 9.81 m/s^2)
      </Text>
      <Text style={styles.text}>x: {x}</Text>
      <Text style={styles.text}>y: {y}</Text>
      <Text style={styles.text}>z: {z}</Text>
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          onPress={subscription ? _unsubscribe : _subscribe}
          style={styles.button}
        >
          <Text>{subscription ? "On" : "Off"}</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={_slow}
          style={[styles.button, styles.middleButton]}
        >
          <Text>Slow</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={_fast} style={styles.button}>
          <Text>Fast</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
