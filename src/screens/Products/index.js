


import { useFocusEffect, useIsFocused, useNavigation } from "@react-navigation/native";
import { useCallback, useEffect, useLayoutEffect, useState } from "react";
import { Dimensions, FlatList, Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import color from "../../components/Common/color";
import Snackbar from "react-native-snackbar";
import firestore from "@react-native-firebase/firestore";
import CustomTextInput from "../../components/CustomTextInput";
import { DimensionContext } from "../../context";
import AntDesign from "react-native-vector-icons/AntDesign";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import FontAwesome from "react-native-vector-icons/FontAwesome";


const Products = () => {
    const navigation = useNavigation();
    const [productss, setProducts] = useState(null);
    const isFocused = useIsFocused()
    const [search, setSearch] = useState('')
    const { width, height } = Dimensions.get('screen')


    useLayoutEffect(() => {
        navigation.setOptions({
            title: 'Products',
            headerTintColor: color.black,
            headerStyle: {
                backgroundColor: color.lightWhit
            },
            headerLeft: () => (
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <FontAwesome5 name='arrow-alt-circle-left' size={30} color={color.lightBlue1} style={{ marginRight: 10 }} />
                </TouchableOpacity>
            ),
            headerRight: () => <RightComponent />
        });
    }, [navigation]);

    const RightComponent = () => (
        <TouchableOpacity onPress={() => navigation.navigate('CreateProduct', { type: 'create' })}>
            <AntDesign name='plussquare' size={28} color={color.lightBlue1} />
        </TouchableOpacity>
    );

    useFocusEffect(
        useCallback(() => {
            getProducts();
        }, [])
    );

    const getProducts = async () => {
        try {
            const snapshot = await firestore().collection('Products').get();
            if (snapshot.empty) {
                Snackbar.show({
                    text: 'No users found!',
                    duration: Snackbar.LENGTH_SHORT,
                });
            } else {
                // Use map instead of forEach to create an array of user objects
                const usersArray = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
                setProducts(usersArray);
            }
        } catch (error) {
            Snackbar.show({
                text: 'Error fetching users',
                duration: Snackbar.LENGTH_SHORT,
            });
            console.log(error);
        }
    };

    const Header = () => {
        try {
            return (
                <View style={{ padding: 20 }}>
                    <CustomTextInput
                        type="search"
                        handleText={(text) => handleSearch(text)}
                        value={search}
                        placeholder="Search"
                    />
                </View>

            )
        } catch (error) {
            console.log(error);
        }

    }


    const handleSearch = async text => {
        try {
            setSearch(text)
            await firestore().collection('Products').
                orderBy('head').
                startAt(text).
                endAt(text + '\uf8ff').
                get().
                then(snapshot => {
                    if (snapshot.empty) {
                        Snackbar.show({
                            text: "No Result Found",
                            duration: Snackbar.LENGTH_LONG,
                            backgroundColor: color.red,
                        });
                        setProducts([])
                    } else {
                        const usersArray = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
                        setProducts(usersArray);
                    }
                })
        } catch (error) {
            console.log(error);
        }

    }

    const handleProductDelete = async productData => {
        try {
            await firestore().collection('Products').doc(productData.id).delete().then(() => {
                Snackbar.show({
                    text: "Product Delete Successfully",
                    duration: Snackbar.LENGTH_LONG,
                    backgroundColor: color.primaryGreen,
                    textColor: color.creamWhite
                });
            })
            getProducts()
        } catch (error) {

        }
    }

    const handleProductEdit = productData => {
        navigation.navigate('CreateProduct', { type: 'edit', data: productData })
    }


    return (
        <View style={{ backgroundColor: color.lightWhit }}>
            <FlatList
                data={productss}
                style={{ margin: 15 }}
                extraData={productss}
                numColumns={2}
                showsVerticalScrollIndicator={false}
                ListHeaderComponent={() => <Header />}
                renderItem={({ item, index }) => (
                    <TouchableOpacity
                        onPress={() => navigation.navigate('ProductDetails', { Product: item })}
                        style={{
                            marginVertical: 10,
                            backgroundColor: color.lightWhit,
                            justifyContent: 'center',
                            padding: 15,
                            width: width * 0.45,
                            height: height * 0.3,
                            borderRadius: 20,
                            marginLeft: index % 2 === 1 ? 9 : 0,
                            borderWidth: StyleSheet.hairlineWidth,
                            borderColor: color.lightBlue1
                        }}>
                        <View style={{ flexDirection: 'row', alignItems: 'center', position: 'absolute', top: 5, right: 8, }}>
                            <TouchableOpacity onPress={() => handleProductDelete(item)}>
                                <AntDesign name='delete' size={28} color={color.red} />
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => handleProductEdit(item)}>
                                <FontAwesome name='edit' size={28} color={color.lightBlue1} style={{ marginLeft: 10 }} />
                            </TouchableOpacity>
                        </View>
                        <View style={{
                            justifyContent: 'center',
                            alignItems: 'center',
                            marginTop: 25

                        }}>
                            <Image
                                source={{ uri: item.image }}
                                style={{
                                    width: 65,
                                    height: 85,
                                    resizeMode: 'contain',
                                    borderRadius: 40,
                                    overflow: "hidden",
                                    alignItems: 'center',

                                }} />
                        </View>

                        <View style={{ marginLeft: 20 }}>
                            <Text style={{ color: color.lightBlue1, fontFamily: 'Lato-Bold', fontSize: 22, lineHeight: 40, letterSpacing: 0.1 }}>{item.head}</Text>
                            <Text style={{ color: color.lightBlue1, fontFamily: 'Lato-Bold', fontSize: 16, lineHeight: 30, }}>₹{item.price}</Text>
                        </View>
                        {/* <BlockUser data={item} /> */}
                    </TouchableOpacity>
                )}
                ListEmptyComponent={() => (
                    <View style={{
                        justifyContent: 'center',
                        alignItems: 'center',
                        alignSelf: 'center',
                        padding: 30
                    }}>
                        <Text style={{ fontFamily: 'Lato-Black', color: color.black, fontSize: 25 }}>
                            Users is empty
                        </Text>
                        <TouchableOpacity>
                            <Text>Go to Home</Text>
                        </TouchableOpacity>
                    </View>
                )}
            />
        </View>
    );



};

export default Products;


