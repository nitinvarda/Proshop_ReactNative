import React, { useEffect, useState } from 'react'
import { StyleSheet, Alert, Text, View, ScrollView, ToastAndroid, Image, ActivityIndicator } from 'react-native'
import { Icon, Input, CheckBox, Button, Avatar } from 'react-native-elements'
import { createBottomTabNavigator } from 'react-navigation-tabs'
import * as SecureStore from 'expo-secure-store'

import { baseUrl } from '../shared/baseUrl'
import { login, register } from '../redux/actions/userActions'
import { connect, useDispatch, useSelector } from 'react-redux'


const LoginTab = (props) => {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [remember, setRemember] = useState(false)

    const dispatch = useDispatch()

    const userLogin = useSelector(state => state.userLogin)
    const { isLoading, error, isAuthenticated, userInfo } = userLogin

    useEffect(() => {

        if (!isAuthenticated) {
            SecureStore.getItemAsync('userinfo')
                .then((userdata) => {
                    let userinfo = JSON.parse(userdata)

                    if (userinfo) {
                        setEmail(userinfo.email)
                        setPassword(userinfo.password)
                        setRemember(true)
                    }
                })
        }

    }, [isAuthenticated, error])



    const handleLogin = () => {

        if (remember) {
            SecureStore.setItemAsync('userinfo', JSON.stringify({ email: email, password: password }))

                .catch(err => console.log('Could not save userinfo', err))
            dispatch(login(email, password))
        }
        else {

            SecureStore.deleteItemAsync('userinfo')
                .catch(err => console.log('Could not delete userinfo ', err))

            dispatch(login(email, password))
            setEmail('')
            setPassword('')
            setRemember(false)
        }

    }





    if (isAuthenticated) {

        return props.navigation.navigate('Profile')

    }
    else {
        if (isLoading) {
            return (
                <View style={{ justifyContent: 'center', flex: 1 }}>
                    <ActivityIndicator size="large" color="black" />
                </View>
            )
        }
        else {

            return (
                <View style={styles.container}>

                    <Input
                        placeholder='email'
                        leftIcon={{ type: 'font-awesome', name: 'envelope-o' }}
                        leftIconContainerStyle={{ marginRight: 10 }}
                        onChangeText={(email) => setEmail(email)}
                        value={email}
                        containerStyle={styles.formInput}
                    />

                    <Input
                        placeholder='password'
                        leftIcon={{ type: 'font-awesome', name: 'key' }}
                        leftIconContainerStyle={{ marginRight: 10 }}
                        onChangeText={(password) => setPassword(password)}
                        value={password}
                        containerStyle={styles.formInput}
                        secureTextEntry
                        errorMessage={error}
                        errorStyle={{ fontSize: 18 }}

                    />
                    <CheckBox
                        title='Remember Me'
                        center
                        checked={remember}
                        onPress={() => setRemember(!remember)}
                        containerStyle={{ borderRadius: 10 }}
                    />
                    <View style={styles.formButton}>

                        <Button
                            onPress={() => handleLogin()}
                            title='Login'
                            icon={<Icon name='sign-in' type='font-awesome' color='white' />}
                            containerStyle={{ marginTop: 10, height: 50 }}
                            buttonStyle={{ backgroundColor: "#282c34", borderRadius: 20 }}
                            titleStyle={{ marginLeft: 10, fontSize: 18 }}
                        />
                    </View>

                </View>
            )
        }
    }

}
LoginTab.navigationOptions = {
    title: 'Login',
    tabBarIcon: ({ tintColor }) => (
        <Icon
            name='sign-in'
            type='font-awesome'
            size={24}
            iconStyle={{ color: tintColor }}
        />
    )
}


const RegisterTab = (props) => {
    const [email, setEmail] = useState('')
    const [name, setName] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')


    const dispatch = useDispatch()

    const userRegister = useSelector(state => state.userRegister)
    const { loading, error, registration, userInfo } = userRegister

    useEffect(() => {


    }, [userInfo, registration])

    const handleRegisteration = () => {
        if (password === confirmPassword) {
            dispatch(register(name, email, password))

        }
        else {
            Alert.alert("Passwords Doesn't Match", "Check Passwords and Try Again");
        }



    }
    if (registration) {
        return props.navigation.navigate('Profile')
    }
    else {
        return (
            <View style={styles.container}>
                <Input
                    placeholder='Name'
                    leftIcon={{ type: 'font-awesome', name: 'user-o' }}
                    leftIconContainerStyle={{ marginRight: 10 }}
                    onChangeText={(name) => setName(name)}
                    value={name}
                    containerStyle={styles.formInput}
                />
                <Input
                    placeholder='Email'
                    leftIcon={{ type: 'font-awesome', name: 'envelope-o' }}
                    leftIconContainerStyle={{ marginRight: 10 }}
                    onChangeText={(email) => setEmail(email)}
                    value={email}
                    containerStyle={styles.formInput}
                />

                <Input
                    placeholder='Password'
                    leftIcon={{ type: 'font-awesome', name: 'key' }}
                    leftIconContainerStyle={{ marginRight: 10 }}
                    onChangeText={(password) => setPassword(password)}
                    value={password}
                    containerStyle={styles.formInput}
                    secureTextEntry
                    // errorMessage={error}
                    errorStyle={{ fontSize: 18 }}

                />
                <Input
                    placeholder='Confirm Password'
                    leftIcon={{ type: 'font-awesome', name: 'key' }}
                    leftIconContainerStyle={{ marginRight: 10 }}
                    onChangeText={(confirmPassword) => setConfirmPassword(confirmPassword)}
                    value={confirmPassword}
                    containerStyle={styles.formInput}
                    secureTextEntry
                    // errorMessage={error}
                    errorStyle={{ fontSize: 18 }}

                />
                <View style={styles.formButton}>

                    <Button
                        onPress={handleRegisteration}
                        title='Register'
                        icon={<Icon name='user-plus' type='font-awesome' color='white' />}
                        containerStyle={{ marginTop: 10, height: 50 }}
                        buttonStyle={{ backgroundColor: "#282c34", borderRadius: 20 }}
                        titleStyle={{ marginLeft: 10, fontSize: 18 }}
                    />
                </View>

            </View>
        )
    }
}

RegisterTab.navigationOptions = {
    title: 'Register',
    tabBarIcon: ({ tintColor }) => (
        <Icon
            name='user-plus'
            type='font-awesome'
            size={24}
            iconStyle={{ color: tintColor }}
        />
    )

}

const Login = createBottomTabNavigator({
    Login: LoginTab,
    Register: RegisterTab
}, {
    tabBarOptions: {
        activeBackgroundColor: '#282c34',
        inactiveBackgroundColor: 'white',
        activeTintColor: 'white',
        inactiveTintColor: '#282c34'
    }
})




export default Login

const styles = StyleSheet.create({
    container: {
        marginHorizontal: 10,
        marginTop: 50
    }
})
