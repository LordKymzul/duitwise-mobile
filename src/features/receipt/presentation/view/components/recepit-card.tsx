import { View, Text, TouchableOpacity, Dimensions, useColorScheme } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { getSubtitleStyle, getTitleStyle } from 'src/core/constant/Texts';
import { Sizes } from 'src/core/constant/Sizes';
import { COLORS } from 'src/core/constant/Colors';




export interface ReceiptEntity {
    receiptTitle: string,
    receiptAmount: string,
    receiptPercentage: string,
    receiptNumTransactions: number,
    receiptLatest: {
        title: string,
        amount: number
    }
}


export type ReceiptCardProps = {
    onPress: () => void,
    receipt: ReceiptEntity

}


const ReceiptCard = ({ onPress, receipt }: ReceiptCardProps) => {

    const colorScheme = useColorScheme();
    const colors = COLORS[colorScheme ?? "dark"];



    return (
        <View style={{
            flexDirection: "column",
            alignItems: "flex-start",
            gap: Sizes.spacing.lg
        }}>

            <View style={{
                flexDirection: "row",
                justifyContent: "space-between",
                gap: Sizes.spacing.sm,
                width: "100%"
            }}>

                <Text style={[getTitleStyle(Sizes.fontSize.md, colors.onBackground)]}>
                    {receipt.receiptTitle}
                </Text>

                <Text style={[getSubtitleStyle(Sizes.fontSize.md, colors.onBackground)]}>
                    {receipt.receiptAmount}
                </Text>
            </View>

            <View style={{
                width: Dimensions.get('screen').width - Sizes.padding.lg * 4,
                height: 10,
                backgroundColor: colors.secondaryContainer,
                borderRadius: 100

            }}>

                <View style={{
                    width: "50%",
                    height: "100%",
                    backgroundColor: colors.tint,
                    borderRadius: 100
                }}>
                </View>

            </View>

            <TouchableOpacity onPress={onPress}>
                <View style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    gap: Sizes.spacing.sm,
                    width: "100%",
                    backgroundColor: colors.secondaryContainer,
                    padding: Sizes.padding.md,
                    borderRadius: Sizes.borderRadius.md
                }}>

                    <View style={{
                        flexDirection: "row",
                        gap: Sizes.spacing.md,
                        alignItems: "center"
                    }}>
                        <Ionicons name="newspaper-outline" size={Sizes.iconSize.md} color={colors.onBackground} />
                        <Text style={[getSubtitleStyle(Sizes.fontSize.md, colors.onBackground)]}>
                            Latest : {receipt.receiptLatest.title}
                        </Text>
                    </View>
                    <Text style={[getTitleStyle(Sizes.fontSize.md, colors.onBackground)]}>
                        {receipt.receiptLatest.amount}
                    </Text>

                </View>
            </TouchableOpacity>

        </View>
    )
}


export default ReceiptCard;