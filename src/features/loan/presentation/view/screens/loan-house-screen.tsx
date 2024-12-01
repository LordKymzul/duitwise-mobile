import { View, Text, useColorScheme, TouchableOpacity, ActivityIndicator } from "react-native";
import { Sizes } from "../../../../../core/constant/Sizes";
import { SliderForm } from "../../../../../core/shared/presentation/components/slider-form";
import { Colors, COLORS } from "../../../../../core/constant/Colors";
import { getSubtitleStyle, getTitleStyle } from "../../../../../core/constant/Texts";
import { useCallback, useMemo, useRef, useState } from "react";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import DefaultButton from "../../../../../core/shared/presentation/components/default-button";
import ModalDropdown from "react-native-modal-dropdown";
import DropdownModal from "src/core/shared/presentation/components/dropdown-modal";
import { analyzeMortgage, FilteredLoanInfo, filterHomeLoans } from "../../zustand/home-loan-store";
import BankLoanCard, { BankLoanDetailProps } from "../components/bank-loan-card";
import Toast from "react-native-toast-message";
import { BottomSheetBackdrop, BottomSheetBackdropProps, BottomSheetView } from "@gorhom/bottom-sheet";
import { BottomSheetModal } from "@gorhom/bottom-sheet";
import { calculateTotalMonthlyPayments } from "src/core/constant/Data";
import DefaultGauge from "src/core/shared/presentation/components/default-gauge";
import { Image } from "react-native";
import LoanStressSheet from "../components/loan-stress-sheet";
import ApplyLoanSheet from "../components/apply-loan-sheet";
import { NavigationProp } from "@react-navigation/native";
import { useNavigation } from "@react-navigation/native";
import { RootStackParams } from "src/core/shared/types/navigation";


const advanceOptions = [
    {
        "name": "Rate Type",
        "options": ["Fixed Rate", "Float Rate"],
        "isOpen": false
    },
    {
        "name": "Flexi Loan",
        "options": ["Yes", "No"],
        "isOpen": false
    },
    {
        "name": "Financing Type",
        "options": ["Islamic", "Conventional"],
        "isOpen": false
    },
    {
        "name": "Lock Period",
        "options": ["Yes", "No"],
        "isOpen": false
    },
    {
        "name": "Bank and Loan Type",
        "options": ["Affin Bank", "Agro Bank", "AIA", "Al Rajhi Bank Malaysia", "Alliance Bank", "Bank Islam", "Bank Muamalat", "Bank of China(Malaysia) Berhad", "Bank Rakyat", "Bank Simpanan Nasional", "CBP", "CIMB Bank", "Citibank", "Hong Leong Bank", "HSBC", "Kuwait Finance House", "Maybank", "MBSB", "Public Bank", "RHB", "Standard Chartered", "UOB"],
        "isOpen": false
    }
]


