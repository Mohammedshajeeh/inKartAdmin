// import React, { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";
// import { FlatList, Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
// import { useFocusEffect, useNavigation, useRoute } from "@react-navigation/native";
// import color from "../../components/Common/color";
// import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
// import Entypo from "react-native-vector-icons/Entypo";
// import AntDesign from "react-native-vector-icons/AntDesign";
// import CustomButton from "../../components/CustomButton";
// import firestore from "@react-native-firebase/firestore";
// import CustomTextInput from "../../components/CustomTextInput";
// import CustomDropDown from "../../components/CustomDropDown";
// import ActionSheet from "react-native-actions-sheet";
// import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
// import uploadImage from "../../components/Common/storage";
// import Snackbar from "react-native-snackbar";

// const CreateProduct = () => {
//     const route = useRoute()
//     const { type } = route.params
//     const data = route.params.data
//     const navigation = useNavigation();
//     const [categories, setCategories] = useState([]);
//     const [uploadUri, setUploadUri] = useState('');
//     const [name, setName] = useState('');
//     const [description, setDescription] = useState('');
//     const [price, setPrice] = useState('');
//     const [quantity, setQuantity] = useState(0);
//     const [catagory, setCatagory] = useState(null);
//     const actionSheetRef = useRef(null);

//     useLayoutEffect(() => {
//         navigation.setOptions({
//             title: type === 'create' ? 'Create Product' : 'Edit Product',
//             headerTintColor: color.black,
//             headerStyle: {
//                 backgroundColor: color.lightWhit,
//             },
//             headerLeft: () => (
//                 <TouchableOpacity onPress={() => navigation.goBack()}>
//                     <FontAwesome5 name='arrow-alt-circle-left' size={30} color={color.lightBlue1} style={{ marginRight: 10 }} />
//                 </TouchableOpacity>
//             ),
//         });
//     }, [navigation]);




//     useEffect(() => {
//         setName(data?.head)
//         setDescription(data?.description)
//         setPrice(data?.price)
//         setQuantity(data?.quantity)
//         setUploadUri(data?.image)
//         setCategoryWithObj()
//     }, [data])

//     useFocusEffect(
//         useCallback(() => {
//             getCategories();
//         }, [])
//     );

//     useEffect(() => {
//         if (catagory) {
//             setCatagory(catagory)
//         }
//     }, [catagory])

//     const getCategories = async () => {
//         try {
//             const snapshot = await firestore().collection('Catagory').get();
//             if (!snapshot.empty) {
//                 const categoriesArray = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
//                 setCategories(categoriesArray);
//                 setCategoryWithObj(categoriesArray)
//             }
//         } catch (error) {
//             console.log(error);
//         }
//     };

//     const setCategoryWithObj = objArray => {
//         if (data && data.catagId) {
//             const result = objArray.find(ele => ele.id === data.catagId);
//             setCatagory(result);
//             console.log(result);
//         }
//     };
//     console.log(data.catagId);


//     const handleImage = async () => {
//         const options = {
//             mediaType: 'photo'
//         }
//         await launchImageLibrary(options, response => {
//             actionSheetRef.current?.hide()
//             if (response && response.assets) {
//                 setUploadUri(response?.assets[0]?.uri)
//             }
//         });
//     };

//     const handleCamera = async () => {
//         const options = {
//             mediaType: 'photo'
//         }
//         await launchCamera(options, response => {
//             actionSheetRef.current?.hide()
//             if (response && response.assets) {
//                 setUploadUri(response?.assets[0]?.uri)
//             }
//         });
//     };

//     const renderItem = ({ item }) => {
//         return item;
//     };

