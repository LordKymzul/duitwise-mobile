import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

const { width } = Dimensions.get('window');

const CardDetailsBox = ({ 
    name = "Hazwan Jr.", 
    expDate = "09/29", 
    onAddClick = () => { console.log('Add button clicked'); }
}) => {
    return (
        <View style={styles.container}>
            <LinearGradient
                colors={['#30BC39', '#16561A']}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                style={styles.background}
            >
                <View style={styles.contentContainer}>
                    <View style={styles.nameContainer}>
                        <Text style={styles.nameText}>{name}</Text>
                    </View>
                    
                    <View style={styles.expContainer}>
                        <Text style={styles.expLabel}>Exp</Text>
                        <Text style={styles.expDate}>{expDate}</Text>
                    </View>
                    
                    <TouchableOpacity 
                        style={styles.addButton}
                        onPress={onAddClick}
                    >
                        <Text style={styles.plusIcon}>+</Text>
                    </TouchableOpacity>
                </View>
            </LinearGradient>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        width: width * 0.75,
        alignSelf: 'center',
        marginBottom: 0,
        marginTop: -52,
        borderRadius: 14,
        overflow: 'hidden',
        transform: [{ scale: 1.0 }],
    },
    background: {
        width: '100%',
        padding: 16,
    },
    contentContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        gap: 12,
    },
    nameContainer: {
        flex: 1,
    },
    nameText: {
        color: 'white',
        fontSize: 20,
        fontWeight: '500',
    },
    expContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    expLabel: {
        color: 'rgba(255, 255, 255, 0.8)',
        fontSize: 14,
        marginRight: 8,
    },
    expDate: {
        color: 'white',
        fontSize: 14,
    },
    addButton: {
        width: 32,
        height: 32,
        backgroundColor: 'white',
        borderRadius: 8,
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    plusIcon: {
        fontSize: 24,
        color: '#000000',
        lineHeight: 28,
        textAlign: 'center',
        marginTop: -2,
    },
});

export default CardDetailsBox;