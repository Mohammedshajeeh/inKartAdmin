import { StyleSheet } from 'react-native';
import color from '../../components/Common/color';

const style = (width, height) => StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: color.lightWhit, // Use your color file
        paddingTop: 10,
    },
    header: {
        padding: 5,
        marginTop: 10,
        borderBottomWidth: 1,
        borderBottomColor: color.lightGray,
    },
    headerText: {
        fontSize: 18,
        fontWeight: 'bold',
        color: color.grey,
    },
    headerSubText: {
        fontSize: 14,
        color: color.grey,
    },
    menuContainer: {
        marginTop: 20,
    },
    menuItem: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingVertical: 15,
        paddingHorizontal: 20,
        borderBottomWidth: 1,
        borderBottomColor: color.lightGray,
    },
    menuItemContent: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    menuIcon: {
        width: 25,
        height: 25,
        marginRight: 20,
        resizeMode: 'contain',
    },
    menuText: {
        fontSize: 16,
        color: color.black,
    },
    arrowIcon: {
        width: 20,
        height: 20,
        resizeMode: 'contain',
    },
    imageView: {
        alignSelf: 'center',
        justifyContent: 'center',
        alignItems: 'center',
        marginVertical: 20
    },
    image1: {
        width: width * 0.20,
        height: height * 0.13,
        borderRadius: width * 0.2
    },
});

export default style;
