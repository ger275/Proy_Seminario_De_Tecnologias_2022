import * as React from 'react';
import { Button, Text, View } from 'react-native';

// expo web: 884256678652-eetcjdolhpfhugi9996e38701oed1n79.apps.googleusercontent.com
// android: 884256678652-r4hh05053ps31ukbrv1ilcf5868go8n9.apps.googleusercontent.com
// web: 884256678652-4i9ba4og3chkvbkuu24s75npv1c4bhup.apps.googleusercontent.com

function TiendaScreen({ navigation }) {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Tienda Screen</Text>
      <Button
        title="Go to Cart"
        onPress={() => navigation.navigate('Carrito')}
      />
    </View>
  );
}

export default TiendaScreen;