const LoanHouseScreen = () => {

    const colorScheme = useColorScheme();
    const colors = COLORS[colorScheme ?? 'dark'];

    const bottomSheetRef = useRef<BottomSheetModal>(null);

    const snapPoints = useMemo(() => ["30%", "50%", "90%"], []);



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


    const [advanceOption, setAdvanceOption] = useState<any[]>(advanceOptions);

    const [propertyValue, setPropertyValue] = useState<number>(0);
    const [loanPercentage, setLoanPercentage] = useState<number>(50);

    const [rateType, setRateType] = useState<string>("Fixed Rate");
    const [flexiLoan, setFlexiLoan] = useState<string>("Yes");
    const [financeType, setFinanceType] = useState<string>("Islamic");
    const [lockInPeriod, setLockInPeriod] = useState<string>("Yes");
    const [bankAndLoanType, setBankAndLoanType] = useState<string>("Affin Bank");

    const [isLoading, setIsLoading] = useState<boolean>(false);

    const [stressValue, setStressValue] = useState<number>(0);


    const [filteredLoans, setFilteredLoans] = useState<FilteredLoanInfo[]>([]);
    const [isApplying, setIsApplying] = useState<boolean>(false);


    const navigation = useNavigation<NavigationProp<RootStackParams>>();

    const handleApplyWithPaduPress = () => {
        setIsApplying(true);

        setTimeout(() => {
            setIsApplying(false);
            navigation.navigate("SuccessScreen", {
                title: "Loan Applied",
                description: "Your loan has been applied successfully"
            });
            bottomSheetRef.current?.dismiss();
        }, 1000);
    }

    const handleRateType = (value: string) => {
        setRateType(value);
    }

    const handleFlexiLoan = (value: string) => {
        console.log('Flexi Loan: ', value);
        setFlexiLoan(value);
    }

    const handleFinanceType = (value: string) => {
        setFinanceType(value);
    }

    const handleLockInPeriod = (value: string) => {
        setLockInPeriod(value);
    }


    const handleBankAndLoanType = (value: string) => {
        setBankAndLoanType(value);
    }


    const handleCalculation = async () => {
        try {
            setIsLoading(true);
            await new Promise(resolve => setTimeout(resolve, 1000));

            const result = filterHomeLoans(propertyValue, loanPercentage, flexiLoan === "Yes", financeType === "Islamic" ? "islamic" : "conventional", lockInPeriod === "Yes", bankAndLoanType);


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
        } catch (e) {

            Toast.show({
                text1: "Something went wrong",
                text2: e as any,
                type: "error"
            });
        } finally {
            setIsLoading(false);
        }
    }

    const handleStressTest = () => {

        try {

            const analysis = analyzeMortgage
                (propertyValue,
                    loanPercentage,
                    3000,
                    calculateTotalMonthlyPayments(),
                    500,
                    { flexiLoan: flexiLoan === "Yes", financeType: financeType as "islamic" | "conventional", bankName: bankAndLoanType });
            const currentDsr = Number.parseFloat(analysis.summary.currentDsr.replace("%", ""));
            setStressValue(currentDsr);
            console.log('Stress Test' + analysis);
        } catch (e) {
            console.log('Error: ', e);
            Toast.show({
                text1: "Something went wrong due to " + e,
                text2: e as any,
                type: "error"
            });
        }
    }

    const getStressValue = () => {
        const analysis = analyzeMortgage
            (propertyValue,
                loanPercentage,
                3000,
                calculateTotalMonthlyPayments(),
                500,
                { flexiLoan: flexiLoan === "Yes", financeType: financeType as "islamic" | "conventional", bankName: bankAndLoanType });
        const currentDsr = Number.parseFloat(analysis.summary.currentDsr.replace("%", ""));
        return currentDsr;
    }

    // const handlePresentModalPress = useCallback(() => {
    //     bottomSheetRef.current?.present();
    //     handleStressTest();
    // }, []);

    const handlePresentModalPress = () => {
        bottomSheetRef.current?.present();
        handleStressTest();
    }



    const setShowPicker = (index: number) => {
        const newAdvanceOptions = [...advanceOptions];
        newAdvanceOptions[index].isOpen = !newAdvanceOptions[index].isOpen;
        setAdvanceOption(newAdvanceOptions);
    }

    return (
        <>
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
                        value={propertyValue}
                        minimumValue={100000}
                        maximumValue={500000}
                        unit="RM"
                        onChange={(value) => setPropertyValue(value)}
                        color={Colors.houseLoan[0]}
                    />

                    <SliderForm
                        title="Loan Percentage"
                        value={loanPercentage}
                        minimumValue={50}
                        maximumValue={100}
                        unit="%"
                        onChange={(value) => setLoanPercentage(value)}
                        color={Colors.houseLoan[0]}
                    />
                </View>

                <View style={{
                    flexDirection: "column",
                    gap: Sizes.spacing.lg,
                    marginTop: Sizes.spacing.lg
                }}>

                    <Text style={[getTitleStyle(Sizes.fontSize.lg, colors.onBackground)]}>
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
                            colors={colors}
                            title={advanceOptions[0].name}
                            showPicker={advanceOptions[0].isOpen}
                            setShowPicker={() => setShowPicker(0)}
                            selectedValue={rateType}
                            options={advanceOptions[0].options}
                            setSelectedValue={handleRateType}
                            placeHolder={rateType ?? "Select Rate Type"}

                        />

                        <DropdownForm
                            colors={colors}
                            title={advanceOptions[1].name}
                            showPicker={advanceOptions[1].isOpen}
                            setShowPicker={() => setShowPicker(1)}
                            selectedValue={flexiLoan}
                            options={advanceOptions[1].options}
                            setSelectedValue={handleFlexiLoan}
                            placeHolder={flexiLoan ?? "Select Flexi Loan"}
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
                            colors={colors}
                            title={advanceOptions[2].name}
                            showPicker={advanceOptions[2].isOpen}
                            setShowPicker={() => setShowPicker(2)}
                            selectedValue={financeType}
                            options={advanceOptions[2].options}
                            setSelectedValue={handleFinanceType}
                            placeHolder={financeType ?? "Select Finance Type"}
                        />

                        <DropdownForm
                            colors={colors}
                            title={advanceOptions[3].name}
                            showPicker={advanceOptions[3].isOpen}
                            setShowPicker={() => setShowPicker(3)}
                            selectedValue={lockInPeriod}
                            options={advanceOptions[3].options}
                            setSelectedValue={handleLockInPeriod}
                            placeHolder={lockInPeriod ?? "Select Lock In Period"}
                        />



                    </View>

                    <DropdownForm
                        colors={colors}
                        title={advanceOptions[4].name}
                        showPicker={advanceOptions[4].isOpen}
                        setShowPicker={() => setShowPicker(4)}
                        selectedValue={bankAndLoanType}
                        options={advanceOptions[4].options}
                        setSelectedValue={handleBankAndLoanType}
                        placeHolder={bankAndLoanType ?? "Select Bank And Loan Type"}
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
                                    onPress={() => { handleCalculation() }}
                                    color={colors.tint}
                                    borderRadius={100}
                                    isPrimary={true}

                                />
                            </View>)
                    }



                    {
                        filteredLoans.length > 0 && (
                            filteredLoans.map((loan, index) => {
                                const details: BankLoanDetailProps[] = [
                                    { title: "Interest/Profit Rate", value: loan.profit_rate },
                                    { title: "Estimated Monthly Payment", value: loan.estimated_monthly.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 }) },
                                    { title: "Maximum Tenure", value: loan.max_tenure },
                                    { title: "Maximum Margin", value: loan.max_margin },
                                    { title: "Lock-in Period", value: loan.lock_in_period },
                                    { title: "Full Flexi Loan", value: loan.full_flexi_loan },
                                ]


                                return (
                                    <BankLoanCard
                                        key={index}
                                        bankName={loan.bank_name}
                                        loanType="Home Loan"
                                        details={details}
                                        onStressTestPress={handlePresentModalPress}
                                        onApplyPress={() => {
                                            bottomSheetRef.current?.present();
                                        }}
                                        stressValue={getStressValue()}
                                    />
                                )
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
            <BottomSheetModal
                ref={bottomSheetRef}
                index={1}
                snapPoints={snapPoints}
                backdropComponent={renderBackdrop}
            >
                <BottomSheetView>
                    <ApplyLoanSheet
                        applyManuallyPress={() => {
                            bottomSheetRef.current?.dismiss();
                        }}
                        applyWithPaduPress={handleApplyWithPaduPress}
                        isLoading={isApplying}
                    />

                </BottomSheetView>
            </BottomSheetModal>
        </>
    )
}



