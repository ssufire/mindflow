import { captureEvent, Severity } from "@sentry/react";
import { setNickname } from "../../redux/store/userInfo";
import getMyProfile from "../profile/getMyProfile";
import store from "../../redux/store";
import { FirebaseAuthTypes } from "@react-native-firebase/auth";

/**
 * @description 로그인으로 사용자 정보가 변경되었을 때, 프로필 정보를 받아오고 routing을 진행합니다.
 * @param {FirebaseAuthTypes.User} user 로그인 후 반환된 사용자 정보를 전달합니다.
 * @param navigation Screen Routing에 사용되는 navigation 객체를 전달합니다
 */
export default function onAuthStateChangeHandler(user, navigation) {
    getMyProfile(user.uid)
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
            captureEvent({
                message: "Error on getProfile in onAuthStateChanged",
                extra: { error, user },
                level: Severity.Warning,
            });
        });
}
