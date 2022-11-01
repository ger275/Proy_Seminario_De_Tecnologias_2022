import * as React from 'react';
import { Button, Text, View, Dimensions } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

// expo web: 884256678652-eetcjdolhpfhugi9996e38701oed1n79.apps.googleusercontent.com
// android: 884256678652-r4hh05053ps31ukbrv1ilcf5868go8n9.apps.googleusercontent.com
// web: 884256678652-4i9ba4og3chkvbkuu24s75npv1c4bhup.apps.googleusercontent.com

var { height, width } = Dimensions.get('window');

function CarritoScreen({ navigation }) {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Carrito Screen</Text>
      <Button
        title="Go to Detalle"
        onPress={() => navigation.navigate('DetallePedido', {
          nombre: 'tortrix',
          precio: '1.00',
        })}
      />
    </View>
  );
}

export default CarritoScreen;