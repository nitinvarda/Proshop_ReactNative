import React, { useState, useEffect } from 'react'
import { StyleSheet, Text, View, ScrollView, FlatList } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import { Card, ListItem, Button, Icon, Avatar } from 'react-native-elements'
import { Loading } from '../components/LoadingComponent'
import { baseUrl } from '../shared/baseUrl'
import { getOrderDetails } from '../redux/actions/orderActions'
import PayPal from 'rn-expo-paypal-integration'

const OrderScreen = (props) => {
    const dispatch = useDispatch()
    const orderId = props.navigation.getParam('orderId')


    const orderDetails = useSelector(state => state.orderDetails);
    const { order, loading, error } = orderDetails

    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin
    useEffect(() => {
        if (!order || order._id != orderId) {
            dispatch(getOrderDetails(orderId))

        }

    }, [orderId, order])

    const paypalPayment = () => {
        <PayPal
            amount={20}//i.e $20 
            // orderID={<orderId(string)>} //transactionID
            ProductionClientID='AedamoQmxzpF3M8MzsBPwu3Cpdg6aMQv9UiIAYaNflVVO153a1WTmBzH4AlWwcivD3DUn4HbWNUPxB9l'
            success={(a) => {
                //callback after payment has been successfully compleated
                console.log(a)
            }}
            failed={(a) => {
                //callback if payment is failed
                console.log(a)
            }}
        />

    }
    if (loading) {
        return <Loading />
    }
    else {
        return (
            <View style={styles.container} >


                <FlatList
                    ListHeaderComponent={
                        <>

                            <Card containerStyle={{ borderRadius: 20 }}>
                                <Card.Title style={{ fontSize: 18 }}  >Shipping</Card.Title>

                                <Card.Divider />

                                <View style={styles.cartItems}>
                                    <ListItem  >
                                        <Text>Address </Text>
                                    </ListItem>
                                    <View style={{ flex: 1, marginLeft: 20 }}>
                                        <ListItem  >
                                            <Text style={{ fontWeight: 'bold' }}>{order.shippingAddress.address}</Text>
                                        </ListItem>

                                    </View>
                                </View>
                                <Card.Divider />
                                <View style={styles.cartItems}>
                                    <ListItem >

                                        <Text>City</Text>
                                    </ListItem>
                                    <View >
                                        <ListItem >
                                            <Text style={{ fontWeight: 'bold' }}>{order.shippingAddress.city}</Text>
                                        </ListItem>

                                    </View>
                                </View>

                                <Card.Divider />
                                <View style={styles.cartItems}>
                                    <ListItem >
                                        <Text>Country</Text>

                                    </ListItem>
                                    <View >
                                        <ListItem >
                                            <Text style={{ fontWeight: 'bold' }}>{order.shippingAddress.country}</Text>

                                        </ListItem>

                                    </View>
                                </View>
                                <Card.Divider />
                                <View style={styles.cartItems}>
                                    <ListItem >

                                        <Text>Postal Code</Text>
                                    </ListItem>
                                    <View >
                                        <ListItem >

                                            <Text style={{ fontWeight: 'bold' }}>{order.shippingAddress.postalCode}</Text>
                                        </ListItem>

                                    </View>
                                </View>

                                <Card.Divider />
                                <View style={styles.cartItems}>

                                    <ListItem >
                                        <Text >Delivered </Text>
                                    </ListItem>
                                    <View >

                                        <ListItem >
                                            <Text >{order.isDelivered ? <Icon name='check' type='font-awesome' /> : <Icon iconStyle={{ marginTop: 5 }} name='times' type='font-awesome' />}</Text>
                                        </ListItem>

                                    </View>
                                </View>





                            </Card>

                            <Card containerStyle={{ borderRadius: 20 }}>
                                <Card.Title style={{ fontSize: 18 }}>Payment</Card.Title>
                                <Card.Divider />
                                <View style={styles.cartItems}>

                                    <ListItem >
                                        <Text >Method </Text>
                                    </ListItem>
                                    <View >

                                        <ListItem >
                                            <Text style={{ fontWeight: 'bold' }} >{order.paymentMethod}</Text>
                                        </ListItem>

                                    </View>
                                </View>
                                <Card.Divider />
                                <View style={styles.cartItems}>

                                    <ListItem >
                                        <Text >Paid </Text>
                                    </ListItem>
                                    <View >

                                        <ListItem >
                                            <Text >{order.isPaid ? <Icon name='check' type='font-awesome' /> : <Icon name='times' type='font-awesome' />}</Text>
                                        </ListItem>

                                    </View>
                                </View>

                                {order.isPaid && (
                                    <>
                                        <Card.Divider />
                                        <View style={styles.cartItems}>

                                            <ListItem >
                                                <Text >Paid On </Text>
                                            </ListItem>
                                            <View >

                                                <ListItem >
                                                    <Text >{order.isPaid && order.paidAt.substring(0, 10)}</Text>
                                                </ListItem>

                                            </View>
                                        </View>
                                    </>
                                )}






                            </Card>
                            <Card containerStyle={{ borderRadius: 20 }}>
                                <Card.Title style={{ fontSize: 18 }}>Ordered items</Card.Title>

                            </Card>
                        </>
                    } data={order.orderItems} keyExtractor={item => item._id}
                    renderItem={({ item }) => {
                        return (
                            <Card containerStyle={{ borderRadius: 20 }}>
                                <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 5, padding: 10 }}>
                                    <Avatar avatarStyle={{ borderRadius: 10 }} source={{ uri: baseUrl + `/api/image/${item.image}` }} size='large' />

                                    <View style={{ flex: 1, marginLeft: 10 }}>

                                        <Text style={{ fontSize: 16, marginLeft: 20, fontWeight: 'bold' }}>{item.name}</Text>
                                    </View>
                                </View>

                                <View style={styles.cartItems}>
                                    <ListItem >
                                        <Text style={{ fontWeight: 'bold' }}>Qty :{item.qty}</Text>

                                    </ListItem>
                                    <ListItem>

                                        <Text style={{ fontWeight: 'bold' }}>Price: {item.price}</Text>
                                    </ListItem>
                                </View>

                            </Card>

                        )
                    }}

                    ListFooterComponent={
                        <>
                            <Card containerStyle={{ borderRadius: 20 }}>
                                <Card.Title style={{ fontSize: 18 }}>Order Summary</Card.Title>
                                <Card.Divider />
                                <View style={styles.cartItems}>
                                    <ListItem >
                                        <Text>Items</Text>
                                    </ListItem>
                                    <ListItem >
                                        <Text style={{ fontWeight: 'bold' }}>{order.orderItems.reduce((acc, item) => item.qty + acc, 0)}</Text>
                                    </ListItem>
                                </View>
                                <Card.Divider />
                                <View style={styles.cartItems}>
                                    <ListItem >
                                        <Text>Items Price </Text>
                                    </ListItem>
                                    <ListItem >
                                        <Text style={{ fontWeight: 'bold' }}>{order.orderItems.reduce((acc, item) => item.price + acc, 0)}</Text>
                                    </ListItem>
                                </View>
                                <Card.Divider />
                                <View style={styles.cartItems}>
                                    <ListItem >
                                        <Text>Shipping Price</Text>
                                    </ListItem>
                                    <ListItem >
                                        <Text style={{ fontWeight: 'bold' }}>{order.shippingPrice}</Text>
                                    </ListItem>
                                </View>
                                <Card.Divider />
                                <View style={styles.cartItems}>
                                    <ListItem >
                                        <Text>Tax Price</Text>
                                    </ListItem>
                                    <ListItem >
                                        <Text style={{ fontWeight: 'bold' }}>{order.taxPrice}</Text>
                                    </ListItem>
                                </View>
                                <Card.Divider />
                                <View style={styles.cartItems}>

                                    <ListItem >
                                        <Text>Total Price</Text>
                                    </ListItem>

                                    <ListItem >
                                        <Text style={{ fontWeight: 'bold' }}>{order.totalPrice}</Text>
                                    </ListItem>
                                </View>
                            </Card>
                            {!order.isPaid && (
                                <Button onPress={paypalPayment} containerStyle={{ margin: 10 }} buttonStyle={{ borderRadius: 30, backgroundColor: '#282c34', height: 50 }} titleStyle={{ fontSize: 18 }} title='Pay' />
                            )}
                        </>
                    }
                />

            </View>
        )
    }
}

export default OrderScreen

const styles = StyleSheet.create({
    container: {
        marginBottom: 10,

    },
    cartItems: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',


    }
})
