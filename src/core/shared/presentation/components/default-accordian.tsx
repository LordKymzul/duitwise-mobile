import { useState } from "react";
import { View, Text, useColorScheme, TouchableOpacity } from "react-native";
import {
    AntDesign,
    FontAwesome,
    Ionicons
} from "@expo/vector-icons"
import { Sizes } from "src/core/constant/Sizes";
import { getTitleStyle } from "src/core/constant/Texts";
import { COLORS } from "src/core/constant/Colors";



export interface DefaultAccordianProps {
    title: string;
    children: React.ReactNode;
    isOpen: boolean;
    setIsOpen: (isOpen: boolean) => void;
}


const DefaultAccordian = ({ title, children, isOpen, setIsOpen }: DefaultAccordianProps) => {

    const colorScheme = useColorScheme();
    const colors = COLORS[colorScheme ?? "dark"]


    return (
        <View style={{
            flexDirection: 'column',
            alignItems: 'flex-start',


        }}>

            <TouchableOpacity
                onPress={() => {
                    setIsOpen(!isOpen);
                }}>
                <View style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    width: '100%',
                    marginBottom: Sizes.spacing.md
                }}>
                    <Text style={
                        [

                            getTitleStyle(Sizes.fontSize.lg, colors.onBackground)
                        ]}>
                        {title}
                    </Text>

                    <AntDesign
                        name={isOpen ? "up" : "down"}
                        size={Sizes.iconSize.sm}
                        color={colors.onBackground} />
                </View>
            </TouchableOpacity>

            {
                children
            }

        </View>
    )
}

export default DefaultAccordian;