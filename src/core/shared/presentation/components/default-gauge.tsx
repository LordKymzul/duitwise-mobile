import { View } from "react-native";
import { PATHS } from "src/core/constant/Paths";
import { Image } from "react-native";
import { Sizes } from "src/core/constant/Sizes";

const DefaultGauge = ({ value }: { value: number }) => {
    const gaugeImage = () => {
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
    return <Image source={gaugeImage()} style={{
        width: "100%",
        height: 100,
        resizeMode: "contain",
        justifyContent: "center",
        alignItems: "center",
        marginVertical: Sizes.spacing.lg
    }} />
}

export default DefaultGauge;