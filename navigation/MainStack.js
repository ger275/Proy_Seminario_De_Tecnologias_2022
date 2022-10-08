import * as React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import TiendaScreen from '../screens/TiendaScreen';
import CarritoScreen from '../screens/CarritoScreen';
import TiendaHomeScreen from '../screens/TiendaHomeScreen';
import DetallePedidoScreen from '../screens/DetallePedidoScreen';

// expo web: 884256678652-eetcjdolhpfhugi9996e38701oed1n79.apps.googleusercontent.com
// android: 884256678652-r4hh05053ps31ukbrv1ilcf5868go8n9.apps.googleusercontent.com
// web: 884256678652-4i9ba4og3chkvbkuu24s75npv1c4bhup.apps.googleusercontent.com

const Stack = createNativeStackNavigator();

function App() {
  return (
      <Stack.Navigator>
        <Stack.Screen name='TiendaHome' component={ TiendaHomeScreen } />
        <Stack.Screen name='Tienda' component={ TiendaScreen } />
        <Stack.Screen name='Carrito' component={ CarritoScreen } />
        <Stack.Screen name='DetallePedido' component={ DetallePedidoScreen } />
      </Stack.Navigator>
  );
}

export default App;