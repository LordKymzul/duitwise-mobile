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

export function formatDate(date: Date) {
    const options: Intl.DateTimeFormatOptions = {
        day: '2-digit',
        month: 'short',
        year: 'numeric',
    };
    const dateFormat = new Date(date).toLocaleString(undefined, options);
    return dateFormat;
}

export const capitalizeFirstLetter = (string: string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

export const chartData = [
    {
        value: 25,
        key: 'gx-bank',
        svg: { fill: '#4285F4' },
        label: 'GX Bank'
    },
    {
        value: 10,
        key: 'bank-islam',
        svg: { fill: '#34A853' },
        label: 'Bank Islam'
    },
    {
        value: 30,
        key: 'maybank',
        svg: { fill: '#FBBC05' },
        label: 'Maybank'
    },
    {
        value: 25,
        key: 'cimb',
        svg: { fill: '#EA4335' },
        label: 'CIMB'
    },
];