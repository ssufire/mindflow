import React, { useEffect, useState } from "react";
import { Divider, Modal } from "native-base";
import DiarySituation from "../component/DiarySituation";
import DiaryEmotion from "../component/DiaryEmotion";
import DiaryWrite from "../component/DiaryWrite";
import writeDiary from "../lib/diary/writeDiary";

export default function DiaryWriteContainer() {
	const [text, setText, length] = useDiaryWrite();
	const [situation, setSituation] = useState("");
	const [emotion, setEmotion] = useState({
		emotion: "FINE",
		emotionIntensity: 1,
	});

	const [modalVisible, setModalVisible] = useState(false);

	const onPressEmotion = () => {
		setModalVisible(true);
	};

	const onPressWrite = async () => {
		await writeDiary(
			text,
			emotion.emotion,
			emotion.emotionIntensity,
			situation
		);
	};

	return (
		<>
			<DiaryWrite
				text={text}
				length={length}
				setText={setText}
				onPressWrite={onPressWrite}
				onPressEmotion={onPressEmotion}
			/>
			<Modal isOpen={modalVisible} onClose={() => setModalVisible(false)}>
				<Modal.Content background="white">
					<Modal.CloseButton />
					<Modal.Body background="white" p="5">
						<DiaryEmotion
							emotion={emotion}
							setEmotion={setEmotion}
						/>
						<Divider my="2" />
						<DiarySituation
							situation={situation}
							setSituation={setSituation}
						/>
					</Modal.Body>
				</Modal.Content>
			</Modal>
		</>
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
