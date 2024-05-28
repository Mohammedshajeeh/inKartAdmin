import { Dimensions, StyleSheet } from "react-native";
import color from "../Common/color";

const { width, height } = Dimensions.get('screen')

const Style = StyleSheet.create({
    Button: {
        backgroundColor: color.primaryGreen,
        padding: width * 0.05,
        borderRadius: 8,
        justifyContent: 'center',
        alignItems: 'center',
        marginVertical: width * 0.03,
        flexDirection: 'row',


    },
    Text: {
        color: color.white,
        fontFamily: 'Lato-Bold',
        fontSize: 18,
    },
    icon: {
        width: width * 0.05,
        height: width * 0.05,
        marginRight: width * 0.025

    }

})

export default Style