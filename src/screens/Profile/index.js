


// import { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";
// import { Image, Modal, ScrollView, Text, TouchableOpacity, View } from "react-native";
// import { useNavigation } from "@react-navigation/native";
// import color from "../../components/Common/color";
// import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
// import Snackbar from "react-native-snackbar";
// import { useDispatch, useSelector } from "react-redux";
// import Style from "./style";
// import firestore from '@react-native-firebase/firestore';
// import CustomTextInput from "../../components/CustomTextInput";
// import CustomButton from "../../components/CustomButton";
// import { ValidateEmail } from "../../components/Common/validation";
// import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
// import uploadImage from "../../components/Common/storage";
// import ActionSheet from "react-native-actions-sheet";
// import AntDesign from "react-native-vector-icons/AntDesign";
// import Entypo from "react-native-vector-icons/Entypo";





// const Profile = () => {
//     const navigation = useNavigation();
//     const userId = useSelector((state) => state.userId);
//     const [profileData, setProfileData] = useState({});
//     const [email, setEmail] = useState('');
//     const [password, setPassword] = useState('');
//     const actionSheetRef = useRef(null);
//     const [uploadUri, setUploadUri] = useState('');



//     useLayoutEffect(() => {
//         navigation.setOptions({
//             title: 'Profile',
//             headerTintColor: color.black,
//             headerStyle: {
//                 backgroundColor: color.lightWhit
//             },
//             headerLeft: () => (
//                 <TouchableOpacity onPress={() => navigation.goBack()}>
//                     <FontAwesome5 name='arrow-alt-circle-left' size={30} color={color.lightBlue1} style={{ marginRight: 10 }} />
//                 </TouchableOpacity>
//             ),
//         });
//     }, [navigation]);

//     const dispatch = useDispatch();

//     useEffect(() => {
//         getUser();
//     }, []);

//     const getUser = async () => {
//         try {
//             const snapshot = await firestore().collection('User').doc(userId).get();
//             if (!snapshot.exists) {
//                 Snackbar.show({
//                     text: 'No user found!',
//                     duration: Snackbar.LENGTH_SHORT,
//                 });
//             } else {
//                 const userData = { id: snapshot.id, ...snapshot.data() };
//                 setProfileData(userData);
//                 setEmail(userData.email);
//                 setPassword(userData.password);  // Assuming password is stored in Firestore, which is not recommended
//             }
//         } catch (error) {
//             Snackbar.show({
//                 text: 'Error fetching user',
//                 duration: Snackbar.LENGTH_SHORT,
//             });
//             console.error(error);
//         }
//     };

//     const handleUpdateProfile = async () => {
//         if (email === '' || !ValidateEmail(email.trim())) {
//             Snackbar.show({
//                 text: 'Given Email Is Not Valid',
//                 duration: Snackbar.LENGTH_LONG,
//                 backgroundColor: 'red',
//                 textColor: color.white,
//             });
//             return;
//         }

//         if (password === '') {
//             Snackbar.show({
//                 text: 'Password cannot be empty',
//                 duration: Snackbar.LENGTH_LONG,
//                 backgroundColor: 'red',
//                 textColor: color.white,
//             });
//             return;
//         }

//         try {
//             await firestore().collection('User').doc(userId).update({
//                 email: email,
//                 password: password
//             });

//             Snackbar.show({
//                 text: 'Profile updated successfully',
//                 duration: Snackbar.LENGTH_LONG,
//                 backgroundColor: 'green',
//                 textColor: color.white,
//             });
//         } catch (error) {
//             console.error('Error updating profile:', error);
//             Snackbar.show({
//                 text: 'Failed to update profile. Please try again later.',
//                 duration: Snackbar.LENGTH_LONG,
//                 backgroundColor: 'red',
//                 textColor: color.white,
//             });
//         }
//     };

