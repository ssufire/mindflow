import React from "react";
import { TouchableOpacity } from "react-native";
import { Box, HStack, Text, View } from "native-base";
import {
	getDummyEmotion,
	getDummyIntensity,
} from "../lib/diary/getDummyDiaryData";

const emotionList = getDummyEmotion();
const intensity = getDummyIntensity();

export default function DiaryEmotion({ emotion, setEmotion }) {
	return (
		<Box style={{ flex: 1 }}>
			<Text>감정을 선택해주세요</Text>
			{intensity.map((intensity) => (
				<HStack
					my="3"
					justifyContent="space-between"
					key={`emotion_intensity_${intensity}`}
				>
					{emotionList.map((value) => (
						<TouchableOpacity
							onPress={() => {
								setEmotion({
									emotion: value,
									emotionIntensity: intensity,
								});
							}}
							key={`${value}_${intensity}`}
						>
							<View
								style={{
									width: 20,
									height: 20,
									borderRadius: 10,
									backgroundColor: "#ff0000",
									borderWidth:
										value === emotion.emotion &&
										intensity === emotion.emotionIntensity
											? 1
											: 0,
									borderColor: "#660000",
								}}
							/>
						</TouchableOpacity>
					))}
				</HStack>
			))}
		</Box>
	);
}
