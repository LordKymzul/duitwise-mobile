import { Sizes } from "../../../constant/Sizes";
import { IconProps } from "../../interface/props";

import {
    MaterialIcons,
    AntDesign,
    Ionicons,
    Entypo,
    FontAwesome
} from "@expo/vector-icons";

const DefaultIcon = ({ name, size, color, type }: IconProps) => {
    if (type === "MaterialIcons") {
        return <MaterialIcons name={name as keyof typeof MaterialIcons.glyphMap} size={size} color={color} />
    }
    if (type === "AntDesign") {
        return <AntDesign name={name as keyof typeof AntDesign.glyphMap} size={size} color={color} />
    }
    if (type === "Ionicons") {
        return <Ionicons name={name as keyof typeof Ionicons.glyphMap} size={size} color={color} />
    }
    if (type === "Entypo") {
        return <Entypo name={name as keyof typeof Entypo.glyphMap} size={size} color={color} />
    }
    if (type === "FontAwesome") {
        return <FontAwesome name={name as keyof typeof FontAwesome.glyphMap} size={size} color={color} />
    }

    return <Ionicons name={"information-circle"} size={Sizes.iconSize.md} color={color} />

}

export default DefaultIcon;