//     return (
//         <View style={Style.container}>
//             <ScrollView showsVerticalScrollIndicator={false}>
//                 <ActionSheet ref={actionSheetRef}>
//                     <View style={Style.actionSheetContent}>
//                         <Text style={Style.actionSheetTitle}>Select Options</Text>
//                         <TouchableOpacity onPress={() => actionSheetRef.current?.hide()} style={Style.closeButton}>
//                             <AntDesign name='closecircleo' size={28} color={color.lightBlue1} />
//                         </TouchableOpacity>
//                     </View>
//                     <View style={Style.actionSheetOptions}>
//                         <TouchableOpacity >
//                             {/* <TouchableOpacity onPress={handleImage}> */}
//                             <Entypo name='images' size={40} color={color.lightBlue1} style={Style.uploadButtonIcon} />
//                         </TouchableOpacity>
//                         <TouchableOpacity >
//                             {/* <TouchableOpacity onPress={handleCamera}> */}
//                             <Entypo name='camera' size={40} color={color.lightBlue1} style={Style.uploadButtonIcon} />
//                         </TouchableOpacity>
//                     </View>
//                 </ActionSheet>
//                 <View>
//                     <Text style={Style.head}>{profileData.FirstName} {profileData.LastName}</Text>
//                     <View style={Style.imageView}>
//                         <TouchableOpacity onPress={() => actionSheetRef.current?.show()} >
//                             <Image style={Style.image1} source={require('../../assets/images/user.jpg')} />
//                         </TouchableOpacity>

//                         <TouchableOpacity>
//                             <Image style={Style.edit} source={require('../../assets/images/edit.png')} />
//                         </TouchableOpacity>
//                     </View>

//                     <CustomTextInput
//                         type="email"
//                         handleText={(text) => setEmail(text)}
//                         placeholder="Email"
//                         value={email}
//                     />
//                     <CustomTextInput
//                         type="password"
//                         handleText={(text) => setPassword(text)}
//                         placeholder="Password"
//                         value={password}
//                     />

//                     <CustomButton
//                         type="primary"
//                         handleButton={handleUpdateProfile}
//                         ButtonText={"Update Profile"}
//                     />
//                 </View>
//             </ScrollView>
//         </View>
//     );
// };

// export default Profile;

/////////////////////////////////////////////////////////////////////////////////////////////

// import { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";
// import { Image, ScrollView, Text, TouchableOpacity, View } from "react-native";
// import { useNavigation } from "@react-navigation/native";
// import color from "../../components/Common/color";
// import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
// import Snackbar from "react-native-snackbar";
// import { useDispatch, useSelector } from "react-redux";
// import Style from "./style";
// import firestore from '@react-native-firebase/firestore';
// import CustomTextInput from "../../components/CustomTextInput";
// import CustomButton from "../../components/CustomButton";
// import { ValidateEmail } from "../../components/Common/validation";
// import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
// import ActionSheet from "react-native-actions-sheet";
// import AntDesign from "react-native-vector-icons/AntDesign";
// import Entypo from "react-native-vector-icons/Entypo";

// const Profile = () => {
//     const navigation = useNavigation();
//     const userId = useSelector((state) => state.userId);
//     const [profileData, setProfileData] = useState({});
//     const [email, setEmail] = useState('');
//     const actionSheetRef = useRef(null);
//     const [uploadUri, setUploadUri] = useState('');


//     useLayoutEffect(() => {
//         navigation.setOptions({
//             title: 'Profile',
//             headerTintColor: color.black,
//             headerStyle: {
//                 backgroundColor: color.lightWhit
//             },
//             headerLeft: () => (
//                 <TouchableOpacity onPress={() => navigation.goBack()}>
//                     <FontAwesome5 name='arrow-alt-circle-left' size={30} color={color.lightBlue1} style={{ marginRight: 10 }} />
//                 </TouchableOpacity>
//             ),
//         });
//     }, [navigation]);

//     const dispatch = useDispatch();

//     useEffect(() => {
//         getUser();
//     }, []);

//     const getUser = async () => {
//         try {
//             const snapshot = await firestore().collection('User').doc(userId).get();
//             if (!snapshot.exists) {
//                 Snackbar.show({
//                     text: 'No user found!',
//                     duration: Snackbar.LENGTH_SHORT,
//                 });
//             } else {
//                 const userData = { id: snapshot.id, ...snapshot.data() };
//                 setProfileData(userData);
//                 setEmail(userData.email);
//             }
//         } catch (error) {
//             Snackbar.show({
//                 text: 'Error fetching user',
//                 duration: Snackbar.LENGTH_SHORT,
//             });
//             console.error(error);
//         }
//     };

