import React, { useEffect, useState } from 'react'
import { StyleSheet, Text, View, FlatList } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import { addToCart, updateCart, removeFromCart } from '../redux/actions/cartActions'
import { Image, Avatar, Icon, Button, ListItem } from 'react-native-elements'
import { baseUrl } from '../shared/baseUrl'
import { Picker } from '@react-native-picker/picker'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { Loading } from '../components/LoadingComponent'



const CartScreen = (props) => {



    const dispatch = useDispatch()
    const cart = useSelector(state => state.cart)
    const { cartItems } = cart



    useEffect(() => {

    }, [dispatch, cartItems])



    const renderCartItems = ({ item, index }) => {
        return (
            <View key={item.product}>
                <ListItem bottomDivider>
                    <View style={{ flex: 1 }}>
                        <View style={styles.item} >

                            <Avatar containerStyle={{ flex: 1 }} size="large" source={{ uri: baseUrl + `/api/image/${item.image}` }} />

                            <Text style={{ flex: 2, marginLeft: 20 }}>{item.name}</Text>



                            <Button containerStyle={{ flex: 1 }} onPress={() => dispatch(removeFromCart(item.product))} type='clear' icon={<Icon name='trash' type='font-awesome' color="black" />} />
                        </View>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                            <Text style={{ fontSize: 16 }}>${item.price} x {item.qty} = ${item.price * item.qty}</Text>
                            <View style={{ flexDirection: 'row', justifyContent: 'flex-end' }} >

                                {/* <Text style={{ flexDirection: 'row', alignContent: 'center', marginHorizontal: 10, marginTop: 10 }}>Qty</Text> */}
                                <View style={{ width: '50%', height: 50, borderWidth: 1, borderRadius: 10 }}>
                                    <Picker
                                        style={{ padding: 0 }}
                                        selectedValue={item.qty}
                                        onValueChange={(itemValue, itemIndex) => dispatch(addToCart(item.product, itemValue))}>
                                        {
                                            [...Array(item.countInStock).keys()].map(x => (
                                                <Picker.Item key={x + 1} label={`${x + 1}`} value={`${x + 1}`} />
                                            ))
                                        }

                                    </Picker>
                                </View>
                            </View>
                        </View>
                    </View>
                </ListItem>




            </View>
        )

    }

    if (cartItems.length === 0) {
        return (
            <View style={styles.emptyCart}>
                <Text style={{ fontSize: 20 }}>Cart is Empty. </Text>
                <Text style={{ fontSize: 20 }}>Add products to Shop </Text>
                <Button buttonStyle={{ borderRadius: 20, backgroundColor: 'black' }} onPress={() => props.navigation.navigate('Home')} title='Go to Home  ' iconRight icon={<Icon name='home' type='font-awesome' color='white' />} />
            </View>
        )
    }
    else {
        return (
            <View>

                <FlatList
                    data={cartItems}
                    keyExtractor={item => item.product}
                    renderItem={renderCartItems}
                    ListFooterComponent={
                        <>
                            <View style={{ marginHorizontal: 0 }}>
                                <ListItem bottomDivider >
                                    <ListItem.Title>Total Items</ListItem.Title>
                                    <ListItem.Content>
                                        <Text style={{ fontWeight: 'bold', fontSize: 18 }}>{cartItems.reduce((acc, item) => acc + Number(item.qty), 0)}</Text>
                                    </ListItem.Content>
                                </ListItem>
                                <ListItem bottomDivider >
                                    <ListItem.Title>Total Price</ListItem.Title>
                                    <ListItem.Content>
                                        <Text style={{ fontWeight: 'bold', fontSize: 18 }}>$ {cartItems.reduce((acc, item) => acc + item.qty * item.price, 0).toFixed(2)}</Text>
                                    </ListItem.Content>
                                </ListItem>
                                <Button onPress={() => props.navigation.navigate('Shipping')} buttonStyle={{ backgroundColor: '#282c34', borderRadius: 20, height: 50, marginHorizontal: 10, height: 50 }} title="Proceed To Checkout" />
                            </View>

                        </>
                    }
                />
            </View>
        )
    }

}

export default CartScreen

const styles = StyleSheet.create({
    item: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',

    },
    emptyCart: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center'
    }
})
