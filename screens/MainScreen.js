import { StatusBar } from 'expo-status-bar';
import React, { useEffect } from 'react';
import { StyleSheet, Text, View, ScrollView, SafeAreaView } from 'react-native';
import { createStackNavigator } from 'react-navigation-stack'
import { createDrawerNavigator, DrawerItems } from 'react-navigation-drawer'
import { createAppContainer, createSwitchNavigator } from 'react-navigation'
import HomeScreen from './HomeScreen'
import ProductScreen from './ProductScreen'
import CartScreen from './CartScreen'
import LoginScreen from './LoginScreen'
import ProfileScreen from './ProfileScreen'
import ShippingScreen from './ShippingScreen'
import PaymentScreen from './PaymentScreen'
import PlaceOrderScreen from './PlaceOrderScreen'
import OrderScreen from './OrderScreen'
import OrderListScreen from './OrderListScreen'
import AllUsersScreen from './AllUsersScreen'
import AllProductsScreen from './AllProductsScreen'
import AllOrdersScreen from './AllOrdersScreen'
import { Icon, Badge } from 'react-native-elements'
import * as SecureStore from 'expo-secure-store'
import { useSelector, useDispatch, connect } from 'react-redux'
import { login } from '../redux/actions/userActions'
import { FETCH_CART_ITEMS } from '../redux/constants/cartConstants';
import { USER_LOGIN_SUCCESS } from '../redux/constants/userConstans';




const HomeNavigator = createStackNavigator({
    Home: {
        screen: HomeScreen,
        navigationOptions: ({ navigation, screenProps }) => ({

            headerLeft: () => <Icon iconStyle={{ marginLeft: 15, marginTop: 0 }} name='menu' size={28}
                color='black'
                onPress={() => navigation.toggleDrawer()}
            />,

            headerRight: () => (


                <View>
                    <Icon onPress={() => navigation.navigate('Cart')} name='shopping-cart' type='font-awesome' iconStyle={{ marginRight: 15 }} size={28} color='black' />
                    {screenProps.cartItems.length >= 1 ? (
                        <Badge
                            value={screenProps.cartItems.length}
                            status="error"
                            containerStyle={{ position: 'absolute', top: -4, right: 4 }}
                        />
                    ) : (null)}

                </View>
            )

        })
    },
    Product: {
        screen: ProductScreen,
        navigationOptions: ({ navigation, screenProps }) => ({
            headerLeft: () => <Icon iconStyle={{ marginLeft: 15, marginTop: 0 }} name='menu' size={28}
                color='black'
                onPress={() => navigation.toggleDrawer()}
            />,
            headerRight: () => (
                <View>
                    <Icon onPress={() => navigation.navigate('Cart')} name='shopping-cart' type='font-awesome' iconStyle={{ marginRight: 15 }} size={28} color='black' />

                    {screenProps.cartItems.length >= 1 ? (
                        <Badge
                            value={screenProps.cartItems.length}
                            status="error"
                            containerStyle={{ position: 'absolute', top: -4, right: 4 }}
                        />
                    ) : (null)}
                </View>)
        })
    },
    Cart: {
        screen: CartScreen,
        navigationOptions: ({ navigation }) => ({

            headerLeft: () => <Icon iconStyle={{ marginLeft: 15, marginTop: 0 }} name='menu' size={28}
                color='black'
                onPress={() => navigation.toggleDrawer()}
            />
        })
    },
    Shipping: {
        screen: ShippingScreen,
        navigationOptions: ({ navigation }) => ({

            headerLeft: () => <Icon iconStyle={{ marginLeft: 15, marginTop: 0 }} name='menu' size={28}
                color='black'
                onPress={() => navigation.toggleDrawer()}
            />
        })

    },
    Payment: {
        screen: PaymentScreen,
        navigationOptions: ({ navigation }) => ({

            headerLeft: () => <Icon iconStyle={{ marginLeft: 15, marginTop: 0 }} name='menu' size={28}
                color='black'
                onPress={() => navigation.toggleDrawer()}
            />
        })

    },
    PlaceOrder: {
        screen: PlaceOrderScreen,
        navigationOptions: ({ navigation }) => ({

            headerLeft: () => <Icon iconStyle={{ marginLeft: 15, marginTop: 0 }} name='menu' size={28}
                color='black'
                onPress={() => navigation.toggleDrawer()}
            />
        })
    }

},
    {
        initialRouteName: 'Home',
        navigationOptions: {
            headerStyle: {
                backgorundColor: '#512DA8'
            },
            headerTintColor: '#000',
            headerTitleStyle: {
                color: '#000'
            }
        }
    }
)








