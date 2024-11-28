import React from "react";
import { Dimensions, View } from "react-native";
import { Pie, PolarChart, PieSliceData } from "victory-native";
import { useColorScheme, StyleSheet } from "react-native";
import { COLORS } from "@/src/core/constant/Colors";


import RNSpeedometer from 'react-native-speedometer'


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
                width: Dimensions.get('window').width,
                height: 200,
            }}
        >
            {/* <PolarChart
                data={data}
                colorKey={"color"}
                valueKey={"value"}
                labelKey={"label"}
            >

            </PolarChart> */}

            <RNSpeedometer
                value={100}

                size={100}
            />

            <PolarChart
                data={data}
                colorKey={"color"}
                valueKey={"value"}
                labelKey={"label"}
            >
                <Pie.Chart
                    innerRadius={70}
                    size={200}
                />
            </PolarChart>
        </View>
    );
};

export default SummaryPieChart;