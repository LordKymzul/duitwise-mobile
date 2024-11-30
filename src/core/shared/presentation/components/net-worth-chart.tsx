import * as React from 'react';
import { View, Text, StyleSheet, Dimensions, TouchableOpacity } from 'react-native';
import PieChart from 'react-native-pie-chart';
import { FontAwesome } from '@expo/vector-icons';
import { calculateTotalBalance } from 'src/core/constant/Data';

const { width: screenWidth } = Dimensions.get('window');

const styles = StyleSheet.create({
  chartContainer: {
    backgroundColor: 'white',
    borderRadius: 16,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
    width: '100%',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 24,
  },
  titleSection: {
    gap: 4,
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    color: '#000',
  },
  dateText: {
    fontSize: 12,
    color: '#666',
  },
  periodSelector: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    marginLeft: 8,
  },
  periodText: {
    fontSize: 12,
    color: '#333',
    marginRight: 4,
  },
  chartWrapper: {
    position: 'relative',
    alignItems: 'center',
    justifyContent: 'center',
    height: 180,
    marginBottom: 10,
    marginTop: -20
  },
  centerContent: {
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
  },
  centerLabel: {
    fontSize: 16,
    color: '#666',
    marginBottom: 4,
  },
  totalAmount: {
    fontSize: 22,
    fontWeight: '600',
    color: '#000',
  },
  legend: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginTop: 4,
    gap: 2,
  },
  legendRow: {
    flexDirection: 'row',
    alignItems: 'center',
    minWidth: '45%',
  },
  legendLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  dot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    marginRight: 8,
  },
  legendLabel: {
    fontSize: 16,
    color: '#333',
  },
});

type NetWorthChartProps = {
  totalAmount: number;
  data: { value: number; key: string; svg: { fill: string }; label: string }[];
};

const NetWorthChart: React.FC<NetWorthChartProps> = ({ totalAmount, data }) => {
  return (
    <View style={styles.chartContainer}>
      <View style={styles.header}>
        <View style={styles.titleSection}>
          <Text style={styles.title}>Net Worth</Text>
          <Text style={styles.dateText}>Sept 2024 - Nov 2024</Text>
        </View>
        <TouchableOpacity style={styles.periodSelector}>
          <Text style={styles.periodText}>Last 3 Months</Text>
          <FontAwesome name="chevron-down" size={12} color="#666" />
        </TouchableOpacity>
      </View>

      <View style={styles.chartWrapper}>
        <PieChart
          widthAndHeight={180}
          series={data.map(item => item.value)}
          sliceColor={data.map(item => item.svg.fill)}
          coverRadius={0.75}
          coverFill={'#FFF'}
        />
        <View style={styles.centerContent}>
          <Text style={styles.centerLabel}>Total Worth</Text>
          <Text style={styles.totalAmount}>
            RM {calculateTotalBalance()}
          </Text>
        </View>
      </View>

      <View style={styles.legend}>
        {data.map((item, index) => (
          <View key={index} style={styles.legendRow}>
            <View style={styles.legendLeft}>
              <View style={[styles.dot, { backgroundColor: item.svg.fill }]} />
              <Text style={styles.legendLabel}>{item.label}</Text>
            </View>
          </View>
        ))}
      </View>
    </View>
  );
};

export default NetWorthChart;