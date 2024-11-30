import * as React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { Sizes } from 'src/core/constant/Sizes';

const { width } = Dimensions.get('window');

const Header = ({ onDrawerPress }: { onDrawerPress: () => void }) => {
    return (
        <View style={[styles.container, { marginTop: Sizes.spacing.lg }]}>
            <View style={styles.headerContent}>
                <TouchableOpacity
                    onPress={onDrawerPress}
                    style={styles.menuButton}
                >
                    <Feather name="menu" size={24} color="#000000" />
                </TouchableOpacity>

                <View style={styles.titleContainer}>
                    <Text style={styles.title}>Evening Mr.Hazwan,</Text>
                    <Text style={styles.subtitle}>Track your financial freely</Text>
                </View>

                <TouchableOpacity style={styles.profileButton}>
                    <Feather name="user" size={24} color="#FFFFFF" />
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        width: width,
        paddingTop: 44,
        paddingHorizontal: 30,
        paddingBottom: 8,
        backgroundColor: 'transparent',
    },
    headerContent: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    menuButton: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: '#fff',
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: '#505050',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.1,
        shadowRadius: 3,
        elevation: 3,
    },
    titleContainer: {
        flex: 1,
        marginHorizontal: 16,
    },
    title: {
        fontSize: 20,
        fontWeight: '700',
        color: '#fff',
    },
    subtitle: {
        fontSize: 14,
        color: 'rgba(255, 255, 255, 0.8)',
        marginTop: 2,
    },
    profileButton: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: '#2D2D2D',
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.1,
        shadowRadius: 3,
        elevation: 3,
    },
});

export default Header;