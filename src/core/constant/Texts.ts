export const getTitleStyle = (fontSize: number, color: string) => {
    return {
        fontSize: fontSize,
        fontWeight: 'semibold' as const,
        // fontFamily: 'Roboto-Regular',
        color: color
    }
}

export const getSubtitleStyle = (fontSize: number, color: string) => {
    return {
        fontSize: fontSize,
        fontWeight: 'light' as const,
        // fontFamily: 'Roboto-Light',
        color: color
    }
}