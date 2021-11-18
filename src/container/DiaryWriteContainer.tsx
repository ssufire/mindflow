import React, { useEffect, useState } from "react";
import DiaryWrite from "../component/DiaryWrite";

export default function DiaryWriteContainer() {
	const lengthLimit = 200;
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

	return <DiaryWrite text={text} setText={setText} length={length} />;
}
