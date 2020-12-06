import React from 'react'
import { Card, Rating } from 'react-native-elements'
import { View, Text, StyleSheet } from 'react-native'
import { baseUrl } from '../shared/baseUrl'

const Product = ({ product }) => {
    return (
        <Card containerStyle={{ borderRadius: 20 }} >

            <Card.Image containerStyle={{ borderRadius: 10 }} source={{ uri: baseUrl + `/api/image/${product.image}` }} variant="top" />

            <View>

                <Card.Title style={styles.productTitle} >{product.name}</Card.Title>

                <View style={styles.productDetails}>
                    <Text >
                        {/* <Rating value={product.rating} text={`${product.numReviews} reviews`} /> */}
                        <Rating imageSize={15} readonly startingValue={product.rating} style={styles.rating} ratingCount={5} />

                    </Text>
                    <Text style={{ fontWeight: 'bold' }}>
                        $ {product.price}

                    </Text>
                </View>
            </View>

        </Card>
    );
}

export default Product;

const styles = StyleSheet.create({
    rating: {
        marginBottom: 40
    },
    productDetails: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginVertical: 10
    },
    productTitle: {
        marginVertical: 5,
        textAlign: 'left'
    }
})