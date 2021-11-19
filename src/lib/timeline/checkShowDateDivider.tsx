import moment from "moment";

export default function checkShowDateDivider(prevCreatedAt, currCreatedAt) {
    return (
        moment(prevCreatedAt).dayOfYear() !== moment(currCreatedAt).dayOfYear()
    );
}
