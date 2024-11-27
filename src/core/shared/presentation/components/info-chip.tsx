import { View, Text } from "react-native";
import { Sizes } from "../../../constant/Sizes";
import { IconProps } from "../../interface/props";
import { getSubtitleStyle } from "../../../constant/Texts";
import DefaultIcon from "./default-icon";


export interface InfoChipProps {
    icon: IconProps;
    title: string;
    color: string;
}

const InfoChip = ({ icon, title, color }: InfoChipProps) => {
    return (
        <View style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            gap: Sizes.spacing.sm,
            backgroundColor: color + '10', // Added 20 for 12% opacity
            padding: Sizes.spacing.sm,
            borderRadius: Sizes.borderRadius.md,
        }}>
            <DefaultIcon {...icon} />
            <Text style={getSubtitleStyle(Sizes.fontSize.sm, color)}>{title}</Text>
        </View>
    )
}
export default InfoChip;    