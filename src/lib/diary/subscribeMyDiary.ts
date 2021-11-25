import auth from "@react-native-firebase/auth";
import firestore from "@react-native-firebase/firestore";

/**
 * @description 내 일기정보가 바뀌었을 때 이를 가져오는 subscribe 함수를 설정하는 함수입니다.
 * @param {React.Dispatch<React.SetStateAction<any[]>>} setDiary 일기정보를 저장할 setState 함수를 전달합니다.
 * @returns {() => void} Subscribe를 해제할 함수를 반환합니다.
 */
export default function subscribeMyDiary(setDiary) {
    // * Get current user's uid
    const uid = auth().currentUser?.uid;
    if (!uid) return null;

    // * Subscribe my diary data
    const subscriber = firestore()
        .collection("diary")
        .where("author", "==", uid)
        .orderBy("createdAt", "desc")
        .onSnapshot((documentSnapshot) => {
            if (auth().currentUser) {
                setDiary(() =>
                    documentSnapshot.docs.map((value) => ({
                        ...value.data(),
                        createdAt: value.data().createdAt.toDate(),
                        id: value.id,
                    }))
                );
            }
        });

    // * Return subscriber to unsubscribe diary when the component unmounted.
    return subscriber;
}
