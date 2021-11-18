import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native";
import { Button, FlatList, Heading } from "native-base";

import subscribeMyDiary from "../lib/diary/subscribeMyDiary";
import getMyProfile from "../lib/profile/getMyProfile";
import writeDiary from "../lib/diary/writeDiary";
import DiaryCard from "../component/DiaryCard";

export default function Timeline() {
	const [diary, setDiary] = useState([]);
	const [myProfile, setMyProfile] = useState({ nickname: "" });

	useEffect(() => {
		getMyProfile().then((res) => setMyProfile(res));
		const subscriber = subscribeMyDiary(setDiary);

		return () => {
			if (subscriber) subscriber();
		};
	}, []);

	return (
		<SafeAreaView style={{ flex: 1, backgroundColor: "#eeeeee" }}>
			<FlatList
				px="5"
				data={diary}
				showsVerticalScrollIndicator={false}
				ListHeaderComponent={() => (
					<>
						<Heading>Timeline</Heading>
						<Button
							onPress={async () => {
								await writeDiary("일기내용", "fine", 3);
							}}
						>
							일기쓰기
						</Button>
					</>
				)}
				renderItem={({ item }) => {
					return (
						<DiaryCard
							{...item}
							author={myProfile.nickname}
							key={item.id}
						/>
					);
				}}
			/>
		</SafeAreaView>
	);
}
