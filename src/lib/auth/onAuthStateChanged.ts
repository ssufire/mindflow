import { Alert } from "react-native";
import auth from "@react-native-firebase/auth";
import getMyProfile from "../profile/getMyProfile";
import { setNickname } from "../../redux/store/userInfo";
import store from "../../redux/store";

export default function onAuthStateChanged(navigation) {
    const subscribe = auth().onAuthStateChanged((user) => {
        if (!user) {
            navigation.reset({ routes: [{ name: "signin" }] });
        }

        getMyProfile()
            .then((profileData) => {
                if (profileData) {
                    store.dispatch(setNickname(profileData?.nickname));
                    const navState = navigation.getState();

                    // * To Duplicate multiple routing, add conditions
                    if (
                        !navState ||
                        !(
                            navState.routes.length === 1 &&
                            navState.routes[0].name === "timeline"
                        )
                    )
                        navigation.reset({
                            routes: [{ name: "timeline" }],
                        });
                } else {
                    navigation.navigate("welcome");
                }
            })
            .catch((error) => {
                console.log(error);
                Alert.alert(
                    "오류 발생",
                    "오류가 발생했습니다. 다시 시도해주세요"
                );
            });
    });

    return subscribe;
}
