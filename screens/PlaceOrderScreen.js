import React, { useState, useEffect } from 'react'
import { StyleSheet, Text, View, FlatList } from 'react-native'
import { Avatar, Button, Card, ListItem } from 'react-native-elements'
import { baseUrl } from '../shared/baseUrl'
import { useDispatch, useSelector } from 'react-redux'
// import { requestBillingAgreement } from 'react-native-paypal';
import { createOrder } from '../redux/actions/orderActions'


const PlaceOrderScreen = (props) => {
    const [token, setToken] = useState('')
    const dispatch = useDispatch()

    const cart = useSelector(state => state.cart)

    const addDecimals = (num) => {
        return (Math.round(num * 100) / 100).toFixed(2)
    }
    cart.itemsPrice = addDecimals(cart.cartItems.reduce((acc, item) => acc + item.price * item.qty, 0))

    cart.shippingPrice = addDecimals(cart.itemsPrice > 100 ? 0 : 100)
    cart.taxPrice = addDecimals(Number((0.15 * cart.itemsPrice).toFixed(2)))

    cart.totalPrice = (Number(cart.itemsPrice) + Number(cart.shippingPrice) + Number(cart.taxPrice)).toFixed(2)

    const orderCreate = useSelector(state => state.orderCreate)
    const { order, success, error } = orderCreate

    useEffect(() => {

    }, [order, success]);

    const placeOrder = () => {
        dispatch(createOrder({
            orderItems: cart.cartItems,
            shippingAddress: cart.shippingAddress,
            paymentMethod: cart.paymentMethod,
            itemsPrice: cart.itemsPrice,
            shippingPrice: cart.shippingPrice,
            taxPrice: cart.taxPrice,
            totalPrice: cart.totalPrice



        }))

    }

    if (success) {
        return props.navigation.navigate('Order', { orderId: order._id })
    }
    else {
        return (



            <View style={{ marginBottom: 10 }}>
                <FlatList
                    data={cart.cartItems}
                    ListHeaderComponent={
                        <>
                            <Card containerStyle={{ borderRadius: 30 }}>
                                <Card.Title style={{ fontSize: 18 }} >Shipping</Card.Title>

                                <Card.Divider />

                                <View style={styles.cartItems}>
                                    <ListItem  >
                                        <Text style={{ fontSize: 18 }}>Address </Text>
                                    </ListItem>
                                    <View style={{ flex: 1, marginLeft: 20 }}>
                                        <ListItem  >
                                            <Text style={{ fontWeight: 'bold', fontSize: 16 }}>{cart.shippingAddress.address},{cart.shippingAddress.city},{cart.shippingAddress.country},{cart.shippingAddress.postalCode}</Text>
                                        </ListItem>

                                    </View>
                                </View>
                            </Card>
                            <Card containerStyle={{ borderRadius: 30 }}>
                                <Card.Title style={{ fontSize: 18 }}>Payment</Card.Title>
                                <Card.Divider />
                                <View style={styles.cartItems}>
                                    <ListItem  >
                                        <Text style={{ fontSize: 18 }}>Method </Text>
                                    </ListItem>
                                    <View >
                                        <ListItem  >
                                            <Text style={{ fontWeight: 'bold', fontSize: 18 }}>{cart.paymentMethod}</Text>
                                        </ListItem>

                                    </View>
                                </View>

                            </Card>
                            <Card containerStyle={{ borderRadius: 30 }}>
                                <Card.Title style={{ fontSize: 18 }} >Order </Card.Title>

                            </Card>
                        </>
                    }
                    keyExtractor={(item, index) => item + index}
                    renderItem={({ item }) => (
                        <Card containerStyle={{ borderRadius: 30 }}>
                            <View style={{ padding: 10 }}>
                                <View style={styles.cartItems}>
                                    <Avatar avatarStyle={{ borderRadius: 10 }} size='large' source={{ uri: baseUrl + `/api/image/${item.image}` }} />
                                    <View style={{ flex: 1, marginLeft: 15 }}>
                                        <Text style={{ fontSize: 18, fontWeight: 'bold' }}>{item.name}</Text>
                                    </View>
                                </View>
                                <View style={{ marginVertical: 20 }}>
                                    <Text style={{ fontSize: 17 }}>${item.price} x {item.qty} = ${item.price * item.qty}</Text>
                                </View>
                            </View>
                        </Card>

                    )}

                    ListFooterComponent={
                        <>
                            <Card containerStyle={{ borderRadius: 30 }}>
                                <Card.Title style={{ fontSize: 18 }} >Order Summary </Card.Title>
                                <Card.Divider />
                                <View style={styles.cartItems}>
                                    <ListItem  >
                                        <Text style={{ fontSize: 18 }}>Products </Text>
                                    </ListItem>
                                    <View >
                                        <ListItem  >
                                            <Text style={{ fontWeight: 'bold', fontSize: 18 }}>{cart.cartItems.length}</Text>
                                        </ListItem>

                                    </View>
                                </View>
                                <Card.Divider />
                                <View style={styles.cartItems}>
                                    <ListItem  >
                                        <Text style={{ fontSize: 18 }}>Item Price </Text>
                                    </ListItem>
                                    <View >
                                        <ListItem  >
                                            <Text style={{ fontWeight: 'bold', fontSize: 18 }}>{cart.itemsPrice}</Text>
                                        </ListItem>

                                    </View>
                                </View>
                                <Card.Divider />
                                <View style={styles.cartItems}>
                                    <ListItem  >
                                        <Text style={{ fontSize: 18 }}>Shipping Price </Text>
                                    </ListItem>
                                    <View >
                                        <ListItem  >
                                            <Text style={{ fontWeight: 'bold', fontSize: 18 }}>{cart.shippingPrice}</Text>
                                        </ListItem>

                                    </View>
                                </View>
                                <Card.Divider />
                                <View style={styles.cartItems}>
                                    <ListItem  >
                                        <Text style={{ fontSize: 18 }}>tax Price </Text>
                                    </ListItem>
                                    <View >
                                        <ListItem  >
                                            <Text style={{ fontWeight: 'bold', fontSize: 18 }}>{cart.taxPrice}</Text>
                                        </ListItem>

                                    </View>
                                </View>
                                <Card.Divider />
                                <View style={styles.cartItems}>
                                    <ListItem  >
                                        <Text style={{ fontSize: 18 }}>Total Price </Text>
                                    </ListItem>
                                    <View >
                                        <ListItem  >
                                            <Text style={{ fontWeight: 'bold', fontSize: 18 }}>{cart.totalPrice}</Text>
                                        </ListItem>

                                    </View>
                                </View>
                            </Card>
                            <Button titleStyle={{ fontSize: 18 }} onPress={placeOrder} containerStyle={{ margin: 10 }} buttonStyle={{ borderRadius: 30, height: 50, backgroundColor: 'black' }} title="Place Order" />
                        </>
                    }

                />

            </View>





        )
    }
}

export default PlaceOrderScreen

const styles = StyleSheet.create({
    cartItems: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',


    }
})
