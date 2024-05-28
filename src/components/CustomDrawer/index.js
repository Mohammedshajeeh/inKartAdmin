// 

/////////////////////////////////////////88

import React, { useEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { Text, TouchableOpacity, View, Image, Dimensions } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import style from './style';
import { signout } from '../../storage/action';
import color from '../Common/color';
import firestore from "@react-native-firebase/firestore";
import Snackbar from 'react-native-snackbar';

const { width, height } = Dimensions.get('window'); // Get screen dimensions

const CustomDrawer = () => {
    const navigation = useNavigation();
    const dispatch = useDispatch();
    const [profileData, setProfileData] = useState({});
    const [email, setEmail] = useState('');
    const userId = useSelector((state) => state.userId);

    const handleLogout = () => {
        dispatch(signout());
    };

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
            }
        } catch (error) {
            Snackbar.show({
                text: 'Error fetching user',
                duration: Snackbar.LENGTH_SHORT,
            });
            console.error(error);
        }
    };

    const contents = [
        { itemId: 0, itemName: 'Home', navigation: 'Footer', icon: require('../../assets/images/home5.png') },
        { itemId: 1, itemName: 'Products', navigation: 'Products', icon: require('../../assets/images/product6.png') },
        { itemId: 2, itemName: 'Categories', navigation: 'Footer', icon: require('../../assets/images/drawer.png') },
        { itemId: 3, itemName: 'Orders', navigation: 'Orders', icon: require('../../assets/images/order3.png') },
        { itemId: 4, itemName: 'Reviews', navigation: 'Footer', icon: require('../../assets/images/review.png') },
        { itemId: 5, itemName: 'Banners', navigation: 'Footer', icon: require('../../assets/images/banner.png') },
        { itemId: 6, itemName: 'Offers', navigation: 'Offers', icon: require('../../assets/images/offer3.png') },
        { itemId: 7, itemName: 'Logout', navigation: null, icon: require('../../assets/images/logout.png'), onPress: handleLogout },
    ];

    const handleTouch = (itemData) => {
        if (itemData.navigation) {
            navigation.navigate(itemData.navigation);
        } else if (itemData.onPress) {
            itemData.onPress();
        }
    };

    return (
        <View style={style(width, height).container}>
            <View style={style(width, height).header}>
                <TouchableOpacity style={{ flexDirection: 'row', alignItems: "center", borderColor: color.black }}>
                    <View style={style(width, height).imageView} >
                        <TouchableOpacity onPress={()=> navigation.navigate('Profile')}>
                            <Image
                                style={style(width, height).image1}
                                source={profileData.profileImage ? { uri: profileData.profileImage } : require('../../assets/images/user.jpg')}
                            />
                        </TouchableOpacity>
                    </View>
                    <View style={{ marginLeft: 18, width: 130 }}>
                        <Text style={{ fontFamily: 'Lato-Bold', fontSize: 20, color: color.black }}>{profileData.FirstName} {profileData.LastName}</Text>
                        <Text style={{ fontFamily: 'Lato-Regular', fontSize: 15, color: color.black }}>{email}</Text>
                    </View>
                </TouchableOpacity>
            </View>
            <View style={style(width, height).menuContainer}>
                {contents.map((item, index) => (
                    <TouchableOpacity
                        key={index}
                        onPress={() => handleTouch(item)}
                        style={style(width, height).menuItem}>
                        <View style={style(width, height).menuItemContent}>
                            <Image source={item.icon} style={style(width, height).menuIcon} />
                            <Text style={style(width, height).menuText}>{item.itemName}</Text>
                        </View>
                        <Image source={require('../../assets/images/arrowRight.png')} style={style(width, height).arrowIcon} />
                    </TouchableOpacity>
                ))}
            </View>
        </View>
    );
};

export default CustomDrawer;
