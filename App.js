import * as React from 'react';
import MainStack from './navigation/MainStack';
import { createDrawerNavigator } from '@react-navigation/drawer'
import { NavigationContainer } from '@react-navigation/native';
import LoginScreen from './screens/LoginScreen';
import UserProvider from './contexto/usuario';

// expo web: 884256678652-eetcjdolhpfhugi9996e38701oed1n79.apps.googleusercontent.com
// android: 884256678652-r4hh05053ps31ukbrv1ilcf5868go8n9.apps.googleusercontent.com
// web: 884256678652-4i9ba4og3chkvbkuu24s75npv1c4bhup.apps.googleusercontent.com

const Drawer = createDrawerNavigator();

function App() {

  return (
    <UserProvider>
      <NavigationContainer>
        <Drawer.Navigator
          useLegacyImplementation
          initialRouteName='MainStack'
          screenOptions={{ headerShown: false }}
        >
          <Drawer.Screen name="MainStack" component={MainStack} />
        </Drawer.Navigator>
      </NavigationContainer>
    </UserProvider>
  );

}

export default App;

//<Drawer.Screen name="MainStack" component={MainStack} />
//<Drawer.Screen name="Login" component={LoginScreen} />
