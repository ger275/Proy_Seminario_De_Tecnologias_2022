import * as React from 'react';
import { Button, Text, View } from 'react-native';

function TiendaHomeScreen({ navigation }) {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Tienda Screen</Text>
      <Button
        title="Go to Tienda"
        onPress={() => navigation.navigate('Tienda')}
      />
    </View>
  );
}

export default TiendaHomeScreen;