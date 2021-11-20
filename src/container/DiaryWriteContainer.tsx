import React, { useEffect, useState } from "react";
import DiaryWriteModal from "../component/DiaryWriteModal";
import DiaryWrite from "../component/DiaryWrite";
import writeDiary from "../lib/diary/writeDiary";
import { getEmotionColor } from "../lib/emotion/getEmotionColor";

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
                emotionColor={getEmotionColor(
                    emotion.emotion,
                    emotion.emotionIntensity
                )}
            />
            <DiaryWriteModal
                emotion={emotion}
                situation={situation}
                modalVisible={modalVisible}
                setEmotion={setEmotion}
                setSituation={setSituation}
                setModalVisible={setModalVisible}
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

    return [text, setText, length];
};
