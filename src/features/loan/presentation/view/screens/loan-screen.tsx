import { View, Text, useColorScheme, TouchableOpacity, Image, ScrollView } from "react-native";
import { COLORS } from "../../../../../core/constant/Colors";
import { getSubtitleStyle, getTitleStyle } from "../../../../../core/constant/Texts";
import { Sizes } from "../../../../../core/constant/Sizes";
import { Ionicons } from "@expo/vector-icons";
import DefaultButton from "../../../../../core/shared/presentation/components/default-button";
import BankLoanCard from "../components/bank-loan-card";
import { useState } from "react";
import LoanCarScreen from "./loan-car-screen";
import LoanPersonalScreen from "./loan-personal-screen";
import LoanHouseScreen from "./loan-house-screen";
import { IconProps } from "src/core/shared/interface/props";
import DefaultIcon from "src/core/shared/presentation/components/default-icon";

const LoanScreen = () => {

    const colorScheme = useColorScheme();
    const colors = COLORS[colorScheme ?? 'dark'];

    const [selectedLoanType, setSelectedLoanType] = useState<string>("Car Loan");

    const handleSelectLoanType = (title: string) => {
        setSelectedLoanType(title);
    }

    return (
        <ScrollView
            showsVerticalScrollIndicator={false}
            style={{
                flex: 1,
                backgroundColor: colors.background,

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
                    backgroundColor: colors.background,
                    marginTop: Sizes.spacing.lg,
                    paddingHorizontal: Sizes.padding.lg,
                    gap: Sizes.spacing.sm
                }}>
                    <Text style={[getTitleStyle(Sizes.fontSize.lg, colors.onBackground)]}>
                        JuruWang Loan Recommender
                    </Text>
                    <Text style={[getSubtitleStyle(Sizes.fontSize.sm, colors.onBackground)]}>
                        Skip the hassle - get matched with the right loan in minutes
                    </Text>
                </View>

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
                            Your current income is : RM 30000
                        </Text>
                    </View>
                </View>

                {selectedLoanType === "Car Loan" && <LoanCarScreen />}

                {selectedLoanType === "Personal Loan" && <LoanPersonalScreen />}

                {selectedLoanType === "Home Loan" && <LoanHouseScreen />}


            </View>
        </ScrollView>
    )
}


const LoanTypeCard = ({ colors, title, isSelected, onSelect, icon }: { colors: any, title: string, isSelected: boolean, onSelect: () => void, icon: IconProps }) => {
    return (
        <TouchableOpacity onPress={onSelect} style={{
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            gap: Sizes.spacing.md,
            borderColor: isSelected ? colors.tint : colors.background,
            borderWidth: 1,
            borderRadius: Sizes.borderRadius.lg,
            padding: Sizes.padding.xl,
            backgroundColor: colors.background
        }}>

            <View style={{
                padding: Sizes.padding.md,
                borderRadius: 100,
                backgroundColor: colors.tint,

            }}>

                <DefaultIcon {...icon} />

            </View>

            <Text style={[getTitleStyle(Sizes.fontSize.md, colors.onBackground)]}>
                {title}
            </Text>
        </TouchableOpacity>

    )
}




export default LoanScreen;