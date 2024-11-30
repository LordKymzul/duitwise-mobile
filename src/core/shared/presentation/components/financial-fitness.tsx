import * as React from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import Svg, { Path, Defs, LinearGradient, Stop } from 'react-native-svg';

interface FinancialFitnessProps {
  score: number;
  status: string;
  description?: string;
}

const FinancialFitness: React.FC<FinancialFitnessProps> = ({
  score = 82,
  status = 'Strong',
  description = 'Your comprehensive financial health score based on savings, debt, emergency funds, income usage, and investments'
}) => {
  const size = 120;
  const strokeWidth = 15;
  const center = 60;
  const radius = (size - strokeWidth) / 2;
  const circumference = radius * Math.PI;
  
  // Calculate the progress (score out of 100)
  const progress = score / 100;
  const progressStrokeDashoffset = circumference * (1 - progress);

  // Create the arc path for the half donut
  const createArc = () => {
    return `
      M ${strokeWidth / 2} ${center}
      A ${radius} ${radius} 0 0 1 ${size - strokeWidth / 2} ${center}
    `;
  };

  // Function to determine gradient colors based on score
  const getGradientColors = (score: number) => {
    if (score <= 30) {
      // Red gradient for low scores
      return {
        start: '#FF0000',
        middle: '#FF4D4D',
        end: '#FF9999'
      };
    } else if (score <= 70) {
      // Yellow gradient for middle scores
      return {
        start: '#FFA500',
        middle: '#FFD700',
        end: '#FFEB3B'
      };
    } else {
      // Green gradient for high scores
      return {
        start: '#34A853',
        middle: '#4CAF50',
        end: '#8BC34A'
      };
    }
  };

  const gradientColors = getGradientColors(score);

  return (
    <View style={styles.container}>
      <View style={styles.leftContent}>
        <Text style={styles.title}>Financial Fitness</Text>
        <Text style={styles.description} numberOfLines={3}>{description}</Text>
        <View style={styles.statusContainer}>
          <Text style={styles.statusText}>{status}</Text>
        </View>
      </View>
      
      <View style={styles.scoreContainer}>
        <View style={styles.donutContainer}>
          <Svg width={size} height={size / 2}>
            <Defs>
              <LinearGradient id="gradient" x1="0" y1="0" x2="1" y2="0">
                <Stop offset="0" stopColor={gradientColors.start} />
                <Stop offset="0.5" stopColor={gradientColors.middle} />
                <Stop offset="1" stopColor={gradientColors.end} />
              </LinearGradient>
            </Defs>
            
            {/* Background arc */}
            <Path
              d={createArc()}
              stroke="#F0F0F0"
              strokeWidth={strokeWidth}
              fill="none"
            />
            
            {/* Progress arc */}
            <Path
              d={createArc()}
              stroke="url(#gradient)"
              strokeWidth={strokeWidth}
              strokeDasharray={`${circumference} ${circumference}`}
              strokeDashoffset={progressStrokeDashoffset}
              strokeLinecap="round"
              fill="none"
            />
          </Svg>
          <View style={styles.scoreTextContainer}>
            <Text style={styles.scoreNumber}>{score}</Text>
            <Text style={styles.scoreLabel}>OUT OF 100</Text>
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    borderRadius: 24,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
    marginHorizontal: 16,
    marginTop: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  leftContent: {
    flex: 1,
    gap: 8,
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    color: '#000',
    marginBottom: -4,
    lineHeight: 28,
  },
  description: {
    fontSize: 12,
    color: '#666',
    marginBottom: 8,
    marginRight: 10,
  },
  statusContainer: {
    backgroundColor: '#F1F9F1',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    alignSelf: 'flex-start',
  },
  statusText: {
    color: '#34A853',
    fontSize: 14,
    fontWeight: '500',
  },
  donutContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
    marginRight: 20,
  },
  scoreTextContainer: {
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
    top: 20,
    marginLeft: 20,
  },
  scoreContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
  },
  scoreNumber: {
    fontSize: 24,
    fontWeight: '600',
    color: '#000',
    marginTop: 18,
    marginBottom: -4,
  },
  scoreLabel: {
    fontSize: 10,
    color: '#666',
    marginTop: 2,
  },
});

export default FinancialFitness;