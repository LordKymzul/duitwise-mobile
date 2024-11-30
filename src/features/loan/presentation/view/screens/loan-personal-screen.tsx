import { View, Text, useColorScheme, ActivityIndicator } from "react-native";
import { SliderForm } from "../../../../../core/shared/presentation/components/slider-form";
import { Sizes } from "../../../../../core/constant/Sizes";
import { Colors, COLORS } from "../../../../../core/constant/Colors";
import DefaultButton from "src/core/shared/presentation/components/default-button";
import { useCallback, useMemo, useRef, useState } from "react";
import BankLoanCard from "../components/bank-loan-card";
import { BankLoanDetailProps } from "../components/bank-loan-card";
import { filterPersonalLoans, PersonalFilteredLoan, personalLoanData } from "../../zustand/personal-loan-store";
import Toast from "react-native-toast-message";
import { BottomSheetBackdrop, BottomSheetBackdropProps, BottomSheetModal, BottomSheetView } from "@gorhom/bottom-sheet";

const LoanPersonalScreen = () => {

    const colorScheme = useColorScheme();
    const colors = COLORS[colorScheme ?? 'dark'];


    const [financingAmount, setFinancingAmount] = useState<number>(0);
    const [financingPeriod, setFinancingPeriod] = useState<number>(0);
    const [filteredLoans, setFilteredLoans] = useState<PersonalFilteredLoan[]>([]);

    const [isLoading, setIsLoading] = useState<boolean>(false);

    const bottomSheetRef = useRef<BottomSheetModal>(null);

    const snapPoints = useMemo(() => ["30%", "50%", "90%"], []);

    const handlePresentModalPress = useCallback(() => {
        console.log("present modal");
        bottomSheetRef.current?.present();
    }, []);

    const renderBackdrop = useCallback(
        (props: BottomSheetBackdropProps) => (
            <BottomSheetBackdrop
                {...props}
                disappearsOnIndex={-1}
                appearsOnIndex={0}
                pressBehavior={"close"}
            />
        ),
        []
    );


    const handleCalculation = async () => {

        try {
            setIsLoading(true);

            await new Promise(resolve => setTimeout(resolve, 1000));

            if (financingAmount <= 0 || financingAmount > 10000) {
                Toast.show({
                    text1: "Invalid Financing Amount",
                    text2: "Financing amount must be between RM 1000 and RM 50000",
                    type: "error"
                });
                return;
            }

            // Example: Filter loans for RM 10000 with 24-month tenure
            const result = filterPersonalLoans(financingAmount, financingPeriod, personalLoanData);


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
                Toast.show({
                    text1: "Error",
                    text2: error.message,
                    type: "error"
                });
                console.error(`Error: ${error.message}`);
            }
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <>
            <View style={{
                width: "100%",
                paddingHorizontal: Sizes.padding.lg,
                marginTop: Sizes.spacing.lg,
                gap: Sizes.spacing.xl
            }}>

                <SliderForm
                    title="Loan Amount"
                    value={financingAmount}
                    minimumValue={1000}
                    maximumValue={10000}
                    onChange={(value) => setFinancingAmount(value)}
                    color={Colors.linearPersonalLoan[0]}
                    unit="RM"
                />

                <SliderForm
                    title="Financing Period"
                    value={financingPeriod}
                    minimumValue={2}
                    maximumValue={36}
                    onChange={(value) => setFinancingPeriod(value)}
                    color={Colors.linearPersonalLoan[0]}
                    unit="Months"
                />

                {
                    isLoading ? (
                        <ActivityIndicator
                            size="large"
                            color={colors.tint}
                            style={{ marginTop: Sizes.spacing.lg, alignSelf: "center", width: "100%" }}
                        />
                    ) : (
                        <View style={{
                            width: "100%",
                            marginTop: Sizes.spacing.lg
                        }}>
                            <DefaultButton
                                title="Check Availability"
                                onPress={handleCalculation}
                                color={colors.tint}
                                borderRadius={100}
                                isPrimary={true}

                            />
                        </View>
                    )
                }



                {
                    filteredLoans.length > 0 && filteredLoans.map((loan, index) => {
                        const details: BankLoanDetailProps[] = [
                            { title: "Interest Rate", value: loan.interest_rate },
                            { title: "Estimated Monthly Payment", value: loan.estimated_monthly_min.toString() },
                            { title: "Minimum Monthly Income", value: loan.minimum_monthly_income },
                            { title: "Government/GLC Eligible", value: loan.government_glc_eligible },
                        ]
                        return <BankLoanCard
                            key={index}
                            bankName={loan.bank_name}
                            loanType="Personal Loan"
                            details={details}
                            onStressTestPress={() => {
                                handlePresentModalPress();
                            }}
                            onApplyPress={() => { }}
                        />
                    })
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
            <BottomSheetModal
                ref={bottomSheetRef}
                index={1}
                snapPoints={snapPoints}
                backdropComponent={renderBackdrop}
            >
                <BottomSheetView>
                    <Text>Hello</Text>


                </BottomSheetView>
            </BottomSheetModal>

        </>
    )
}




export default LoanPersonalScreen;   