import { useColorScheme } from 'nativewind';
import { View, Text, Image } from 'react-native';
import * as React from 'react';

export default function TarjetaProducto({
    id_producto,
    nombre,
    img,
    precio,
    categoria,
    existencia,
}) {
    const [count, setCount] = React.useState(1);
    const { colorScheme } = useColorScheme();
    return (
        <View className='w-full  rounded-3xl p-5 my-5'>
            <View>
                <Image 
                className='w-full'
                source={{ uri: img }} 
                style={{ resizeMode: 'contain', width: '100%', height: '100%'}}
                />
            </View>
            <Text>{img}</Text>
            <Text>{nombre}</Text>n
            <Text>{precio}</Text>
        </View>
    );
}