import React, { useEffect, useState } from 'react';
import { Button, Text, View, FlatList, ActivityIndicator } from 'react-native';
import ListaProductos from '../controllers/ListaProductos';

// expo web: 884256678652-eetcjdolhpfhugi9996e38701oed1n79.apps.googleusercontent.com
// android: 884256678652-r4hh05053ps31ukbrv1ilcf5868go8n9.apps.googleusercontent.com
// web: 884256678652-4i9ba4og3chkvbkuu24s75npv1c4bhup.apps.googleusercontent.com

function TiendaScreen({ route, navigation }) {

  const { categoria } = route.params;

  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState([]);

  const getProductos = async () => {
    try {
      const urlGet = 'https://sofymicroservicios.azurewebsites.net/api/producto/' + categoria;
      const response = await fetch(urlGet);
      const json = await response.json();
      setData(json);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    getProductos();
  }, []);

  return (
    <View className='flex-1 bg-gray items-center justify-center'>
      <Text>Tienda Screen</Text>
      <Text>categoria: {JSON.stringify(categoria)}</Text>
      <Button
        title="Go to Cart"
        onPress={() => navigation.navigate('Carrito')}
      />
    </View>
  );
}

export default TiendaScreen;

//<View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}></View>
//<Button
        //title="Go to Cart"
        //onPress={() => navigation.navigate('Carrito')}
      ///>
      //{isLoading ? <ActivityIndicator /> : (
        //<FlatList
          //data={data}
          //keyExtractor={({ id_producto }, index) => id_producto}
          //renderItem={({ item }) => (
            //<Text>{item.id_producto}, {item.nombre}, {item.img}</Text>
          //)}
        ///>
      //)}