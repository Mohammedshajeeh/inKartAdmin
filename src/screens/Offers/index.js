

// import { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";
// import { FlatList, Image, ImageBackground, Text, TouchableOpacity, View } from "react-native";
// import { useFocusEffect, useNavigation } from "@react-navigation/native";
// import color from "../../components/Common/color";
// import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
// import FontAwesome from "react-native-vector-icons/FontAwesome";
// import AntDesign from "react-native-vector-icons/AntDesign";
// import firestore from "@react-native-firebase/firestore";
// import Snackbar from "react-native-snackbar";
// import ActionSheet from "react-native-actions-sheet";
// import CustomTextInput from "../../components/CustomTextInput";
// import CustomButton from "../../components/CustomButton";
// import Clipboard from '@react-native-clipboard/clipboard';

// const Offers = () => {
//     const navigation = useNavigation();
//     const [offer, setOffer] = useState([]);
//     const [head1, setHead1] = useState('');
//     const [offer1, setOffer1] = useState('');
//     const [offerCode1, setOfferCode1] = useState('');
//     const [subHead1, setSubHead1] = useState('');
//     const [loading, setLoading] = useState(false);
//     const actionSheetRef = useRef(null);
//     const actionSheetRefChooseOption = useRef(null);
//     const [selected, setSelected] = useState(null);
//     const [offerId, setOfferId] = useState(null);
//     const [type, setType] = useState(null);

//     useLayoutEffect(() => {
//         navigation.setOptions({
//             title: 'Offers',
//             headerTintColor: color.black,
//             headerStyle: {
//                 backgroundColor: color.lightWhit
//             },
//             headerLeft: () => (
//                 <TouchableOpacity onPress={() => navigation.goBack()}>
//                     <FontAwesome5 name='arrow-alt-circle-left' size={30} color={color.lightBlue1} style={{ marginRight: 10 }} />
//                 </TouchableOpacity>
//             ),
//             headerRight: () => <RightComponent />
//         });
//     }, [navigation]);

//     const RightComponent = () => (
//         <TouchableOpacity onPress={() => { setType('add'); actionSheetRef.current.show(); }}>
//             <AntDesign name='plussquare' size={28} color={color.lightBlue1} />
//         </TouchableOpacity>
//     );

//     useFocusEffect(
//         useCallback(() => {
//             getOffers();
//         }, [])
//     );

//     const getOffers = async () => {
//         try {
//             const snapshot = await firestore().collection('Offers').get();
//             if (snapshot.empty) {
//                 Snackbar.show({
//                     text: 'No offers found!',
//                     duration: Snackbar.LENGTH_SHORT,
//                 });
//             } else {
//                 const offersArray = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
//                 setOffer(offersArray);
//             }
//         } catch (error) {
//             Snackbar.show({
//                 text: 'Error fetching offers',
//                 duration: Snackbar.LENGTH_SHORT,
//             });
//             console.log(error);
//         }
//     };

//     const handleCreate = async () => {
//         if (head1 !== '' && subHead1 !== '' && offer1 !== '' && offerCode1 !== '') {
//             setLoading(true);
//             const product = {
//                 head: head1,
//                 subHead: subHead1,
//                 offer: offer1,
//                 offerCode: offerCode1
//             };

//             try {
//                 await firestore().collection('Offers').add(product);
//                 setLoading(false);
//                 Snackbar.show({
//                     text: "Offer Added Successfully",
//                     duration: Snackbar.LENGTH_LONG,
//                     backgroundColor: color.primaryGreen,
//                     textColor: color.creamWhite
//                 });
//                 actionSheetRef.current.hide();
//                 setHead1('');
//                 setSubHead1('');
//                 setOffer1('');
//                 setOfferCode1('');
//                 getOffers();
//             } catch (error) {
//                 setLoading(false);
//                 Snackbar.show({
//                     text: 'Error adding offer',
//                     duration: Snackbar.LENGTH_LONG,
//                     backgroundColor: color.red,
//                     textColor: color.creamWhite
//                 });
//                 console.log(error);
//             }
//         } else {
//             Snackbar.show({
//                 text: "Please Fill Up All Fields",
//                 duration: Snackbar.LENGTH_LONG,
//                 backgroundColor: color.red,
//                 textColor: color.creamWhite
//             });
//         }
//     };

