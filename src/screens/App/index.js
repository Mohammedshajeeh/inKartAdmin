import React, { useState, useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Provider, useSelector } from "react-redux";
import Splash from "../Splash";
import Login from "../Login";
import Home from "../Home";
import CustomDrawer from "../../components/CustomDrawer";
import CustomTab from "../../components/CustomTab";
import Users from "../Users";
import Orders from "../Orders";
import Profile from "../Profile";
import Products from "../Products";
import { DimensionContextProvider } from "../../context";
import { store } from "../../storage/store";
import ProductDetails from "../ProductDetails";
import OrderDetails from "../OrderDetails";
import CreateProduct from "../CreateProduct";
import Banner from "../Banners";
import Offers from "../Offers";




const Stack = createNativeStackNavigator();

const App = () => {
    return (
        <Provider store={store}>
            <AppNav />
        </Provider>
    );
};


const AppNav = () => {

    const [loading, setLoading] = useState(true);
    const isLoggedIN = useSelector((state) => state.isLoggedIN); // Adjust the state path as necessary

    useEffect(() => {
        setTimeout(() => {
            setLoading(false);
        }, 3000);
    }, [isLoggedIN]);

    return (
        <DimensionContextProvider>
            <NavigationContainer>
                <Stack.Navigator screenOptions={{ headerShown: false }}>
                    {loading ? (
                        <Stack.Screen name="Splash" component={Splash} />
                    ) : (
                        <>
                            {isLoggedIN ? (
                                <Stack.Screen name="SideBar" component={SideBar} />
                            ) : (
                                <Stack.Screen name="Login" component={Login} />
                            )}
                        </>
                    )}
                </Stack.Navigator>
            </NavigationContainer>
        </DimensionContextProvider>
    );
};


const Drawer = createDrawerNavigator();


const SideBar = () => {
    return (
        <Drawer.Navigator initialRouteName="Footer"
            screenOptions={{ headerShown: false }}
            drawerContent={props => <CustomDrawer {...props} />}
        >
            <Drawer.Screen name="Footer" component={Footer} />
        </Drawer.Navigator>
    );
};



const Tab = createBottomTabNavigator();

const Footer = () => {
    return (
        <Tab.Navigator
            screenOptions={{
                headerShown: false
            }}
            tabBar={props => <CustomTab {...props} />}
            initialRouteName="StackNav" >
            <Tab.Screen name="StackNav" component={StackNav} />
        </Tab.Navigator>
    );
};

const stackNavigator = createNativeStackNavigator();


const StackNav = () => {
    return (
        <stackNavigator.Navigator initialRouteName="Home">
            <stackNavigator.Screen name="Home" component={Home} />
            <stackNavigator.Screen name="Users" component={Users} />
            <stackNavigator.Screen name="Orders" component={Orders} />
            <stackNavigator.Screen name="Profile" component={Profile} />
            <stackNavigator.Screen name="Products" component={Products} />
            <stackNavigator.Screen name="ProductDetails" component={ProductDetails} />
            <stackNavigator.Screen name="OrderDetails" component={OrderDetails} />
            <stackNavigator.Screen name="CreateProduct" component={CreateProduct} />
            <stackNavigator.Screen name="Banners" component={Banner} />
            <stackNavigator.Screen name="Offers" component={Offers} />
        </stackNavigator.Navigator>
    )
}



export default App;