//     const handleUpdateProduct = async () => {
//         try {
//             if (
//                 uploadUri &&
//                 name !== '' &&
//                 description !== '' &&
//                 price !== '' &&
//                 quantity !== '' &&
//                 catagory
//             ) {
//                 const responseUri = uploadUri.includes('file://') ? await uploadImage(uploadUri) : uploadUri
//                 const product = {
//                     created: Date.now(),
//                     updated: Date.now(),
//                     head: name || '',  // Default to empty string if undefined
//                     description: description || '',  // Default to empty string if undefined
//                     catagId: catagory.id || '',  // Default to empty string if undefined
//                     catagoryName: categories[0].head || '',  // Default to empty string if undefined
//                     price: price || '',  // Default to empty string if undefined
//                     quantity: quantity || '',  // Default to empty string if undefined
//                     image: responseUri || ''  // Default to empty string if undefined
//                 };

//                 await firestore().collection('Products').doc(data.id).update(product).then(() => {
//                     Snackbar.show({
//                         text: "Product Added Successfully",
//                         duration: Snackbar.LENGTH_LONG,
//                         backgroundColor: color.primaryGreen,
//                         textColor: color.creamWhite
//                     });
//                     navigation.goBack();
//                 });
//             } else {
//                 Snackbar.show({
//                     text: "Please Fill Up All Fields",
//                     duration: Snackbar.LENGTH_LONG,
//                     backgroundColor: color.red,
//                     textColor: color.creamWhite
//                 });
//             }
//         } catch (error) {
//             console.log(error);
//         }
//     }

//     const handleProduct = async () => {
//         try {
//             if (
//                 uploadUri &&
//                 name !== '' &&
//                 description !== '' &&
//                 price !== '' &&
//                 quantity !== '' &&
//                 catagory
//             ) {
//                 const responseUri = await uploadImage(uploadUri);
//                 const product = {
//                     created: Date.now(),
//                     updated: Date.now(),
//                     head: name || '',  // Default to empty string if undefined
//                     description: description || '',  // Default to empty string if undefined
//                     catagId: catagory.id || '',  // Default to empty string if undefined
//                     catagoryName: catagory.head || '',  // Default to empty string if undefined
//                     price: price || '',  // Default to empty string if undefined
//                     quantity: quantity || '',  // Default to empty string if undefined
//                     image: responseUri || ''  // Default to empty string if undefined
//                 };

//                 await firestore().collection('Products').add(product).then(() => {
//                     Snackbar.show({
//                         text: "Product Added Successfully",
//                         duration: Snackbar.LENGTH_LONG,
//                         backgroundColor: color.primaryGreen,
//                         textColor: color.creamWhite
//                     });
//                     navigation.goBack();
//                 });
//             } else {
//                 Snackbar.show({
//                     text: "Please Fill Up All Fields",
//                     duration: Snackbar.LENGTH_LONG,
//                     backgroundColor: color.red,
//                     textColor: color.creamWhite
//                 });
//             }
//         } catch (error) {
//             console.log(error);
//         }
//     };


//     //////////////////////////

