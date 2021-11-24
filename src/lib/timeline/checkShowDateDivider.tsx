import moment from "moment";

export default function checkShowDateDivider(
    index,
    prevCreatedAt,
    currCreatedAt
) {
    if (index === 0) return true;

    return (
        moment(prevCreatedAt).dayOfYear() !== moment(currCreatedAt).dayOfYear()
    );
}
