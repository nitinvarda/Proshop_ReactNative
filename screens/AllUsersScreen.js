import React, { useEffect } from 'react'
import { StyleSheet, Text, View, FlatList } from 'react-native'
import { useSelector, useDispatch } from 'react-redux'
import { listUsers } from '../redux/actions/userActions'

const AllUsersScreen = (props) => {
    const dispatch = useDispatch()

    const userList = useSelector(state => state.userList)
    const { loading, error, users } = userList

    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin

    useEffect(() => {
        if (userInfo && userInfo.isAdmin) {
            dispatch(listUsers())

        }
        else {
            props.navigation.navigate('Login')
        }


    }, [dispatch, userInfo])
    return (
        <View>
            <Text>AllUsersScreen</Text>
            <FlatList
                data={users}
                keyExtractor={item => item._id}
                renderItem={({ item }) => (
                    <View>
                        <Text>{item.name}</Text>
                        <Text>{item.isAdmin}</Text>
                    </View>
                )}
            />
        </View>
    )
}

export default AllUsersScreen

const styles = StyleSheet.create({})
