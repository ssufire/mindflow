import { Alert } from "react-native";
import auth from "@react-native-firebase/auth";
import setMyProfile from "../profile/setMyProfile";

export default function onAuthStateChanged(navigation) {
	const subscribe = auth().onAuthStateChanged((user) => {
		if (user) {
			setMyProfile()
				.then(() =>
					navigation.reset({ routes: [{ name: "timeline" }] })
				)
				.catch((error) => {
					console.log(error);
					Alert.alert(
						"오류 발생",
						"오류가 발생했습니다. 다시 시도해주세요"
					);
				});
		} else {
			navigation.reset({ routes: [{ name: "signin" }] });
		}
	});

	return subscribe;
}
