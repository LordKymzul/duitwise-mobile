declare module 'react-native-speedometer' {
    import { ComponentType } from 'react';

    interface SpeedometerProps {
        value: number;
        size: number;
        // Add other props as needed
    }

    const RNSpeedometer: ComponentType<SpeedometerProps>;
    export default RNSpeedometer;
}