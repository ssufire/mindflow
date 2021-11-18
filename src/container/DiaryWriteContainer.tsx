import React, { useEffect, useState } from "react";
import DiaryWrite from "../component/DiaryWrite";
import writeDiary from "../lib/diary/writeDiary";

export default function DiaryWriteContainer() {
	const [text, setText, length] = useDiaryWrite();
	const [situation, setSituation] = useState("");
	const [emotion, setEmotion] = useState({
		emotion: "fine",
		emotionIntensity: 1,
	});

	const onPressEmotion = () => {};

	const onPressWrite = async () => {
		await writeDiary(
			text,
			emotion.emotion,
			emotion.emotionIntensity,
			situation
		);
	};

	return (
		<DiaryWrite
			text={text}
			length={length}
			setText={setText}
			onPressWrite={onPressWrite}
			onPressEmotion={onPressEmotion}
		/>
	);
}

const useDiaryWrite = (lengthLimit = 200) => {
	const [text, setText] = useState("");
	const [length, setLength] = useState(0);

	useEffect(() => {
		setLength(() => {
			const length = text.length;
			if (length > lengthLimit)
				setText((prev) => prev.slice(0, lengthLimit));

			return length;
		});
	}, [text]);

	return [text, setText, length];
};
