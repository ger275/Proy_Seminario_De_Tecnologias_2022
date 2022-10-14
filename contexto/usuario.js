import React, { useEffect, createContext, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const UserContext = createContext();

const UserProvider = ({children}) => {
    const [me, setMe] = useState(undefined);

    useEffect(() => {
        const validStorage = async () => {
            try {
                const miSesion = await AsyncStorage.getItem('sesion');
                setMe(JSON.parse(miSesion));
            } catch (error) {
                console.log('Error: ${error.message}')
            }
        }

        validStorage();
    }, []);

    return(
        <UserContext.Provider value={{me, setMe}}>
            {children}
        </UserContext.Provider>
    );
};

export default UserProvider;