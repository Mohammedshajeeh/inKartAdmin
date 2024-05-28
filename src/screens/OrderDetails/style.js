
import { StyleSheet } from "react-native";
import color from "../../components/Common/color";

const Style = StyleSheet.create({
    modalContainer: {
        height: '100%',
        width: '100%',
        backgroundColor: 'rgba(0,0,0,0.7)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    orderHeader: {
        backgroundColor: color.lightBlue1,
        borderRadius: 15,
        padding: 15,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start',
    },
    orderImage: {
        width: 25,
        height: 25,
        resizeMode: 'contain',
    },
    orderDetails: {
        marginLeft: 15,
    },
    orderIdText: {
        fontFamily: 'Lato-Regular',
        fontSize: 18,
        color: color.creamWhite,
    },
    orderStatusText: {
        fontFamily: 'Lato-Bold',
        fontSize: 22,
        color: color.creamWhite,
    },
    itemsSection: {
        marginVertical: 15,
    },
    sectionTitle: {
        fontFamily: 'Lato-Bold',
        fontSize: 22,
        color: color.lightBlue1,
    },
    itemRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 5,
        justifyContent: 'space-between',
    },
    quantityBox: {
        backgroundColor: color.lightBlue1,
        padding: 15,
        borderRadius: 15,
    },
    quantityText: {
        fontFamily: 'Lato-Bold',
        fontSize: 20,
        color: color.creamWhite,
    },
    itemDetails: {
        width: '50%',
        overflow: 'hidden',
    },
    itemName: {
        fontFamily: 'Lato-Bold',
        fontSize: 20,
        color: color.lightBlue1,
    },
    itemPrice: {
        fontFamily: 'Lato-Bold',
        fontSize: 20,
        color: color.lightBlue1,
    },
    paymentDetailsSection: {
        marginVertical: 15,
    },
    paymentDetailsRow: {
        borderRadius: 15,
        padding: 15,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        borderBottomWidth: StyleSheet.hairlineWidth,
        marginVertical:6
    },
    paymentDetailText: {
        fontFamily: 'Lato-Regular',
        fontSize: 20,
        color: color.grey,
        lineHeight: 35,
    },
    discountText: {
        fontFamily: 'Lato-Regular',
        fontSize: 20,
        color: color.red,
        lineHeight: 35,
    },
    paymentDetailAmounts: {
        alignItems: 'flex-end',
    },
    totalAmountRow: {
        justifyContent: 'space-between',
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical:10,
        padding:15
    },
    totalAmountText: {
        fontFamily: 'Lato-Bold',
        fontSize: 22,
        color: color.black,
        lineHeight: 25,
    },
    addressSection: {
        marginVertical: 15,
        padding:15
    },
    addressText: {
        fontFamily: 'Lato-Regular',
        fontSize: 20,
        color: color.black,
        lineHeight: 35,
    },
    paymentMethodSection: {
        marginVertical: 15,
        padding:15
    },
    paymentMethodRow: {
        justifyContent: 'flex-start',
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 15,
    },
    paymentMethodImage: {
        width: 45,
        height: 55,
        resizeMode: 'contain',
    },
    paymentMethodDetails: {
        marginLeft: 15,
    },
    paymentMethodText: {
        fontFamily: 'Lato-Regular',
        fontSize: 18,
        color: color.black,
        lineHeight: 25,
    },
    footer: {
        position: 'absolute',
        bottom: 0,
        width: '100%',
        padding: 15,
    },
});

export default Style;
