import { useFocusEffect, useIsFocused, useNavigation } from "@react-navigation/native";
import { useCallback, useEffect, useLayoutEffect, useState } from "react";
import { FlatList, Image, Text, TouchableOpacity, View } from "react-native";
import color from "../../components/Common/color";
import Snackbar from "react-native-snackbar";
import firestore from "@react-native-firebase/firestore";
import CustomTextInput from "../../components/CustomTextInput";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";


const Users = () => {
    const navigation = useNavigation();
    const [user, setUser] = useState([]);
    const isFocused = useIsFocused()
    const [search, setSearch] = useState('')




    useLayoutEffect(() => {
        navigation.setOptions({
            title: 'Users',
            headerTintColor: color.black,
            headerStyle: {
                backgroundColor: color.lightWhit,
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
            getUser();
        }, [])
    );

    // useEffect(() => {
    //     getUsers();
    // }, [isFocused])

    const getUser = async () => {
        try {
            const snapshot = await firestore().collection('User').get();
            if (snapshot.empty) {
                Snackbar.show({
                    text: 'No users found!',
                    duration: Snackbar.LENGTH_SHORT,
                });
            } else {
                // Use map instead of forEach to create an array of user objects
                const usersArray = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
                setUser(usersArray);
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

    const BlockUser = ({ data }) => {
        try {
            return (
                <TouchableOpacity onPress={() => handleBlock(data)} style={{
                    borderRadius: 15,
                    backgroundColor: data?.active ? color.primaryGreen : color.red,
                    padding: 8,
                    position: 'absolute',
                    top: 5,
                    right: 8
                }}>
                    <Text style={{ color: color.white, fontFamily: 'Lato-Bold', fontSize: 16 }}>{data?.active ? 'Unblock' : 'Block'}</Text>
                </TouchableOpacity>
            )
        } catch (error) {
            console.log(error);
        }

    }

    const handleSearch = async text => {
        try {
            setSearch(text)
            await firestore().collection('User').
                orderBy('username').
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
                        setUser([])
                    } else {
                        const usersArray = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
                        setUser(usersArray);
                    }
                })
        } catch (error) {
            console.log(error);
        }

    }

    const handleBlock = async (data) => {
        try {
            await firestore().collection('User').doc(data.id).update({
                active: data?.active ? false : true
            }).then(() => {
                const updatedUser = user.map(obj => {
                    if (obj?.id === data?.id) {
                        obj.active = data?.active ? false : true
                    }
                    return obj
                })
                Snackbar.show({
                    text: "User updated succesfully",
                    duration: Snackbar.LENGTH_LONG,
                    backgroundColor: color.red,
                });
                setUser(updatedUser)
            })
        } catch (error) {
            console.log(error);
        }

    }

    return (
        <View style={{ backgroundColor: color.lightWhit }}>
            <FlatList
                data={user}
                style={{ margin: 15 }}
                extraData={user}
                showsVerticalScrollIndicator={false}
                ListHeaderComponent={() => <Header />}
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
                renderItem={({ item, index }) => (
                    <View style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent: 'flex-start',
                        marginVertical: 10,
                        backgroundColor: color.creamWhite,
                        padding: 15,
                        width: '99%',
                        borderRadius: 20
                    }}>
                        <Image source={require('../../assets/images/head.png')}
                            style={{
                                width: 65,
                                height: 85,
                                resizeMode: 'contain',
                                borderRadius: 40,
                                overflow: "hidden"
                            }} />
                        <View style={{ marginLeft: 20 }}>
                            <Text style={{ color: color.lightBlue1, fontFamily: 'Lato-Bold', fontSize: 22, lineHeight: 40 }}>{item.username}</Text>
                            <Text style={{ color: color.lightBlue1, fontFamily: 'Lato-Bold', fontSize: 16 }}>{item.email}</Text>
                            <Text style={{ color: color.lightBlue1, fontFamily: 'Lato-Bold', fontSize: 16 }}>{item.mobilenumber}</Text>
                        </View>
                        <BlockUser data={item} />
                    </View>
                )}
            />
        </View>
    );



};

export default Users;