const LoginNavigator = createStackNavigator({
    Login: {
        screen: LoginScreen,
        navigationOptions: ({ navigation }) => ({
            headerLeft: () => <Icon iconStyle={{ marginLeft: 15, marginTop: 0 }} name='menu' size={28}
                color='black'
                onPress={() => navigation.toggleDrawer()}
            />,


        })
    }
},
    {
        initialRouteName: 'Login',
        navigationOptions: {
            headerStyle: {
                backgorundColor: '#512DA8'
            },
            headerTintColor: '#000',
            headerTitleStyle: {
                color: '#000'
            }
        }
    }
)




const ProfileNavigator = createStackNavigator({
    Profile: {
        screen: ProfileScreen,
        navigationOptions: ({ navigation, screenProps }) => ({
            headerLeft: () => <Icon iconStyle={{ marginLeft: 15, marginTop: 0 }} name='menu' size={28}
                color='black'
                onPress={() => navigation.toggleDrawer()}
            />,
            headerRight: () => (
                <View>
                    <Icon onPress={() => navigation.navigate('Cart')} name='shopping-cart' type='font-awesome' iconStyle={{ marginRight: 15 }} size={28} color='black' />

                    {screenProps.cartItems.length >= 1 ? (
                        <Badge
                            value={screenProps.cartItems.length}
                            status="error"
                            containerStyle={{ position: 'absolute', top: -4, right: 4 }}
                        />
                    ) : (null)}
                </View>)

        })
    },
    Order: {
        screen: OrderScreen,
        navigationOptions: ({ navigation, screenProps }) => ({
            headerLeft: () => <Icon iconStyle={{ marginLeft: 15, marginTop: 0 }} name='menu' size={28}
                color='black'
                onPress={() => navigation.toggleDrawer()}
            />,
            // headerRight: () => (
            //     <View>
            //         <Icon onPress={() => navigation.navigate('Cart')} name='shopping-cart' type='font-awesome' iconStyle={{ marginRight: 15 }} size={28} color='black' />

            //         {screenProps.cartItems.length >= 1 ? (
            //             <Badge
            //                 value={screenProps.cartItems.length}
            //                 status="error"
            //                 containerStyle={{ position: 'absolute', top: -4, right: 4 }}
            //             />
            //         ) : (null)}
            //     </View>)

        })
    },
    OrderList: {
        screen: OrderListScreen,
        navigationOptions: ({ navigation, screenProps }) => ({
            headerLeft: () => <Icon iconStyle={{ marginLeft: 15, marginTop: 0 }} name='menu' size={28}
                color='black'
                onPress={() => navigation.toggleDrawer()}
            />,
            // headerRight: () => (
            //     <View>
            //         <Icon onPress={() => navigation.navigate('Cart')} name='shopping-cart' type='font-awesome' iconStyle={{ marginRight: 15 }} size={28} color='black' />

            //         {screenProps.cartItems.length >= 1 ? (
            //             <Badge
            //                 value={screenProps.cartItems.length}
            //                 status="error"
            //                 containerStyle={{ position: 'absolute', top: -4, right: 4 }}
            //             />
            //         ) : (null)}
            //     </View>)

        })
    },
    Users: {
        screen: AllUsersScreen,
        navigationOptions: ({ navigation }) => ({

            headerLeft: () => <Icon iconStyle={{ marginLeft: 15, marginTop: 0 }} name='menu' size={28}
                color='black'
                onPress={() => navigation.toggleDrawer()}
            />
        })
    },
    Products: {
        screen: AllProductsScreen,
        navigationOptions: ({ navigation }) => ({

            headerLeft: () => <Icon iconStyle={{ marginLeft: 15, marginTop: 0 }} name='menu' size={28}
                color='black'
                onPress={() => navigation.toggleDrawer()}
            />
        })

    },
    Orders: {
        screen: AllOrdersScreen,
        navigationOptions: ({ navigation }) => ({

            headerLeft: () => <Icon iconStyle={{ marginLeft: 15, marginTop: 0 }} name='menu' size={28}
                color='black'
                onPress={() => navigation.toggleDrawer()}
            />
        })
    }
},
    {
        initialRouteName: 'Profile',
        navigationOptions: {
            headerStyle: {
                backgorundColor: '#512DA8'
            },
            headerTintColor: '#000',
            headerTitleStyle: {
                color: '#000'
            }
        }
    }
)


