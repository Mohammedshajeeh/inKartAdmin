



import { StyleSheet } from 'react-native';
import color from '../../components/Common/color';

const style = (width, height) => StyleSheet.create({
    container: {
        height: height,
        flex: 1,
    },
    topBg: {
        width: width,
        height: height * 0.2,
        resizeMode: 'cover',
    },
    scrollview: {
        flex: 1,
        backgroundColor: color.white,
        marginTop: -width * 0.2,
        borderTopRightRadius: width * 0.05,
        borderTopLeftRadius: width * 0.05,
        overflow: 'hidden',
        padding: width * 0.03,
    },
    logo: {
        width: 150,
        height: 100,
        resizeMode: 'contain',
    },
    loginText: {
        fontFamily: 'poppins-Bold',
        fontSize: 25,
        color: color.steel,
    },

});

export default style;
