import auth from "@react-native-firebase/auth";
import firestore from "@react-native-firebase/firestore";

/**
 * @description 내 프로필 정보를 가져오는 함수입니다.
 * @returns {FirebaseFirestoreTypes.DocumentData} user colletion의 값을 반환합니다.
 */
export default async function getMyProfile() {
	// * Get current user's uid
	const uid = auth().currentUser?.uid;
	if (!uid) return "";

	// * Return current user's user profile
	return await (await firestore().collection("user").doc(uid).get()).data();
}
