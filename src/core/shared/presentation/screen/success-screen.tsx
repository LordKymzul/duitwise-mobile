import { NavigationProp, useNavigation, useRoute } from "@react-navigation/native";
import { View, Text, useColorScheme, ActivityIndicator } from "react-native";
import { COLORS } from "src/core/constant/Colors";
import { Sizes } from "src/core/constant/Sizes";
import { getSubtitleStyle, getTitleStyle } from "src/core/constant/Texts";
import { RootStackParams, SuccessScreenRouteProp } from "../../types/navigation";
import { Ionicons } from "@expo/vector-icons";
import { useLayoutEffect, useState } from "react";
import DefaultGoBackButton from "../components/default-goback-button";
import DefaultButton from "../components/default-button";

const SuccessScreen = () => {

    const colorScheme = useColorScheme();
    const colors = COLORS[colorScheme ?? "dark"];

    const route = useRoute<SuccessScreenRouteProp>();

    const { title, description } = route.params;

    const navigation = useNavigation<NavigationProp<RootStackParams>>();


    useLayoutEffect(() => {
        navigation.setOptions({
            headerShown: true,
            headerTitle: "",
            headerLeft: () => <DefaultGoBackButton onPress={() => navigation.goBack()} />
        })
    }, [])

    return (

        <View style={{ flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: colors.background }}>

            <Ionicons
                name="checkmark-circle"
                size={40}
                color={colors.tint}
            />
            <View style={{
                gap: Sizes.spacing.md,
                alignItems: "center",
                marginTop: Sizes.spacing.lg
            }}>
                <Text style={{
                    ...getTitleStyle(Sizes.fontSize.xl, colors.onBackground)
                }}>
                    {title}
                </Text>
                <Text style={{
                    ...getSubtitleStyle(Sizes.fontSize.md, colors.onBackground)
                }}>
                    {description}
                </Text>
            </View>

            <View style={{
                width: "100%",
                paddingHorizontal: Sizes.spacing.lg,
                marginTop: Sizes.spacing.lg
            }}>
                <DefaultButton
                    title="Back to Home"
                    onPress={() => {
                        navigation.navigate("MainBottomNavbar");


                    }}
                    color={colors.tint}
                    isPrimary={true}

                />
            </View>

        </View>

    )
}

export default SuccessScreen;