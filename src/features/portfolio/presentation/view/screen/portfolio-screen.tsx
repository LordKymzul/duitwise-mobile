import { RootStackParams } from "src/core/shared/types/navigation";
import { DrawerActions, useNavigation } from "@react-navigation/native";
import { NavigationProp } from "@react-navigation/native";
import { useLayoutEffect } from "react";
import { View, Text, useColorScheme, TouchableOpacity, ScrollView } from "react-native"
import {
    Ionicons
} from "@expo/vector-icons";
import {
    Tabs,
    MaterialTabBar
} from 'react-native-collapsible-tab-view'

import PortfolioLineChart from "../components/portfolio-line-chart";
import { COLORS, Colors } from "src/core/constant/Colors";
import { Sizes } from "src/core/constant/Sizes";
import { getTitleStyle } from "src/core/constant/Texts";
import { PortfolioLoanScreen } from "./portfolio-loan-screen";
import PortfolioAssetScreen from "./portfolio-asset-screen";
import DefaultNetworkImage from "src/core/shared/presentation/components/default-network-image";
import { PATHS } from "src/core/constant/Paths";
import DefaultGoBackButton from "src/core/shared/presentation/components/default-goback-button";
import { usePortfolioStore } from "../../zustand/portfolio-store";


const PortfolioScreen = () => {

    // const {
    //     navigate
    // } = useNavigation<NavigationProp<RootStackParams>>();

    const navigation = useNavigation<NavigationProp<RootStackParams>>();



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
                <View style={{
                    marginLeft: Sizes.spacing.md
                }}>
                    <DefaultGoBackButton onPress={() => {
                        navigation.goBack()
                    }} />
                </View>
            ),
            headerRight: () => (
                <TouchableOpacity onPress={() => {
                    navigation.dispatch(DrawerActions.openDrawer())
                }}>
                    <Ionicons
                        name="menu"
                        size={24}
                        color={isDarkMode ? Colors.dark.onBackground : Colors.light.onBackground}
                        style={{
                            marginRight: Sizes.spacing.md
                        }}
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


    const {
        selectedPortfolio,
        portfolio
    } = usePortfolioStore();



    const isSelectedPortfolio = selectedPortfolio !== null;

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
                {
                    isSelectedPortfolio && (
                        <DefaultNetworkImage
                            uri={selectedPortfolio?.imageURL}
                            height={40}
                            width={40}
                            borderRadius={100}
                        />
                    )
                }

                {
                    !isSelectedPortfolio && (
                        <Ionicons
                            name="wallet-outline"
                            size={Sizes.iconSize.lg}
                            color={color.onBackground}
                        />
                    )
                }

                <Text style={{
                    ...getTitleStyle(Sizes.fontSize.md, color.onBackground)
                }}>
                    {isSelectedPortfolio ? selectedPortfolio?.bankName : 'All Portfolio'}
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
                    RM{isSelectedPortfolio ? selectedPortfolio?.totalBalance : portfolio.reduce((acc, curr) => acc + curr.totalBalance, 0)}
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