//     const handledit = () => {
//         actionSheetRefChooseOption.current.hide();
//         setTimeout(() => {
//             setOfferId(selected.id);
//             setHead1(selected.head);
//             setSubHead1(selected.subHead);
//             setOffer1(selected.offer);
//             setOfferCode1(selected.offerCode);
//             setType('edit');
//             actionSheetRef.current.show();
//         }, 1000);
//     };

//     const handlcopy = () => {
//         actionSheetRefChooseOption.current.hide();
//         setTimeout(() => {
//             Clipboard.setString(selected.offerCode);
//             Snackbar.show({
//                 text: 'Your OfferCode Copy',
//                 duration: Snackbar.LENGTH_SHORT,
//                 backgroundColor: color.primaryGreen,
//                 textColor: color.creamWhite


//             });
//         }, 1000);
//     };

//     const handledelete = async () => {
//         actionSheetRefChooseOption.current.hide();
//         try {
//             await firestore().collection('Offers').doc(selected.id).delete();
//             Snackbar.show({
//                 text: "Product Deleted Successfully",
//                 duration: Snackbar.LENGTH_LONG,
//                 backgroundColor: color.primaryGreen,
//                 textColor: color.creamWhite
//             });
//             setSelected(null);
//             getOffers();
//         } catch (error) {
//             console.log(error);
//         }
//     };

//     const handleUpdate = async () => {
//         if (offerId && head1 !== '' && subHead1 !== '' && offer1 !== '' && offerCode1 !== '') {
//             setLoading(true);
//             const product = {
//                 head: head1,
//                 subHead: subHead1,
//                 offer: offer1,
//                 offerCode: offerCode1
//             };

//             try {
//                 await firestore().collection('Offers').doc(offerId).update(product);
//                 setLoading(false);
//                 Snackbar.show({
//                     text: "Product Updated Successfully",
//                     duration: Snackbar.LENGTH_LONG,
//                     backgroundColor: color.primaryGreen,
//                     textColor: color.creamWhite
//                 });
//                 actionSheetRef.current.hide();
//                 setHead1('');
//                 setSubHead1('');
//                 setOffer1('');
//                 setOfferCode1('');
//                 getOffers();
//             } catch (error) {
//                 setLoading(false);
//                 Snackbar.show({
//                     text: 'Error updating offer',
//                     duration: Snackbar.LENGTH_LONG,
//                     backgroundColor: color.red,
//                     textColor: color.creamWhite
//                 });
//                 console.log(error);
//             }
//         } else {
//             Snackbar.show({
//                 text: "Please Fill Up All Fields",
//                 duration: Snackbar.LENGTH_LONG,
//                 backgroundColor: color.red,
//                 textColor: color.creamWhite
//             });
//         }
//     };

