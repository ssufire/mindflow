import React from "react";
import DiaryCard from "../component/DiaryCard";

export default function DiaryCardContainer(props) {
	const onPressActionSheet = () => {};

	return <DiaryCard {...props} onPressActionSheet={onPressActionSheet} />;
}
