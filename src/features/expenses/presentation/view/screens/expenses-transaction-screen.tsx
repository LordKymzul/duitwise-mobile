import { View, Text, ScrollView, useColorScheme } from "react-native";
import { COLORS } from "../../../../../core/constant/Colors";
import { Sizes } from "../../../../../core/constant/Sizes";
import TabButton from "../../../../../core/shared/presentation/components/tab-button";
import { getSubtitleStyle, getTitleStyle } from "../../../../../core/constant/Texts";
import InfoChip from "../../../../../core/shared/presentation/components/info-chip";
import DefaultDropdown from "../../../../../core/shared/presentation/components/default-dropdown";
import DefaultEntityCard from "../../../../../core/shared/presentation/components/default-entity-card";
import { FontAwesome5, Ionicons } from "@expo/vector-icons";
import TransactionCard from "../components/transaction-card";
import { PATHS } from "src/core/constant/Paths";

import PortfolioLineChart from "src/features/portfolio/presentation/view/components/portfolio-line-chart";
import { formatDateDayandTime } from "src/core/shared/utils/helper";
import { TransactionDetailsData } from "src/core/constant/Data";
import { useEffect, useState } from "react";
import { TransactionDetailsEntity } from "src/core/constant/Data";


const transactions = [
    {
        title: "Netflix",
        subtitle: formatDateDayandTime(new Date()),
        amount: 100,
        imageUrl: PATHS.dummyURL
    },
    {
        title: "Spotify",
        subtitle: formatDateDayandTime(new Date()),
        amount: -100,
        imageUrl: PATHS.dummyURL
    },

]


const ExpensesTransactionScreen = () => {

    const colorScheme = useColorScheme();
    const colors = COLORS[colorScheme ?? "dark"];

    const [transactionDetails, setTransactionDetails] = useState<TransactionDetailsEntity>(TransactionDetailsData);

    useEffect(() => {
        setTransactionDetails(TransactionDetailsData);
    }, []);


    return (
        <View style={{
            flexDirection: "column",
            gap: Sizes.spacing.md,
        }}>
            <View style={{
                flexDirection: "row",
                justifyContent: "center",
                alignItems: "center",
                gap: Sizes.spacing.md,
                marginTop: Sizes.spacing.md,
                paddingHorizontal: Sizes.spacing.lg
            }}>

                <View style={{
                    flex: 1,
                    flexDirection: "column",
                    gap: Sizes.spacing.sm,
                    alignItems: "flex-start",
                    justifyContent: "center"
                }}>
                    <Text style={getTitleStyle(Sizes.fontSize.md, colors.onBackground)}>RM {transactionDetails.totalBalance ?? "0.00"}</Text>
                    <Text style={getSubtitleStyle(Sizes.fontSize.sm, transactionDetails.percentageBalance < 0 ? "red" : "green")}>{transactionDetails.percentageBalance ?? "0.00"}%</Text>
                </View>

                <View style={{
                    flex: 1,
                    flexDirection: "column",
                    gap: Sizes.spacing.sm,
                    alignItems: "flex-end",
                    justifyContent: "center"
                }}>

                    <Text style={getTitleStyle(Sizes.fontSize.md, colors.onBackground)}>RM 8000.00</Text>

                    <InfoChip icon={{
                        name: "information-circle-outline",
                        size: Sizes.iconSize.md,
                        color: "red",
                        type: "Ionicons"
                    }} title="Financial Stress" color={"red"} />
                </View>

            </View>

            <PortfolioLineChart />


            <View style={{
                flexDirection: "column",
                gap: Sizes.spacing.md,
                marginTop: Sizes.spacing.lg,
                paddingHorizontal: Sizes.spacing.lg
            }}>

                <View style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    alignItems: "center",
                    gap: Sizes.spacing.md,
                    width: "100%"
                }}>
                    <Text style={getTitleStyle(Sizes.fontSize.lg, colors.onBackground)}>
                        Transaction
                    </Text>

                    <DefaultDropdown
                        handleRateTypeChange={() => { }}
                        timeFrames={[]}
                        selectedRateType={""}
                    />

                </View>

                {
                    transactionDetails.transactions.map((transaction, index) => (
                        <View key={index} style={{
                            marginVertical: Sizes.spacing.md
                        }}>
                            <TransactionCard
                                key={index}
                                transaction={transaction}
                            />
                        </View>
                    ))
                }




            </View>

            <View style={{
                marginHorizontal: Sizes.spacing.lg,
            }}>
                <View style={{
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: Sizes.spacing.md,
                    borderColor: colors.secondaryContainer,
                    borderWidth: 1,
                    borderRadius: Sizes.borderRadius.md,
                    padding: Sizes.spacing.lg,

                }}>
                    <FontAwesome5
                        name="robot"
                        size={Sizes.iconSize.sm}
                        color={colors.onBackground}
                    />

                    <Text style={getTitleStyle(Sizes.fontSize.md, colors.onBackground)}>
                        Please be careful you have spend 30% of your income
                    </Text>


                </View>
            </View>
        </View>
    )
}

export default ExpensesTransactionScreen;