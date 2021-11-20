import emotionColors from "./emotionColors";
import { getDummyEmotion, getDummyIntensity } from "../diary/getDummyDiaryData";

/**
 * @description 감정에 따른 색상값을 반환하는 함수입니다.
 * @param {string} emotion 감정(ANGRY, FEAR, SADNESS, FINE, HAPPINESS) 데이터를 전달합니다.
 * @param {number} emotionIntensity 감정의 강도를 전달합니다.
 * @returns {ColorValue} 감정에 따른 색상이 정의된 경우에는 해당 색상을, 정의되지 않은 값일 경우 "#ffffff"를 반환합니다.
 */
export function getEmotionColor(emotion, emotionIntensity) {
    const emotionList = getDummyEmotion();
    const emotionIntensityList = getDummyIntensity();

    if (
        emotionList.some((v) => emotion) &&
        emotionIntensityList.some((v) => emotionIntensity)
    ) {
        return emotionColors[emotion.toUpperCase()][emotionIntensity - 1];
    }

    return "#ffffff";
}

/**
 * @description 감정에 따른 외곽선 색상값을 반환하는 함수입니다.
 * @param {string} emotion 감정(ANGRY, FEAR, SADNESS, FINE, HAPPINESS) 데이터를 전달합니다.
 * @returns {ColorValue} 감정에 따른 외곽선 색상이 정의된 경우에는 해당 색상을, 정의되지 않은 값일 경우 "#ffffff"를 반환합니다.
 */
export function getEmotionBorderColor(emotion) {
    const emotionList = getDummyEmotion();

    return emotionList.some((v) => emotion)
        ? `${emotionColors[emotion.toUpperCase()][4]}22`
        : "#ffffff";
}
