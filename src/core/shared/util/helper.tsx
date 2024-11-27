export const formatDateDayandTime = (date: Date) => {
    const options: Intl.DateTimeFormatOptions = {
        day: '2-digit',
        month: 'short',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
    };

    const dateFormat = new Date(date).toLocaleString(undefined, options);
    return dateFormat;
}