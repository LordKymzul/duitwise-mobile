import {
    View
} from "react-native";
import { useEffect, useState } from "react";
import { ActivityIndicator, Image, useColorScheme } from "react-native";
import { COLORS } from "../../../constant/Colors";

export type DefaultNetworkImageProps = {
    uri: string;
    borderRadius?: number;
    height: number;
    width: number;

}

const DefaultNetworkImage = ({
    uri,
    borderRadius,
    height,
    width
}: DefaultNetworkImageProps) => {


    const [loading, setLoading] = useState(true)
    const [image, setImage] = useState<string | null>(null)

    const colorScheme = useColorScheme();
    const colors = COLORS[colorScheme ?? 'dark'];


    useEffect(() => {
        const getImage = async () => {
            setLoading(true)
            try {
                const response = await fetch(uri)
                const blob = await response.blob()
                setImage(URL.createObjectURL(blob))
            } catch (error) {
                setImage(null)
            } finally {
                setLoading(false)
            }
        }
        getImage();
    }, [])

    if (loading) {
        return <View style={{
            borderRadius: borderRadius ?? 100,
            height,
            width,
            justifyContent: "center",
            alignItems: "center"
        }}>
            <ActivityIndicator
                size="large"
                color={colors.onBackground}
                style={{

                    justifyContent: "center",
                    alignItems: "center"
                }}
            />
        </View>
    }

    if (!image && !loading) {
        return <Image
            source={require("@/assets/moometrics-icon.png")}
            style={{
                borderRadius,
                height,
                width,
            }}
        />
    }



    return (

        <Image
            source={{ uri }}
            style={{
                borderRadius,
                height,
                width,
                resizeMode: "cover",

            }}
        />
    )
}

export default DefaultNetworkImage