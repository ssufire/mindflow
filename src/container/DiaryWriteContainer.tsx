import { Alert } from "react-native";
import React, { useEffect, useState } from "react";
import { getEmotionColor } from "../lib/emotion/getEmotionColor";
import DiaryWriteModal from "../component/diary/DiaryWriteModal";
import DiaryWrite from "../component/diary/DiaryWrite";
import writeDiary from "../lib/diary/writeDiary";

export default function DiaryWriteContainer() {
    const { text, setText, length } = useDiaryWrite();
    const [situation, setSituation] = useState("");
    const [emotion, setEmotion] = useState({
        emotion: "FINE",
        emotionIntensity: 1,
    });

    const [modalVisible, setModalVisible] = useState(false);

    const onPressWrite = async () => {
        if (length === 0) {
            Alert.alert("작성한 내용이 없습니다.");
            return;
        }

        await writeDiary(
            text,
            emotion.emotion,
            emotion.emotionIntensity,
            situation
        ).then(() => setText(""));
    };

    const onPressEmotionButton = (emotion, emotionIntensity) => {
        setEmotion({ emotion, emotionIntensity });
    };

    const onPressSituationButton = (value) => setSituation(value);

    const onPressShowModalButton = () => setModalVisible(true);

    return (
        <>
            <DiaryWrite
                text={text}
                length={length}
                setText={setText}
                situation={situation}
                onPressWrite={onPressWrite}
                onPressShowModalButton={onPressShowModalButton}
                emotionColor={getEmotionColor(
                    emotion.emotion,
                    emotion.emotionIntensity
                )}
            />
            <DiaryWriteModal
                emotion={emotion}
                situation={situation}
                modalVisible={modalVisible}
                setModalVisible={setModalVisible}
                onPressEmotionButton={onPressEmotionButton}
                onPressSituationButton={onPressSituationButton}
            />
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

    return { text, setText, length };
};
