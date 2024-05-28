import React from "react";
import { Image, Text, TouchableOpacity } from "react-native";
import Style from "./style";
import color from "../Common/color";

const CustomButton = props => {
    const { type, ButtonText, handleButton, icon } = props
    return (


        <TouchableOpacity style={[Style.Button, { backgroundColor: type === 'primary' ? color.primaryGreen : color.primaryBlue }]}
            onPress={handleButton}
        >
            {type !== 'primary' ? <Image source={icon} style={Style.icon} /> : null}
            <Text style={[Style.Text, { color: type === 'primary' ? color.white : color.black }]}>{ButtonText}</Text>
        </TouchableOpacity>
    )
}


export default CustomButton