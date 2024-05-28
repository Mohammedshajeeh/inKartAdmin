import { useNavigation } from "@react-navigation/native";
import { useEffect, useLayoutEffect, useState } from "react";
import { Image, ImageBackground, Text, TouchableOpacity, View } from "react-native"
import color from "../../components/Common/color";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
// import { firebase } from "@react-native-firebase/firestore";
import firestore from "@react-native-firebase/firestore";



const Home = () => {

    const navigation = useNavigation()
    const [products, setProducts] = useState(0)
    const [users, setUsers] = useState(0)
    const [orders, setOrders] = useState(0)

    useLayoutEffect(() => {
        navigation.setOptions({
            title: 'Home',
            headerTintColor: color.black,
            headerStyle: {
                backgroundColor: color.lightWhit,
            },
            headerLeft: () => (
                <TouchableOpacity onPress={() => navigation.openDrawer()}>
                    <Image source={require('../../assets/images/drawer.png')} style={{ width: 35, height: 35, resizeMode: 'contain', marginHorizontal: 10 }} />
                </TouchableOpacity>
            ),
            headerRight: () => <RightComponent />
        });
    }, [navigation]);

    const RightComponent = () => (
        <View>
            <Image source={require('../../assets/images/logo.png')} style={{ width: 65, height: 65, resizeMode: 'contain', }} />
        </View>
    );

    useEffect(() => {
        getAllCounts()
    }, [])

    const getAllCounts = async () => {
        const productRef = await firestore().collection('Products').get()
        const usersRef = await firestore().collection('User').get()
        const ordersRef = await firestore().collection('Orders').get()

        setProducts(productRef.size)
        setUsers(usersRef.size)
        setOrders(ordersRef.size)
    }

    return (

        <View style={{ flex: 1, padding: 20, backgroundColor: color.lightWhit }}>
            <TouchableOpacity onPress={() => navigation.navigate('Orders')} style={{
                width: '95%',
                height: '30%',
                alignSelf: 'center',
                borderRadius: 15,
                backgroundColor: color.lightPink,
                padding: 15,
                marginVertical: 8,
                flexDirection: 'row',
                alignItems: "center",
                justifyContent: 'flex-start'
            }}>
                <Image source={require('../../assets/images/orders1.png')} style={{ width: 120, height: 120, resizeMode: 'contain' }} />
                <View>
                    <Text style={{ fontFamily: 'Lato-Bold', fontSize: 22, color: color.black }}>{orders}</Text>
                    <Text style={{ fontFamily: 'Lato-Regular', fontSize: 22, color: color.black }}>Orders</Text>
                </View>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => navigation.navigate('Products')} style={{
                width: '95%',
                height: '30%',
                alignSelf: 'center',
                borderRadius: 15,
                backgroundColor: color.darkPink,
                padding: 15,
                marginVertical: 8,
                flexDirection: 'row',
                alignItems: "center",
                justifyContent: 'flex-start'
            }}>
                <Image source={require('../../assets/images/products5.png')}
                    style={{ width: 120, height: 120, resizeMode: 'contain' }} />
                <View>
                    <Text style={{ fontFamily: 'Lato-Bold', fontSize: 22, color: color.black }}>{products}</Text>
                    <Text style={{ fontFamily: 'Lato-Regular', fontSize: 22, color: color.black }}>Products</Text>
                </View>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => navigation.navigate('Users')} style={{
                width: '95%',
                height: '30%',
                alignSelf: 'center',
                borderRadius: 15,
                backgroundColor: color.lightBlue,
                padding: 15,
                marginVertical: 8,
                flexDirection: 'row',
                alignItems: "center",
                justifyContent: 'flex-start'
            }}>
                <Image source={require('../../assets/images/users3.jpg')}
                    style={{ width: 100, height: 100, resizeMode: 'contain' }} />
                <View style={{ marginLeft: 10 }}>
                    <Text style={{ fontFamily: 'Lato-Bold', fontSize: 22, color: color.black }}>{users}</Text>
                    <Text style={{ fontFamily: 'Lato-Regular', fontSize: 22, color: color.black }}>Users</Text>
                </View>
            </TouchableOpacity>
        </View>
    )
}

export default Home