import React from "react";
import { TextInput } from "react-native";
import { Box, Text } from "native-base";

export default function DiaryWrite({ text, setText, length }) {
	return (
		<>
			<Text fontSize="lg" marginTop="3">
				지금 기분이 어떤가요?
			</Text>
			<Box
				backgroundColor="white"
				p="3"
				my="3"
				h="xs"
				width="100%"
				rounded="xl"
			>
				<TextInput
					value={text}
					onChangeText={setText}
					multiline={true}
					style={{ flex: 1 }}
				/>
				<Text>{length}/200</Text>
			</Box>
		</>
	);
}