const LoginSwitch = createSwitchNavigator({
    login: LoginNavigator,
    profile: ProfileNavigator,

})


const CustomDrawerContentComponent = (props) => {
    return (
        <ScrollView>
            <SafeAreaView style={styles.container}
                forceInset={{ top: 'always', horizontal: 'never' }}>
                <View style={styles.drawerHeader}>
                    {/* <View style={{ flex: 1 }}>
                        <Text>ProShop</Text>
                    </View> */}
                    <View style={{ flex: 1 }}>
                        <Text style={styles.drawerHeaderText}>ProShop</Text>
                    </View>



                </View>
                <DrawerItems {...props} />

            </SafeAreaView>
        </ScrollView>
    )
}


const mapStateToProps = (state) => ({
    isAuthenticated: state.userLogin,
    cartItems: state.cart.cartItems
})



const HomeDrawer = createDrawerNavigator({
    Home: {

        screen: HomeNavigator,
        navigationOptions: (props) => ({
            title: 'Home',
            drawerLabel: 'Home',
            drawerIcon: ({ tintColor }) => (
                <Icon
                    name="home"
                    type='font-awesome'
                    size={24}
                    color={tintColor}
                />
            )
        })
    },
    LoginSwitch: {
        screen: LoginSwitch,
        navigationOptions: ({ screenProps }) => ({
            title: screenProps.isAuthenticated ? 'profile' : 'login',
            drawerHeader: screenProps.isAuthenticated ? 'profile' : 'login',
            drawerIcon: ({ tintColor }) => (
                <Icon
                    name={screenProps.isAuthenticated ? 'user' : 'sign-in'}
                    type='font-awesome'
                    size={24}
                    color={tintColor}
                />
            )
        })

    },









}, {
    initialRouteName: 'Home',
    // drawerBackgroundColor: '#D1C4E9',
    contentComponent: CustomDrawerContentComponent

})
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        // alignItems: 'center',
        // justifyContent: 'center',
    },
    drawerHeader: {
        backgroundColor: '#512DA8',
        height: 140,
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1,
        flexDirection: 'row'

    },
    drawerHeaderText: {
        color: 'white',
        fontSize: 20,
        fontWeight: 'bold',
        textAlign: 'center'
    },
    drawerImage: {
        margin: 10,
        width: 80,
        height: 60
    }
});
// HomeDrawer.router = (props) => ({
//     ...HomeNavigator.router,
//     getStateForAction: (action, lastState) => {
//         // check for custom actions and return a different navigation state.
//         return HomeNavigator.router.getStateForAction(action, lastState);
//     },
// });

const Actual = createAppContainer(HomeDrawer)


const Main = () => {
    const dispatch = useDispatch()
    const userLogin = useSelector(state => state.userLogin)
    const { isAuthenticated, userInfo } = userLogin

    const cart = useSelector(state => state.cart)
    const { loading, error, cartItems } = cart

    useEffect(() => {
        if (!isAuthenticated) {

            SecureStore.getItemAsync('user').then(user => {
                let details = JSON.parse(user)

                if (details) {
                    dispatch({ type: USER_LOGIN_SUCCESS, payload: details })
                }
            })
        }
        SecureStore.getItemAsync('cartItems').then(items => {
            let cart = JSON.parse(items)

            if (cart) {
                dispatch({ type: FETCH_CART_ITEMS, payload: cart })
            }
        })

    }, [isAuthenticated])
    return <Actual screenProps={{ isAuthenticated: isAuthenticated, cartItems: cartItems }} />


}
export default Main

