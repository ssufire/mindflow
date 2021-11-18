import React from "react";
import { Box, Button, Text } from "native-base";
import { getDummySituation } from "../lib/diary/getDummyDiaryData";

export default function DiarySituation({ situation, setSituation }) {
	return (
		<Box>
			<Text>적절한 상황을 선택해주세요</Text>
			<Box flex="1" flexWrap="wrap" flexDirection="row">
				{getDummySituation().map((value) => (
					<Chip
						value={value}
						selected={value === situation}
						setSituation={setSituation}
					/>
				))}
			</Box>
		</Box>
	);
}

const Chip = ({ value, selected, setSituation }) => {
	return (
		<Button
			m="1"
			alignSelf="flex-start"
			onPress={() => setSituation(value)}
			background={selected ? "yellow.100" : "white"}
			borderRadius="full"
			borderWidth="1"
			_text={{ color: "black" }}
		>
			{value}
		</Button>
	);
};
