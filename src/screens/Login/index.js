import React, { useState } from "react";
import { View, Text, ScrollView, Image, Dimensions } from "react-native";
import style from "./style";
import CustomTextInput from "../../components/CustomTextInput";
import CustomButton from "../../components/CustomButton";
import Snackbar from "react-native-snackbar";
import firestore from "@react-native-firebase/firestore";
import { useDispatch } from "react-redux";
import { login } from "../../storage/action";
import color from "../../components/Common/color";

// Get screen dimensions
const { width, height } = Dimensions.get('window');

const Login = () => {
    // Add state for email and password
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const dispatch = useDispatch()

    const handleLogin = async () => {
        if (email.trim() === "" || password.trim() === "") {
            Snackbar.show({
                text: "Fill up the fields to continue..",
                duration: Snackbar.LENGTH_LONG,
                backgroundColor: color.red,
            });
            return;
        }
        try {
            const snapshot = await firestore()
                .collection("User")
                .where("email", "==", email.trim())
                .get();
            if (snapshot.empty) {
                Snackbar.show({
                    text: "No user found with this email.",
                    duration: Snackbar.LENGTH_LONG,
                    backgroundColor: color.red,
                });
            } else {
                let loginSuccessful = false;
                snapshot.forEach((documentSnapshot) => {
                    const userData = documentSnapshot.data();
                    if (password.trim() === userData.password) {
                        loginSuccessful = true;
                        dispatch(login({ userId: documentSnapshot.id }))
                        Snackbar.show({
                            text: "Login Successful",
                            duration: Snackbar.LENGTH_LONG,
                            backgroundColor: color.primaryGreen,
                        });
                    }
                });

                if (!loginSuccessful) {
                    Snackbar.show({
                        text: "The password you entered is wrong.",
                        duration: Snackbar.LENGTH_LONG,
                        backgroundColor: color.red,
                    });
                }
            }
        } catch (error) {
            console.error("Error fetching user data:", error);
            Snackbar.show({
                text: "An error occurred. Please try again.",
                duration: Snackbar.LENGTH_LONG,
                backgroundColor: color.red,
            });
        }
    };

    return (
        <View style={style(width, height).container}>
            <Image
                source={require("../../assets/images/bg.webp")}
                style={style(width, height).topBg}
            />
            <ScrollView
                style={style(width, height).scrollview}
                showsVerticalScrollIndicator={false}
            >
                <Image
                    source={require("../../assets/images/logo.png")}
                    style={style(width, height).logo}
                />
                <Text style={style(width, height).loginText}>Login Account</Text>

                <CustomTextInput
                    type="email"
                    handleText={(text) => setEmail(text)}
                    placeholder="Email Address"
                />
                <CustomTextInput
                    type="password"
                    handleText={(text) => setPassword(text)}
                    placeholder="Password"
                />

                <CustomButton
                    type="primary"
                    handleButton={handleLogin}
                    ButtonText={"Sign In"}
                />
            </ScrollView>
        </View>
    );
};

export default Login;


// import React, { useState } from "react";
// import { View, Text, ScrollView, Image, Dimensions } from "react-native";
// import style from "./style";
// import CustomTextInput from "../../components/CustomTextInput";
// import CustomButton from "../../components/CustomButton";
// import Snackbar from "react-native-snackbar";
// import firestore from "@react-native-firebase/firestore";
// import { useDispatch } from "react-redux";
// import { login } from "../../storage/action";
// import color from "../../components/Common/color";
// import { ValidateEmail } from "../../components/Common/validation";

// // Get screen dimensions
// const { width, height } = Dimensions.get('window');

// const Login = () => {
//     // Add state for email and password
//     const [email, setEmail] = useState('');
//     const [password, setPassword] = useState('');
//     const dispatch = useDispatch();

//     const handleLogin = async () => {
//         if (email.trim() === "" || password.trim() === "") {
//             Snackbar.show({
//                 text: "Fill up the fields to continue.",
//                 duration: Snackbar.LENGTH_LONG,
//                 backgroundColor: color.red,
//             });
//             return;
//         }

//         if (!ValidateEmail(email.trim())) {
//             Snackbar.show({
//                 text: "Enter a valid email address.",
//                 duration: Snackbar.LENGTH_LONG,
//                 backgroundColor: color.red,
//             });
//             return;
//         }

//         try {
//             const snapshot = await firestore()
//                 .collection("User")
//                 .where("email", "==", email.trim())
//                 .get();

//             if (snapshot.empty) {
//                 Snackbar.show({
//                     text: "No user found with this email.",
//                     duration: Snackbar.LENGTH_LONG,
//                     backgroundColor: color.red,
//                 });
//             } else {
//                 let loginSuccessful = false;
//                 snapshot.forEach((documentSnapshot) => {
//                     const userData = documentSnapshot.data();
//                     if (password.trim() === userData.password) {
//                         loginSuccessful = true;
//                         dispatch(login({ userId: documentSnapshot.id }));
//                         Snackbar.show({
//                             text: "Login Successful",
//                             duration: Snackbar.LENGTH_LONG,
//                             backgroundColor: color.primaryGreen,
//                         });
//                     }
//                 });

//                 if (!loginSuccessful) {
//                     Snackbar.show({
//                         text: "The password you entered is incorrect.",
//                         duration: Snackbar.LENGTH_LONG,
//                         backgroundColor: color.red,
//                     });
//                 }
//             }
//         } catch (error) {
//             console.error("Error fetching user data:", error);
//             Snackbar.show({
//                 text: "An error occurred. Please try again.",
//                 duration: Snackbar.LENGTH_LONG,
//                 backgroundColor: color.red,
//             });
//         }
//     };

//     return (
//         <View style={style(width, height).container}>
//             <Image
//                 source={require("../../assets/images/bg.webp")}
//                 style={style(width, height).topBg}
//             />
//             <ScrollView
//                 style={style(width, height).scrollview}
//                 showsVerticalScrollIndicator={false}
//             >
//                 <Image
//                     source={require("../../assets/images/logo.png")}
//                     style={style(width, height).logo}
//                 />
//                 <Text style={style(width, height).loginText}>Login Account</Text>

//                 <CustomTextInput
//                     type="email"
//                     handleText={(text) => setEmail(text)}
//                     placeholder="Email Address"
//                     value={email}
//                 />
//                 <CustomTextInput
//                     type="password"
//                     handleText={(text) => setPassword(text)}
//                     placeholder="Password"
//                     value={password}
//                 />

//                 <CustomButton
//                     type="primary"
//                     handleButton={handleLogin}
//                     ButtonText={"Sign In"}
//                 />
//             </ScrollView>
//         </View>
//     );
// };

// export default Login;
