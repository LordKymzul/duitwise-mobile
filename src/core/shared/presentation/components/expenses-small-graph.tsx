import * as React from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import { LineChart } from 'react-native-chart-kit';
import { MaterialCommunityIcons } from '@expo/vector-icons';


interface ExpensesGraphProps {
  amount: number;
  percentage: number;
}

const ExpensesGraph: React.FC<ExpensesGraphProps> = ({ 
  amount = 10,
  percentage = -5 
}) => {
  const data = {
    labels: [],
    datasets: [{
      data: [20, 25, 18, 30, 28, 35, 30],
      color: (opacity = 1) => `rgba(234, 67, 53, ${opacity})`,
      strokeWidth: 1.5
    }]
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Spend</Text>
        <View style={styles.percentageContainer}>
          <MaterialCommunityIcons 
            name={percentage < 0 ? 'arrow-down' : 'arrow-up'} 
            size={12}
            color={percentage < 0 ? '#EA4335' : '#34A853'}
          />
          <Text style={[
            styles.percentage, 
            { color: percentage < 0 ? '#EA4335' : '#34A853' }
          ]}>
            {Math.abs(percentage)}%
          </Text>
        </View>
      </View>

      <View style={styles.chartContainer}>
        <LineChart
          data={data}
          width={Dimensions.get('window').width / 2 - 48}
          height={40}
          withDots={false}
          withInnerLines={false}
          withOuterLines={false}
          withVerticalLines={false}
          withHorizontalLines={false}
          withVerticalLabels={false}
          withHorizontalLabels={false}
          chartConfig={{
            backgroundColor: '#fff',
            backgroundGradientFrom: '#fff',
            backgroundGradientTo: '#fff',
            decimalPlaces: 0,
            color: (opacity = 1) => `rgba(234, 67, 53, ${opacity * 0.15})`,
            fillShadowGradient: '#EA4335',
            fillShadowGradientOpacity: 0.08,
            style: {
              borderRadius: 16,
            },
            propsForBackgroundLines: {
              strokeWidth: 0
            },
          }}
          bezier
          style={styles.chart}
        />
      </View>

      <Text style={styles.amount}>- RM{amount.toLocaleString()}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    borderRadius: 16,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
    height: 120,
    width: '100%',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  title: {
    fontSize: 13,
    fontWeight: '500',
    color: '#666',
  },
  percentageContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 2,
  },
  percentage: {
    fontSize: 11,
    fontWeight: '500',
  },
  chartContainer: {
    marginHorizontal: -4,
    marginVertical: 4,
    height: 40,
  },
  chart: {
    paddingRight: 0,
    paddingTop: 0,
  },
  amount: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000',
    textAlign: 'center',
    marginTop: 4,
  },
});

export default ExpensesGraph;
