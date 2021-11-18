import auth from "@react-native-firebase/auth";
import firestore from "@react-native-firebase/firestore";
import { Alert } from "react-native";

export default async function writeDiary(
	text,
	emotion,
	emotionIntensity,
	situation = ""
) {
	// * Get current user's uid
	const uid = auth().currentUser?.uid;
	if (!uid) return null;

	// * Make diary data
	const data = {
		text,
		emotion,
		emotionIntensity,
		situation,
		createdAt: new Date(),
		explodedAt: null,
		author: uid,
	};

	// * Store diary data to firestore
	await firestore()
		.collection("diary")
		.add(data)
		.then(() => Alert.alert("일기 작성", "일기가 작성되었습니다."))
		.catch((err) => {
			console.log(err);
			Alert.alert(
				"오류 발생",
				"일기 작성 중 오류가 발생했습니다. 다시 시도해주세요"
			);
		});
}
