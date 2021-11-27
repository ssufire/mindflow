import getDiaryWeek from "./getDiaryWeek";
import getPeriodStatistics from "./getPeriodStatistics";

export default async function getWeeklyStatistics() {
    const diary = await getDiaryWeek();
    return await getPeriodStatistics(diary);
}
