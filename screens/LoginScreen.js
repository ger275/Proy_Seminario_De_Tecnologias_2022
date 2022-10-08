import * as React from 'react';
import * as WebBrowser from 'expo-web-browser';
import * as Google from 'expo-auth-session/providers/google';
import Svg, { Path, Defs, LinearGradient, Stop } from "react-native-svg"
import { Image, TouchableOpacity, TextInput, StyleSheet, Button, Text, View } from 'react-native';

// expo web: 884256678652-eetcjdolhpfhugi9996e38701oed1n79.apps.googleusercontent.com
// android: 884256678652-r4hh05053ps31ukbrv1ilcf5868go8n9.apps.googleusercontent.com
// web: 884256678652-4i9ba4og3chkvbkuu24s75npv1c4bhup.apps.googleusercontent.com

WebBrowser.maybeCompleteAuthSession();

function LoginScreen({ navigation }) {

  const [accessToken, setAccessToken] = React.useState(null);
  const [user, setUser] = React.useState(null);
  const [request, response, promptAsync] = Google.useIdTokenAuthRequest({
    expoClientId: "884256678652-eetcjdolhpfhugi9996e38701oed1n79.apps.googleusercontent.com",
    androidClientId: "884256678652-r4hh05053ps31ukbrv1ilcf5868go8n9.apps.googleusercontent.com",
    webClientId: "884256678652-4i9ba4og3chkvbkuu24s75npv1c4bhup.apps.googleusercontent.com"
  });

  // este ayuda para cuando el usuario inicia la aplicacion veamos si el usuario tienen una sesion o no 
  React.useEffect(() => {
    if (response?.type === "success") {
      setAccessToken(response.authentication.accessToken);
      accessToken && fetchUserInfo();
    }
  }, [response, accessToken])

  async function fetchUserInfo() {
    let response = await fetch("https://www.googleapis.com/userinfo/v2/me", {
      headers: { Authorization: `Bearer ${accessToken}` }
    });
    const useInfo = await response.json();
    setUser(useInfo);
  }

  const ShowUserInfo = () => {
    if (user) {
      return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
          <Text style={{ fontSize: 35, fontWeight: 'bold', marginBottom: 20 }}>Bienvenido</Text>
          <Image source={{ uri: user.picture }} style={{ width: 100, height: 100, borderRadius: 50 }} />
          <Text style={{ fontSize: 20, fontWeight: 'bold' }}>{user.name}</Text>
        </View>
      )
    }
  }

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

        {user && <ShowUserInfo />}
        {user === null &&
          <>
            <TouchableOpacity
              disabled={!request}
              onPress={() => {
                promptAsync();
              }}
            >
              <Image source={require("../imagenes/login.png")} style={{ width: '100%', height: 50 }} />
            </TouchableOpacity>
          </>
        }

        <Button
          title="Go to Tienda"
          onPress={() =>
            navigation.navigate('MainStack', {
              screen: 'TiendaHome',
            })
          }
        />
      </View>
    </View>
  );
}

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
});