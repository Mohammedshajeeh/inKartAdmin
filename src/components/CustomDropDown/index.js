// import { useEffect, useState } from "react";
// import { Text, TouchableOpacity, View, FlatList, StyleSheet } from "react-native";
// import { useNavigation } from "@react-navigation/native";
// import Accordion from 'react-native-collapsible/Accordion';
// import color from "../Common/color";
// import AntDesign from "react-native-vector-icons/AntDesign";

// const CustomDropDown = props => {
//     const { data, setData, create, prevData } = props;
//     const navigation = useNavigation();
//     const [activeSections, setActiveSections] = useState([]);
//     const [selected, setSelected] = useState(prevData ? prevData.head : data[0]?.head);


//     useEffect(() => {
//         if (data || prevData) {
//             setSelected(prevData ? prevData.head : data[0]?.head);
//         }
//     }, [data,prevData]);

//     const updateSections = (activeSections) => {
//         setActiveSections(activeSections);
//     };

//     const SECTIONS = [{ id: 0, sectionData:prevData ? prevData.head : data[0]?.head }]

//     const renderHeader = () => (
//         <View style={styles.header}>
//             <Text style={styles.headerText}>{selected}</Text>
//             <AntDesign name='down' size={28} color={color.black} />
//         </View>
//     );

//     const renderContent = () => (
//         <FlatList
//             data={data}
//             keyExtractor={(item, index) => index.toString()}
//             renderItem={({ item }) => (
//                 <TouchableOpacity
//                     style={styles.item}
//                     onPress={() => {
//                         setData(item);
//                         setSelected(item.head);
//                         setActiveSections([]);
//                     }}
//                 >
//                     <Text style={styles.itemText}>{item.head}</Text>
//                 </TouchableOpacity>
//             )}
//         />
//     );

//     return (
//         <View>
//             <Accordion
//                 sections={[{ content: data }]}
//                 activeSections={activeSections}
//                 renderHeader={renderHeader}
//                 renderContent={renderContent}
//                 onChange={updateSections}
//                 sectionContainerStyle={styles.accordionSection}
//                 underlayColor="transparent"
//             />
//         </View>
//     );
// };

// const styles = StyleSheet.create({
//     header: {
//         paddingVertical: 10,
//         paddingHorizontal: 15,
//         backgroundColor: color.lightGray,
//         borderColor: color.lightBlue1,
//         borderWidth: StyleSheet.hairlineWidth,
//         justifyContent: "space-between",
//         alignItems: "center",
//         flexDirection: 'row'
//     },
//     headerText: {
//         fontSize: 16,
//         color: color.black,
//         fontFamily: 'Lato-Regular'
//     },
//     item: {
//         paddingVertical: 10,
//         paddingHorizontal: 15,
//         backgroundColor: color.white,
//         borderWidth: StyleSheet.hairlineWidth,
//         borderRadius: 10,
//         borderColor: color.lightBlue1
//     },
//     itemText: {
//         fontSize: 16,
//         color: color.black,
//         fontFamily: 'Lato-Regular'

//     },
//     accordionSection: {
//         borderWidth: StyleSheet.hairlineWidth,
//         borderBottomColor: color.lightBlue1,
//     },
// });

// export default CustomDropDown;


// //////////////////////////////////////////////



import { useEffect, useState } from "react";
import { Text, TouchableOpacity, View, FlatList, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
import Accordion from 'react-native-collapsible/Accordion';
import color from "../Common/color";
import AntDesign from "react-native-vector-icons/AntDesign";

const CustomDropDown = (props) => {
    const { data, setData, create, prevData } = props;
    const navigation = useNavigation();
    const [activeSections, setActiveSections] = useState([]);
    const [selected, setSelected] = useState(prevData ? prevData.head : data[0]?.head);

    useEffect(() => {
        if (prevData) {
            setSelected(prevData.head);
        } else if (data && data.length > 0) {
            setSelected(data[0].head);
        }
    }, [data, prevData]);

    const updateSections = (activeSections) => {
        setActiveSections(activeSections);
    };

    const renderHeader = () => (
        <View style={styles.header}>
            <Text style={styles.headerText}>{selected}</Text>
            <AntDesign name='down' size={28} color={color.black} />
        </View>
    );

    const renderContent = () => (
        <FlatList
            data={data}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item }) => (
                <TouchableOpacity
                    style={styles.item}
                    onPress={() => {
                        setData(item);
                        setSelected(item.head);
                        setActiveSections([]);
                    }}
                >
                    <Text style={styles.itemText}>{item.head}</Text>
                </TouchableOpacity>
            )}
        />
    );

    return (
        <View>
            <Accordion
                sections={[{ content: data }]}
                activeSections={activeSections}
                renderHeader={renderHeader}
                renderContent={renderContent}
                onChange={updateSections}
                sectionContainerStyle={styles.accordionSection}
                underlayColor="transparent"
            />
        </View>
    );
};

const styles = StyleSheet.create({
    header: {
        paddingVertical: 10,
        paddingHorizontal: 15,
        backgroundColor: color.lightGray,
        borderColor: color.lightBlue1,
        borderWidth: StyleSheet.hairlineWidth,
        justifyContent: "space-between",
        alignItems: "center",
        flexDirection: 'row'
    },
    headerText: {
        fontSize: 16,
        color: color.black,
        fontFamily: 'Lato-Regular'
    },
    item: {
        paddingVertical: 10,
        paddingHorizontal: 15,
        backgroundColor: color.white,
        borderWidth: StyleSheet.hairlineWidth,
        borderRadius: 10,
        borderColor: color.lightBlue1
    },
    itemText: {
        fontSize: 16,
        color: color.black,
        fontFamily: 'Lato-Regular'
    },
    accordionSection: {
        borderWidth: StyleSheet.hairlineWidth,
        borderBottomColor: color.lightBlue1,
    },
});

export default CustomDropDown;
