import React, { useState } from "react";
import DiaryExplodeModal from "../component/diary/DiaryExplodeModal";
import addDiaryBomb from "../lib/diary/addDiaryBomb";

export default function DiaryExplodeModalContainer({
    id,
    modalVisible,
    setModalVisible,
}) {
    const [selectedTime, setSelectedTime] = useState(1);
    const onPressSetTimebomb = async () => {
        await addDiaryBomb(id, selectedTime);
        setModalVisible(false);
    };

    return (
        <DiaryExplodeModal
            selectedTime={selectedTime}
            modalVisible={modalVisible}
            setSelectedTime={setSelectedTime}
            setModalVisible={setModalVisible}
            onPressSetTimebomb={onPressSetTimebomb}
        />
    );
}
