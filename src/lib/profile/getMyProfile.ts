import firestore from "@react-native-firebase/firestore";

/**
 * @description 내 프로필 정보를 가져오는 함수입니다.
 * @returns {null | FirebaseFirestoreTypes.DocumentData} user colletion의 값을 반환합니다.
 */
export default async function getMyProfile(uid: string) {
    console.log("Current User", uid);

    // * Return current user's user profile
    return await (await firestore().collection("user").doc(uid).get()).data();
}
