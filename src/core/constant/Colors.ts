
const tintColorLight = '#4BCC00';
const tintColorDark = '#4BCC00';

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
        greyColor: '#687076'
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
        greyColor: '#9BA1A6'
    },
    grey: "#242424",
    yellow: "#FFDD33",
    purple: "#7620a9",
    blue: "#1e43d7",
    green: "#09b026",
    blueTransparent: "#bfd7fe",
    purpleTransparent: "#ecd5ff",
    greenTransparent: "#b5fdc0"
};


enum COLOR_SCHEME {
    LIGHT = 'light',
    DARK = 'dark',
}

export const COLORS = {
    [COLOR_SCHEME.LIGHT]: Colors.light,
    [COLOR_SCHEME.DARK]: Colors.dark,
};
