import { StyleSheet } from "react-native";
import color from "../../components/Common/color";

const Style = (width, height, isPortrait) => {
    return StyleSheet.create({
        container: {
            backgroundColor: color.lightWhit,
            flex: 1,
        },
        productImage: {
            width: '100%',
            height: height * 0.5,  // 50% of the screen height
            resizeMode: 'contain',
        },
        detailsContainer: {
            padding: 15,
            backgroundColor: color.lightWhit,
        },
        productTitle: {
            color: color.lightBlue1,
            fontFamily: 'Lato-Bold',
            fontSize: 22,
            lineHeight: 30,
            marginBottom: 5,
        },
        productPrice: {
            color: color.lightBlue1,
            fontFamily: 'Lato-Bold',
            fontSize: 20,
            lineHeight: 30,
            marginBottom: 5,
        },
        productDiscount: {
            color: color.lightBlue1,
            fontFamily: 'Lato-Bold',
            fontSize: 18,
            lineHeight: 30,
        },
        extraheader: {
            paddingVertical: 10,
            paddingHorizontal: 15,
            backgroundColor: color.lightWhit,
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            borderBottomWidth: 1,
            borderBottomColor: color.black,
        },
        extraheaderText: {
            color: color.black,
            fontFamily: 'Lato-Bold',
            fontSize: 18,
        },
        arrowImage: {
            width: width * 0.05,
            height: height * 0.05,
            resizeMode: 'contain',
        },
        extraContent: {
            padding: 15,
            backgroundColor: color.lightWhit,
        },
        extraContentText: {
            color: color.black,
            fontFamily: 'Lato-Regular',
            fontSize: 16,
        },
        accordionSection: {
            borderBottomWidth: 1,
            borderBottomColor: color.black,
        },
        deliveryContainer: {
            padding: 15,
            backgroundColor: color.lightWhit,
        },
        deliveryTitle: {
            fontFamily: 'Lato-Bold',
            fontSize: 22,
            color: color.black,
            lineHeight: 30,
        },
        deliverySubtitle: {
            fontFamily: 'Lato-Regular',
            fontSize: 12,
            color: color.shadow,
            lineHeight: 30,
        },
        deliveryText: {
            fontFamily: 'Lato-Regular',
            fontSize: 12,
            color: color.shadow,
            lineHeight: 30,
        },
        footer:{
            position: 'absolute',
            bottom: 0,
            width: '100%',
            padding: 15,
        }
    });
};

export default Style;
