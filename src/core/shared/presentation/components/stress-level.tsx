import * as React from 'react';
import { View, Text, StyleSheet } from 'react-native';
// import RNSpeedometer from 'react-native-speedometer';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import DefaultGauge from './default-gauge';

interface StressLevelProps {
  value?: number;
  trend?: 'up' | 'down';
}

const StressLevel: React.FC<StressLevelProps> = ({ value = 35, trend = 'down' }) => {
  // Get color based on value
  const getStatusColor = (value: number) => {
    if (value <= 20) return '#34A853';
    if (value <= 40) return '#93C47D';
    if (value <= 60) return '#FBBC05';
    if (value <= 80) return '#E69138';
    return '#EA4335';
  };

  // Get status text based on value
  const getStatusText = (value: number) => {
    if (value <= 20) return 'Good';
    if (value <= 40) return 'Fair';
    if (value <= 60) return 'Medium';
    if (value <= 80) return 'High';
    return 'Critical';
  };

  const labels = [
    {
      name: 'Good',
      labelColor: '#34A853',
      activeBarColor: '#34A853', // Green
    },
    {
      name: 'Fair',
      labelColor: '#93C47D',
      activeBarColor: '#93C47D', // Light green
    },
    {
      name: 'Medium',
      labelColor: '#FBBC05',
      activeBarColor: '#FBBC05', // Yellow
    },
    {
      name: 'High',
      labelColor: '#E69138',
      activeBarColor: '#E69138', // Orange
    },
    {
      name: 'Critical',
      labelColor: '#EA4335',
      activeBarColor: '#EA4335', // Red
    }
  ];

  const statusColor = getStatusColor(value);
  const statusText = getStatusText(value);
  const trendColor = trend === 'up' ? '#EA4335' : '#34A853';
  const trendIcon = trend === 'up' ? 'arrow-up' : 'arrow-down';

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Stress Level</Text>
        <View style={styles.percentageContainer}>
          <Text style={[styles.percentage, { color: statusColor }]}>
            {value}%
          </Text>
          <MaterialCommunityIcons
            name={trendIcon}
            size={12}
            color={trendColor}
            style={styles.trendIcon}
          />
        </View>
      </View>
      <View style={{ width: 80, height: 80, alignItems: 'center', justifyContent: 'center', alignSelf: "center" }}>
        <DefaultGauge value={value} />
      </View>

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
  },
  percentage: {
    fontSize: 11,
    fontWeight: '500',
  },
  trendIcon: {
    marginLeft: 2,
  },
  speedometerContainer: {
    alignItems: 'center',
    marginTop: 10,
    height: 60,
  },
  labelStyle: {
    display: 'none',
  },
  labelNoteStyle: {
    display: 'none',
  },
  innerCircleStyle: {
    backgroundColor: 'white',
  },
  // outerCircleStyle: {
  //   strokeDashArray: '0',
  // },
  stressText: {
    fontSize: 14,
    fontWeight: '600',
    marginTop: 8,
    textAlign: 'center',
  },
});

export default StressLevel;
