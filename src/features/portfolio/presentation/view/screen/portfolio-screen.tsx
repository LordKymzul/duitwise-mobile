import { COLORS, Colors } from "@/src/core/constant/Colors";
import { RootStackParams } from "@/src/core/shared/types/navigation";
import { useNavigation } from "@react-navigation/native";
import { NavigationProp } from "@react-navigation/native";
import { useLayoutEffect } from "react";
import { View, Text, useColorScheme, TouchableOpacity, ScrollView } from "react-native"
import {
    Ionicons
} from "@expo/vector-icons";
import { Sizes } from "@/src/core/constant/Sizes";
import {
    Tabs,
    MaterialTabBar
} from 'react-native-collapsible-tab-view'
import { getTitleStyle } from "@/src/core/constant/Texts";
import DefaultNetworkImage from "@/src/core/shared/presentation/components/default-network-image";
import { PATHS } from "@/src/core/constant/Paths";
import { PortfolioLoanScreen } from "./portfolio-loan-screen";
import PortfolioAssetScreen from "./portfolio-asset-screen";

import { Area, CartesianChart, Line } from "victory-native";
import PortfolioLineChart from "../components/portfolio-line-chart";


const PortfolioScreen = () => {

    // const {
    //     navigate
    // } = useNavigation<NavigationProp<RootStackParams>>();

    const navigation = useNavigation();

    const colors = useColorScheme();
    const color = COLORS[colors ?? "dark"];
    const isDarkMode = colors === "dark";

    useLayoutEffect(() => {
        navigation.setOptions({
            headerTitle: "Portfolio",
            headerTitleStyle: {
                color: isDarkMode ? Colors.dark.onBackground : Colors.light.onBackground
            },
            headerStyle: {
                backgroundColor: isDarkMode ? Colors.dark.background : Colors.light.background,
                elevation: 0,
                shadowOpacity: 0,
            },
            headerLeft: () => (
                <TouchableOpacity
                    onPress={() => {
                        navigation.goBack()
                    }}>
                    <Ionicons
                        name="chevron-back"
                        size={24}
                        color={isDarkMode ? Colors.dark.onBackground : Colors.light.onBackground}
                    />
                </TouchableOpacity>
            )
        })
    }, [isDarkMode]);

    return (

        <Tabs.Container

            headerContainerStyle={{
                backgroundColor: color.background,
                elevation: 0,
                shadowOpacity: 0,
            }}
            renderHeader={() => (
                <PortfolioHeader color={color} />
            )}
            renderTabBar={props => (
                <MaterialTabBar
                    {...props}
                    scrollEnabled={false}
                    labelStyle={getTitleStyle(Sizes.fontSize.md, color.onBackground)}
                    activeColor={color.onBackground}
                    inactiveColor={color.onBackground}
                    indicatorStyle={{
                        backgroundColor: color.tint,
                        height: 3,
                        width: "auto",
                        borderRadius: 100
                    }}
                    style={{ backgroundColor: color.background }}
                />
            )}
        >
            <Tabs.Tab name="Loan" label="Loan">
                <Tabs.ScrollView showsVerticalScrollIndicator={false} style={{
                    flex: 1,
                    backgroundColor: color.background
                }}>
                    <PortfolioLoanScreen />
                </Tabs.ScrollView>
            </Tabs.Tab>
            <Tabs.Tab name="Assets" label="Assets">
                <Tabs.ScrollView showsVerticalScrollIndicator={false} style={{
                    flex: 1,
                    backgroundColor: color.background
                }}>
                    <PortfolioAssetScreen />
                </Tabs.ScrollView>
            </Tabs.Tab>

        </Tabs.Container>
    )
}

const PortfolioHeader = ({ color }: { color: any }) => {
    return (
        <View style={{
            flexDirection: "column",
            alignItems: "center",
            gap: Sizes.spacing.lg,
            marginTop: Sizes.spacing.lg
        }}>

            <View style={{
                flexDirection: "row",
                alignItems: "center",
                gap: Sizes.spacing.md
            }}>
                <DefaultNetworkImage
                    uri={PATHS.dummyURL}
                    height={30}
                    width={30}
                />

                <Text style={{
                    ...getTitleStyle(Sizes.fontSize.md, color.onBackground)
                }}>
                    Hazwans's Portfolio
                </Text>
            </View>

            <View style={{
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                gap: Sizes.spacing.md
            }}>
                <Text style={{
                    ...getTitleStyle(Sizes.fontSize.lg, color.onBackground)
                }}>
                    RM 15,054.44
                </Text>
                <Text style={{
                    ...getTitleStyle(Sizes.fontSize.sm, "green")
                }}>
                    9.9%
                </Text>
            </View>


            <PortfolioLineChart />


        </View>
    )
}

export default PortfolioScreen;