//     return (
//         <FlatList
//             data={[
//                 <View key="actionSheet">
//                     <ActionSheet ref={actionSheetRef}>
//                         <View style={styles.actionSheetContent}>
//                             <Text style={styles.actionSheetTitle}>Select Options</Text>
//                             <TouchableOpacity onPress={() => actionSheetRef.current?.hide()} style={styles.closeButton}>
//                                 <AntDesign name='closecircleo' size={28} color={color.lightBlue1} />
//                             </TouchableOpacity>
//                         </View>
//                         <View style={styles.actionSheetOptions}>
//                             <TouchableOpacity onPress={handleImage}>
//                                 <Entypo name='images' size={40} color={color.lightBlue1} style={styles.uploadButtonIcon} />
//                             </TouchableOpacity>
//                             <TouchableOpacity onPress={handleCamera}>
//                                 <Entypo name='camera' size={40} color={color.lightBlue1} style={styles.uploadButtonIcon} />
//                             </TouchableOpacity>
//                         </View>
//                     </ActionSheet>
//                 </View>,
//                 <CustomTextInput key="name"
//                     type="name"
//                     value={name}
//                     handleText={(text) => setName(text)}
//                     placeholder="Name" />,
//                 <CustomTextInput key="description"
//                     value={description}
//                     handleText={(text) => setDescription(text)}
//                     placeholder="Description"
//                     multiline={true} />,
//                 categories.length > 0 ? (
//                     <CustomDropDown key="dropdown" data={categories} create={true} prevData={catagory} setData={(obj) => setCatagory(obj)} />
//                 ) : null,
//                 <CustomTextInput key="price"
//                     value={price}
//                     handleText={(text) => setPrice(text)}
//                     placeholder="Price" />,
//                 <CustomTextInput key="quantity"
//                     value={quantity}
//                     handleText={(text) => setQuantity(text)}
//                     placeholder="Quantity" />,
//                 <TouchableOpacity
//                     key="uploadButton"
//                     onPress={() => actionSheetRef.current?.show()}
//                     style={styles.uploadButton}
//                 >
//                     <Text style={styles.uploadButtonText}>Upload Product Image</Text>
//                     {uploadUri ? (
//                         <View>
//                             <TouchableOpacity onPress={() => setUploadUri(null)}>
//                                 <AntDesign name='closecircleo' size={30} color={color.creamWhite} style={{ marginLeft: 90, marginVertical: 5 }} />
//                             </TouchableOpacity>
//                             <Image source={{ uri: uploadUri }} style={{ width: 100, height: 100, resizeMode: 'contain' }} />
//                         </View>
//                     ) : (<Entypo name='images' size={40} color={color.creamWhite} style={styles.uploadButtonIcon} />)
//                     }
//                 </TouchableOpacity>,

//                 <CustomButton type='primary' ButtonText={type === 'create' ? 'Create Product' : 'Update Product'} handleButton={type === 'create' ? handleProduct : handleUpdateProduct} />
//             ]}
//             renderItem={renderItem}
//             keyExtractor={(item, index) => index.toString()}
//             style={styles.container}
//         />
//     );
// };

// const styles = StyleSheet.create({
//     container: {
//         flex: 1,
//         padding: 20,
//         backgroundColor: color.white,
//     },
//     actionSheetContent: {
//         padding: 20,
//         flexDirection: 'row',
//         justifyContent: 'space-between',
//         alignItems: 'center',
//         paddingBottom: 30,
//         borderBottomWidth: StyleSheet.hairlineWidth,
//         borderColor: color.lightBlue1,
//     },
//     closeButton: {
//         alignSelf: 'flex-end',
//     },
//     actionSheetTitle: {
//         fontSize: 16,
//         color: color.lightBlue1,
//         fontFamily: 'Lato-Regular',
//         lineHeight: 50,
//     },
//     actionSheetOptions: {
//         flexDirection: 'row',
//         alignItems: 'center',
//         justifyContent: 'space-around',
//         padding: 20,
//         paddingBottom: 50,
//     },
//     uploadButton: {
//         justifyContent: 'center',
//         alignItems: 'center',
//         padding: 15,
//         borderRadius: 15,
//         borderWidth: StyleSheet.hairlineWidth,
//         backgroundColor: color.lightBlue1,
//         marginVertical: 20,
//     },
//     uploadButtonText: {
//         fontSize: 16,
//         color: color.creamWhite,
//         fontFamily: 'Lato-Regular',
//     },
//     uploadButtonIcon: {
//         marginRight: 10,
//         marginVertical: 5,
//     },
// });

// export default CreateProduct;


// //////////////////////////////////////////////////

