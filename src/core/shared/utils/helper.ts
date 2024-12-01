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
        svg: { fill: '#9F7AEA' },
        label: 'GX Bank',
        gradientColors: ['#9F7AEA', '#B794F4', '#D6BCFA']
    },
    {
        value: 10,
        key: 'bank-islam',
        svg: { fill: '#48BB78' },
        label: 'Bank Islam',
        gradientColors: ['#48BB78', '#68D391', '#9AE6B4']
    },
    {
        value: 30,
        key: 'maybank',
        svg: { fill: '#ECC94B' },
        label: 'Maybank',
        gradientColors: ['#ECC94B', '#F6E05E', '#FAF089']
    },
    {
        value: 25,
        key: 'cimb',
        svg: { fill: '#F56565' },
        label: 'CIMB',
        gradientColors: ['#F56565', '#FC8181', '#FEB2B2']
    },
];