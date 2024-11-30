import { COLORS } from "../../../constant/Colors";
import { Sizes } from "../../../constant/Sizes"
import { getTitleStyle, getSubtitleStyle } from "../../../constant/Texts"
import { View, Text, useColorScheme } from "react-native"
import DefaultNetworkImage from "./default-network-image";




export interface DefaultEntityCardProps {
    imageUrl: string;
    title: string;
    subtitle: string;
}

const DefaultEntityCard = ({ title, subtitle, imageUrl }: DefaultEntityCardProps) => {

    const colorScheme = useColorScheme();
    const colors = COLORS[colorScheme ?? 'dark'];

    return (
        <View style={{
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
            gap: Sizes.spacing.md,
        }}>

            <DefaultNetworkImage
                uri={imageUrl}
                height={Sizes.iconSize.xl}
                width={Sizes.iconSize.xl}
                borderRadius={100}
            />

            <View style={{
                flexDirection: "column",
                alignItems: "flex-start",
                gap: Sizes.spacing.sm,
            }}>

                <Text style={getTitleStyle(Sizes.fontSize.md, colors.onBackground)}>
                    {title}
                </Text>

                <Text style={getSubtitleStyle(Sizes.fontSize.sm, colors.onBackground)}>
                    {subtitle}
                </Text>

            </View>

        </View>
    )
}

export default DefaultEntityCard;