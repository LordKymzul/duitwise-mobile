import { NavigationProp, useNavigation, useRoute } from "@react-navigation/native";
import { useLayoutEffect, useState } from "react";
import { View, Text, useColorScheme, Image, ActivityIndicator } from "react-native";
import { COLORS } from "src/core/constant/Colors";
import { Sizes } from "src/core/constant/Sizes";
import { getSubtitleStyle, getTitleStyle } from "src/core/constant/Texts";
import DefaultButton from "src/core/shared/presentation/components/default-button";
import DefaultGoBackButton from "src/core/shared/presentation/components/default-goback-button";
import { ReceiptAttachedEntity, ReceiptAttachedScreenRouteProp, RootStackParams } from "src/core/shared/types/navigation";
import { formatDateDayandTime } from "src/core/shared/utils/helper";

const ReceiptAttachedScreen = () => {

    const colorScheme = useColorScheme();
    const colors = COLORS[colorScheme ?? "dark"];

    const navigation = useNavigation<NavigationProp<RootStackParams>>();
    const route = useRoute<ReceiptAttachedScreenRouteProp>();
    const { receipt } = route.params;

    const [isLoading, setIsLoading] = useState(false);


    useLayoutEffect(() => {
        navigation.setOptions({
            headerTitle: "Receipt Attached",
            headerLeft: () => <DefaultGoBackButton onPress={() => navigation.goBack()} />,
        });

    }, []);

    const handleSubmit = async () => {
        setIsLoading(true);
        await new Promise(resolve => setTimeout(resolve, 1000));
        navigation.navigate("MainBottomNavbar");
        setIsLoading(false);
    }


    return (
        <View style={{
            flex: 1,
            flexDirection: "column",
            backgroundColor: colors.background,
            justifyContent: "space-between",
            alignItems: "flex-start",
        }}>

            <View style={{
                flexDirection: "column",
                gap: Sizes.spacing.lg,
                alignItems: "flex-start",
                width: "100%",
            }}>
                <Image
                    source={{ uri: receipt.receiptImage }}
                    style={{
                        width: "100%",
                        height: 300,
                        borderRadius: Sizes.borderRadius.lg,
                        paddingHorizontal: Sizes.spacing.lg,
                        marginTop: Sizes.spacing.lg
                    }}
                />

                <View
                    style={{
                        paddingHorizontal: Sizes.spacing.lg,
                        gap: Sizes.spacing.sm,
                        marginTop: Sizes.spacing.lg,
                        width: "100%",
                    }}
                >
                    <ReceiptAttachedCard colors={colors} title={receipt.receiptName} value={`${receipt.receiptName}`} />
                    <ReceiptAttachedCard colors={colors} title={"Price"} value={`RM ${receipt.price}`} />
                    <ReceiptAttachedCard colors={colors} title={"Date"} value={formatDateDayandTime(receipt.date)} />
                </View>
            </View>


            {
                isLoading ? <ActivityIndicator size="large" color={colors.tint} style={{ marginTop: Sizes.spacing.xl, alignSelf: "center" }} /> :
                    <View style={{
                        paddingHorizontal: Sizes.spacing.lg,
                        marginBottom: Sizes.spacing.xl,
                        width: "100%",
                    }}>
                        <DefaultButton
                            title="Submit"
                            onPress={handleSubmit}
                            color={colors.tint}
                            isPrimary={true}
                            borderRadius={100}

                        />
                    </View>
            }
        </View>
    );
};

const ReceiptAttachedCard = ({ colors, title, value }: { colors: any, title: string, value: string }) => {
    return (
        <View style={{
            flexDirection: "column",
            justifyContent: "flex-start",
            alignItems: "flex-start",
            paddingHorizontal: Sizes.spacing.lg,
            gap: Sizes.spacing.sm,
            marginTop: Sizes.spacing.lg,
            borderWidth: 1,
            borderColor: colors.secondaryContainer,
            borderRadius: Sizes.borderRadius.lg,
            padding: Sizes.spacing.lg,
        }}>
            <Text style={{ ...getTitleStyle(Sizes.fontSize.lg, colors.onBackground) }}>{title}</Text>
            <Text style={{ ...getSubtitleStyle(Sizes.fontSize.md, colors.onBackground) }}>{value}</Text>
        </View>
    )
}

export default ReceiptAttachedScreen;