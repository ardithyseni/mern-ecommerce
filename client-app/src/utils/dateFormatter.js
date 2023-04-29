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

export const formatDateTimeFile = (dateTimeString) => {
    const date = new Date(dateTimeString);

    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear().toString();

    return `${day}-${month}-${year}`;
}