const DropdownForm = ({
    colors,
    title,
    placeHolder,
    showPicker,
    setShowPicker,
    selectedValue,
    options,
    setSelectedValue
}: {
    colors: any,
    title: string,
    placeHolder: string,
    showPicker: boolean,
    setShowPicker: () => void,
    selectedValue: string,
    options: string[],
    setSelectedValue: (value: string) => void
}) => {

    return (
        <View style={{
            flexDirection: "column",
            gap: Sizes.spacing.md,
            flex: 1
        }}>
            <Text style={[getSubtitleStyle(Sizes.fontSize.sm, colors.onBackground)]}>
                {title}
            </Text>

            <TouchableOpacity onPress={setShowPicker}>
                <View style={{
                    flexDirection: "row",
                    width: "100%",
                    justifyContent: "space-between",
                    alignItems: "center",
                    borderWidth: 1,
                    borderColor: colors.secondaryContainer,
                    borderRadius: Sizes.borderRadius.md,
                    padding: Sizes.padding.sm
                }}>
                    <Text style={[getSubtitleStyle(Sizes.fontSize.md, colors.onBackground)]}>
                        {placeHolder}
                    </Text>
                    <MaterialCommunityIcons
                        name="chevron-down"
                        size={Sizes.iconSize.md}
                        color={colors.onBackground}
                    />
                </View>
            </TouchableOpacity>

            <DropdownModal
                setShowPicker={setShowPicker}
                showPicker={showPicker}
                timeFrame={selectedValue}
                setTimeFrame={setSelectedValue}
                timeFrameOptions={options}
            />
        </View>
    )
}

export default LoanHouseScreen;