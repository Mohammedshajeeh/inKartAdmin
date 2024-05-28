
// import { StyleSheet } from 'react-native';
// import color from '../../components/Common/color';

// const Style = (width, height) => StyleSheet.create({
//     container:{
//         justifyContent:'space-between',
//         alignItems:'center',
//         flexDirection:'row',
//         backgroundColor:color.primaryBlue,
//         padding:width * 0.03,
//         borderRadius: 8,
//         marginVertical:11,
//         borderWidth:2,
//         borderColor:color.grey
//     },
//     textInput:{
//         color:color.black_level3,
//         fontSize:18,
//         fontWeight:'bold',
//         fontFamily:'Lato-regular',
//         flex:1
//     },
//     icon:{
//         width:width * 0.05,
//         height: width * 0.05,
//         resizeMode:'contain'
//     }
// })

// export default Style

import { StyleSheet } from 'react-native';
import color from '../../components/Common/color';

const Style = (width, height) => StyleSheet.create({
    container: {
        justifyContent: 'space-between',
        alignItems: 'center',
        flexDirection: 'row',
        backgroundColor: color.lightBlue1,
        padding: width * 0.03,
        borderRadius: 8,
        marginVertical: 11,
        borderWidth: 2,
        borderColor: color.grey
    },
    textInput: {
        color: color.white,
        fontSize: 18,
        fontWeight: 'bold',
        fontFamily: 'Lato-Regular',
        flex: 1
    },
    icon: {
        width: width * 0.05,
        height: width * 0.05,
        resizeMode: 'contain'
    }
});

export default Style;
