import { View, Text, TouchableOpacity, Image, ActivityIndicator } from "react-native";
import { useColorScheme } from "react-native";
import { COLORS } from "src/core/constant/Colors";
import { Sizes } from "src/core/constant/Sizes";
import { getSubtitleStyle, getTitleStyle } from "../../../../../core/constant/Texts";
import DefaultButton from "src/core/shared/presentation/components/default-button";
import { useNavigation } from "@react-navigation/native";
import { NavigationProp } from "@react-navigation/native";
import { RootStackParams } from "src/core/shared/types/navigation";
import { PATHS } from "src/core/constant/Paths";

const ApplyLoanSheet = ({
    applyManuallyPress,
    applyWithPaduPress,
    isLoading,
}: {
    applyManuallyPress: () => void;
    applyWithPaduPress: () => void;
    isLoading: boolean;
}) => {

    const colorScheme = useColorScheme();
    const colors = COLORS[colorScheme ?? "dark"];





    return (
        <View style={{
            flexDirection: "column",
            alignItems: "flex-start",
            justifyContent: "center",
            gap: Sizes.spacing.lg,
            paddingHorizontal: Sizes.padding.lg
        }}>

            <View style={{
                flexDirection: "column",
                alignItems: "flex-start",
                justifyContent: "center",
                gap: Sizes.spacing.sm,
                marginBottom: Sizes.spacing.md
            }}>
                <Text style={[getTitleStyle(Sizes.fontSize.lg, colors.onBackground)]}>
                    Apply Loan
                </Text>

                <Text style={[getSubtitleStyle(Sizes.fontSize.sm, colors.onBackground)]}>
                    Choose how you want to apply for the loan
                </Text>
            </View>


            {
                isLoading ? (


                    <View style={{
                        width: "100%",
                        paddingHorizontal: Sizes.spacing.lg,
                        marginTop: Sizes.spacing.lg,
                        alignItems: "center",
                        justifyContent: "center"
                    }}>
                        <ActivityIndicator size="large" color={colors.tint} />
                    </View>

                ) : (
                    <View style={{
                        width: "100%",

                    }}>
                        <DefaultButton
                            title="Apply manually"
                            onPress={applyManuallyPress}
                            color={colors.tint}
                            isPrimary={true}
                        />
                        <Text style={[getSubtitleStyle(Sizes.fontSize.lg, colors.onBackground), {
                            marginVertical: Sizes.spacing.lg,
                            textAlign: "center"
                        }]}>
                            OR
                        </Text>
                        <TouchableOpacity onPress={applyWithPaduPress} style={{
                            flexDirection: "row",
                            alignItems: "center",
                            justifyContent: "center",
                            gap: Sizes.spacing.sm,
                            borderWidth: 1,
                            borderColor: colors.tint,
                            borderRadius: Sizes.borderRadius.md,

                        }}>
                            <Image source={require("@assets/images/padu.jpeg")} style={{
                                width: 50,
                                height: 50,
                                resizeMode: "contain"
                            }} />
                            <Text style={[getTitleStyle(Sizes.fontSize.md, colors.tint), {
                                textAlign: "center"
                            }]}>
                                Apply with PADU
                            </Text>
                        </TouchableOpacity>
                    </View>
                )
            }


        </View>
    )
}

export default ApplyLoanSheet;