import { Text, TouchableOpacity, View } from "react-native";
import AntDesign from "react-native-vector-icons/AntDesign";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import color from "../Common/color";

const CustomTab = () => {
    const [active, setActive] = useState('Home');
    const activeSize = 34;
    const activeFontFamily = 'Lato-Bold';
    const navigation = useNavigation();

    const handleNavigation = (name) => {
        setActive(name);
        navigation.navigate(name);
    };

    return (
        <View style={{
            height: 65,
            backgroundColor: color.lightBlue1,
            padding: 15,
            overflow: 'hidden',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-around'
        }}>
            <TouchableOpacity onPress={() => handleNavigation('Home')}>
                <FontAwesome name='home' style={{ alignSelf: 'center' }} size={active === 'Home' ? activeSize : 28} color={color.lightWhit} />
                <Text style={{ fontFamily: active === 'Home' ? activeFontFamily : 'Lato-Regular', fontSize: 16, color: color.lightWhit }}>Home</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => handleNavigation('Users')}>
                <FontAwesome name='user' style={{ alignSelf: 'center' }} size={active === 'Users' ? activeSize : 28} color={color.lightWhit} />
                <Text style={{ fontFamily: active === 'Users' ? activeFontFamily : 'Lato-Regular', fontSize: 16, color: color.lightWhit }}>Users</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => handleNavigation('Orders')}>
                <FontAwesome name='reorder' style={{ alignSelf: 'center' }} size={active === 'Orders' ? activeSize : 28} color={color.lightWhit} />
                <Text style={{ fontFamily: active === 'Orders' ? activeFontFamily : 'Lato-Regular', fontSize: 16, color: color.lightWhit }}>Orders</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => handleNavigation('Profile')}>
                <AntDesign name='profile' style={{ alignSelf: 'center' }} size={active === 'Profile' ? activeSize : 28} color={color.lightWhit} />
                <Text style={{ fontFamily: active === 'Profile' ? activeFontFamily : 'Lato-Regular', fontSize: 16, color: color.lightWhit }}>Profile</Text>
            </TouchableOpacity>
        </View>
    );
};

export default CustomTab;
