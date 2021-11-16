import React from "react";
import { Box, HamburgerIcon, IconButton, HStack, Text } from "native-base";

export default function DiaryCard({
	author = "",
	context = "",
	content = "",
	createdAt = new Date(),
	onActionSheetPress = () => {},
}) {
	return (
		<Box backgroundColor="white" p="3" my="3" width="100%" rounded="xl">
			<HStack my="1">
				{/* Place emotion color here*/}
				<Box flex={1} mx="2">
					<Text fontSize="md" color="gray.500">
						{context && (
							<Text>
								<Text color="darkText">{context}</Text> 중인{" "}
							</Text>
						)}
						{author}
					</Text>
					<Text fontSize="xs" my="0">
						{createdAt.getHours()}:{createdAt.getMinutes()}
					</Text>
				</Box>
				<IconButton
					icon={<HamburgerIcon size="4" />}
					onPress={onActionSheetPress}
				/>
			</HStack>
			<Text fontSize="sm" my="3">
				{content}
			</Text>
		</Box>
	);
}