import React, { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";
import { FlatList, Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useFocusEffect, useNavigation, useRoute } from "@react-navigation/native";
import color from "../../components/Common/color";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import Entypo from "react-native-vector-icons/Entypo";
import AntDesign from "react-native-vector-icons/AntDesign";
import CustomButton from "../../components/CustomButton";
import firestore from "@react-native-firebase/firestore";
import CustomTextInput from "../../components/CustomTextInput";
import CustomDropDown from "../../components/CustomDropDown";
import ActionSheet from "react-native-actions-sheet";
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import uploadImage from "../../components/Common/storage";
import Snackbar from "react-native-snackbar";

const CreateProduct = () => {
    const route = useRoute();
    const { type } = route.params;
    const data = route.params.data;
    const navigation = useNavigation();
    const [categories, setCategories] = useState([]);
    const [uploadUri, setUploadUri] = useState('');
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState('');
    const [quantity, setQuantity] = useState(0);
    const [catagory, setCatagory] = useState(null);
    const actionSheetRef = useRef(null);

    useLayoutEffect(() => {
        navigation.setOptions({
            title: type === 'create' ? 'Create Product' : 'Edit Product',
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

    useEffect(() => {
        setName(data?.head);
        setDescription(data?.description);
        setPrice(data?.price);
        setQuantity(data?.quantity);
        setUploadUri(data?.image);
    }, [data]);

    useFocusEffect(
        useCallback(() => {
            getCategories();
        }, [])
    );

    const getCategories = async () => {
        try {
            const snapshot = await firestore().collection('Catagory').get();
            if (!snapshot.empty) {
                const categoriesArray = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
                setCategories(categoriesArray);
                setCategoryWithObj(categoriesArray)
            }
        } catch (error) {
            console.log(error);
        }
    };

    const setCategoryWithObj = (categoriesArray) => {
        if (data && data.catagId) {
            const result = categoriesArray.find(ele => ele.id === data.catagId);
            setCatagory(result);
        }
    };

    const handleImage = async () => {
        const options = {
            mediaType: 'photo'
        };
        await launchImageLibrary(options, response => {
            actionSheetRef.current?.hide();
            if (response && response.assets) {
                setUploadUri(response?.assets[0]?.uri);
            }
        });
    };

    const handleCamera = async () => {
        const options = {
            mediaType: 'photo'
        };
        await launchCamera(options, response => {
            actionSheetRef.current?.hide();
            if (response && response.assets) {
                setUploadUri(response?.assets[0]?.uri);
            }
        });
    };

    const renderItem = ({ item }) => {
        return item;
    };

    const handleUpdateProduct = async () => {
        try {
            if (
                uploadUri &&
                name !== '' &&
                description !== '' &&
                price !== '' &&
                quantity !== '' &&
                catagory
            ) {
                const responseUri = uploadUri.includes('file://') ? await uploadImage(uploadUri) : uploadUri;
                const product = {
                    created: Date.now(),
                    updated: Date.now(),
                    head: name,
                    description: description,
                    catagId: catagory.id,
                    catagoryName: catagory.head,
                    price: price,
                    quantity: quantity,
                    image: responseUri
                };

                await firestore().collection('Products').doc(data.id).update(product).then(() => {
                    Snackbar.show({
                        text: "Product Updated Successfully",
                        duration: Snackbar.LENGTH_LONG,
                        backgroundColor: color.primaryGreen,
                        textColor: color.creamWhite
                    });
                    navigation.goBack();
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
            console.log(error);
        }
    };

    const handleProduct = async () => {
        try {
            if (
                uploadUri &&
                name !== '' &&
                description !== '' &&
                price !== '' &&
                quantity !== '' &&
                catagory
            ) {
                const responseUri = await uploadImage(uploadUri);
                const product = {
                    created: Date.now(),
                    updated: Date.now(),
                    head: name,
                    description: description,
                    catagId: catagory.id,
                    catagoryName: catagory.head,
                    price: price,
                    quantity: quantity,
                    image: responseUri
                };

                await firestore().collection('Products').add(product).then(() => {
                    Snackbar.show({
                        text: "Product Added Successfully",
                        duration: Snackbar.LENGTH_LONG,
                        backgroundColor: color.primaryGreen,
                        textColor: color.creamWhite
                    });
                    navigation.goBack();
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
            console.log(error);
        }
    };

    return (
        <FlatList
            data={[
                <View key="actionSheet">
                    <ActionSheet ref={actionSheetRef}>
                        <View style={styles.actionSheetContent}>
                            <Text style={styles.actionSheetTitle}>Select Options</Text>
                            <TouchableOpacity onPress={() => actionSheetRef.current?.hide()} style={styles.closeButton}>
                                <AntDesign name='closecircleo' size={28} color={color.lightBlue1} />
                            </TouchableOpacity>
                        </View>
                        <View style={styles.actionSheetOptions}>
                            <TouchableOpacity onPress={handleImage}>
                                <Entypo name='images' size={40} color={color.lightBlue1} style={styles.uploadButtonIcon} />
                            </TouchableOpacity>
                            <TouchableOpacity onPress={handleCamera}>
                                <Entypo name='camera' size={40} color={color.lightBlue1} style={styles.uploadButtonIcon} />
                            </TouchableOpacity>
                        </View>
                    </ActionSheet>
                </View>,
                <CustomTextInput key="name"
                    type="name"
                    value={name}
                    handleText={(text) => setName(text)}
                    placeholder="Name" />,
                <CustomTextInput key="description"
                    value={description}
                    handleText={(text) => setDescription(text)}
                    placeholder="Description"
                    multiline={true} />,
                categories.length > 0 ? (
                    <CustomDropDown key="dropdown" data={categories} create={true} prevData={catagory} setData={(obj) => setCatagory(obj)} />
                ) : null,
                <CustomTextInput key="price"
                    value={price}
                    handleText={(text) => setPrice(text)}
                    placeholder="Price" />,
                <CustomTextInput key="quantity"
                    value={quantity}
                    handleText={(text) => setQuantity(text)}
                    placeholder="Quantity" />,
                <TouchableOpacity
                    key="uploadButton"
                    onPress={() => actionSheetRef.current?.show()}
                    style={styles.uploadButton}
                >
                    <Text style={styles.uploadButtonText}>Upload Product Image</Text>
                    {uploadUri ? (
                        <View>
                            <TouchableOpacity onPress={() => setUploadUri(null)}>
                                <AntDesign name='closecircleo' size={30} color={color.creamWhite} style={{ marginLeft: 90, marginVertical: 5 }} />
                            </TouchableOpacity>
                            <Image source={{ uri: uploadUri }} style={{ width: 100, height: 100, resizeMode: 'contain' }} />
                        </View>
                    ) : (<Entypo name='images' size={40} color={color.creamWhite} style={styles.uploadButtonIcon} />)
                    }
                </TouchableOpacity>,

                <CustomButton type='primary' ButtonText={type === 'create' ? 'Create Product' : 'Update Product'} handleButton={type === 'create' ? handleProduct : handleUpdateProduct} />
            ]}
            renderItem={renderItem}
            keyExtractor={(item, index) => index.toString()}
            style={styles.container}
        />
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: color.white,
    },
    actionSheetContent: {
        padding: 20,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingBottom: 30,
        borderBottomWidth: StyleSheet.hairlineWidth,
        borderColor: color.lightBlue1,
    },
    closeButton: {
        alignSelf: 'flex-end',
    },
    actionSheetTitle: {
        fontSize: 16,
        color: color.lightBlue1,
        fontFamily: 'Lato-Regular',
        lineHeight: 50,
    },
    actionSheetOptions: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-around',
        padding: 20,
        paddingBottom: 50,
    },
    uploadButton: {
        justifyContent: 'center',
        alignItems: 'center',
        padding: 15,
        borderRadius: 15,
        borderWidth: StyleSheet.hairlineWidth,
        backgroundColor: color.lightBlue1,
        marginVertical: 20,
    },
    uploadButtonText: {
        fontSize: 16,
        color: color.creamWhite,
        fontFamily: 'Lato-Regular',
    },
    uploadButtonIcon: {
        marginRight: 10,
        marginVertical: 5,
    },
});

export default CreateProduct;

