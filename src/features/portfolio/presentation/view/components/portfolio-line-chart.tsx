import { Box } from "@gluestack-ui/themed";
import React, { useState, } from "react";

import {
    Circle,
    LinearGradient,
    useFont,
    vec,
} from "@shopify/react-native-skia";
import { Dimensions, useColorScheme, StyleSheet } from "react-native";
import { useDerivedValue, type SharedValue } from "react-native-reanimated";
import { Area, CartesianChart, Line, useChartPressState } from "victory-native";


import { View } from "react-native";
import { COLORS } from "src/core/constant/Colors";
import { Sizes } from "src/core/constant/Sizes";


// const inter = require("../../roboto.ttf");
// const interBold = require("../../roboto-bold.ttf");


export const DATA = Array.from({ length: 31 }, (_, i) => ({
    day: i,
    highTmp: 40 + 30 * Math.random(),
}));

export const DATA2 = Array.from({ length: 31 }, (_, i) => ({
    day: i,
    highTmp: 40 + 10 * Math.random(),
}));

export const PortfolioLineChart = () => {
    // const font = useFont(inter, 12);
    // const chartFont = useFont(interBold, 30);
    const { state, isActive } = useChartPressState({ x: 0, y: { highTmp: 0 } });
    const colorMode = useColorScheme();
    const color = COLORS[colorMode ?? "dark"]
    const [chartData, setChartData] = useState(DATA);

    const value = useDerivedValue(() => {
        return "$" + state.y.highTmp.value.value.toFixed(2);
    }, [state]);



    return (
        <View style={styles.container}>

            <Box
                width={Dimensions.get('window').width}
                height={200}
                paddingTop={Sizes.spacing.lg}
            >
                <CartesianChart
                    data={chartData}
                    xKey="day"
                    yKeys={["highTmp"]}
                    frame={
                        {
                            lineColor: "transparent",
                            lineWidth: 0,
                        }
                    }
                    axisOptions={{
                        lineColor: "transparent",
                        lineWidth: 0,


                    }}
                    padding={{
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0
                    }}
                    chartPressState={state}
                >
                    {({ points, chartBounds }) => {
                        const isIncreasing = points.highTmp[points.highTmp.length - 1]!.yValue! > points.highTmp[0]!.yValue!;
                        const chartColor = isIncreasing ? '#16a34a' : '#dc2626';

                        return (
                            <>
                                <Line
                                    curveType="natural"
                                    points={points.highTmp}
                                    color={chartColor}
                                    strokeWidth={3}
                                    animate={{ type: "timing", duration: 500 }}
                                    connectMissingData={true}
                                />

                                <Area
                                    curveType='natural'
                                    points={points.highTmp}
                                    y0={chartBounds.bottom}
                                    animate={{ type: 'timing', duration: 1000 }}
                                >
                                    <LinearGradient
                                        start={vec(chartBounds.bottom, 50)}
                                        end={vec(chartBounds.bottom, chartBounds.bottom)}
                                        colors={[chartColor, color.background]}
                                    />
                                </Area>

                                {isActive ? (
                                    <ToolTip x={state.x.position} y={state.y.highTmp.position} />
                                ) : null}
                            </>
                        );
                    }}
                </CartesianChart>
            </Box>
        </View >
    );
};

function ToolTip({ x, y }: { x: SharedValue<number>; y: SharedValue<number> }) {
    return <Circle cx={x} cy={y} r={8} color={"grey"} opacity={0.8} />;
}

const styles = StyleSheet.create({
    container: {
        position: 'relative',
    },
    yAxisLabelsContainer: {
        position: 'absolute',
        left: 10,
        top: 0,
        bottom: 0,
        justifyContent: 'space-between',
        paddingVertical: 20,
    },
    yAxisLabel: {
        fontSize: 10,
    },
    xAxisLabelsContainer: {
        position: 'absolute',
        left: 0,
        right: 0,
        bottom: -20,
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 20,
    },
});



export default PortfolioLineChart;