//     return (
//         <View style={{ padding: 15 }}>
//             <ActionSheet ref={actionSheetRef}>
//                 <View style={{ padding: 20 }}>
//                     <TouchableOpacity onPress={() => {
//                         actionSheetRef.current.hide()
//                         setType(null)
//                         setSelected(null)
//                         setHead1('');
//                         setSubHead1('');
//                         setOffer1('');
//                         setOfferCode1('');
//                     }} style={{ alignSelf: 'flex-end' }}>
//                         <AntDesign name='closecircleo' size={28} color={color.black} />
//                     </TouchableOpacity>
//                     <CustomTextInput
//                         key="head"
//                         type="name"
//                         value={head1}
//                         handleText={(text) => setHead1(text)}
//                         placeholder="Offer Name"
//                     />
//                     <CustomTextInput
//                         key="subHead"
//                         type="name"
//                         value={subHead1}
//                         handleText={(text) => setSubHead1(text)}
//                         placeholder="Sub Name"
//                     />
//                     <CustomTextInput
//                         key="offer"
//                         type="name"
//                         value={offer1}
//                         handleText={(text) => setOffer1(text)}
//                         placeholder="Offer"
//                     />
//                     <CustomTextInput
//                         key="offerCode"
//                         type="name"
//                         value={offerCode1}
//                         handleText={(text) => setOfferCode1(text)}
//                         placeholder="Code"
//                     />
//                     <CustomButton
//                         type='primary'
//                         ButtonText={type === 'add' ? 'Create Offer' : 'Update Offer'}
//                         handleButton={type === 'add' ? handleCreate : handleUpdate}
//                     />
//                 </View>
//             </ActionSheet>
//             <ActionSheet ref={actionSheetRefChooseOption}>
//                 <View style={{ padding: 20 }}>
//                     <TouchableOpacity onPress={() => actionSheetRefChooseOption.current.hide()} style={{ alignSelf: 'flex-end' }}>
//                         <AntDesign name='closecircleo' size={28} color={color.black} />
//                     </TouchableOpacity>
//                     <View style={{
//                         marginVertical: 10,
//                         flexDirection: 'row',
//                         alignItems: "center",
//                         justifyContent: 'space-around',
//                         padding: 15
//                     }}>
//                         <FontAwesome onPress={handledit} name='edit' size={38} color={color.black} />
//                         <AntDesign onPress={handlcopy} name='copy1' size={38} color={color.black} />
//                         <AntDesign onPress={handledelete} name='delete' size={38} color={color.black} />
//                     </View>
//                 </View>
//             </ActionSheet>
//             <FlatList
//                 data={offer}
//                 extraData={offer}
//                 renderItem={({ item }) => (
//                     <TouchableOpacity
//                         onPress={() => {
//                             setSelected(item);
//                             actionSheetRefChooseOption.current.show();
//                         }}
//                         style={{ justifyContent: 'center', alignSelf: 'center', marginVertical: 10, padding: 15 }}>
//                         <ImageBackground style={{ width: 350, height: 130 }} source={require('../../assets/images/offers2.webp')}>
//                             <View style={{ padding: 28, justifyContent: 'space-around', flexDirection: 'row' }}>
//                                 <View style={{ marginRight: 90 }}>
//                                     <Text style={{ fontSize: 30, fontFamily: 'Lato-Bold', fontWeight: 'bold' }}>{item.offer}%</Text>
//                                     <Text style={{ fontSize: 20, fontFamily: 'Lato-Bold' }}>{item.head}</Text>
//                                 </View>
//                                 <View>
//                                     <Text style={{ fontSize: 30, fontFamily: 'Lato-Bold' }}>Use Code</Text>
//                                     <Text style={{ fontSize: 21, fontFamily: 'Lato-Italic', backgroundColor: color.primaryGreen, borderRadius: 15, padding: 1, textAlign: 'center', color: color.white }}>{item.offerCode}</Text>
//                                 </View>
//                             </View>
//                         </ImageBackground>
//                     </TouchableOpacity>
//                 )}
//             />
//         </View>
//     );
// }

// export default Offers;

//////////////////////////////////////////


// import { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";
// import { FlatList, Image, ImageBackground, Text, TouchableOpacity, View } from "react-native";
// import { useFocusEffect, useNavigation } from "@react-navigation/native";
// import color from "../../components/Common/color";
// import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
// import FontAwesome from "react-native-vector-icons/FontAwesome";
// import AntDesign from "react-native-vector-icons/AntDesign";
// import firestore from "@react-native-firebase/firestore";
// import Snackbar from "react-native-snackbar";
// import ActionSheet from "react-native-actions-sheet";
// import CustomTextInput from "../../components/CustomTextInput";
// import CustomButton from "../../components/CustomButton";
// import Clipboard from '@react-native-clipboard/clipboard';

// const Offers = () => {
//     const navigation = useNavigation();
//     const [offer, setOffer] = useState([]);
//     const [head1, setHead1] = useState('');
//     const [offer1, setOffer1] = useState('');
//     const [offerCode1, setOfferCode1] = useState('');
//     const [subHead1, setSubHead1] = useState('');
//     const [loading, setLoading] = useState(false);
//     const actionSheetRef = useRef(null);
//     const actionSheetRefChooseOption = useRef(null);
//     const [selected, setSelected] = useState(null);
//     const [offerId, setOfferId] = useState(null);
//     const [type, setType] = useState(null);

