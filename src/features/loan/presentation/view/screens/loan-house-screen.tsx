import { View, Text, useColorScheme } from "react-native";
import { Sizes } from "../../../../../core/constant/Sizes";
import { SliderForm } from "../../../../../core/shared/presentation/components/slider-form";
import { COLORS } from "../../../../../core/constant/Colors";
import { getSubtitleStyle, getTitleStyle } from "../../../../../core/constant/Texts";
import RNPickerSelect from 'react-native-picker-select';
import { useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import DefaultButton from "../../../../../core/shared/presentation/components/default-button";


const timeFrames = [
    { label: "Test1", value: "Test1" },
    { label: "Test2", value: "Test2" }
]


const LoanHouseScreen = () => {

    const colorScheme = useColorScheme();
    const colors = COLORS[colorScheme ?? 'dark'];

    const [selectedRateType, setSelectedRateType] = useState<string>(timeFrames[0].value);

    const handleRateTypeChange = (value: string) => {
        if (value) {
            setSelectedRateType(value);
        }
    }

    return (
        <View style={{
            flexDirection: "column",
            width: "100%",
            paddingHorizontal: Sizes.padding.lg,
            marginTop: Sizes.spacing.lg,
            gap: Sizes.spacing.md
        }}>

            <View style={{
                flexDirection: "column",
                gap: Sizes.spacing.lg
            }}>
                <SliderForm
                    title="Property Value"
                    value={500000}
                    minimumValue={100000}
                    maximumValue={2000000}
                    unit="RM"
                    onChange={() => { }}
                    color={colors.tint}
                />

                <SliderForm
                    title="Loan Percentage"
                    value={60}
                    minimumValue={10}
                    maximumValue={100}
                    unit="%"
                    onChange={() => { }}
                    color={colors.tint}
                />
            </View>

            <View style={{
                flexDirection: "column",
                gap: Sizes.spacing.lg
            }}>

                <Text style={[getTitleStyle(Sizes.fontSize.md, colors.onBackground)]}>
                    Advance Options
                </Text>

                <View style={{
                    flexDirection: "row",
                    gap: Sizes.spacing.md,
                    justifyContent: "space-between",
                    alignItems: "center",
                    width: "100%"
                }}>

                    <DropdownForm
                        handleRateTypeChange={handleRateTypeChange}
                        selectedRateType={selectedRateType}
                        colors={colors}
                        title="Rate Type"
                    />

                    <DropdownForm
                        handleRateTypeChange={handleRateTypeChange}
                        selectedRateType={selectedRateType}
                        colors={colors}
                        title="Loan Tenure"
                    />


                </View>

                <View style={{
                    flexDirection: "row",
                    gap: Sizes.spacing.md,
                    justifyContent: "space-between",
                    alignItems: "center",
                    width: "100%"
                }}>

                    <DropdownForm
                        handleRateTypeChange={handleRateTypeChange}
                        selectedRateType={selectedRateType}
                        colors={colors}
                        title="Rate Type"
                    />

                    <DropdownForm
                        handleRateTypeChange={handleRateTypeChange}
                        selectedRateType={selectedRateType}
                        colors={colors}
                        title="Loan Tenure"
                    />


                </View>

                <DropdownForm
                    handleRateTypeChange={handleRateTypeChange}
                    selectedRateType={selectedRateType}
                    colors={colors}
                    title="Loan Tenure"
                />

            </View>

        </View>
    )
}

const DropdownForm = ({ handleRateTypeChange, selectedRateType, colors, title }: { handleRateTypeChange: (value: string) => void, selectedRateType: string, colors: any, title: string }) => {
    return (

        <View style={{
            flexDirection: "column",
            gap: Sizes.spacing.md,
            flex: 1
        }}>
            <Text style={[getSubtitleStyle(Sizes.fontSize.sm, colors.onBackground)]}>
                {title}
            </Text>

            <RNPickerSelect
                onValueChange={handleRateTypeChange}
                items={timeFrames}
                value={selectedRateType}
                style={{
                    viewContainer: {
                        paddingHorizontal: Sizes.padding.md,
                        paddingVertical: Sizes.padding.sm,
                        borderWidth: 1,
                        borderColor: colors.secondaryContainer,
                        borderRadius: Sizes.borderRadius.md,
                    },
                    inputIOSContainer: {
                        flexDirection: "row",
                        alignItems: "center",
                        justifyContent: "center"
                    }
                }}
                Icon={() => {
                    return <Ionicons name="chevron-down" size={20} color={colors.onBackground} />
                }}
            />

        </View>
    )
}

export default LoanHouseScreen;