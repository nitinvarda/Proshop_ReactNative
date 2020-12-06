import React, { useEffect, useState } from 'react'
import { StyleSheet, Text, View, FlatList, ScrollView, SectionList, SafeAreaView } from 'react-native'
import { Avatar, Button, Card, Icon, ListItem } from 'react-native-elements'
import { useDispatch, useSelector } from 'react-redux'
import { logout } from '../redux/actions/userActions'
import { getUserDetails } from '../redux/actions/userActions'
import { listMyOrders } from '../redux/actions/orderActions'
import { Table, TableWrapper, Row, Cell } from 'react-native-table-component';
import { baseUrl } from '../shared/baseUrl'

const ProfileScreen = (props) => {
    const dispatch = useDispatch()
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')

    const userDetails = useSelector(state => state.userDetails)
    const { loading, error, user } = userDetails

    const userLogin = useSelector(state => state.userLogin)
    const { userInfo, isLoading, error: loginError, isAuthenticated } = userLogin



    useEffect(() => {
        if (isAuthenticated) {
            if (!user.name) {
                dispatch(getUserDetails('profile'))
                dispatch(listMyOrders())
            }
            else {
                setName(user.name)
                setEmail(user.email)

            }
        }
    }, [isAuthenticated])


    const logoutUser = () => {
        dispatch(logout())
    }
    if (isAuthenticated) {
        return (
            <View style={styles.container}>
                <Card containerStyle={{ borderRadius: 20 }}>
                    <Card.Title style={{ fontSize: 18 }}>User</Card.Title>
                    <Card.Divider />
                    <View style={styles.cartItems}>
                        <ListItem  >
                            <Text style={{ fontSize: 16 }} >Username</Text>
                        </ListItem>
                        <View >
                            <ListItem  >
                                <Text style={{ fontWeight: 'bold', fontSize: 16 }}>{userInfo.name}</Text>
                            </ListItem>

                        </View>
                    </View>
                    <View style={styles.cartItems}>
                        <ListItem  >
                            <Text style={{ fontSize: 16 }} >Email</Text>
                        </ListItem>
                        <View >
                            <ListItem  >
                                <Text style={{ fontWeight: 'bold', fontSize: 16 }}>{userInfo.email}</Text>
                            </ListItem>

                        </View>
                    </View>
                    <Card.Divider />
                    <Button
                        onPress={() => props.navigation.navigate('OrderList')}
                        containerStyle={{ marginBottom: 10 }}
                        titleStyle={{ fontSize: 18 }}
                        buttonStyle={{ backgroundColor: '#282c34', borderRadius: 40, height: 50 }}
                        title='Orders'
                    />
                    <Button
                        containerStyle={{ marginBottom: 10 }}
                        titleStyle={{ fontSize: 18 }}
                        buttonStyle={{ backgroundColor: '#282c34', borderRadius: 40, height: 50 }}
                        title='Saved Address'
                    />
                    <Button
                        containerStyle={{ marginBottom: 10 }}
                        titleStyle={{ fontSize: 18 }}
                        buttonStyle={{ backgroundColor: '#282c34', borderRadius: 40, height: 50 }}
                        onPress={logoutUser} title='Logout'
                    />
                </Card>
                {userInfo.isAdmin &&
                    (<Card>
                        <Button
                            onPress={() => props.navigation.navigate('Users')}
                            containerStyle={{ marginBottom: 10 }}
                            titleStyle={{ fontSize: 18 }}
                            buttonStyle={{ backgroundColor: '#282c34', borderRadius: 40, height: 50 }}
                            title='All Users'
                        />
                        <Button
                            onPress={() => props.navigation.navigate('Products')}
                            containerStyle={{ marginBottom: 10 }}
                            titleStyle={{ fontSize: 18 }}
                            buttonStyle={{ backgroundColor: '#282c34', borderRadius: 40, height: 50 }}
                            title='All Products'
                        />
                        <Button
                            containerStyle={{ marginBottom: 10 }}
                            titleStyle={{ fontSize: 18 }}
                            buttonStyle={{ backgroundColor: '#282c34', borderRadius: 40, height: 50 }}
                            onPress={() => props.navigation.navigate('Orders')} title='All Orders'
                        />
                    </Card>)
                }



            </View >
        )
    }
    else {
        return props.navigation.navigate('Login')
    }
}

export default ProfileScreen

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
