import AsyncStorage from '@react-native-async-storage/async-storage';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import * as React from 'react';
import { TouchableOpacity, Button, Text, View, StyleSheet, ScrollView, SafeAreaView, Image } from 'react-native';
import { UserContext } from '../contexto/usuario';
import Svg, { Path, Defs, LinearGradient, Stop, Pattern, Use } from "react-native-svg"

function TiendaHomeScreen({ navigation }) {

  const { me, setMe } = React.useContext(UserContext);

  //metodo para cerrar la sesion
  const closeSesion = async () => {
    await GoogleSignin.signOut();
    await AsyncStorage.removeItem('sesion');
    setMe(undefined);
    navigation.navigate('Login');
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <View style={styles.encabezado}>
          <View style={styles.boton}>
            <TouchableOpacity style={styles.botonT} onPress={closeSesion}>
              <Text style={{color: 'white'}}>CERRAR SESION</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.imgEncabezado}>
            <Image source={require("../imagenes/encabezado.png")} />
          </View>
        </View>
        <View style={styles.mainContainer}>
          <TouchableOpacity>
            <Image source={require("../imagenes/hogar.png")} />
          </TouchableOpacity>
          <TouchableOpacity>
            <Image source={require("../imagenes/abarrotes.png")} />
          </TouchableOpacity>
          <TouchableOpacity>
            <Image source={require("../imagenes/frutasVerduras.png")} />
          </TouchableOpacity>
          <TouchableOpacity>
            <Image source={require("../imagenes/limpieza.png")} />
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

//<Button
//title="Go to Tienda"
//onPress={() => navigation.navigate('Tienda')}
///>

export default TiendaHomeScreen;

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'yellow'
  },
  mainContainer: {
    backgroundColor: 'white',
    alignItems: 'center'
  },
  encabezado: {
    backgroundColor: 'red',
    alignItems: 'flex-end',
    flex: 1,
    zIndex: 1,
    position: 'relative'
  },
  boton: {
    alignItems: 'flex-end',
    width: '40%',
    height: '20%',
    zIndex: 2,
    position: 'absolute',
    right: '2%',
    marginTop: '2%'
  },
  imgEncabezado: {
    marginTop: '0%',
  },
  botonT: {
    backgroundColor: '#0083A7',
    padding: 10,
    borderRadius: 10
  }
});