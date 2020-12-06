import React, { useEffect } from 'react'
import { StyleSheet, TextInput, Text, View, FlatList, ScrollView, SectionList, TouchableWithoutFeedback } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import Product from '../components/Product'
import { listProducts, listTopProducts } from '../redux/actions/productActions'
import { Tile, Icon, Input, Button } from 'react-native-elements'
import { baseUrl } from '../shared/baseUrl'
import { TouchableHighlight } from 'react-native-gesture-handler'

const HomeScreen = (props) => {
    const input = React.createRef();

    const keyword = props.navigation.getParam('keyword')
    const pageNumber = props.navigation.getParam('pageNumber') || 1

    const productList = useSelector(state => state.productList)
    const { loading, error, products, page, pages } = productList

    const topRated = useSelector(state => state.productTopRated)
    const { loading: topRatedLoading, error: topRatedError, products: topRatedProducts } = topRated

    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(listProducts(keyword, pageNumber))
        dispatch(listTopProducts())

    }, [keyword, pageNumber])

    const renderProducts = ({ item, index }) => {
        return (
            <>
                <TouchableWithoutFeedback onPress={() => props.navigation.navigate('Product', { productId: item._id })}>

                    <View>
                        <Product product={item} />
                    </View>
                </TouchableWithoutFeedback>

            </>
        )

    }

    const renderTopProducts = ({ item, index }) => {
        return <Tile
            imageSrc={{ uri: baseUrl + `/api/image/${item.image}` }}
            title={item.name}
            featured
            titleStyle={styles.tileTitle}
            onPress={() => props.navigation.navigate('Product', { productId: item._id })}
            overlayContainerStyle={{ backgroundColor: 'rgba(0,0,0,0.2)' }}


        />




    }

    return (
        <View>




            <FlatList
                ListHeaderComponent={
                    <>
                        <Input
                            // containerStyle={{ margin: 20 }}
                            ref={input}
                            placeholder="Search"
                            leftIcon={{ type: 'font-awesome', name: 'search' }}
                            rightIcon={{ type: 'font-awesome', name: 'times', onPress: () => { input.current.clear(); props.navigation.navigate('Home', { keyword: '' }) } }}
                            leftIconContainerStyle={{ marginRight: 15 }}
                            inputContainerStyle={{ marginHorizontal: 20 }}
                            onChangeText={text => props.navigation.navigate('Home', { keyword: text })}

                        />

                        {!keyword ?
                            <FlatList showsHorizontalScrollIndicator={false} horizontal data={topRatedProducts} renderItem={renderTopProducts} keyExtractor={item => item._id} /> :
                            (<View style={{ flexDirection: 'row', justifyContent: 'flex-start', marginHorizontal: 20 }}>
                                <Button buttonStyle={{ backgroundColor: '#282c34' }} title='Go Back' onPress={() => props.navigation.navigate('Home', { keyword: '' })} />
                            </View>)
                        }

                    </>
                }

                data={products}
                renderItem={renderProducts}
                keyExtractor={item => item._id}
                ListFooterComponent={
                    <View style={{ margin: 20, flexDirection: 'row', justifyContent: 'flex-start' }}>
                        {[...Array(pages).keys()].map(pageNum => (
                            <>
                                {console.log(page, pageNum)}
                                {page == pageNum + 1 ?
                                    <Button
                                        onPress={() => props.navigation.navigate('Home', { pageNumber: Number(pageNum + 1) })}
                                        title={pageNum + 1}
                                        buttonStyle={{ backgroundColor: '#282c34' }}
                                        titleStyle={{ color: 'white', padding: 10 }}
                                    /> :
                                    <Button
                                        onPress={() => props.navigation.navigate('Home', { pageNumber: Number(pageNum + 1) })}
                                        title={pageNum + 1}
                                        buttonStyle={{ backgroundColor: 'white' }}
                                        titleStyle={{ color: '#282c34', padding: 10 }}

                                    />}
                            </>

                        )
                        )}

                    </View>

                }


            />


        </View>
    )
}

export default HomeScreen

const styles = StyleSheet.create({
    tileTitle: {

        flexDirection: 'row',
        justifyContent: 'flex-end',
        color: 'black',







    }
})
