import { View, Text, useColorScheme, ActivityIndicator } from "react-native";
import { COLORS } from "../../../../../core/constant/Colors";
import { SliderForm } from "../../../../../core/shared/presentation/components/slider-form";
import { Sizes } from "../../../../../core/constant/Sizes";
import { getSubtitleStyle, getTitleStyle } from "../../../../../core/constant/Texts";
import { carLoansData } from "src/core/constant/Data";
import DefaultButton from "src/core/shared/presentation/components/default-button";
import { useState } from "react";
import BankLoanCard, { BankLoanDetailProps } from "../components/bank-loan-card";
import { CarFilteredLoanInfo, filterCarLoans } from "../../zustand/car-loan-store";
import { FilteredLoanInfo } from "../../zustand/home-loan-store";
import CheckBox from 'react-native-check-box'
import Toast from "react-native-toast-message";


// npm i--save - dev @types/react-native-check-box


const loanDurationData = [
    {
        title: "5 Years",
        description: "Lower montly payments",
        value: 5,
        isChecked: true
    },
    {
        title: "7 Years",
        description: "Lower montly payments",
        value: 7,
        isChecked: false
    },
    {
        title: "9 Years",
        description: "Lower montly payments",
        value: 9,
        isChecked: false
    }
];




const LoanCarScreen = () => {

    const colorScheme = useColorScheme();
    const colors = COLORS[colorScheme ?? 'dark'];

    const [financingAmount, setFinancingAmount] = useState<number>(0);

    const [filteredLoans, setFilteredLoans] = useState<CarFilteredLoanInfo[]>([]);

    const [loanDuration, setLoanDuration] = useState<any[]>(loanDurationData);
    const [selectedLoanDuration, setSelectedLoanDuration] = useState<number>(5);

    const [isLoading, setIsLoading] = useState<boolean>(false);


    const handleCalculation = async () => {
        try {
            setIsLoading(true);
            await new Promise(resolve => setTimeout(resolve, 1000));
            // Example usage

            if (financingAmount <= 1000 || financingAmount >= 100000) {
                Toast.show({
                    text1: "Invalid Financing Amount",
                    text2: "Financing amount must be between RM 1000 and RM 100000",
                    type: "error"
                });
                return;
            }

            // Example: Filter loans for RM 30000 with 7-year tenure
            const result = filterCarLoans(financingAmount, selectedLoanDuration, carLoansData.car_loans);


            if (result.length === 0) {
                Toast.show({
                    text1: "No matching loans found",
                    type: "info"
                });
            }
            if (result.length > 0) {
                Toast.show({
                    text1: "Success",
                    text2: `${result.length} matching loans found`,
                    type: "success"
                });
            }
            setFilteredLoans(result);

        } catch (error) {
            if (error instanceof Error) {
                console.error(`Error: ${error.message}`);
            }
        } finally {
            setIsLoading(false);
        }
    }

    const handleLoanDuration = (index: number) => {
        const updatedLoanDuration = loanDuration.map((item, idx) => {
            return { ...item, isChecked: idx === index }
        });
        console.log("Updated Loan Duration: ", updatedLoanDuration);
        setLoanDuration(updatedLoanDuration);
        setSelectedLoanDuration(updatedLoanDuration[index].value);
    }


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
                value={financingAmount}
                minimumValue={1000}
                maximumValue={10000}
                unit="RM"
                onChange={(value) => { setFinancingAmount(value) }}
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
                    {
                        loanDuration.map((item, index) => {
                            return <LoanDurationCheckbox key={index} colors={colors} isChecked={item.isChecked} onClick={() => handleLoanDuration(index)} title={item.title} description={item.description} />
                        })
                    }



                </View>

                {
                    isLoading ? (
                        <ActivityIndicator
                            size="large"
                            color={colors.tint}
                            style={{ justifyContent: "center", alignItems: "center", marginTop: Sizes.spacing.lg, width: "100%" }}
                        />
                    ) : (
                        <View style={{
                            width: "100%",
                            flexDirection: "column",
                            alignItems: "center",
                            justifyContent: "center",
                            marginTop: Sizes.spacing.lg
                        }}>

                            <View style={{
                                width: "100%",
                                marginBottom: Sizes.spacing.md
                            }}>
                                <DefaultButton
                                    title="Check Availability"
                                    onPress={handleCalculation}
                                    color={colors.tint}
                                    borderRadius={100}
                                    isPrimary={true}

                                />
                            </View>

                            <View style={{
                                width: "100%",
                                marginTop: Sizes.spacing.md
                            }}>
                                <DefaultButton
                                    title="Check Financial Stress"
                                    onPress={() => { handleCalculation }}
                                    color={colors.tint}
                                    borderRadius={100}
                                    isPrimary={false}
                                />
                            </View>
                        </View>
                    )
                }

            </View>


            <View style={{
                flexDirection: "column",
                alignItems: "flex-start",
                justifyContent: "flex-start",
                gap: Sizes.spacing.md,
            }}>

                <View style={{
                    flexDirection: "column",
                    alignItems: "flex-start",
                    justifyContent: "flex-start",
                    gap: Sizes.spacing.sm
                }}>
                    <Text style={[getTitleStyle(Sizes.fontSize.lg, colors.onBackground)]}>
                        Available Loans
                    </Text>
                    <Text style={[getSubtitleStyle(Sizes.fontSize.sm, colors.onBackground)]}>
                        Found 4 loans
                    </Text>
                </View>

                {
                    filteredLoans.length > 0 && (
                        filteredLoans.map((loan, index) => {
                            const details: BankLoanDetailProps[] = [
                                { title: "Interest Rate", value: loan.interest_rate },
                                { title: "Estimated Monthly Payment", value: loan.estimated_monthly_min.toString() },
                                { title: "Car Condition", value: loan.car_condition },
                                { title: "Tenure Period", value: loan.tenure_period },
                            ]
                            return <BankLoanCard key={index} bankName={loan.bank_name} loanType="Car Loan" details={details} />
                        })
                    )
                }

                {
                    filteredLoans.length === 0 && (
                        <View style={{
                            width: "100%",
                            flexDirection: "column",
                            alignItems: "center",
                            justifyContent: "center",
                            marginVertical: Sizes.spacing.lg
                        }}>
                            <Text>No matching loans found</Text>
                        </View>
                    )
                }
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