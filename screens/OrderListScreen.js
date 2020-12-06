import React from 'react'
import { StyleSheet, Text, View, FlatList } from 'react-native'
import { Card, ListItem, Button, Icon, Avatar } from 'react-native-elements'
import { useSelector } from 'react-redux'
import { baseUrl } from '../shared/baseUrl'

const OrderListScreen = (props) => {


    const userLogin = useSelector(state => state.userLogin)
    const { userInfo, isLoading, error: loginError, isAuthenticated } = userLogin

    const orderListMy = useSelector(state => state.orderListMy)
    const { loading: loadingOrders, error: errorOrders, orders } = orderListMy
    if (isAuthenticated) {
        if (orders.length >= 1) {

            return (
                <View style={styles.container}>


                    <FlatList
                        ListHeaderComponent={
                            <>


                                <Card containerStyle={{ borderRadius: 20, height: 55 }}>
                                    <Card.Title style={{ fontSize: 18 }}>Orders</Card.Title>

                                </Card>
                            </>
                        }
                        data={orders}
                        keyExtractor={item => item._id}
                        renderItem={({ item }) => {
                            return (
                                <Card containerStyle={{ borderRadius: 20 }} >
                                    <View style={{ flexDirection: 'row', justifyContent: 'flex-start', marginBottom: 5, padding: 10 }}>
                                        <View style={{ flex: 1 }}>
                                            <FlatList
                                                data={item.orderItems}
                                                keyExtractor={item => item._id}
                                                renderItem={({ item }) => {
                                                    return (
                                                        <>

                                                            <Avatar avatarStyle={{ borderRadius: 10 }} source={{ uri: baseUrl + `/api/image/${item.image}` }} size='large' />
                                                            <Text style={{ fontSize: 16, marginVertical: 10 }}>{item.name}</Text>

                                                        </>
                                                    )
                                                }}
                                            />
                                        </View>
                                        <View style={{ alignItems: 'flex-end', justifyContent: 'flex-start' }}>
                                            <Text style={{ marginLeft: 5, fontSize: 16 }}>Delivered :{item.isDelivered ? <Icon name='check' type='font-awesome' /> : <Icon name='times' type='font-awesome' />}</Text>
                                            <Text style={{ marginLeft: 5, fontSize: 16 }}>Paid :{item.isPaid ? <Icon name='check' type='font-awesome' /> : <Icon name='times' type='font-awesome' />}</Text>
                                        </View>
                                    </View>

                                    <Card.Divider />




                                    <ListItem>
                                        {/* <ListItem.Title> */}
                                        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>


                                            {/* <Text>{item.paidAt.substring(0, 10)}</Text> */}
                                            <Text style={{ flex: 1 }}>Amount : {item.totalPrice}</Text>
                                            <Text>Method :{item.paymentMethod}</Text>
                                        </View>

                                        {/* </ListItem.Title> */}

                                    </ListItem>

                                    <Button
                                        onPress={() => props.navigation.navigate('Order', { orderId: item._id })}
                                        title='Details'
                                        buttonStyle={{ backgroundColor: '#282c34', borderRadius: 40, height: 50 }}
                                    />




                                </Card>
                            )
                        }}
                    />



                </View>
            )
        }
        else {
            return (
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                    <Text style={{ fontSize: 18 }}>No Orders yet</Text>
                </View>
            )
        }
    }
}

export default OrderListScreen

const styles = StyleSheet.create({
    container: {
        margin: 5,
        paddingBottom: 10

    },
    cartItems: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',


    }
})
