import { View, Text, useColorScheme } from "react-native";
import { SliderForm } from "../../../../../core/shared/presentation/components/slider-form";
import { Sizes } from "../../../../../core/constant/Sizes";
import { COLORS } from "../../../../../core/constant/Colors";

const LoanPersonalScreen = () => {

    const colorScheme = useColorScheme();
    const colors = COLORS[colorScheme ?? 'dark'];

    return (
        <View style={{
            width: "100%",
            paddingHorizontal: Sizes.padding.lg,
            marginTop: Sizes.spacing.lg,
            gap: Sizes.spacing.xl
        }}>

            <SliderForm
                title="Loan Amount"
                value={3000}
                minimumValue={1000}
                maximumValue={10000}
                onChange={() => { }}
                color={colors.tint}
                unit="RM"
            />

            <SliderForm
                title="Financing Period"
                value={2}
                minimumValue={2}
                maximumValue={36}
                onChange={() => { }}
                color={colors.tint}
                unit="Months"
            />

        </View>
    )
}

export default LoanPersonalScreen;   