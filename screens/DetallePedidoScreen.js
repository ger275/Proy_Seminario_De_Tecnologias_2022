import React, { useEffect, useState } from 'react';
import { Button, Text, View, TouchableOpacity, Dimensions, ScrollView, Image } from 'react-native';
import { UserContext } from '../contexto/usuario';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AntDesign } from '@expo/vector-icons';

var { height, width } = Dimensions.get('window');

function DetallePedidoScreen({ navigation }) {

  /*********************************Datos de usuario******************************************/
  const { me, setMe } = React.useContext(UserContext);
  /*******************************************************************************************/

  /**********************************Productos************************************************/
  const [isLoading, setLoading] = useState(true);
  const [dataCart, setDataCart] = useState([]);

  const getProductos = async () => {
    try {
      AsyncStorage.getItem("cart").then((cart) => {
        if (cart !== null) {
          const cartFood = JSON.parse(cart)
          setDataCart(cartFood);
          loadTotal()
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
  /*******************************************************************************************/

  /*******************************************Totalizar***************************************/
  const loadTotal = () => {
    var Total = 0
    const cartTmp = dataCart
    for (var i = 0; i < cartTmp.length; i++) {
      Total = Total + (cartTmp[i].cantidad * cartTmp[i].precio)
    }
    return Total
  }
  /*******************************************************************************************/

  /*****************************************Enviar pedido a API*******************************/
  function formatHoursTo12(date) {
    return date.getHours() % 12 || 12;
  }

  const enviarPedido = async () => {
    try {
      let now = new Date();
      let anio = now.getFullYear();
      let mes = String(now.getMonth() + 1).padStart(2, '0');
      let dia = String(now.getDate()).padStart(2, '0');
      let hora = String(formatHoursTo12(now)).padStart(2, '0');
      let minuto = String(now.getMinutes()).padStart(2, '0');
      let segundo = String(now.getSeconds()).padStart(2, '0');
      const fecha = anio + '-' + mes + '-' + dia + 'T' + hora + ':' + minuto + ':' + segundo + 'Z';
      //alert(fecha);
      alert("Espere por favor")
      const cartTmp = dataCart
      for (var i = 0; i < cartTmp.length; i++) {
        await fetch('https://sofymicroservicios.azurewebsites.net/api/producto', {
          method: 'post',
          mode: 'no-cors',
          headers: {
            'Acept': 'application/json',
            'Content-Type': ' application/json'
          },
          body: JSON.stringify({
            email: me.email,
            nombre: me.name,
            fechaHora: fecha,
            id_producto: cartTmp[i].id_producto,
            cantidad: cartTmp[i].cantidad
          })
        });
      }
      alert("Se envió su pedido correctamente, podrá recogerlo en tienda en 30 minutos")
      await AsyncStorage.removeItem('cart');
      navigation.navigate('TiendaHome')
    } catch (error) {
      console.log(error);
    }
  }
  /*******************************************************************************************/

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>

      <View style={{ width: width - 20, borderBottomWidth: 2, borderColor: '#cccccc', paddingBottom: 10 }}>
        <Text style={{ fontWeight: 'bold', fontSize: 20, color: 'gray' }}>Datos</Text>
        <Text></Text>
        <Text style={{ fontSize: 16 }}><Text style={{ fontWeight: 'bold' }}>Nombre: </Text>{me.name}</Text>
        <Text style={{ fontSize: 16 }}><Text style={{ fontWeight: 'bold' }}>Correo: </Text>{me.email}</Text>
        <Text style={{ fontSize: 20, fontWeight: 'bold' }}>Total: Q {loadTotal()}</Text>
        <Text></Text>
        <Text style={{ fontWeight: 'bold', fontSize: 20, color: 'gray' }}>Detalle</Text>
      </View>

      <View style={{ backgroundColor: 'transparent', flex: 1 }}>

        <ScrollView>
          {dataCart.map((item, i) => {
            return (

              <View style={{ width: width - 20, flexDirection: 'row', borderBottomWidth: 2, borderColor: '#cccccc', paddingBottom: 10 }}>

                <View style={{ backgroundColor: 'transparent', flex: 1, justifyContent: 'space-between' }}>

                  <View>
                    <Text style={{ fontSize: 20, fontWeight: 'bold ' }}>{item.nombre}</Text>
                  </View>

                  <View style={{ backgroundColor: 'transparent', flexDirection: 'row', justifyContent: 'space-between' }}>

                    <Text style={{ fontWeight: 'bold', color: '#33c37d', fontSize: 18 }}>Monto:  Q {item.precio * item.cantidad}</Text>

                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                      <Text style={{ fontWeight: 'bold', paddingHorizontal: 5 }}></Text>
                    </View>

                  </View>

                </View>
              </View>

            )
          })}
        </ScrollView>

      </View>

      <Text></Text>
      <TouchableOpacity style={{ backgroundColor: '#33c37d', width: width - 40, alignItems: 'center', padding: 10, borderRadius: 10 }} onPress={() => enviarPedido()}>
        <Text style={{ fontSize: 24, fontWeight: 'bold', color: 'white' }} >Enviar pedido</Text>
      </TouchableOpacity>
      <Text></Text>

    </View>
  );
}

export default DetallePedidoScreen;