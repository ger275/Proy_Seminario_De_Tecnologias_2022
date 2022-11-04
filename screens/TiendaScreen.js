import React, { useEffect, useState } from 'react';
import { Text, View, FlatList, Image, StyleSheet, Dimensions, Button, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

var { height, width } = Dimensions.get('window');

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

  const onclickAddCart = async (datos) => {
    const itemCart = {
      cantidad: 1,
      id_producto: datos.id_producto,
      nombre: datos.nombre,
      img: datos.img,
      precio: datos.precio,
      categoria: datos.categoria
    }

    //const jsonvalue = JSON.stringify(datos)
    //await AsyncStorage.setItem('cart', jsonvalue)
    //alert("Agregado al carrito exitosamente!!" + datos.nombre);

    AsyncStorage.getItem("cart").then((datacart) => {
      if (datacart !== null) {
        let cart = []
        cart = JSON.parse(datacart)
        cart.push(itemCart)
        AsyncStorage.setItem("cart", JSON.stringify(cart))
      }
      else {
        const cart = []
        cart.push(itemCart)
        AsyncStorage.setItem("cart", JSON.stringify(cart))
      }
      alert("Agregado al carrito exitosamente!!");
    })
      .catch((error) => {
        alert(error)
      })
  }

  return (
    <View style={{ flex: 1, width: width, borderRadius: 20, paddingVertical: 20, alignItems: 'center', alignContent: 'center' }}>
      <FlatList
        data={data}
        numColumns={2}
        keyExtractor={({ id_producto }, index) => id_producto}
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.divFood}>
            <Image style={styles.imageFood} resizeMode="contain" source={{ uri: item.img }} />
            <Text style={{ fontWeight: 'bold', fontSize: 22, textAlign: 'center' }}>{item.nombre}</Text>
            <Text style={{ fontWeight: 'bold', fontSize: 20, color: 'green', textAlign: 'center' }}>Q {item.precio}</Text>
            <TouchableOpacity style={{ width: (width / 2) - 40, backgroundColor: '#33c37d', alignItems: 'center', justifyContent: 'center', borderRadius: 5, padding: 5 }} onPress={() => onclickAddCart(item)}>
              <Text style={{ fontSize: 14, color: 'white', fontWeight: 'bold' }}>Añadir al carrito</Text>
            </TouchableOpacity>
          </TouchableOpacity>
        )}
      />
      <Text></Text>
      <TouchableOpacity style={{ backgroundColor: '#33c37d', width: width - 40, alignItems: 'center', alignContent: 'center', padding: 10, borderRadius: 10 }} onPress={() => navigation.navigate('Carrito')}>
        <Text style={{ fontSize: 24, fontWeight: 'bold', color: 'white' }}>
          Ir al carrito
        </Text>
      </TouchableOpacity>
    </View>
  );
}

export default TiendaScreen;

const styles = StyleSheet.create({
  divFood: {
    width: (width / 2) - 25,
    backgroundColor: 'white',
    padding: 10,
    borderRadius: 10,
    marginBottom: 5,
    marginTop: 55,
    alignItems: 'center',
    marginLeft: 6,
    elevation: 8,
    shadowOpacity: 0.3,
    shadowRadius: 50
  },
  imageFood: {
    width: ((width / 2) - 20) - 10,
    height: ((width / 2) - 20) - 30,
    backgroundColor: 'transparent'
  }
});