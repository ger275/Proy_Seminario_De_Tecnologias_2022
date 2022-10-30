import * as React from 'react';
import { FlatList, Text } from 'react-native';

export default function ListaProductos() {

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

    return <FlatList data={data} keyExtractor={({ id_producto }, index) => id_producto}
        renderItem={({ item }) => <Text>{item.id_producto}</Text>}
    />
}