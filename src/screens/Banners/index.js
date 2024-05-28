


import React, { useCallback, useLayoutEffect, useRef, useState } from "react";
import { Dimensions, FlatList, ImageBackground, SafeAreaView, TouchableOpacity, View, StyleSheet, Text, Image, Modal, ActivityIndicator } from "react-native";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import color from "../../components/Common/color";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import AntDesign from "react-native-vector-icons/AntDesign";
import Entypo from "react-native-vector-icons/Entypo";
import Snackbar from "react-native-snackbar";
import firestore from "@react-native-firebase/firestore";
import ActionSheet from "react-native-actions-sheet";
import CustomButton from "../../components/CustomButton";
import CustomTextInput from "../../components/CustomTextInput";
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import uploadImage from "../../components/Common/storage";

const Banners = () => {
    const navigation = useNavigation();
    const [banners, setBanners] = useState([]);
    const [name, setName] = useState('');
    const [desc, setDesc] = useState('');
    const [uploadUri, setUploadUri] = useState('');
    const [bannerId, setBannerId] = useState(null);
    const [type, setType] = useState(null);
    const [loading, setLoading] = useState(false);
    const { width, height } = Dimensions.get('screen');
    const actionSheetRef = useRef(null);

    useLayoutEffect(() => {
        navigation.setOptions({
            title: 'Banners',
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
        <TouchableOpacity onPress={() => { setType('add'); actionSheetRef.current.show(); }}>
            <AntDesign name='plussquare' size={28} color={color.lightBlue1} />
        </TouchableOpacity>
    );

    useFocusEffect(
        useCallback(() => {
            getBanners();
        }, [])
    );

    const getBanners = async () => {
        try {
            const snapshot = await firestore().collection('Banners').get();
            if (snapshot.empty) {
                Snackbar.show({
                    text: 'No banners found!',
                    duration: Snackbar.LENGTH_SHORT,
                });
            } else {
                const bannersArray = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
                setBanners(bannersArray);
            }
        } catch (error) {
            Snackbar.show({
                text: 'Error fetching banners',
                duration: Snackbar.LENGTH_SHORT,
            });
            console.log(error);
        }
    };

    const handleCreate = async () => {
        try {
            if (uploadUri && name !== '' && desc !== '') {
                setLoading(true);
                const responseUri = await uploadImage(uploadUri);
                const product = {
                    head: name,
                    content: desc,
                    image: responseUri,
                    text: 'Shop Now'
                };

                await firestore().collection('Banners').add(product).then(() => {
                    setLoading(false);
                    setTimeout(() => {
                        Snackbar.show({
                            text: "Product Added Successfully",
                            duration: Snackbar.LENGTH_LONG,
                            backgroundColor: color.primaryGreen,
                            textColor: color.creamWhite
                        });
                    }, 1000);

                });
                actionSheetRef.current.hide();
                setName('')
                setDesc('')
                setUploadUri(null)
                getBanners();
            } else {
                Snackbar.show({
                    text: "Please Fill Up All Fields",
                    duration: Snackbar.LENGTH_LONG,
                    backgroundColor: color.red,
                    textColor: color.creamWhite
                });
            }
        } catch (error) {
            setLoading(false);
            console.log(error);
        }
    };

    const handleUpdate = async () => {
        try {
            if (bannerId && uploadUri && name !== '' && desc !== '') {
                setLoading(true);
                const responseUri = uploadUri.includes('file://') ? await uploadImage(uploadUri) : uploadUri;
                const product = {
                    head: name,
                    content: desc,
                    image: responseUri,
                    text: 'Shop Now'
                };

                await firestore().collection('Banners').doc(bannerId).update(product).then(() => {
                    setLoading(false);
                    setTimeout(() => {
                        Snackbar.show({
                            text: "Product Updated Successfully",
                            duration: Snackbar.LENGTH_LONG,
                            backgroundColor: color.primaryGreen,
                            textColor: color.creamWhite
                        });
                    }, 1000);
                    actionSheetRef.current.hide();
                });
            } else {
                Snackbar.show({
                    text: "Please Fill Up All Fields",
                    duration: Snackbar.LENGTH_LONG,
                    backgroundColor: color.red,
                    textColor: color.creamWhite
                });
            }
        } catch (error) {
            setLoading(false);
            console.log(error);
        }
    }

    const handleImage = async () => {
        const options = {
            mediaType: 'photo'
        };
        await launchImageLibrary(options, response => {
            if (response && response.assets) {
                setUploadUri(response.assets[0].uri);
            }
        });
    };

    const handleCamera = async () => {
        const options = {
            mediaType: 'photo'
        };
        await launchCamera(options, response => {
            if (response && response.assets) {
                setUploadUri(response.assets[0].uri);
            }
        });
    };

    const handleProductDelete = async bannersData => {
        try {
            await firestore().collection('Banners').doc(bannersData.id).delete().then(() => {
                Snackbar.show({
                    text: "Product Deleted Successfully",
                    duration: Snackbar.LENGTH_LONG,
                    backgroundColor: color.primaryGreen,
                    textColor: color.creamWhite
                });
            });
            getBanners();
        } catch (error) {
            console.log(error);
        }
    };

    const handleProductEdit = bannersData => {
        setBannerId(bannersData.id)
        setName(bannersData.head)
        setDesc(bannersData.content)
        setUploadUri(bannersData.image)
        setType('edit')
        actionSheetRef.current.show()
    };

    const renderItem = ({ item }) => (
        <View style={styles.bannerContainer}>
            <ImageBackground
                source={{ uri: item.image }}
                style={{
                    width: width * 0.95,
                    height: height * 0.25,
                    resizeMode: 'cover',
                    overflow: 'hidden',
                }}
            >
                <View style={styles.buttonsContainer}>
                    <TouchableOpacity onPress={() => handleProductDelete(item)}>
                        <AntDesign name='delete' size={28} color={color.white} />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => handleProductEdit(item)}>
                        <FontAwesome name='edit' size={28} color={color.white} style={{ marginLeft: 10 }} />
                    </TouchableOpacity>
                </View>
                <View style={styles.innerView} />
            </ImageBackground>
        </View>
    );

    return (
        <SafeAreaView style={styles.container}>
            <ActionSheet ref={actionSheetRef}>
                <View style={{ padding: 20 }}>
                    <TouchableOpacity onPress={() => actionSheetRef.current.hide()} style={{ alignSelf: 'flex-end' }}>
                        <AntDesign name='closecircleo' size={28} color={color.black} />
                    </TouchableOpacity>
                    <CustomTextInput
                        key="name"
                        type="name"
                        value={name}
                        handleText={(text) => setName(text)}
                        placeholder="Name"
                    />
                    <CustomTextInput
                        key="desc"
                        type="desc"
                        value={desc}
                        handleText={(text) => setDesc(text)}
                        placeholder="Description"
                    />
                    <View style={styles.uploadContainer}>
                        <Text style={styles.uploadButtonText}>Upload Banner</Text>
                        {uploadUri ? (
                            <View>
                                <TouchableOpacity onPress={() => setUploadUri(null)}>
                                    <AntDesign name='closecircleo' size={30} color={color.creamWhite} style={{ marginLeft: 90, marginVertical: 5 }} />
                                </TouchableOpacity>
                                <Image source={{ uri: uploadUri }} style={{ width: 100, height: 100, resizeMode: 'contain' }} />
                            </View>
                        ) : (
                            <Entypo name='images' size={40} color={color.creamWhite} style={styles.uploadButtonIcon} />
                        )}
                    </View>
                    <View style={styles.actionSheetOptions}>
                        <TouchableOpacity onPress={handleImage}>
                            <Entypo name='images' size={40} color={color.lightBlue1} style={styles.uploadButtonIcon} />
                        </TouchableOpacity>
                        <TouchableOpacity onPress={handleCamera}>
                            <Entypo name='camera' size={40} color={color.lightBlue1} style={styles.uploadButtonIcon} />
                        </TouchableOpacity>
                    </View>
                    <CustomButton
                        type='primary'
                        ButtonText={type === 'add' ? 'Create Banner' : 'Update Banner'}
                        handleButton={type === 'add' ? handleCreate : handleUpdate}
                    />
                </View>
            </ActionSheet>
            <Modal animationType="fade" transparent={true} visible={loading}>
                <View style={styles.modalContainer}>
                    <ActivityIndicator size="large" color={color.white} />
                </View>
            </Modal>
            <FlatList
                data={banners}
                keyExtractor={(item) => item.id.toString()}
                renderItem={renderItem}
            />
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: color.white,
        alignItems: 'center',
        justifyContent: 'center',
    },
    modalContainer: {
        height: '100%',
        width: '100%',
        backgroundColor: 'rgba(0,0,0,0.7)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    bannerContainer: {
        marginTop: 10,
    },
    buttonsContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        position: 'absolute',
        top: 5,
        right: 8,
        zIndex: 1, // Ensure buttons are on top
    },
    innerView: {
        flex: 1,
        borderRadius: 15,
        overflow: 'hidden',
    },
    uploadContainer: {
        alignItems: 'center',
        marginVertical: 10,
    },
    uploadButtonText: {
        marginBottom: 10,
        fontSize: 16,
        color: color.black,
    },
    uploadedImage: {
        width: 100,
        height: 100,
        resizeMode: 'contain',
    },
    uploadButtonIcon: {
        marginRight: 10,
        marginVertical: 5,
    },
    actionSheetOptions: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-around',
        padding: 20,
        paddingBottom: 50,
    },
});

export default Banners;


/////////////////////////////////////////////





