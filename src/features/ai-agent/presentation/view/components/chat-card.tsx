import { View, Text, useColorScheme, Pressable } from "react-native";
import { FontAwesome5 } from "@expo/vector-icons";
import { getSubtitleStyle } from "src/core/constant/Texts";
import { Sizes } from "src/core/constant/Sizes";
import { COLORS } from "src/core/constant/Colors";
import DefaultButton from "src/core/shared/presentation/components/default-button";
import { Image } from "react-native";

const ChatCard = ({ isUserMessage, message, onYesPress, onNoPress, isText, isVisible, isOptions }: { isUserMessage: boolean, message: string, onYesPress: () => void, onNoPress: () => void, isText: boolean, isVisible: boolean, isOptions: boolean }) => {

    const colorScheme = useColorScheme();
    const colors = COLORS[colorScheme ?? "dark"];

    return (
        <View style={{
            alignSelf: isUserMessage ? "flex-end" : "flex-start",
            width: "80%",
            flexDirection: "column",
            alignItems: isUserMessage ? "flex-end" : "flex-start",

        }}>
            <View style={{
                flexDirection: "row",
                alignItems: "flex-start",
                justifyContent: isUserMessage ? "flex-end" : "flex-start",
                width: "100%",
                paddingHorizontal: Sizes.spacing.md,
                marginVertical: Sizes.spacing.sm,
            }}>
                {!isUserMessage && (
                    <View style={{
                        marginRight: Sizes.spacing.sm,
                        backgroundColor: colors.secondaryContainer,
                        padding: Sizes.spacing.md,
                        borderRadius: 100,

                    }}>
                        <FontAwesome5 name="robot" size={20} color={colors.onBackground} />
                    </View>
                )}

                {
                    isText ? (
                        <View style={{
                            backgroundColor: isUserMessage ? colors.tint : colors.secondaryContainer,
                            borderRadius: 20,
                            padding: Sizes.spacing.lg,
                            borderBottomLeftRadius: !isUserMessage ? 4 : 20,
                            borderBottomRightRadius: isUserMessage ? 4 : 20,
                        }}>
                            <Text style={[
                                getSubtitleStyle(Sizes.fontSize.md, isUserMessage ? colors.onTint : colors.onBackground)
                            ]}>
                                {message}
                            </Text>

                            {
                                !isUserMessage && isOptions && (
                                    <View style={{
                                        flexDirection: "row",
                                        justifyContent: "space-between",
                                        alignItems: "center",
                                        gap: Sizes.spacing.md,
                                        marginTop: Sizes.spacing.lg,

                                    }} >
                                        <View style={{
                                            flex: 1,
                                        }}>
                                            <DefaultButton
                                                title="Yes"
                                                onPress={onYesPress}
                                                color={colors.tint}
                                                isPrimary
                                            />
                                        </View>
                                        <View style={{
                                            flex: 1,
                                        }}>
                                            <DefaultButton
                                                title="No"
                                                onPress={onNoPress}
                                                color={colors.tint}
                                            />
                                        </View>

                                    </View>
                                )
                            }


                        </View>

                    ) : (
                        <Pressable onPress={onYesPress}>
                            <Image
                                source={require('@assets/images/paynet.jpeg')}
                                style={{
                                    width: 300,
                                    height: 200,
                                    borderRadius: 20,
                                    resizeMode: "contain",
                                }}
                            />
                        </Pressable>
                    )
                }

            </View>


        </View>
    )
}

export default ChatCard;