//     useLayoutEffect(() => {
//         navigation.setOptions({
//             title: 'Offers',
//             headerTintColor: color.black,
//             headerStyle: {
//                 backgroundColor: color.lightWhit
//             },
//             headerLeft: () => (
//                 <TouchableOpacity onPress={() => navigation.goBack()}>
//                     <FontAwesome5 name='arrow-alt-circle-left' size={30} color={color.lightBlue1} style={{ marginRight: 10 }} />
//                 </TouchableOpacity>
//             ),
//             headerRight: () => <RightComponent />
//         });
//     }, [navigation]);

//     const RightComponent = () => (
//         <TouchableOpacity onPress={() => {
//             setType('add');
//             actionSheetRef.current.show();
//             resetForm();
//         }}>
//             <AntDesign name='plussquare' size={28} color={color.lightBlue1} />
//         </TouchableOpacity>
//     );

//     useFocusEffect(
//         useCallback(() => {
//             getOffers();
//         }, [])
//     );

//     const getOffers = async () => {
//         try {
//             const snapshot = await firestore().collection('Offers').get();
//             if (snapshot.empty) {
//                 Snackbar.show({
//                     text: 'No offers found!',
//                     duration: Snackbar.LENGTH_SHORT,
//                 });
//             } else {
//                 const offersArray = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
//                 setOffer(offersArray);
//             }
//         } catch (error) {
//             Snackbar.show({
//                 text: 'Error fetching offers',
//                 duration: Snackbar.LENGTH_SHORT,
//             });
//             console.log(error);
//         }
//     };

//     // const handleCreate = async () => {
//     //     if (head1 !== '' && subHead1 !== '' && offer1 !== '' && offerCode1 !== '') {
//     //         setLoading(true);
//     //         const product = {
//     //             head: head1,
//     //             subHead: subHead1,
//     //             offer: offer1,
//     //             offerCode: offerCode1
//     //         };

//     //         try {
//     //             await firestore().collection('Offers').add(product);
//     //             setLoading(false);
//     //             Snackbar.show({
//     //                 text: "Offer Added Successfully",
//     //                 duration: Snackbar.LENGTH_LONG,
//     //                 backgroundColor: color.primaryGreen,
//     //                 textColor: color.creamWhite
//     //             });
//     //             actionSheetRef.current.hide();
//     //             resetForm();
//     //             getOffers();
//     //         } catch (error) {
//     //             setLoading(false);
//     //             Snackbar.show({
//     //                 text: 'Error adding offer',
//     //                 duration: Snackbar.LENGTH_LONG,
//     //                 backgroundColor: color.red,
//     //                 textColor: color.creamWhite
//     //             });
//     //             console.log(error);
//     //         }
//     //     } else {
//     //         Snackbar.show({
//     //             text: "Please Fill Up All Fields",
//     //             duration: Snackbar.LENGTH_LONG,
//     //             backgroundColor: color.red,
//     //             textColor: color.creamWhite
//     //         });
//     //     }
//     // };

//     const handleCreate = async () => {
//         console.log("head1:", head1);
//         console.log("subHead1:", subHead1);
//         console.log("offer1:", offer1);
//         console.log("offerCode1:", offerCode1);

//         try {
//             if (head1 !== '' && subHead1 !== '' && offer1 !== '' && offerCode1 !== '') {
//                 setLoading(true);
//                 const product = {
//                     head: head1,
//                     subHead: subHead1,
//                     offer: offer1,
//                     offerCode: offerCode1
//                 };

//                 await firestore().collection('Offers').add(product).then(() => {
//                     setLoading(false);
//                     setTimeout(() => {
//                         Snackbar.show({
//                             text: "Product Added Successfully",
//                             duration: Snackbar.LENGTH_LONG,
//                             backgroundColor: color.primaryGreen,
//                             textColor: color.creamWhite
//                         });
//                     }, 1000);

