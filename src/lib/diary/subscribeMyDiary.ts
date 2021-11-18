import auth from "@react-native-firebase/auth";
import firestore from "@react-native-firebase/firestore";

export default function subscribeMyDiary() {
	// * Get current user's uid
	const uid = auth().currentUser?.uid;
	if (!uid) return null;

	// * Subscribe my diary data
	const subscriber = firestore()
		.collection("diary")
		.where("author", "==", uid)
		.orderBy("createdAt", "desc")
		.onSnapshot((documentSnapshot) => {
			console.log("Updated", documentSnapshot.docs);
		});

	// * Return subscriber to unsubscribe diary when the component unmounted.
	return subscriber;
}
