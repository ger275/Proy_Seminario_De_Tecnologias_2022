import React, { useEffect, useContext, useState } from 'react';
import UserProvider, { UserContext } from '../contexto/usuario';
import * as WebBrowser from 'expo-web-browser';
import * as Google from 'expo-auth-session/providers/google';
import Svg, { Path, Defs, LinearGradient, Stop } from "react-native-svg"
import { Image, TouchableOpacity, TextInput, StyleSheet, Button, Text, View } from 'react-native';
import { GoogleSignin, statusCodes } from '@react-native-google-signin/google-signin';
import AsyncStorage from '@react-native-async-storage/async-storage';

// expo web: 884256678652-eetcjdolhpfhugi9996e38701oed1n79.apps.googleusercontent.com
// android: 884256678652-r4hh05053ps31ukbrv1ilcf5868go8n9.apps.googleusercontent.com
// web: 884256678652-4i9ba4og3chkvbkuu24s75npv1c4bhup.apps.googleusercontent.com

WebBrowser.maybeCompleteAuthSession();

function LoginScreen({ navigation }) {

  const [isSession, setIsSession] = useState(false);
  const { setMe } = useContext(UserContext);

  useEffect(() => {
    GoogleSignin.configure({
      expoClientId: "884256678652-eetcjdolhpfhugi9996e38701oed1n79.apps.googleusercontent.com",
      androidClientId: "884256678652-r4hh05053ps31ukbrv1ilcf5868go8n9.apps.googleusercontent.com",
      webClientId: "884256678652-4i9ba4og3chkvbkuu24s75npv1c4bhup.apps.googleusercontent.com"
    });

    getStorage();
  }, [])

  const getStorage = async () => {
    if (await AsyncStorage.getItem('sesion')) {
      setIsSession(true);
    } else {
      setIsSession(false);
    }
  }

  //fondo blando de la pantalla login
  const SvgFondoBlanco = (props) => (
    <Svg
      width={350}
      height={830}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <Path
        d="M0 50C0 22.386 22.386 0 50 0h300v830H50c-27.614 0-50-22.386-50-50V50Z"
        fill="#fff"
      />
    </Svg>
  );

  //metodo de google para iniciar sesion
  const signIn = async () => {
    try {
      await GoogleSignin.hasPlayServices();
      const userInfo = await GoogleSignin.signIn();

      await AsyncStorage.setItem('sesion', JSON.stringify(userInfo.user));
      setMe(userInfo.user);
      setIsSession(true);
      navigation.navigate('TiendaHome');
    } catch (error) {
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        // user cancelled the login flow
      } else if (error.code === statusCodes.IN_PROGRESS) {
        // operation (e.g. sign in) is in progress already
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        // play services not available or outdated
      } else {
        // some other error happened
      }
    }
  };

  //metodo para cerrar la sesion
  const closeSesion = async () => {
    await GoogleSignin.signOut();
    await AsyncStorage.removeItem('sesion');
    getStorage();
  }



  return (
    <View style={styles.mainContainer}>
      <View style={styles.containerSVG}>
        <SvgFondoBlanco />
      </View>
      <View style={styles.container}>
        <Text style={styles.titulo}>BIENVENIDO</Text>
        <Text style={styles.subTitulo}>Login</Text>
        <TextInput
          placeholder="Email"
          style={styles.textInput}
        />
        <TextInput
          placeholder="Contraseña"
          style={styles.textInput}
        />

        <TouchableOpacity
          onPress={signIn}
        >
          <Image source={require("../imagenes/login.png")} style={{ width: '100%', height: 50 }} />
        </TouchableOpacity>

      </View>
    </View>
  );
}
//<TouchableOpacity
//onPress={() => me ? signIn: navigation.navigate('MainStack', {screen: 'TiendaHome'})}
//>
//<Image source={require("../imagenes/login.png")} style={{ width: '100%', height: 50 }} />
//</TouchableOpacity>

//{!isSession ? <Button title='iniciar con google' onPress={signIn} /> : null}
//{isSession ? <Button title='cerrar' onPress={closeSesion} /> : null}

export default LoginScreen;

const styles = StyleSheet.create({
  mainContainer: {
    backgroundColor: 'red',
    alignItems: 'center',
    flex: 1,
    zIndex: 1,
    position: 'relative'
  },
  containerSVG: {
    alignItems: 'flex-end',
    width: '100%',
    height: '80%',
    zIndex: 2,
    position: 'absolute',
    marginTop: 0
  },
  container: {
    marginTop: '50%',
    zIndex: 3,
    position: 'absolute',
    backgroundColor: '#FFFFFF'
  },
  titulo: {
    fontSize: 40,
    color: '#FB8C00',
    fontWeight: 'bold'
  },
  subTitulo: {
    fontSize: 20,
    color: '#FB8C00',
    marginTop: 130,
    marginBottom: 40,
    fontWeight: 'bold'
  },
  textInput: {
    padding: 10,
    paddingStart: 30,
    borderColor: '#FDD835',
    borderWidth: 3,
    width: '100%',
    height: 50,
    marginBottom: 20,
    borderTopLeftRadius: 15,
    borderBottomRightRadius: 15
  }
});