//                 });
//                 actionSheetRef.current.hide();
//                 resetForm()
//                 getOffers();
//             } else {
//                 Snackbar.show({
//                     text: "Please Fill Up All Fields",
//                     duration: Snackbar.LENGTH_LONG,
//                     backgroundColor: color.red,
//                     textColor: color.creamWhite
//                 });
//             }
//         } catch (error) {
//             setLoading(false);
//             console.log(error);
//         }
//     };


//     const handledit = () => {
//         actionSheetRefChooseOption.current.hide();
//         setTimeout(() => {
//             setOfferId(selected.id);
//             setHead1(selected.head);
//             setSubHead1(selected.subHead);
//             setOffer1(selected.offer);
//             setOfferCode1(selected.offerCode);
//             setType('edit');
//             actionSheetRef.current.show();
//         }, 1000);
//     };

//     const handlcopy = () => {
//         actionSheetRefChooseOption.current.hide();
//         setTimeout(() => {
//             Clipboard.setString(selected.offerCode);
//             Snackbar.show({
//                 text: 'Your OfferCode Copy',
//                 duration: Snackbar.LENGTH_SHORT,
//                 backgroundColor: color.primaryGreen,
//                 textColor: color.creamWhite
//             });
//         }, 1000);
//     };

//     const handledelete = async () => {
//         actionSheetRefChooseOption.current.hide();
//         try {
//             await firestore().collection('Offers').doc(selected.id).delete();
//             Snackbar.show({
//                 text: "Product Deleted Successfully",
//                 duration: Snackbar.LENGTH_LONG,
//                 backgroundColor: color.primaryGreen,
//                 textColor: color.creamWhite
//             });
//             setSelected(null);
//             getOffers();
//         } catch (error) {
//             console.log(error);
//         }
//     };

//     const handleUpdate = async () => {
//         if (offerId && head1 && subHead1 && offer1 && offerCode1) {
//             setLoading(true);
//             const product = {
//                 head: head1,
//                 subHead: subHead1,
//                 offer: offer1,
//                 offerCode: offerCode1
//             };

//             try {
//                 await firestore().collection('Offers').doc(offerId).update(product);
//                 setLoading(false);
//                 Snackbar.show({
//                     text: "Product Updated Successfully",
//                     duration: Snackbar.LENGTH_LONG,
//                     backgroundColor: color.primaryGreen,
//                     textColor: color.creamWhite
//                 });
//                 actionSheetRef.current.hide();
//                 resetForm();
//                 getOffers();
//             } catch (error) {
//                 setLoading(false);
//                 Snackbar.show({
//                     text: 'Error updating offer',
//                     duration: Snackbar.LENGTH_LONG,
//                     backgroundColor: color.red,
//                     textColor: color.creamWhite
//                 });
//                 console.log(error);
//             }
//         } else {
//             Snackbar.show({
//                 text: "Please Fill Up All Fields",
//                 duration: Snackbar.LENGTH_LONG,
//                 backgroundColor: color.red,
//                 textColor: color.creamWhite
//             });
//         }
//     };

//     const resetForm = () => {
//         setHead1('');
//         setSubHead1('');
//         setOffer1('');
//         setOfferCode1('');
//         setOfferId(null);
//         setType(null);
//         setSelected(null);
//     };

