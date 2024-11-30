import React from "react";
import { Dimensions, View, Text } from "react-native";
import { Pie, PolarChart, PieSliceData } from "victory-native";
import { useColorScheme, StyleSheet } from "react-native";


// import RNSpeedometer from 'react-native-speedometer'
import { COLORS } from "src/core/constant/Colors";
import { chartData } from "src/core/shared/utils/helper";
import PieChart from "react-native-pie-chart";
import { getSubtitleStyle, getTitleStyle } from "src/core/constant/Texts";
import { Sizes } from "src/core/constant/Sizes";


// npm i--save - dev @types/react-native-speedometer

const generateRandomColor = (): string => {
    const randomColor = Math.floor(Math.random() * 0xffffff);
    return `#${randomColor.toString(16).padStart(6, "0")}`;
};

const generateRandomNumber = () => Math.floor(Math.random() * (50 - 25 + 1)) + 125;

const data = [
    {
        value: 50,
        color: "red",
        label: "First",
    },
    {
        value: 20,
        color: "blue",
        label: "Second",
    },
    {
        value: 30,
        color: "yellow",
        label: "Second",
    },
]
const SummaryPieChart = () => {
    const colorMode = useColorScheme();
    const color = COLORS[colorMode ?? "dark"]
    return (
        <View
            style={{
                alignItems: "center",
                justifyContent: "center",
            }}
        >

            <PieChart
                widthAndHeight={180}
                series={chartData.map(item => item.value)}
                sliceColor={chartData.map(item => item.svg.fill)}
                coverRadius={0.75}
                coverFill={'#FFF'}
            />

            <View style={{
                alignItems: "center",
                justifyContent: "center",
                position: "absolute",
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                gap: Sizes.spacing.sm
            }}>
                <Text style={{
                    ...getTitleStyle(Sizes.fontSize.md, color.onBackground)
                }}>Total Expenses</Text>
                <Text style={{
                    ...getSubtitleStyle(Sizes.fontSize.lg, color.onBackground)
                }}>RM 1000</Text>
            </View>
        </View>
    );
};

export default SummaryPieChart;