//     const handleUpdateProfile = async () => {
//         if (email === '' || !ValidateEmail(email.trim())) {
//             Snackbar.show({
//                 text: 'Given Email Is Not Valid',
//                 duration: Snackbar.LENGTH_LONG,
//                 backgroundColor: 'red',
//                 textColor: color.white,
//             });
//             return;
//         }

//         try {
//             if (
//                 uploadUri &&
//                 name !== '' &&
//                 description !== '' &&
//                 price !== '' &&
//                 quantity !== '' &&
//                 catagory
//             ) {
//                 const responseUri = uploadUri.includes('file://') ? await uploadImage(uploadUri) : uploadUri;
//                 const product = {
//                     email: email,
//                     image: responseUri
//                 };

//                 await firestore().collection('User').doc(userId).update(product).then(() => {
//                     Snackbar.show({
//                         text: "Product Updated Successfully",
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

//     // const handleUpdateProfile = async () => {
//     //     if (email === '' || !ValidateEmail(email.trim())) {
//     //         Snackbar.show({
//     //             text: 'Given Email Is Not Valid',
//     //             duration: Snackbar.LENGTH_LONG,
//     //             backgroundColor: 'red',
//     //             textColor: color.white,
//     //         });
//     //         return;
//     //     }

//     //     try {
//     //         await firestore().collection('User').doc(userId).update({
//     //             email: email,
//     //         });

//     //         Snackbar.show({
//     //             text: 'Profile updated successfully',
//     //             duration: Snackbar.LENGTH_LONG,
//     //             backgroundColor: 'green',
//     //             textColor: color.white,
//     //         });
//     //     } catch (error) {
//     //         console.error('Error updating profile:', error);
//     //         Snackbar.show({
//     //             text: 'Failed to update profile. Please try again later.',
//     //             duration: Snackbar.LENGTH_LONG,
//     //             backgroundColor: 'red',
//     //             textColor: color.white,
//     //         });
//     //     }
//     // };

//     // const handleImage = () => {
//     //     launchImageLibrary({ mediaType: 'photo' }, (response) => {
//     //         if (response.didCancel) {
//     //             console.log('User cancelled image picker');
//     //         } else if (response.error) {
//     //             console.log('ImagePicker Error: ', response.error);
//     //         } else {
//     //             const source = response.assets[0].uri;
//     //             setUploadUri(source);
//     //             uploadImage(source, userId, updateProfileImage);
//     //         }
//     //     });
//     // };

//     // const handleCamera = () => {
//     //     launchCamera({ mediaType: 'photo' }, (response) => {
//     //         if (response.didCancel) {
//     //             console.log('User cancelled camera');
//     //         } else if (response.error) {
//     //             console.log('Camera Error: ', response.error);
//     //         } else {
//     //             const source = response.assets[0].uri;
//     //             setUploadUri(source);
//     //             uploadImage(source, userId, updateProfileImage);
//     //         }
//     //     });
//     // };

//     // const updateProfileImage = async (imageUrl) => {
//     //     try {
//     //         await firestore().collection('User').doc(userId).update({
//     //             profileImage: imageUrl,
//     //         });
//     //         Snackbar.show({
//     //             text: 'Profile image updated successfully',
//     //             duration: Snackbar.LENGTH_LONG,
//     //             backgroundColor: 'green',
//     //             textColor: color.white,
//     //         });
//     //         getUser(); // Refresh the profile data
//     //     } catch (error) {
//     //         console.error('Error updating profile image:', error);
//     //         Snackbar.show({
//     //             text: 'Failed to update profile image. Please try again later.',
//     //             duration: Snackbar.LENGTH_LONG,
//     //             backgroundColor: 'red',
//     //             textColor: color.white,
//     //         });
//     //     }
//     // };

