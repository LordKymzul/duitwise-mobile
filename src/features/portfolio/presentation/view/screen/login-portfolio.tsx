import React, { useLayoutEffect, useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  TouchableOpacity, 
  SafeAreaView,
  TextInput,
  useColorScheme
} from 'react-native';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import DefaultNetworkImage from '@core/shared/presentation/components/default-network-image';
import DefaultButton from '@core/shared/presentation/components/default-button';
import { RootStackParams } from '@core/shared/types/navigation';
import { COLORS } from 'src/core/constant/Colors';
import DefaultGoBackButton from 'src/core/shared/presentation/components/default-goback-button';
import ModalSuccessConnect from '../components/modal-success-connect';

interface RouteParams {
  route: RouteProp<RootStackParams, 'LoginPortfolio'>;
}

const LoginPortfolio = () => {
  const navigation = useNavigation();
  const { params } = useRoute<RouteProp<RootStackParams, 'LoginPortfolio'>>();
  const { bank } = params;

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [portfolioName, setPortfolioName] = useState('');
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  const colorScheme =useColorScheme();
  const colors = COLORS[colorScheme ??"dark"];

  const handleConfirm = () => {
    // Handle login logic here
    console.log('Login details:', { username, password, portfolioName });
    setShowSuccessModal(true);
  };

  const handleSuccessModalClose = () => {
    setShowSuccessModal(false);
  };

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: "Fill in Details",
      headerLeft: () => <DefaultGoBackButton onPress={() => navigation.goBack()} />,
      headerRight: () => <DefaultNetworkImage uri={bank.imageURL} height={40} width={40} borderRadius={20} />
    });
  }, [bank]);

  return (
    <>
      <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
        <View style={styles.contentContainer}>
          <View style={styles.bankInfoContainer}>
            <DefaultNetworkImage 
              uri={bank.imageURL} 
              height={80} 
              width={80} 
              borderRadius={24}
            
            />
            <Text style={[styles.bankName, { color: colors.onBackground }]}>{bank.bankName}</Text>
          </View>

          <Text style={[styles.subtitle, { color: colors.onBackground }]}>
            Please input your bank details for seamless integration
          </Text>

          <View style={styles.form}>
            <View style={styles.inputGroup}>
              <Text style={[styles.label, { color: colors.onBackground }]}>Bank's Username</Text>
              <TextInput
                style={[styles.input, { 
                  backgroundColor: colors.background,
                  borderColor: colors.secondaryContainer,
                
                }]}
                placeholder="Please enter your bank's username"
                placeholderTextColor={colors.secondaryContainer}
                value={username}
                onChangeText={setUsername}
                autoCapitalize="none"
              />
            </View>

            <View style={styles.inputGroup}>
              <Text style={[styles.label, { color: colors.onBackground }]}>Password</Text>
              <TextInput
                style={[styles.input, { 
                  backgroundColor: colors.background,
                  borderColor: colors.secondaryContainer,
                }]}
                placeholder="Please enter your bank's password"
                placeholderTextColor={colors.secondaryContainer}
                value={password}
                onChangeText={setPassword}
                secureTextEntry
              />
            </View>

            <View style={styles.inputGroup}>
              <Text style={[styles.label, { color: colors.onBackground }]}>Portfolio's Name</Text>
              <TextInput
                style={[styles.input, { 
                  backgroundColor: colors.background,
                  borderColor: colors.secondaryContainer,
                }]}
                placeholder="Give name for your portfolio"
                placeholderTextColor={colors.secondaryContainer}
                value={portfolioName}
                onChangeText={setPortfolioName}
              />
            </View>
          </View>
        </View>

        <View style={styles.footer}>
          <DefaultButton
            title="Connect Bank Account"
            onPress={handleConfirm}
            isPrimary={true}
            color={colors.tint}
            borderRadius={16}
            
          />
        </View>
      </SafeAreaView>
      
      <ModalSuccessConnect
        visible={showSuccessModal}
        onClose={handleSuccessModalClose}
        bankName={bank.bankName}
        
      />
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentContainer: {
    flex: 1,
    padding: 24,
  },
  bankInfoContainer: {
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 32,
  },
  bankLogo: {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 5,
  },
  bankName: {
    fontSize: 24,
    fontWeight: '700',
    marginTop: 16,
  },
  subtitle: {
    fontSize: 16,
    lineHeight: 24,
    marginBottom: 32,
    textAlign: 'center',
    paddingHorizontal: 24,
  },
  form: {
    gap: 24,
  },
  inputGroup: {
    gap: 8,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 4,
  },
  input: {
    height: 56,
    borderWidth: 1,
    borderRadius: 16,
    paddingHorizontal: 20,
    fontSize: 16,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  footer: {
    padding: 24,
    paddingBottom: 34,
  },
  confirmButton: {
    height: 56,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
  },
});

export default LoginPortfolio;
