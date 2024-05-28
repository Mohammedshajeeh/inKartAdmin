import { useLayoutEffect, useRef, useState } from "react";
import { Image, Text, TouchableOpacity, View, ScrollView } from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import Accordion from 'react-native-collapsible/Accordion';
import FontAwesome from "react-native-vector-icons/FontAwesome";
import AntDesign from "react-native-vector-icons/AntDesign";
import ActionSheet from "react-native-actions-sheet";
import color from "../../components/Common/color";
import { useDimensionContext } from "../../context";
import Style from "./style";
import CustomTextInput from "../../components/CustomTextInput";
import CustomButton from "../../components/CustomButton";
import Snackbar from "react-native-snackbar";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";


const ProductDetails = () => {
    const dimensions = useDimensionContext();
    const responsiveStyle = Style(
        dimensions.windowWidth,
        dimensions.windowHeight,
        dimensions.isPortrait
    );
    const navigation = useNavigation();
    const route = useRoute();
    const product = route.params.Product;
    const [activeSections, setActiveSections] = useState([]);
    const actionSheetRef = useRef(null);

    const SECTIONS = [
        {
            title: 'Manufacture Details',
            content: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry',
        },
        {
            title: 'Product Disclaimer',
            content: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry',
        },
        {
            title: 'Features and Details',
            content: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry',
        },
    ];

    useLayoutEffect(() => {
        navigation.setOptions({
            title: 'Product Details',
            headerTintColor: color.black,
            headerStyle: {
                backgroundColor: color.lightWhit
            },
            headerLeft: () => (
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <FontAwesome5 name='arrow-alt-circle-left' size={30} color={color.lightBlue1} style={{ marginRight: 10 }} />
                </TouchableOpacity>
            ),
            headerRight: () => <RightComponent />
        });
    }, [navigation]);

    const RightComponent = () => (
        <TouchableOpacity onPress={() => actionSheetRef.current.show()}>
            <FontAwesome name='edit' size={28} color={color.lightBlue1} />
        </TouchableOpacity>
    );

    const renderHeader = (section, index, isActive) => (
        <View style={responsiveStyle.extraheader}>
            <Text style={responsiveStyle.extraheaderText}>{section.title}</Text>
            <Image style={responsiveStyle.arrowImage} source={require('../../assets/images/arrowDown.png')} />
        </View>
    );

    const renderContent = (section) => (
        <View style={responsiveStyle.extraContent}>
            <Text style={responsiveStyle.extraContentText}>{section.content}</Text>
        </View>
    );

    const updateSections = (activeSections) => {
        setActiveSections(activeSections);
    };

    const handleUpdateOrder = () => {
        try {
            actionSheetRef.current?.hide()
            setTimeout(() => {
                Snackbar.show({
                    text: "Order Upadated",
                    duration: Snackbar.LENGTH_LONG,
                    backgroundColor: color.primaryGreen,
                    textColor: color.white
                });
            }, 1000)
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <View style={{ flex: 1 }}>
            <ScrollView style={responsiveStyle.container}>
                <View style={{ backgroundColor: color.lightWhit }}>
                    <Image
                        source={product?.image ? { uri: product.image } : require('../../assets/images/bg3.jpg')}
                        style={responsiveStyle.productImage}
                    />
                    <View style={responsiveStyle.detailsContainer}>
                        <Text style={responsiveStyle.productTitle}>{product?.head}</Text>
                        <Text style={responsiveStyle.productPrice}>₹{product.price}</Text>
                        <Text style={responsiveStyle.productDiscount}>25% OFF</Text>
                    </View>
                    <Accordion
                        sections={SECTIONS}
                        activeSections={activeSections}
                        renderHeader={renderHeader}
                        renderContent={renderContent}
                        onChange={updateSections}
                        sectionContainerStyle={responsiveStyle.accordionSection}
                    />
                    <View style={responsiveStyle.deliveryContainer}>
                        <Text style={responsiveStyle.deliveryTitle}>Check Delivery</Text>
                        <Text style={responsiveStyle.deliverySubtitle}>Enter PinCode Check Delivery Date/Pickup Option</Text>
                        <CustomTextInput type={'default'} handleText={() => console.log('hi')} placeholder={'PinCode'} check={true} />
                        <Text style={responsiveStyle.deliveryText}>Free Delivery On Order Above 200</Text>
                        <Text style={responsiveStyle.deliveryText}>Cash On Delivery Available</Text>
                        <Text style={responsiveStyle.deliveryText}>Easy 21 Days Return And Exchange</Text>
                    </View>
                    <ActionSheet ref={actionSheetRef}>
                        <View style={{ padding: 20 }}>
                            <TouchableOpacity onPress={() => actionSheetRef.current.hide()} style={{ alignSelf: 'flex-end' }}>
                                <AntDesign name='closecircleo' size={28} color={color.black} />
                            </TouchableOpacity>
                            <CustomTextInput
                                placeholder={'Oredr Status'}
                                onChangeText={text => { }} />
                            <CustomButton
                                type='primary'
                                ButtonText={'Update Order'}
                                handleButton={handleUpdateOrder}
                            />
                        </View>
                    </ActionSheet>
                </View >
            </ScrollView>
        </View>
    );
}

export default ProductDetails;
