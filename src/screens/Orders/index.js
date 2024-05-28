
import { useFocusEffect, useIsFocused, useNavigation } from "@react-navigation/native";
import { useCallback, useEffect, useLayoutEffect, useState } from "react";
import { FlatList, Image, Text, TouchableOpacity, View } from "react-native";
import color from "../../components/Common/color";
import Snackbar from "react-native-snackbar";
import firestore from "@react-native-firebase/firestore";
import CustomTextInput from "../../components/CustomTextInput";
import moment from "moment";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";



const Orders = () => {
    const navigation = useNavigation();
    const [order, setOrder] = useState([]);
    const [search, setSearch] = useState('')

    useLayoutEffect(() => {
        navigation.setOptions({
            title: 'Orders',
            headerTintColor: color.black,
            headerStyle: {
                backgroundColor: color.lightWhit
            },
            headerLeft: () => (
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <FontAwesome5 name='arrow-alt-circle-left' size={30} color={color.lightBlue1} style={{ marginRight: 10 }} />
                </TouchableOpacity>
            ),
        });
    }, [navigation]);

    useFocusEffect(
        useCallback(() => {
            getOrder();
        }, [])
    );


    const getOrder = async () => {
        try {
            const snapshot = await firestore().collection('Orders').get();
            if (snapshot.empty) {
                Snackbar.show({
                    text: 'No users found!',
                    duration: Snackbar.LENGTH_SHORT,
                });
            } else {
                // Use map instead of forEach to create an array of user objects
                const usersArray = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
                setOrder(usersArray);
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
            await firestore().collection('Orders').
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
                        setOrder([])
                    } else {
                        const usersArray = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
                        setOrder(usersArray);
                    }
                })
        } catch (error) {
            console.log(error);
        }

    }


    const formatTime = time => {
        return (
            moment(time).format('YYYY-MM-DD HH:mm:ss')
        )
    }

    return (
        <View style={{ backgroundColor: color.lightWhit }}>
            <FlatList
                data={order}
                style={{ margin: 15 }}
                extraData={order}
                showsVerticalScrollIndicator={false}
                ListHeaderComponent={() => <Header />}
                renderItem={({ item, index }) => (
                    <TouchableOpacity
                        onPress={() => navigation.navigate('OrderDetails', { Order: item })}
                        style={{
                            backgroundColor: color.lightWhit,
                            padding: 15,
                            borderRadius: 15,
                            overflow: 'hidden',
                            margin: 15
                        }}>
                        <View style={{
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            borderBottomWidth: 1,
                            borderBottomColor: color.black,
                            paddingBottom: 15
                        }}>
                            <View>
                                <Text style={{ fontFamily: 'Lato-Bold', fontSize: 20, color: color.lightBlue1, lineHeight: 20 }}>{item.orderId}</Text>
                                <Text style={{ fontFamily: 'Lato-Regular', color: color.primaryGreen, lineHeight: 30, fontSize: 15 }}>order on : {formatTime(item.created)} </Text>
                                <Text style={{ fontFamily: 'Lato-Regular', lineHeight: 20, fontSize: 15, color: color.lightBlue1, }} numberOfLines={3}>{item.address} </Text>
                                <Text style={{ color: color.lightBlue1, lineHeight: 20, }}>paid : <Text style={{ fontFamily: 'Lato-Regular', color: color.primaryGreen, lineHeight: 20, fontSize: 15 }}>{item.totalAmount}</Text> items : <Text style={{ fontFamily: 'Lato-Regular', color: color.primaryGreen, lineHeight: 20, fontSize: 15 }}>{item.cartItems.length}</Text></Text>
                            </View>
                            <View>
                                <Image source={require('../../assets/images/map.png')}
                                    style={{
                                        width: 100,
                                        height: 75,
                                        resizeMode: 'cover',
                                        borderRadius: 20,
                                        overflow: "hidden"
                                    }} />
                            </View>
                        </View>
                        {/* //////////// */}

                        <View style={{
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            paddingTop: 25
                        }}>
                            <Text style={{ fontFamily: 'Lato-Regular', lineHeight: 20, fontSize: 15, color: color.lightBlue1, }}>{item.orderStatus.head}</Text>
                            <Text style={{ fontFamily: 'Lato-Regular', lineHeight: 20, fontSize: 15, color: color.lightBlue1, }}>Rate & Review Products</Text>

                        </View>
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

export default Orders;


