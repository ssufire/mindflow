import auth from "@react-native-firebase/auth";
import firestore from "@react-native-firebase/firestore";
import { Alert } from "react-native";
import fakerStatic from "faker";
import { getDummyEmotion } from "./getDummyDiaryData";

export default async function writeDiary_Mock(
    text = fakerStatic.lorem.sentence(5),
    emotion = getDummyEmotion()[new Date().getTime() % 5],
    emotionIntensity = fakerStatic.datatype.number({
        min: 1,
        max: 5,
    }),
    situation = fakerStatic.system.fileType()
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
        .catch((err) => {
            console.log(err);
            Alert.alert(
                "오류 발생",
                "일기 작성 중 오류가 발생했습니다. 다시 시도해주세요"
            );
        });
}
