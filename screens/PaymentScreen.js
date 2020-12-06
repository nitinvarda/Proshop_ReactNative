import React, { useState } from 'react'
import { Alert, StyleSheet, Text, View } from 'react-native'
import { Input, Button, CheckBox } from 'react-native-elements'
import { useDispatch, useSelector } from 'react-redux'
import { Loading } from '../components/LoadingComponent'
import { savePaymentMethod } from '../redux/actions/cartActions'


const PaymentScreen = (props) => {
    const dispatch = useDispatch()
    const [paypalChecked, setPaypalChecked] = useState(false)
    const [paytmChecked, setPaytmChecked] = useState(false)
    const [payment, setPayment] = useState('')

    const cart = useSelector(state => state.cart)
    const { paymentMethod, shippingAddress } = cart


    const next = () => {
        if (!paypalChecked && !paytmChecked) {
            Alert.alert("Select Payment Option", "PayPal or Paytm ?")
        }
        else {

            dispatch(savePaymentMethod(payment))
        }
    }
    if (Object.keys(shippingAddress).length < 1) {
        return props.navigation.navigate('Shipping')
    }
    else {
        if (paymentMethod) {
            return props.navigation.navigate('PlaceOrder')
        }
        else {
            return (
                <View>
                    <Text style={{ textAlign: 'center', fontSize: 18 }}>Select Payment Method</Text>
                    <CheckBox
                        title='Paypal'
                        checked={paypalChecked}
                        onPress={() => {
                            setPaypalChecked(!paypalChecked);
                            setPaytmChecked(false);
                            setPayment('Paypal')
                        }}
                    />
                    <CheckBox
                        title='Paytm'
                        checked={paytmChecked}
                        onPress={() => {
                            setPaytmChecked(!paytmChecked);
                            setPaypalChecked(false);
                            setPayment('Paytm')
                        }}
                    />
                    <Button containerStyle={{ marginHorizontal: 10, borderRadius: 10, height: 50 }} buttonStyle={{ backgroundColor: '#282c34' }} onPress={next} title="Continue" />
                </View>
            )
        }
    }
}

export default PaymentScreen

const styles = StyleSheet.create({})
