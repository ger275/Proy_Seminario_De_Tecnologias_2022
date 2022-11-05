import React, { useEffect, useState } from 'react';
import { Button, Text, View, Dimensions, Image, TouchableOpacity, ScrollView } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Ionicons from '@expo/vector-icons/Ionicons';
import { AntDesign } from '@expo/vector-icons';

// expo web: 884256678652-eetcjdolhpfhugi9996e38701oed1n79.apps.googleusercontent.com
// android: 884256678652-r4hh05053ps31ukbrv1ilcf5868go8n9.apps.googleusercontent.com
// web: 884256678652-4i9ba4og3chkvbkuu24s75npv1c4bhup.apps.googleusercontent.com

var { height, width } = Dimensions.get('window');

function CarritoScreen({ navigation }) {

  //***************************************************************************/
  const [isLoading, setLoading] = useState(true);
  const [dataCart, setDataCart] = useState([]);

  const getProductos = async () => {
    try {
      AsyncStorage.getItem("cart").then((cart) => {
        if (cart !== null) {
          const cartFood = JSON.parse(cart)
          setDataCart(cartFood);
        } else {
          alert("Agregue productos al carrito!!")
        }
      })
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    getProductos();
  }, []);
  //***************************************************************************/

  const onChangeCantidad = async (i, type) => {

    const carritotmp = dataCart
    let cantidadtmp = carritotmp[i].cantidad;

    if (type) {
      cantidadtmp = cantidadtmp + 1
      carritotmp[i].cantidad = cantidadtmp
      setDataCart(carritotmp)
      AsyncStorage.setItem("cart", JSON.stringify(carritotmp))
      getProductos()
    } else if (type == false && cantidadtmp >= 2){
      cantidadtmp = cantidadtmp - 1
      carritotmp[i].cantidad = cantidadtmp
      setDataCart(carritotmp)
      AsyncStorage.setItem("cart", JSON.stringify(carritotmp))
      getProductos()
    } else if(type == false && cantidadtmp == 1){
      carritotmp.splice(i, 1)
      setDataCart(carritotmp)
      AsyncStorage.setItem("cart", JSON.stringify(carritotmp))
      getProductos()
    }
  }

  const limpiarAsynStorage = async () => {
    await AsyncStorage.removeItem('cart');
    navigation.navigate('TiendaHome')
    alert("Se vació el carrito!!")
  }

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>

      <View style={{ width: width - 30, alignItems: 'flex-end' }}>
        <Text></Text>
        <TouchableOpacity style={{ width: (width / 2) - 90, backgroundColor: 'red', alignItems: 'center', justifyContent: 'center', borderRadius: 5, padding: 5 }} onPress={() => limpiarAsynStorage()}>
          <Text style={{ fontSize: 12, color: 'white', fontWeight: 'bold' }}>Vaciar carrito</Text>
        </TouchableOpacity>
      </View>



      <View style={{ height: 10 }} />

      <View style={{ backgroundColor: 'transparent', flex: 1 }}>

        <ScrollView>
          {dataCart.map((item, i) => {
            return (

              <View style={{ width: width - 20, flexDirection: 'row', borderBottomWidth: 2, borderColor: '#cccccc', paddingBottom: 10 }}>

                <Image style={{ width: width / 3, height: width / 3 }} source={{ uri: item.img }} />
                <View style={{ backgroundColor: 'transparent', flex: 1, justifyContent: 'space-between' }}>

                  <View>
                    <Text style={{ fontSize: 20, fontWeight: 'bold ' }}>{item.nombre}</Text>
                    <Text></Text>
                    <Text>Monto</Text>
                  </View>

                  <View style={{ backgroundColor: 'transparent', flexDirection: 'row', justifyContent: 'space-between' }}>

                    <Text style={{ fontWeight: 'bold', color: '#33c37d', fontSize: 18 }}>
                      {item.precio * item.cantidad}
                    </Text>

                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                      <TouchableOpacity onPress={() => onChangeCantidad(i, false)}>
                        <AntDesign name="minuscircle" size={24} color="#33c37d" />
                      </TouchableOpacity>
                      <Text style={{ fontWeight: 'bold', paddingHorizontal: 5 }}>{item.cantidad}</Text>
                      <TouchableOpacity onPress={() => onChangeCantidad(i, true)}>
                        <AntDesign name="pluscircle" size={24} color="#33c37d" />
                      </TouchableOpacity>
                    </View>

                  </View>

                </View>
              </View>

            )

          })}
        </ScrollView>

      </View>

      <View style={{ height: 20 }} />

      <TouchableOpacity style={{ backgroundColor: '#33c37d', width: width - 40, alignItems: 'center', padding: 10, borderRadius: 10 }} onPress={() => navigation.navigate('DetallePedido')}>
        <Text style={{ fontSize: 22, fontWeight: 'bold', color: 'white' }}>
          Ir a Finalizar pedido
        </Text>
      </TouchableOpacity>

      <View style={{ height: 20 }} />

    </View>
  );
}

export default CarritoScreen;

//<Text>{JSON.stringify(dataCart)}</Text>