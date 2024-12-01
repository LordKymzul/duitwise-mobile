import { View, Text, TouchableOpacity, Image, useColorScheme } from "react-native";
import { Ionicons, MaterialCommunityIcons, MaterialIcons } from "@expo/vector-icons";
import { getSubtitleStyle, getTitleStyle } from "../../../../../core/constant/Texts";
import BankLoanDetailTile from "./bank-loan-detail-tile";
import { Sizes } from "../../../../../core/constant/Sizes";
import { Colors, COLORS } from "../../../../../core/constant/Colors";
import DefaultButton from "src/core/shared/presentation/components/default-button";
import DefaultGauge from "src/core/shared/presentation/components/default-gauge";
import LoanStressSheet from "./loan-stress-sheet";
import { PATHS } from "src/core/constant/Paths";
import DefaultNetworkImage from "src/core/shared/presentation/components/default-network-image";



export interface BankLoanDetailProps {
    title: string;
    value: string;

}

export interface BankLoanCardProps {
    bankName: string;
    loanType: string;
    details: BankLoanDetailProps[];
    onStressTestPress: () => void;
    onApplyPress: () => void;
    stressValue: number;
}

const BankLoanCard = ({ bankName, loanType, details, onStressTestPress, onApplyPress, stressValue }: BankLoanCardProps) => {

    const colorScheme = useColorScheme();
    const colors = COLORS[colorScheme ?? "dark"];


    const gaugeImage = (value: number) => {
        if (value < 25) {
            return require('@assets/images/low.png');
        } else if (value > 25 && value < 50) {
            return require('@assets/images/mid.png');
        } else if (value > 50 && value < 75) {
            return require('@assets/images/high.png');
        } else {
            return require('@assets/images/mati.png');
        }
    }

    const getColor = (value: number) => {
        if (value < 25) {
            return Colors.green;
        } else if (value > 25 && value < 50) {
            return "yellow";
        } else if (value > 50 && value < 75) {
            return "orange";
        } else {
            return "red"
        }
    }

    const gaugeValue = (value: number) => {
        if (value < 25) {
            return "Low"
        } else if (value >= 25 && value < 50) {
            return "Medium"
        } else if (value >= 50 && value < 75) {
            return "High"
        } else {
            return "Extreme"
        }
    }
    const getIconBank = (bankName: string) => {
        if (bankName.toLowerCase().includes("maybank")) {
            return PATHS.maybankLogo;
        }
        else if (bankName.toLowerCase().includes("cimb")) {
            return PATHS.cimbLogo;
        }
        else if (bankName.toLowerCase().includes("islam")) {
            return PATHS.bankIslamLogo;
        } else if (bankName.toLowerCase().includes("rhb")) {
            return PATHS.rhbLogo;
        } else if (bankName.toLowerCase().includes("bsn")) {
            return PATHS.bsnLogo;
        } else {
            return PATHS.unknownURL;
        }
    }

    return (
        <View style={{
            flexDirection: "column",
            alignItems: "flex-start",
            justifyContent: "flex-start",
            gap: Sizes.spacing.sm,
            backgroundColor: colors.background,
            borderColor: colors.secondaryContainer,
            borderWidth: 1,
            padding: Sizes.padding.lg,
            borderRadius: Sizes.borderRadius.md
        }}>


            <View style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "center",
                gap: Sizes.spacing.lg
            }}>

                {/* <MaterialCommunityIcons name="bank" color={colors.onBackground} size={Sizes.iconSize.lg} /> */}
                <DefaultNetworkImage
                    uri={getIconBank(bankName)}
                    height={40}
                    width={40}
                    borderRadius={100}
                />

                <View style={{
                    flexDirection: "column",
                    alignItems: "flex-start",
                    justifyContent: "flex-start",
                    gap: Sizes.spacing.sm
                }}>

                    <Text style={[getTitleStyle(Sizes.fontSize.md, colors.onBackground)]}>
                        {bankName}
                    </Text>

                    <Text style={[getSubtitleStyle(Sizes.fontSize.sm, colors.onBackground)]}>
                        {loanType}
                    </Text>

                </View>

            </View>

            <View style={{
                flexDirection: "column",
                alignItems: "flex-start",
                justifyContent: "flex-start",
                marginTop: Sizes.spacing.md,
                gap: Sizes.spacing.lg,
            }}>

                {
                    details.length > 0 && details.map((detail, index) => (
                        <BankLoanDetailTile key={index} title={detail.title} value={detail.value} />
                    ))
                }


            </View>

            <View style={{
                width: "100%",
                alignItems: "center",
                justifyContent: "space-between",
                flexDirection: "row",

            }}>
                <View style={{
                    flexDirection: "column",
                    alignItems: "flex-start",
                    justifyContent: "flex-start",
                    gap: Sizes.spacing.sm
                }}>
                    <Text style={[getTitleStyle(Sizes.fontSize.md, colors.onBackground)]}>
                        Stress Test
                    </Text>

                    <Text style={[getSubtitleStyle(Sizes.fontSize.sm, colors.onBackground)]}>
                        {gaugeValue(stressValue)}
                    </Text>
                </View>


                <Image source={gaugeImage(stressValue)} style={{
                    width: 100,
                    height: 100,
                    resizeMode: "contain",
                    justifyContent: "center",
                    alignItems: "center",
                    alignSelf: "center",

                }} />
            </View>



            <View style={{
                width: "100%",
                flexDirection: "row",
            }}>
                <View style={{
                    flex: 1,

                }}>
                    <DefaultButton
                        title="Apply"
                        onPress={onApplyPress}
                        color={colors.tint}
                        isPrimary={true}
                    />

                </View>
            </View>



        </View>
    )
}

export default BankLoanCard;