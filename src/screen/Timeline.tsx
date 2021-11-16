import React from "react";
import { SafeAreaView } from "react-native";
import { Box, FlatList, Heading } from "native-base";
import DiaryCard from "../component/DiaryCard";

export default function Timeline() {
	return (
		<SafeAreaView style={{ flex: 1, backgroundColor: "#eeeeee" }}>
			<Box px="5" style={{ flex: 1 }}>
				<Heading>Timeline</Heading>
				<FlatList
					data={dummyData}
					renderItem={({ item }) => (
						<DiaryCard
							author={item.author}
							context={item.context}
							content={item.content}
							createdAt={item.createdAt}
							key={`diary_${item.createdAt.getTime()}`}
						/>
					)}
				/>
			</Box>
		</SafeAreaView>
	);
}

const dummyData = [
	{
		author: "이세빈",
		context: "근무",
		content: `퇴근하고 싶다.${"\n"}현재시각 5시 37분, 부천소사경찰서`,
		createdAt: new Date(),
	},
	{
		author: "하정훈",
		context: "근무",
		content: `퇴근하고 싶다.${"\n"}현재시각 5시 37분, 부천소사경찰서`,
		createdAt: new Date(),
	},
	{
		author: "전수연",
		context: "근무",
		content: `퇴근하고 싶다.${"\n"}현재시각 5시 37분, 부천소사경찰서`,
		createdAt: new Date(),
	},
	{
		author: "이세빈",
		context: "근무",
		content: `퇴근하고 싶다.${"\n"}현재시각 5시 37분, 부천소사경찰서`,
		createdAt: new Date(),
	},
	{
		author: "하정훈",
		context: "근무",
		content: `퇴근하고 싶다.${"\n"}현재시각 5시 37분, 부천소사경찰서`,
		createdAt: new Date(),
	},
	{
		author: "전수연",
		context: "근무",
		content: `퇴근하고 싶다.${"\n"}현재시각 5시 37분, 부천소사경찰서`,
		createdAt: new Date(),
	},
];