//     return (
//         <View style={{ padding: 15 }}>
//             <ActionSheet ref={actionSheetRef}>
//                 <View style={{ padding: 20 }}>
//                     <TouchableOpacity onPress={() => {
//                         actionSheetRef.current.hide();
//                     }} style={{ alignSelf: 'flex-end' }}>
//                         <AntDesign name='closecircleo' size={28} color={color.black} />
//                     </TouchableOpacity>
//                     <CustomTextInput
//                         key="head"
//                         type="name"
//                         value={head1}
//                         handleText={(text) => setHead1(text)}
//                         placeholder="Offer Name"
//                     />
//                     <CustomTextInput
//                         key="subHead"
//                         type="name"
//                         value={subHead1}
//                         handleText={(text) => setSubHead1(text)}
//                         placeholder="Sub Name"
//                     />
//                     <CustomTextInput
//                         key="offer"
//                         type="name"
//                         value={offer1}
//                         handleText={(text) => setOffer1(text)}
//                         placeholder="Offer"
//                     />
//                     <CustomTextInput
//                         key="offerCode"
//                         type="name"
//                         value={offerCode1}
//                         handleText={(text) => setOfferCode1(text)}
//                         placeholder="Code"
//                     />
//                     <CustomButton
//                         type='primary'
//                         ButtonText={type === 'add' ? 'Create Offer' : 'Update Offer'}
//                         handleButton={type === 'add' ? handleCreate : handleUpdate}
//                     />
//                 </View>
//             </ActionSheet>
//             <ActionSheet ref={actionSheetRefChooseOption}>
//                 <View style={{ padding: 20 }}>
//                     <TouchableOpacity onPress={() => actionSheetRefChooseOption.current.hide()} style={{ alignSelf: 'flex-end' }}>
//                         <AntDesign name='closecircleo' size={28} color={color.black} />
//                     </TouchableOpacity>
//                     <View style={{
//                         marginVertical: 10,
//                         flexDirection: 'row',
//                         alignItems: "center",
//                         justifyContent: 'space-around',
//                         padding: 15
//                     }}>
//                         <FontAwesome onPress={handledit} name='edit' size={38} color={color.black} />
//                         <AntDesign onPress={handlcopy} name='copy1' size={38} color={color.black} />
//                         <AntDesign onPress={handledelete} name='delete' size={38} color={color.black} />
//                     </View>
//                 </View>
//             </ActionSheet>
//             <FlatList
//                 data={offer}
//                 extraData={offer}
//                 renderItem={({ item }) => (
//                     <TouchableOpacity
//                         onPress={() => {
//                             setSelected(item);
//                             actionSheetRefChooseOption.current.show();
//                         }}
//                         style={{ justifyContent: 'center', alignSelf: 'center', marginVertical: 10, padding: 15 }}>
//                         <ImageBackground style={{ width: 350, height: 130 }} source={require('../../assets/images/offers2.webp')}>
//                             <View style={{ padding: 28, justifyContent: 'space-around', flexDirection: 'row' }}>
//                                 <View style={{ marginRight: 90 }}>
//                                     <Text style={{ fontSize: 30, fontFamily: 'Lato-Bold', fontWeight: 'bold' }}>{item.offer}%</Text>
//                                     <Text style={{ fontSize: 20, fontFamily: 'Lato-Bold' }}>{item.head}</Text>
//                                 </View>
//                                 <View>
//                                     <Text style={{ fontSize: 30, fontFamily: 'Lato-Bold' }}>Use Code</Text>
//                                     <Text style={{ fontSize: 21, fontFamily: 'Lato-Italic', backgroundColor: color.primaryGreen, borderRadius: 15, padding: 1, textAlign: 'center', color: color.white }}>{item.offerCode}</Text>
//                                 </View>
//                             </View>
//                         </ImageBackground>
//                     </TouchableOpacity>
//                 )}
//             />
//         </View>
//     );
// }

// export default Offers;


/////////////////////////////////////////////////




import { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";
import { FlatList, Image, ImageBackground, Text, TouchableOpacity, View } from "react-native";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import color from "../../components/Common/color";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import AntDesign from "react-native-vector-icons/AntDesign";
import firestore from "@react-native-firebase/firestore";
import Snackbar from "react-native-snackbar";
import ActionSheet from "react-native-actions-sheet";
import CustomTextInput from "../../components/CustomTextInput";
import CustomButton from "../../components/CustomButton";
import Clipboard from '@react-native-clipboard/clipboard';

const Offers = () => {
    const navigation = useNavigation();
    const [offer, setOffer] = useState([]);
    const [head1, setHead1] = useState('');
    const [offer1, setOffer1] = useState('');
    const [offerCode1, setOfferCode1] = useState('');
    const [subHead1, setSubHead1] = useState('');
    const [loading, setLoading] = useState(false);
    const actionSheetRef = useRef(null);
    const actionSheetRefChooseOption = useRef(null);
    const [selected, setSelected] = useState(null);
    const [offerId, setOfferId] = useState(null);
    const [type, setType] = useState(null);

    useLayoutEffect(() => {
        navigation.setOptions({
            title: 'Offers',
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
            getOffers();
        }, [])
    );

    const getOffers = async () => {
        try {
            const snapshot = await firestore().collection('Offers').get();
            if (snapshot.empty) {
                Snackbar.show({
                    text: 'No offers found!',
                    duration: Snackbar.LENGTH_SHORT,
                });
            } else {
                const offersArray = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
                setOffer(offersArray);
            }
        } catch (error) {
            Snackbar.show({
                text: 'Error fetching offers',
                duration: Snackbar.LENGTH_SHORT,
            });
            console.log(error);
        }
    };

    const handleCreate = async () => {
        if (head1 !== '' && subHead1 !== '' && offer1 !== '' && offerCode1 !== '') {
            setLoading(true);
            const product = {
                head: head1,
                subHead: subHead1,
                offer: offer1,
                offerCode: offerCode1
            };

            try {
                await firestore().collection('Offers').add(product);
                setLoading(false);
                Snackbar.show({
                    text: "Offer Added Successfully",
                    duration: Snackbar.LENGTH_LONG,
                    backgroundColor: color.primaryGreen,
                    textColor: color.creamWhite
                });
                actionSheetRef.current.hide();
                setHead1('');
                setSubHead1('');
                setOffer1('');
                setOfferCode1('');
                getOffers();
            } catch (error) {
                setLoading(false);
                Snackbar.show({
                    text: 'Error adding offer',
                    duration: Snackbar.LENGTH_LONG,
                    backgroundColor: color.red,
                    textColor: color.creamWhite
                });
                console.log(error);
            }
        } else {
            Snackbar.show({
                text: "Please Fill Up All Fields",
                duration: Snackbar.LENGTH_LONG,
                backgroundColor: color.red,
                textColor: color.creamWhite
            });
        }
    };

    const handledit = () => {
        actionSheetRefChooseOption.current.hide();
        setTimeout(() => {
            setOfferId(selected.id);
            setHead1(selected.head);
            setSubHead1(selected.subHead);
            setOffer1(selected.offer);
            setOfferCode1(selected.offerCode);
            setType('edit');
            actionSheetRef.current.show();
        }, 1000);
    };

    const handlcopy = () => {
        actionSheetRefChooseOption.current.hide();
        setTimeout(() => {
            Clipboard.setString(selected.offerCode);
            Snackbar.show({
                text: 'Your OfferCode Copy',
                duration: Snackbar.LENGTH_SHORT,
                backgroundColor: color.primaryGreen,
                textColor: color.creamWhite


            });
        }, 1000);
    };

    const handledelete = async () => {
        actionSheetRefChooseOption.current.hide();
        try {
            await firestore().collection('Offers').doc(selected.id).delete();
            Snackbar.show({
                text: "Product Deleted Successfully",
                duration: Snackbar.LENGTH_LONG,
                backgroundColor: color.primaryGreen,
                textColor: color.creamWhite
            });
            setSelected(null);
            getOffers();
        } catch (error) {
            console.log(error);
        }
    };

    const handleUpdate = async () => {
        if (offerId && head1 !== '' && subHead1 !== '' && offer1 !== '' && offerCode1 !== '') {
            setLoading(true);
            const product = {
                head: head1,
                subHead: subHead1,
                offer: offer1,
                offerCode: offerCode1
            };

            try {
                await firestore().collection('Offers').doc(offerId).update(product);
                setLoading(false);
                Snackbar.show({
                    text: "Product Updated Successfully",
                    duration: Snackbar.LENGTH_LONG,
                    backgroundColor: color.primaryGreen,
                    textColor: color.creamWhite
                });
                actionSheetRef.current.hide();
                setHead1('');
                setSubHead1('');
                setOffer1('');
                setOfferCode1('');
                getOffers();
            } catch (error) {
                setLoading(false);
                Snackbar.show({
                    text: 'Error updating offer',
                    duration: Snackbar.LENGTH_LONG,
                    backgroundColor: color.red,
                    textColor: color.creamWhite
                });
                console.log(error);
            }
        } else {
            Snackbar.show({
                text: "Please Fill Up All Fields",
                duration: Snackbar.LENGTH_LONG,
                backgroundColor: color.red,
                textColor: color.creamWhite
            });
        }
    };

    return (
        <View style={{ padding: 15 }}>
            <ActionSheet ref={actionSheetRef}>
                <View style={{ padding: 20 }}>
                    <TouchableOpacity onPress={() => {
                        actionSheetRef.current.hide()
                        setType(null)
                        setSelected(null)
                        setHead1('');
                        setSubHead1('');
                        setOffer1('');
                        setOfferCode1('');
                    }} style={{ alignSelf: 'flex-end' }}>
                        <AntDesign name='closecircleo' size={28} color={color.black} />
                    </TouchableOpacity>
                    <CustomTextInput
                        key="head"
                        type="name"
                        value={head1}
                        handleText={(text) => setHead1(text)}
                        placeholder="Offer Name"
                    />
                    <CustomTextInput
                        key="subHead"
                        type="name"
                        value={subHead1}
                        handleText={(text) => setSubHead1(text)}
                        placeholder="Sub Name"
                    />
                    <CustomTextInput
                        key="offer"
                        type="name"
                        value={offer1}
                        handleText={(text) => setOffer1(text)}
                        placeholder="Offer"
                    />
                    <CustomTextInput
                        key="offerCode"
                        type="name"
                        value={offerCode1}
                        handleText={(text) => setOfferCode1(text)}
                        placeholder="Code"
                    />
                    <CustomButton
                        type='primary'
                        ButtonText={type === 'add' ? 'Create Offer' : 'Update Offer'}
                        handleButton={type === 'add' ? handleCreate : handleUpdate}
                    />
                </View>
            </ActionSheet>
            <ActionSheet ref={actionSheetRefChooseOption}>
                <View style={{ padding: 20 }}>
                    <TouchableOpacity onPress={() => actionSheetRefChooseOption.current.hide()} style={{ alignSelf: 'flex-end' }}>
                        <AntDesign name='closecircleo' size={28} color={color.black} />
                    </TouchableOpacity>
                    <View style={{
                        marginVertical: 10,
                        flexDirection: 'row',
                        alignItems: "center",
                        justifyContent: 'space-around',
                        padding: 15
                    }}>
                        <FontAwesome onPress={handledit} name='edit' size={38} color={color.black} />
                        <AntDesign onPress={handlcopy} name='copy1' size={38} color={color.black} />
                        <AntDesign onPress={handledelete} name='delete' size={38} color={color.black} />
                    </View>
                </View>
            </ActionSheet>
            <FlatList
                data={offer}
                extraData={offer}
                renderItem={({ item }) => (
                    <TouchableOpacity
                        onPress={() => {
                            setSelected(item);
                            actionSheetRefChooseOption.current.show();
                        }}
                        style={{ justifyContent: 'center', alignSelf: 'center', marginVertical: 10, padding: 15 }}>
                        <ImageBackground style={{ width: 350, height: 130 }} source={require('../../assets/images/offers2.webp')}>
                            <View style={{ padding: 28, justifyContent: 'space-around', flexDirection: 'row' }}>
                                <View style={{ marginRight: 90 }}>
                                    <Text style={{ fontSize: 30, fontFamily: 'Lato-Bold', fontWeight: 'bold' }}>{item.offer}%</Text>
                                    <Text style={{ fontSize: 20, fontFamily: 'Lato-Bold' }}>{item.head}</Text>
                                </View>
                                <View>
                                    <Text style={{ fontSize: 30, fontFamily: 'Lato-Bold' }}>Use Code</Text>
                                    <Text style={{ fontSize: 21, fontFamily: 'Lato-Italic', backgroundColor: color.primaryGreen, borderRadius: 15, padding: 1, textAlign: 'center', color: color.white }}>{item.offerCode}</Text>
                                </View>
                            </View>
                        </ImageBackground>
                    </TouchableOpacity>
                )}
            />
        </View>
    );
}

export default Offers;

////////////////////////////////////////