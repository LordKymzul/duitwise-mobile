import { View, Text, useColorScheme } from "react-native";
import { COLORS } from "../../../../../core/constant/Colors";
import { SliderForm } from "../../../../../core/shared/presentation/components/slider-form";
import { Sizes } from "../../../../../core/constant/Sizes";
import { getSubtitleStyle, getTitleStyle } from "../../../../../core/constant/Texts";
import CheckBox from 'react-native-check-box'


const LoanCarScreen = () => {

    const colorScheme = useColorScheme();
    const colors = COLORS[colorScheme ?? 'dark'];

    return (

        <View style={{
            flexDirection: "column",
            width: "100%",
            paddingHorizontal: Sizes.padding.lg,
            marginTop: Sizes.spacing.lg,
            gap: Sizes.spacing.xl
        }}>
            <SliderForm
                title="Financial Amount"
                value={4000}
                minimumValue={1000}
                maximumValue={10000}
                unit="RM"
                onChange={() => { }}
                color={colors.tint}
            />

            <View style={{
                flexDirection: "column",
                alignItems: "flex-start",
                justifyContent: "flex-start",

            }}>
                <Text style={[getTitleStyle(Sizes.fontSize.md, colors.onBackground)]}>
                    Loan Duration
                </Text>

                <View style={{
                    flexDirection: "column",
                    alignItems: "flex-start",
                    justifyContent: "flex-start",
                    gap: Sizes.spacing.md,
                    marginTop: Sizes.spacing.lg
                }}>

                    <LoanDurationCheckbox
                        colors={colors}
                        isChecked={true}
                        onClick={() => { }}
                        title="2 Years"
                        description="Lower montly payments"
                    />

                    <LoanDurationCheckbox
                        colors={colors}
                        isChecked={false}
                        onClick={() => { }}
                        title="3 Years"
                        description="Lower montly payments"
                    />

                    <LoanDurationCheckbox
                        colors={colors}
                        isChecked={false}
                        onClick={() => { }}
                        title="4 Years"
                        description="Lower montly payments"
                    />


                </View>
            </View>
        </View>
    )
}

const LoanDurationCheckbox = (
    { colors, isChecked, onClick, title, description }: { colors: any, isChecked: boolean, onClick: () => void, title: string, description: string }
) => {
    return (
        <CheckBox
            isChecked={isChecked}
            onClick={onClick}
            checkBoxColor={colors.tint}
            rightTextView={<View style={{
                flexDirection: "column",
                alignItems: "flex-start",
                justifyContent: "flex-start",
                gap: Sizes.spacing.sm,
                marginLeft: Sizes.spacing.md
            }} >
                <Text style={[getTitleStyle(Sizes.fontSize.md, colors.onBackground)]}>{title}</Text>
                <Text style={[getSubtitleStyle(Sizes.fontSize.sm, colors.onBackground)]}>{description}</Text>
            </View>}

        />

    )
}

export default LoanCarScreen;