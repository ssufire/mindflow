import React from "react";
import { Button, Modal, Text } from "native-base";
import { Picker } from "@react-native-picker/picker";
import { getExplodeTimeList } from "../../lib/data/getStaticData";

const timelist = getExplodeTimeList();

export default function DiaryExplodeModal({
    modalVisible,
    setModalVisible,
    selectedTime,
    setSelectedTime,
    onPressSetTimebomb,
}) {
    return (
        <Modal isOpen={modalVisible} onClose={() => setModalVisible(false)}>
            <Modal.Content py="3" rounded="lg">
                <Modal.CloseButton />
                <Text textAlign="center" fontSize="md" my="3">
                    지금 이 감정,{"\n"}언제 떠나보내실 건가요?
                </Text>
                <Picker
                    selectedValue={selectedTime}
                    onValueChange={setSelectedTime}
                >
                    {timelist.map((value) => (
                        <Picker.Item
                            label={`${value}시간 후`}
                            value={value}
                            key={value}
                        />
                    ))}
                </Picker>
                <Button m="3" mx="5" onPress={onPressSetTimebomb}>
                    떠나보내기
                </Button>
            </Modal.Content>
        </Modal>
    );
}
