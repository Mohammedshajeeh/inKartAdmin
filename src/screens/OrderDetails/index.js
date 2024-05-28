import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import { TouchableOpacity, View, Text, Image, FlatList, ScrollView, ActivityIndicator, Modal } from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import { useSelector } from "react-redux";
import firestore from '@react-native-firebase/firestore';
import FontAwesome from "react-native-vector-icons/FontAwesome";
import AntDesign from "react-native-vector-icons/AntDesign";
import ActionSheet from "react-native-actions-sheet";
import Snackbar from "react-native-snackbar";
import Style from "./style";
import color from "../../components/Common/color";
import CustomButton from "../../components/CustomButton";
import CustomDropDown from "../../components/CustomDropDown";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";

const OrderDetails = () => {
    const navigation = useNavigation();
    const route = useRoute();
    const order = route.params.Order;
    const userId = useSelector((state) => state.userId);
    const actionSheetRef = useRef(null);
    const [orderStatus, setOrderStatus] = useState('');
    const [status, setStatus] = useState('');
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (order) {
            setOrderStatus(order?.orderStatus);
        }
    }, [order]);

    useLayoutEffect(() => {
        navigation.setOptions({
            title: 'OrderDetails',
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

    const handleUpdateOrder = async () => {
        try {
            if (order?.id && status !== '') {
                setLoading(true);
                await firestore()
                    .collection('Orders')
                    .doc(order.id)
                    .update({ orderStatus: status })
                    .then(() => {
                        actionSheetRef.current?.hide();
                        setOrderStatus(status);
                        setLoading(false);
                        setTimeout(() => {
                            Snackbar.show({
                                text: "Order Updated",
                                duration: Snackbar.LENGTH_LONG,
                                backgroundColor: color.primaryGreen,
                                textColor: color.white
                            });
                        }, 1000);
                    });
            }
        } catch (error) {
            setLoading(false);
            console.log(error);
        }
    };

    const statusData = [
        { head: 'Orders' },
        { head: 'Order Inprogress' },
        { head: 'Order Packed' },
        { head: 'Order Shipped' },
        { head: 'Out Of Delivery' },
        { head: 'Delivered' },
        { head: 'Returned' },
        { head: 'Failed' }
    ];

    return (
        <View style={{ flex: 1, backgroundColor: color.lightWhit }}>
            <ActionSheet ref={actionSheetRef}>
                <View style={{ padding: 20 }}>
                    <TouchableOpacity onPress={() => actionSheetRef.current.hide()} style={{ alignSelf: 'flex-end' }}>
                        <AntDesign name='closecircleo' size={28} color={color.black} />
                    </TouchableOpacity>
                    <CustomDropDown data={statusData} setData={(text) => {
                        console.log('Selected Status:', text);
                        setStatus(text);
                    }} />
                    <CustomButton
                        type='primary'
                        ButtonText={'Update Order'}
                        handleButton={handleUpdateOrder}
                    />
                </View>
            </ActionSheet>
            <Modal animationType="fade" transparent={true} visible={loading}>
                <View style={Style.modalContainer}>
                    <ActivityIndicator size="large" color={color.white} />
                </View>
            </Modal>
            <ScrollView
                showsVerticalScrollIndicator={false}
                style={{ padding: 15 }}
                contentContainerStyle={{ paddingBottom: 150 }}
            >
                <View style={Style.orderHeader}>
                    <Image style={Style.orderImage} source={require('../../assets/images/box.png')} />
                    <View style={Style.orderDetails}>
                        <Text style={Style.orderIdText}>orderId: #{order?.orderId ?? '7473878'}</Text>
                        <Text style={Style.orderStatusText}>{orderStatus.head ?? ''}</Text>
                    </View>
                </View>
                <View style={Style.itemsSection}>
                    <Text style={Style.sectionTitle}>items</Text>
                    {order?.cartItems && order?.cartItems.map((ele, index) => (
                        <View key={index} style={Style.itemRow}>
                            <View style={Style.quantityBox}>
                                <Text style={Style.quantityText}>{ele.quantity}</Text>
                            </View>
                            <View style={Style.itemDetails}>
                                <Text style={Style.itemName}>{ele.head}</Text>
                            </View>
                            <Text style={Style.itemPrice}>₹{ele.price}</Text>
                        </View>
                    ))}
                </View>
                <View style={Style.paymentDetailsSection}>
                    <Text style={Style.sectionTitle}>Payment Details</Text>
                    <View style={Style.paymentDetailsRow}>
                        <View>
                            <Text style={Style.paymentDetailText}>Bag Total</Text>
                            <Text style={Style.paymentDetailText}>Discount Coupon</Text>
                            <Text style={Style.paymentDetailText}>Delivery</Text>
                        </View>
                        <View style={Style.paymentDetailAmounts}>
                            <Text style={Style.paymentDetailText}>₹134</Text>
                            <Text style={Style.discountText}>Apply Coupon</Text>
                            <Text style={Style.paymentDetailText}>₹50.00</Text>
                        </View>
                    </View>
                    <View style={Style.totalAmountRow}>
                        <Text style={Style.totalAmountText}>Total Amount</Text>
                        <Text style={Style.totalAmountText}>₹{order?.totalAmount}</Text>
                    </View>
                </View>
                <View style={Style.addressSection}>
                    <Text style={Style.sectionTitle}>Address</Text>
                    <Text style={Style.addressText}>{order?.address}</Text>
                </View>
                <View style={Style.paymentMethodSection}>
                    <Text style={Style.sectionTitle}>Payment Method</Text>
                    <View style={Style.paymentMethodRow}>
                        <Image style={Style.paymentMethodImage} source={require('../../assets/images/visa.png')} />
                        <View style={Style.paymentMethodDetails}>
                            <Text style={Style.paymentMethodText}>**** **** **** 7040</Text>
                            <Text style={Style.paymentMethodText}>{order?.paymentMethod}</Text>
                        </View>
                    </View>
                </View>
            </ScrollView>
            <View style={Style.footer}>
                <CustomButton
                    type='primary'
                    handleButton={() => actionSheetRef.current?.show()}
                    ButtonText={'Order Status'}
                />
            </View>
        </View>
    );
};

export default OrderDetails;
