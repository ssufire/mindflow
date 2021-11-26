import getDiaryWeek from "./getDiaryWeek";
import getPeriodEmotionAnalysis from "./getPeriodEmotionAnalysis";

export default async function getWeeklyStatistics() {
    const diary = await getDiaryWeek();
    return await getPeriodEmotionAnalysis(diary);
}
