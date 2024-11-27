import { Sizes } from "../../../constant/Sizes";
import RNPickerSelect from 'react-native-picker-select';
import { Ionicons } from "@expo/vector-icons";
import { COLORS } from "../../../constant/Colors";
import { useColorScheme } from "react-native";
import { Text } from "react-native";

export interface DefaultDropdownProps {
    handleRateTypeChange: (value: string) => void;
    timeFrames: { label: string, value: string }[];
    selectedRateType: string;
}

const DefaultDropdown = ({ handleRateTypeChange, timeFrames, selectedRateType }: DefaultDropdownProps) => {

    const colorScheme = useColorScheme();
    const colors = COLORS[colorScheme ?? 'dark'];

    return (

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
                return <Ionicons name="chevron-down" size={Sizes.iconSize.sm} color={colors.onBackground} />
            }}
        />
    )
}

export default DefaultDropdown;