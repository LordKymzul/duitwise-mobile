
const tintColorLight = '#4CAF50';
const tintColorDark = '#4CAF50';

export const Colors = {
    light: {
        background: '#FFFFFF',
        onBackground: '#0D1217',
        tint: tintColorLight,
        icon: '#687076',
        tabIconDefault: '#687076',
        tabIconSelected: tintColorLight,
        secondaryContainer: '#dcdcdc',
        tabBackgroundColor: '#e7e7e7',
        greyColor: '#687076',
        onTint: '#FFFFFF'
    },
    dark: {
        text: '#ECEDEE',
        background: '#0D1217',
        onBackground: '#FFFFFF',
        tint: tintColorDark,
        icon: '#9BA1A6',
        tabIconDefault: '#9BA1A6',
        tabIconSelected: tintColorDark,
        secondaryContainer: '#464646',
        tabBackgroundColor: '#3d3d3d',
        greyColor: '#9BA1A6',
        onTint: '#FFFFFF'
    },
    grey: "#242424",
    yellow: "#FFDD33",
    purple: "#7620a9",
    blue: "#1e43d7",
    green: "#09b026",
    blueTransparent: "#bfd7fe",
    purpleTransparent: "#ecd5ff",
    greenTransparent: "#b5fdc0",

    linearPersonalLoan: ["#9461F1", "#7D3EEE"],
    carLoan: ["#5585F0", "#1157D0"],
    houseLoan: ["#11B57E", "#079A6D"],




};




enum COLOR_SCHEME {
    LIGHT = 'light',
    DARK = 'dark',
}

export const COLORS = {
    [COLOR_SCHEME.LIGHT]: Colors.light,
    [COLOR_SCHEME.DARK]: Colors.dark,
};
