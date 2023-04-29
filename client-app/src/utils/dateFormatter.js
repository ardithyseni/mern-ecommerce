export const formatDateTime = (dateTimeString) => {
    const date = new Date(dateTimeString);

    // Get the UTC offset in milliseconds for the +2 timezone
    const offset = 2 * 60 * 60 * 1000;
    const utcDate = new Date(date.getTime() + offset);

    const formattedDate = utcDate.toLocaleString("en-US", {
        day: "numeric",
        month: "numeric",
        year: "numeric",
        hour: "numeric",
        minute: "numeric",
        hour12: false,
        timeZone: "UTC",
    });

    return formattedDate;
}