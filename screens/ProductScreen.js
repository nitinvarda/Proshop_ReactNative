import React, { useEffect, useState } from 'react'
import { StyleSheet, Text, View, FlatList } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import { listProductDetails } from '../redux/actions/productActions'
import { Image, Divider, Rating, Button, Icon, ListItem } from 'react-native-elements'
import { baseUrl } from '../shared/baseUrl'
import { Picker } from '@react-native-picker/picker'
import { Loading } from '../components/LoadingComponent'
import { addToCart } from '../redux/actions/cartActions'


const ProductScreen = (props) => {
    const productId = props.navigation.getParam('productId')
    const [quantity, setQuantity] = useState(1)
    const [item, setItem] = useState({})
    const dispatch = useDispatch()
    const productDetail = useSelector(state => state.productDetails)
    const { loading, error, product } = productDetail
    useEffect(() => {
        if (product) {
            if (product._id.toString() === productId.toString()) {
                setItem(product)
            }
            else {
                dispatch(listProductDetails(productId))
            }
        }
        else {
            dispatch(listProductDetails(productId))

        }
    }, [productId, product])


    const AddToCart = () => {
        dispatch(addToCart(itemId, qty))
        props.navigation.navigate('Cart')
    }

    if (loading) {
        return <Loading />
    }
    else {

        return (
            <View>
                {loading ? <Text>Loading....</Text> : null}

                <View>
                    <FlatList
                        ListHeaderComponent={
                            <>
                                <Image containerStyle={{ borderRadius: 20, margin: 10 }} source={{ uri: baseUrl + `/api/image/${item.image}` }} style={{ width: '100%', height: 300 }} />
                                <Text style={styles.productTitle}>{item.name}</Text>


                                <ListItem containerStyle={{ borderRadius: 20, margin: 10 }}  >


                                    <View style={styles.price}>
                                        <Text>${item.price}</Text>
                                        <View style={{ flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center' }} >
                                            <Rating type="custom" imageSize={25} ratingColor="orange" readonly startingValue={item.rating} ratingCount={5} />
                                            {Object.keys(item).length >= 1 ? <Text style={{ fontSize: 18 }}>({item.reviews.length})</Text> : null}
                                        </View>
                                    </View>

                                </ListItem>




                                <View style={{ flexDirection: 'row', justifyContent: 'space-between', margin: 10 }} >

                                    <Text style={{ fontSize: 20, flexDirection: 'row', alignContent: 'center', marginHorizontal: 10, marginTop: 10 }}>Qty</Text>
                                    <View style={{ width: '50%', borderWidth: 1, borderRadius: 50 }}>
                                        <Picker
                                            style={{ padding: 10 }}
                                            selectedValue={quantity}
                                            onValueChange={(itemValue, itemIndex) => setQuantity(itemValue)}>
                                            {
                                                [...Array(item.countInStock).keys()].map(x => (
                                                    <Picker.Item key={x + 1} label={`${x + 1}`} value={`${x + 1}`} />
                                                ))
                                            }

                                        </Picker>
                                    </View>
                                </View>

                                {/* () => props.navigation.navigate('Cart', { itemId: item._id, qty: quantity })} */}
                                <Button onPress={() => { dispatch(addToCart(item._id, quantity)); props.navigation.navigate('Cart') }} buttonStyle={{ backgroundColor: '#282c34', height: 55 }} containerStyle={styles.cartButton} title="Add To Cart" />
                                <Divider />
                                <View style={styles.description}>
                                    <Text style={styles.descriptionTitle}>Description</Text>
                                    <Text style={styles.descriptionExpand} >{item.description}</Text>
                                </View>
                                <Divider />
                                {item.length >= 1 ? item.reviews.length >= 1 ? (
                                    <View style={styles.reviews}>

                                        <Text style={styles.reviewHeading}>Reviews</Text>
                                    </View>
                                ) : (null) : (null)}




                            </>

                        }
                        data={item.reviews} keyExtractor={item => item._id} renderItem={({ item }) => (
                            <>
                                <ListItem bottomDivider containerStyle={{ borderRadius: 20 }} >


                                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', flex: 1 }}>
                                        <View style={{ flexDirection: 'column', justifyContent: 'space-between' }}>
                                            <Text>{item.name}</Text>
                                            <Rating type='custom' ratingColor="orange" style={{ marginTop: 15 }} imageSize={15} readonly startingValue={item.rating} ratingCount={5} />
                                        </View>
                                        <Text >{item.createdAt.substring(0, 10)}</Text>
                                    </View>



                                    <ListItem.Chevron name='trash' type='font-awesome' color="black" size={24} />
                                </ListItem>
                                <ListItem>
                                    <ListItem.Content>
                                        <Text>{item.comment}</Text>

                                    </ListItem.Content>
                                </ListItem>
                            </>




                        )} />
                </View>
            </View>
        )

    }
}

export default ProductScreen

const styles = StyleSheet.create({
    productTitle: {
        textAlign: 'center',
        fontSize: 20,
        margin: 15,
        fontWeight: 'bold'
    },
    productDescription: {
        margin: 10
    },
    rating: {
        margin: 10,
        flexDirection: 'row',
        justifyContent: 'flex-start'
    },
    priceStock: {

        flexDirection: 'row',
        justifyContent: 'space-between',
        marginHorizontal: 40,

        margin: 10

    },
    price: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    cartButton: {
        margin: 10,
        borderRadius: 40,
        backgroundColor: 'black'
    },
    comment: {
        flexDirection: 'column',
        justifyContent: 'space-between',
        margin: 10
    },
    description: {
        marginHorizontal: 10,

    },
    descriptionTitle: {
        textAlign: 'left',
        fontSize: 20,
        fontWeight: 'bold'
    },
    descriptionExpand: {
        fontSize: 16,
        marginVertical: 10
    },
    reviews: {
        margin: 10
    },
    reviewHeading: {
        fontWeight: 'bold',
        fontSize: 20
    }
})
