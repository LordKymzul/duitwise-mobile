import { View, Text, useColorScheme, TouchableOpacity, Image, ScrollView } from "react-native";
import { Colors, COLORS } from "../../../../../core/constant/Colors";
import { getSubtitleStyle, getTitleStyle } from "../../../../../core/constant/Texts";
import { Sizes } from "../../../../../core/constant/Sizes";
import { Ionicons } from "@expo/vector-icons";
import DefaultButton from "../../../../../core/shared/presentation/components/default-button";
import BankLoanCard from "../components/bank-loan-card";
import { useLayoutEffect, useState } from "react";
import LoanCarScreen from "./loan-car-screen";
import LoanPersonalScreen from "./loan-personal-screen";
import LoanHouseScreen from "./loan-house-screen";
import { IconProps } from "src/core/shared/interface/props";
import DefaultIcon from "src/core/shared/presentation/components/default-icon";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { RootStackParams } from "src/core/shared/types/navigation";
import { LinearGradient } from "expo-linear-gradient";

const LoanScreen = () => {

    const colorScheme = useColorScheme();
    const colors = COLORS[colorScheme ?? 'dark'];

    const navigation = useNavigation<NavigationProp<RootStackParams>>();


    const [selectedLoanType, setSelectedLoanType] = useState<string>("Car Loan");



    const handleSelectLoanType = (title: string) => {
        setSelectedLoanType(title);
    }

    return (
        <LinearGradient colors={['#4CAF50', '#000']} style={{ flex: 1 }}>
            <ScrollView
                showsVerticalScrollIndicator={false}
                style={{
                    flex: 1,
                }}>
                <View style={{
                    flexDirection: "column",
                    alignItems: "flex-start",
                    justifyContent: "flex-start"
                }}>

                    <View style={{
                        flexDirection: "column",
                        alignItems: "flex-start",
                        justifyContent: "flex-start",
                        width: "100%",
                        paddingHorizontal: Sizes.padding.lg,
                        paddingBottom: Sizes.padding.xl,
                        gap: Sizes.spacing.sm
                    }}>

                        <Text style={[getTitleStyle(Sizes.fontSize.xxl, colors.onTint)]}>
                            Loan Recommender
                        </Text>
                        <Text style={[getSubtitleStyle(Sizes.fontSize.md, colors.onTint)]}>
                            Skip the hassle - get matched with the right loan in minutes
                        </Text>
                    </View>


                    <View style={{
                        flexDirection: "column",
                        alignItems: "flex-start",
                        justifyContent: "flex-start",
                        width: "100%",
                        height: "100%",
                        backgroundColor: colors.background,
                        borderTopLeftRadius: Sizes.borderRadius.xxl,
                        borderTopRightRadius: Sizes.borderRadius.xxl,

                    }}>
                        <View style={{
                            flexDirection: "row",
                            alignItems: "center",
                            justifyContent: "space-between",
                            width: "100%",
                            paddingHorizontal: Sizes.padding.lg,
                            marginTop: Sizes.spacing.lg,

                        }}>
                            <LoanTypeCard colors={colors} title="Car Loan" isSelected={selectedLoanType === "Car Loan"} onSelect={() => handleSelectLoanType("Car Loan")} icon={{ name: "car", type: "AntDesign", size: Sizes.iconSize.lg, color: colors.onTint }} />
                            <LoanTypeCard colors={colors} title="Personal Loan" isSelected={selectedLoanType === "Personal Loan"} onSelect={() => handleSelectLoanType("Personal Loan")} icon={{ name: "wallet", type: "AntDesign", size: Sizes.iconSize.lg, color: colors.onTint }} />
                            <LoanTypeCard colors={colors} title="Home Loan" isSelected={selectedLoanType === "Home Loan"} onSelect={() => handleSelectLoanType("Home Loan")} icon={{ name: "home", type: "AntDesign", size: Sizes.iconSize.lg, color: colors.onTint }} />
                        </View>

                        <View style={{
                            width: "100%",
                            paddingHorizontal: Sizes.padding.lg,
                            marginTop: Sizes.spacing.lg
                        }}>
                            <View style={{
                                borderColor: colors.secondaryContainer,
                                borderWidth: 1,
                                borderRadius: Sizes.borderRadius.md,
                                padding: Sizes.padding.md,
                            }}>
                                <Text style={[getTitleStyle(Sizes.fontSize.md, colors.onBackground)]}>
                                    Your current income is : RM 3000
                                </Text>
                            </View>
                        </View>

                        {selectedLoanType === "Car Loan" && <LoanCarScreen />}

                        {selectedLoanType === "Personal Loan" && <LoanPersonalScreen />}

                        {selectedLoanType === "Home Loan" && <LoanHouseScreen />}
                    </View>




                </View>
            </ScrollView>
        </LinearGradient>
    )
}


const LoanTypeCard = ({ colors, title, isSelected, onSelect, icon }: { colors: any, title: string, isSelected: boolean, onSelect: () => void, icon: IconProps }) => {


    const getLinearGradientColors = () => {
        if (title === "Personal Loan") return Colors.linearPersonalLoan;
        if (title === "Car Loan") return Colors.carLoan;
        if (title === "Home Loan") return Colors.houseLoan;

        return Colors.linearPersonalLoan;
    }
    return (
        <TouchableOpacity onPress={onSelect} style={{
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            gap: Sizes.spacing.md,
            borderColor: isSelected ? getLinearGradientColors()[0] : colors.background,
            borderWidth: 1,
            borderRadius: Sizes.borderRadius.lg,
            padding: Sizes.padding.xl,
            backgroundColor: colors.background
        }}>

            <LinearGradient
                colors={getLinearGradientColors() as any}
                style={{
                    padding: Sizes.padding.md,
                    borderRadius: 100,
                }}>
                <DefaultIcon {...icon} />
            </LinearGradient>

            <Text style={[getTitleStyle(Sizes.fontSize.md, colors.onBackground)]}>
                {title}
            </Text>
        </TouchableOpacity>

    )
}




export default LoanScreen;