import { View, Text, FlatList, StyleSheet, Pressable, Modal, SectionList } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';


type DropdownModalProps = {
    showPicker: boolean;
    setShowPicker: () => void;
    timeFrame: string;
    setTimeFrame: (value: string) => void;
    timeFrameOptions: string[];
}

const DropdownModal = ({
    showPicker,
    setShowPicker,
    timeFrame,
    setTimeFrame,
    timeFrameOptions

}: DropdownModalProps) => {
    return (
        <Modal visible={showPicker} transparent animationType="fade">
            <Pressable style={styles.modalOverlay} onPress={setShowPicker}>
                <View style={styles.modalView}>
                    {timeFrameOptions.map((option, index) => (
                        <Pressable
                            key={option}
                            style={[styles.option, option === timeFrame && styles.selectedOption]}
                            onPress={() => setTimeFrame(option)}
                        >
                            <Text style={[styles.optionText, option === timeFrame && styles.selectedOptionText]}>{option}</Text>
                        </Pressable>
                    ))}
                </View>
            </Pressable>
        </Modal>
    )
}

export default DropdownModal;

const styles = StyleSheet.create({




    modalOverlay: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalView: {
        width: '80%',
        backgroundColor: 'white',
        borderRadius: 10,
        padding: 20,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },
    option: {
        padding: 15,
        borderBottomWidth: 1,
        borderBottomColor: '#E5E5E5',
    },
    selectedOption: {
        backgroundColor: '#F0F0F0',
    },
    optionText: {
        fontSize: 16,
        color: '#333',
    },
    selectedOptionText: {
        fontWeight: 'bold',
        color: '#007AFF',
    },
    sectionHeader: {
        backgroundColor: '#F0F0F0',
        padding: 10,
    },
    sectionHeaderText: {
        fontSize: 14,
        fontWeight: '600',
        color: '#666',
    },
});