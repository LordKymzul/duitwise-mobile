import { createDrawerNavigator, DrawerContentComponentProps, DrawerContentScrollView, DrawerItem } from "@react-navigation/drawer";
import {
    AntDesign,
    Entypo,
    FontAwesome,
    Ionicons,
    MaterialIcons
} from "@expo/vector-icons";
import { DrawerActions, NavigationProp, useNavigation } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { TouchableOpacity, useColorScheme } from "react-native";
import MainBottomNavbar from "../navbar/main-bottom-navbar";
import { View, Text } from "react-native";
import { Sizes } from "../../constant/Sizes";
import { getTitleStyle, getSubtitleStyle } from "../../constant/Texts";
import { Colors } from "../../constant/Colors";
import DefaultNetworkImage from "../../shared/presentation/components/default-network-image";
import { RootStackParams } from "src/core/shared/types/navigation";
import PortfolioScreen from "src/features/portfolio/presentation/view/screen/portfolio-screen";
import DefaultButton from "src/core/shared/presentation/components/default-button";
import { PATHS } from "src/core/constant/Paths";
import { usePortfolioStore } from "src/features/portfolio/presentation/zustand/portfolio-store";
import { BankPortfolio, portfolioData } from "src/core/constant/Data";
import { useEffect } from "react";



type DrawerListProps = {
    bankPortfolio: BankPortfolio;
}



// const drawerList: DrawerListProps[] = [

// ]
//Drawer
const Drawer = createDrawerNavigator();

const Stack = createStackNavigator();

export function PortfolioDrawer() {
    const navigate = useNavigation();

    const colorScheme = useColorScheme();
    const isDark = colorScheme === 'dark';

    // useEffect(() => {
    //     const fetchPortfolios = async () => {
    //         await usePortfolioStore.getState().setPortfolios();
    //     };
    //     fetchPortfolios();
    // }, []);

    return (

        <Drawer.Navigator
            id={undefined}
            screenOptions={{
                headerShown: false,
                drawerActiveTintColor: "#FFC300",
                drawerPosition: "right"
            }}
            drawerContent={(props) => {
                return <DrawerContent
                    descriptors={props.descriptors}
                    state={props.state}
                    navigation={props.navigation}
                />
            }}
        >
            <Stack.Screen name='MainBottomNavbar' options={{ headerShown: false }} component={MainBottomNavbar} />
            <Stack.Screen name='Portfolio' options={{ headerShown: true }} component={PortfolioScreen} />
        </Drawer.Navigator>
    )
}

function DrawerContent(props: DrawerContentComponentProps) {

    const colorScheme = useColorScheme();
    const isDark = colorScheme === 'dark';



    return (
        <View style={{
            flex: 1,
            backgroundColor: isDark ? Colors.dark.background : Colors.light.background

        }}>
            <DrawerContentScrollView {...props}
                scrollEnabled={false}

            >

                <View style={{
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "space-between",
                    width: "100%",
                    paddingHorizontal: Sizes.padding.md,
                    paddingBottom: Sizes.padding.lg,
                    borderBottomWidth: 1,
                    borderBottomColor: isDark ? Colors.dark.secondaryContainer : Colors.light.secondaryContainer
                }}>

                    <View style={{
                        flexDirection: "column",
                        alignItems: "flex-start",
                        gap: Sizes.spacing.md
                    }}>

                        <Text style={
                            [getTitleStyle(Sizes.fontSize.md, isDark ? Colors.dark.onBackground : Colors.light.onBackground)]
                        }>
                            My Portfolios
                        </Text>
                        <Text style={
                            [getSubtitleStyle(Sizes.fontSize.sm, isDark ? Colors.dark.onBackground : Colors.light.onBackground)]
                        }>
                            Manage your portfolio here
                        </Text>
                    </View>

                    <TouchableOpacity onPress={() => {
                        props.navigation.dispatch(DrawerActions.closeDrawer())
                    }}>
                        <Ionicons
                            name="close"
                            size={24}
                            color={isDark ? Colors.dark.onBackground : Colors.light.onBackground}
                        />
                    </TouchableOpacity>
                </View>


                {
                    portfolioData.portfolio.map((item, index) => {
                        return (
                            <DrawerLayout
                                key={index}
                                bankPortfolio={item}
                                index={index}
                                navigation={props.navigation}
                            />
                        )
                    })
                }

            </DrawerContentScrollView>

            <View style={{
                paddingHorizontal: Sizes.padding.md,
                paddingBottom: Sizes.padding.xl,
                gap: Sizes.spacing.lg
            }}>
                <DefaultButton
                    title="See all Portfolios"
                    onPress={() => {
                        usePortfolioStore.getState().setSelectedPortfolio({
                            bankName: null
                        });
                        props.navigation.closeDrawer()
                    }}
                    color={isDark ? Colors.dark.tint : Colors.light.tint}
                    borderRadius={100}
                    isPrimary={false}
                />

                <DefaultButton
                    title="Add new portfolio"
                    onPress={() => {
                        console.log("Logout")
                    }}
                    color={isDark ? Colors.dark.tint : Colors.light.tint}
                    borderRadius={100}
                    isPrimary={true}
                />
            </View>


        </View>
    )
}

function DrawerLayout({ bankPortfolio, index, navigation }: DrawerListProps & { index: number, navigation: any }) {

    const {
        selectedPortfolio,
        setSelectedPortfolio
    } = usePortfolioStore();

    const colorScheme = useColorScheme();
    const isDark = colorScheme === 'dark';

    return (
        <DrawerItem
            activeBackgroundColor={selectedPortfolio?.bankName === bankPortfolio.bankName ? isDark ? Colors.dark.secondaryContainer : Colors.light.secondaryContainer : "transparent"}
            icon={({ color, size, focused }) => {


                if (bankPortfolio.bankName == "All Portfolios") {
                    return <Ionicons
                        name="document-outline"
                        size={size}
                        color={isDark ? Colors.dark.onBackground : Colors.light.onBackground}
                    />
                }

                return <DefaultNetworkImage
                    uri={bankPortfolio.imageURL}
                    height={40}
                    width={40}
                    borderRadius={100}
                />


            }}
            label={({ color, focused }) => {
                return (

                    <View style={{
                        flexDirection: "row",
                        alignItems: "center",
                        justifyContent: "space-between",
                        gap: Sizes.spacing.md,
                        width: "100%",

                    }}>

                        <View style={{
                            flex: 1,
                            flexDirection: "column",
                            alignItems: "flex-start",
                            justifyContent: "center",
                            gap: Sizes.spacing.sm
                        }}>
                            <Text style={[getTitleStyle(Sizes.fontSize.md, isDark ? Colors.dark.onBackground : Colors.light.onBackground)]}>{bankPortfolio.bankName}</Text>
                            <Text style={[getSubtitleStyle(Sizes.fontSize.sm, isDark ? Colors.dark.onBackground : Colors.light.onBackground)]}>RM {bankPortfolio.totalBalance}</Text>

                        </View>


                        {
                            bankPortfolio.bankName != "All Portfolios" && (
                                <MaterialIcons
                                    name="delete-outline"
                                    size={24}
                                    color={"red"}
                                />
                            )
                        }
                    </View>

                )
            }}
            onPress={() => {
                if (bankPortfolio.bankName == "All Portfolios") {
                    setSelectedPortfolio({ bankName: null });
                } else {
                    setSelectedPortfolio({ bankName: bankPortfolio.bankName });
                }
                navigation.closeDrawer();
            }}
        />
    )
}