//     const handleImage = async () => {
//         const options = {
//             mediaType: 'photo'
//         };
//         await launchImageLibrary(options, response => {
//             actionSheetRef.current?.hide();
//             if (response && response.assets) {
//                 setUploadUri(response?.assets[0]?.uri);
//             }
//         });
//     };

//     const handleCamera = async () => {
//         const options = {
//             mediaType: 'photo'
//         };
//         await launchCamera(options, response => {
//             actionSheetRef.current?.hide();
//             if (response && response.assets) {
//                 setUploadUri(response?.assets[0]?.uri);
//             }
//         });
//     };

//     return (
//         <View style={Style.container}>
//             <ScrollView showsVerticalScrollIndicator={false}>
//                 <ActionSheet ref={actionSheetRef}>
//                     <View style={Style.actionSheetContent}>
//                         <Text style={Style.actionSheetTitle}>Select Options</Text>
//                         <TouchableOpacity onPress={() => actionSheetRef.current?.hide()} style={Style.closeButton}>
//                             <AntDesign name='closecircleo' size={28} color={color.lightBlue1} />
//                         </TouchableOpacity>
//                     </View>
//                     <View style={Style.actionSheetOptions}>
//                         <TouchableOpacity onPress={handleImage}>
//                             <Entypo name='images' size={40} color={color.lightBlue1} style={Style.uploadButtonIcon} />
//                         </TouchableOpacity>
//                         <TouchableOpacity onPress={handleCamera}>
//                             <Entypo name='camera' size={40} color={color.lightBlue1} style={Style.uploadButtonIcon} />
//                         </TouchableOpacity>
//                     </View>
//                 </ActionSheet>
//                 <View>
//                     <Text style={Style.head}>{profileData.FirstName} {profileData.LastName}</Text>
//                     <View style={Style.imageView}>
//                         <TouchableOpacity>
//                             <Image style={Style.image1} source={uploadUri ? uploadUri : require('../../assets/images/user.jpg')} />
//                         </TouchableOpacity>

//                         <TouchableOpacity onPress={() => actionSheetRef.current?.show()} >
//                             <Image style={Style.edit} source={require('../../assets/images/edit.png')} />
//                         </TouchableOpacity>
//                     </View>

//                     <CustomTextInput
//                         type="email"
//                         handleText={(text) => setEmail(text)}
//                         placeholder="Email"
//                         value={email}
//                     />
//                     <CustomTextInput
//                         type="password"
//                         handleText={(text) => setPassword(text)}
//                         placeholder="Password"
//                     />

//                     <CustomButton
//                         type="primary"
//                         handleButton={handleUpdateProfile}
//                         ButtonText={"Update Profile"}
//                     />
//                 </View>
//             </ScrollView>
//         </View>
//     );
// };

// export default Profile;



//////////////////////////////////////////////////////////////


/////////////////////////////////////99999999999999999999999


import { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";
import { Image, ScrollView, Text, TouchableOpacity, View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import color from "../../components/Common/color";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import Snackbar from "react-native-snackbar";
import { useDispatch, useSelector } from "react-redux";
import Style from "./style";
import firestore from '@react-native-firebase/firestore';
import CustomTextInput from "../../components/CustomTextInput";
import CustomButton from "../../components/CustomButton";
import { ValidateEmail } from "../../components/Common/validation";
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import ActionSheet from "react-native-actions-sheet";
import AntDesign from "react-native-vector-icons/AntDesign";
import Entypo from "react-native-vector-icons/Entypo";
import uploadImage from "../../components/Common/storage";  // Ensure you have this function implemented

const Profile = () => {
    const navigation = useNavigation();
    const userId = useSelector((state) => state.userId);
    const [profileData, setProfileData] = useState({});
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const actionSheetRef = useRef(null);
    const [uploadUri, setUploadUri] = useState('');

    useLayoutEffect(() => {
        navigation.setOptions({
            title: 'Profile',
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

    const dispatch = useDispatch();

    useEffect(() => {
        getUser();
    }, []);

    const getUser = async () => {
        try {
            const snapshot = await firestore().collection('User').doc(userId).get();
            if (!snapshot.exists) {
                Snackbar.show({
                    text: 'No user found!',
                    duration: Snackbar.LENGTH_SHORT,
                });
            } else {
                const userData = { id: snapshot.id, ...snapshot.data() };
                setProfileData(userData);
                setEmail(userData.email);
                setPassword(userData.password);
            }
        } catch (error) {
            Snackbar.show({
                text: 'Error fetching user',
                duration: Snackbar.LENGTH_SHORT,
            });
            console.error(error);
        }
    };

    const handleUpdateProfile = async () => {
        if (email === '' || !ValidateEmail(email.trim())) {
            Snackbar.show({
                text: 'Given Email Is Not Valid',
                duration: Snackbar.LENGTH_LONG,
                backgroundColor: 'red',
                textColor: color.white,
            });
            return;
        }

        if (password === '') {
            Snackbar.show({
                text: 'Password cannot be empty',
                duration: Snackbar.LENGTH_LONG,
                backgroundColor: 'red',
                textColor: color.white,
            });
            return;
        }

        try {
            const updateData = {
                email: email,
                password: password,
            };

            if (uploadUri) {
                const imageUrl = uploadUri.includes('file://') ? await uploadImage(uploadUri) : uploadUri;
                updateData.profileImage = imageUrl;
            }

            await firestore().collection('User').doc(userId).update(updateData);

            Snackbar.show({
                text: 'Profile updated successfully',
                duration: Snackbar.LENGTH_LONG,
                backgroundColor: 'green',
                textColor: color.white,
            });
            getUser();
        } catch (error) {
            console.error('Error updating profile:', error);
            Snackbar.show({
                text: 'Failed to update profile. Please try again later.',
                duration: Snackbar.LENGTH_LONG,
                backgroundColor: 'red',
                textColor: color.white,
            });
        }
    };

    const handleImage = async () => {
        const options = {
            mediaType: 'photo'
        };
        await launchImageLibrary(options, response => {
            actionSheetRef.current?.hide();
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
            actionSheetRef.current?.hide();
            if (response && response.assets) {
                setUploadUri(response.assets[0].uri);
            }
        });
    };

    return (
        <View style={Style.container}>
            <ScrollView showsVerticalScrollIndicator={false}>
                <ActionSheet ref={actionSheetRef}>
                    <View style={Style.actionSheetContent}>
                        <Text style={Style.actionSheetTitle}>Select Options</Text>
                        <TouchableOpacity onPress={() => actionSheetRef.current?.hide()} style={Style.closeButton}>
                            <AntDesign name='closecircleo' size={28} color={color.lightBlue1} />
                        </TouchableOpacity>
                    </View>
                    <View style={Style.actionSheetOptions}>
                        <TouchableOpacity onPress={handleImage}>
                            <Entypo name='images' size={40} color={color.lightBlue1} style={Style.uploadButtonIcon} />
                        </TouchableOpacity>
                        <TouchableOpacity onPress={handleCamera}>
                            <Entypo name='camera' size={40} color={color.lightBlue1} style={Style.uploadButtonIcon} />
                        </TouchableOpacity>
                    </View>
                </ActionSheet>
                <View>
                    <Text style={Style.head}>{profileData.FirstName} {profileData.LastName}</Text>
                    <View style={Style.imageView}>
                        <TouchableOpacity>
                            <Image
                                style={Style.image1}
                                source={uploadUri ? { uri: uploadUri } : profileData.profileImage ? { uri: profileData.profileImage } : require('../../assets/images/user.jpg')}
                            />
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => actionSheetRef.current?.show()} >
                            <Image style={Style.edit} source={require('../../assets/images/edit.png')} />
                        </TouchableOpacity>
                    </View>

                    <CustomTextInput
                        type="email"
                        handleText={(text) => setEmail(text)}
                        placeholder="Email"
                        value={email}
                    />

                    <CustomTextInput
                        type="password"
                        handleText={(text) => setPassword(text)}
                        placeholder="Password"
                        value={password}
                    />

                    <CustomButton
                        type="primary"
                        handleButton={handleUpdateProfile}
                        ButtonText={"Update Profile"}
                    />
                </View>
            </ScrollView>
        </View>
    );
};

export default Profile;




