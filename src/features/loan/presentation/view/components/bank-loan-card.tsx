import { View, Text, TouchableOpacity, Image, useColorScheme } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { getSubtitleStyle, getTitleStyle } from "../../../../../core/constant/Texts";
import BankLoanDetailTile from "./bank-loan-detail-tile";
import { Sizes } from "../../../../../core/constant/Sizes";
import { COLORS } from "../../../../../core/constant/Colors";

const BankLoanCard = () => {

    const colorScheme = useColorScheme();
    const colors = COLORS[colorScheme ?? "dark"];

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
                gap: Sizes.spacing.md
            }}>

                <Image
                    source={{
                        uri: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT2035rw4dtU9oTQW0rmjiWLwLjQw_6I6PuYg&s"
                    }}
                    style={{
                        width: 50,
                        height: 50,
                        borderRadius: 100,
                        resizeMode: "cover"
                    }}
                />

                <View style={{
                    flexDirection: "column",
                    alignItems: "flex-start",
                    justifyContent: "flex-start",
                    gap: Sizes.spacing.sm
                }}>

                    <Text style={[getTitleStyle(Sizes.fontSize.md, colors.onBackground)]}>
                        Car Loan
                    </Text>

                    <View style={{
                        backgroundColor: colors.tint,
                        paddingHorizontal: Sizes.padding.md,
                        paddingVertical: Sizes.padding.sm,
                        borderRadius: 100
                    }}>
                        <Text style={[getSubtitleStyle(Sizes.fontSize.sm, "white")]}>
                            Popular
                        </Text>
                    </View>

                </View>

            </View>

            <View style={{
                flexDirection: "column",
                alignItems: "flex-start",
                justifyContent: "flex-start",
                marginTop: Sizes.spacing.md,
                gap: Sizes.spacing.lg,
            }}>

                <BankLoanDetailTile title="Interest Rate" value="0.5% - 10.5%" icon="cash-outline" />
                <BankLoanDetailTile title="Monthly Payment" value="0.5% - 10.5%" icon="cash-outline" />
                <BankLoanDetailTile title="Duration" value="0.5% - 10.5%" icon="cash-outline" />

            </View>

            <TouchableOpacity style={{
                width: "100%",
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
                marginTop: Sizes.spacing.lg,
                borderColor: colors.secondaryContainer,
                borderWidth: 1,
                padding: Sizes.padding.md,
                borderRadius: Sizes.borderRadius.md
            }}>
                <Text style={[getSubtitleStyle(Sizes.fontSize.md, colors.onBackground)]}>
                    View All
                </Text>

                <Ionicons name="chevron-forward-outline" color={colors.onBackground} size={Sizes.iconSize.sm} />
            </TouchableOpacity>
        </View>
    )
}

export default BankLoanCard;