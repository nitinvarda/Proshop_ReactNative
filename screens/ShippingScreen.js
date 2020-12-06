import React, { useState, useEffect } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { Input, Button } from 'react-native-elements'
import { useDispatch, useSelector } from 'react-redux'
import { Loading } from '../components/LoadingComponent'
import { saveShippingAddress } from '../redux/actions/cartActions'
import * as SecureStore from 'expo-secure-store'

const ShippingScreen = (props) => {
    const [address, setAddress] = useState('')
    const [city, setCity] = useState('')
    const [postalCode, setPostalCode] = useState('')
    const [country, setCountry] = useState('')
    const dispatch = useDispatch()

    const userLogin = useSelector(state => state.userLogin)
    const { loading, error, isAuthenticated } = userLogin

    const cart = useSelector(state => state.cart)
    const { shippingAddress } = cart


    useEffect(() => {

    }, [shippingAddress])

    const next = () => {
        dispatch(saveShippingAddress({ address, city, postalCode, country }))

    }

    const savedAddress = async () => {
        const saved = await SecureStore.getItemAsync('shippingAddress')
        const add = JSON.parse(saved)

        if (add) {
            setAddress(add.address)
            setCountry(add.country)
            setPostalCode(add.postalCode)
            setCity(add.city)
        }

    }
    if (Object.keys(shippingAddress).length >= 1) {
        return props.navigation.navigate('Payment')
    }
    else {
        if (!isAuthenticated) {
            return props.navigation.navigate('Login')
        }
        else {
            return (
                <View>
                    <Text style={{ fontSize: 18, textAlign: 'center' }}>Add Address</Text>
                    <Button onPress={savedAddress} title='Get Saved Address' />
                    <View>

                        <Input label="Address" value={address} onChangeText={(address) => setAddress(address)} />
                        <Input label="City" value={city} onChangeText={(city) => setCity(city)} />
                        <Input label="Postal Code" value={postalCode} onChangeText={(postalCode) => setPostalCode(postalCode)} />
                        <Input label="Country" value={country} onChangeText={(country) => setCountry(country)} />
                    </View>
                    <Button onPress={next} containerStyle={{ marginHorizontal: 10, borderRadius: 10, height: 50 }} buttonStyle={{ backgroundColor: '#282c34' }} title="Continue" />
                </View>
            )
        }
    }
}

export default ShippingScreen

const styles = StyleSheet.create({})
