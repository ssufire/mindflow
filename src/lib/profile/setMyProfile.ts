import { Alert } from "react-native";
import auth from "@react-native-firebase/auth";
import firestore from "@react-native-firebase/firestore";
import { setNickname } from "../../redux/store/userInfo";
import store from "../../redux/store";

export default async function setMyProfile(nickname) {
    if (nickname.length < 1 || nickname.length > 10) {
        Alert.alert("닉네임 오류", "2-10글자의 닉네임을 입력해주세요");
        return false;
    }

    // * Get current user's uid
    const uid = auth().currentUser?.uid;
    if (!uid) return false;

    return await firestore()
        .collection("user")
        .doc(uid)
        .set({ nickname })
        .then(() => {
            store.dispatch(setNickname(nickname));
            return true;
        })
        .catch((error) => {
            console.log(error);
            Alert.alert(
                "오류 발생",
                "닉네임 설정 중 오류가 발생했습니다. 다시 시도해주세요"
            );

            return false;
        });
}
