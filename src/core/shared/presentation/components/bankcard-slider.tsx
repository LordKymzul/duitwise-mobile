import * as React from "react";
import { View, Image, Dimensions } from "react-native";
import Animated, {
    Extrapolation,
    FadeInDown,
    interpolate,
    useSharedValue,
    withSpring,
} from "react-native-reanimated";
import Carousel, { TAnimationStyle } from "react-native-reanimated-carousel";

function BankCardSlider() {
    const { width: PAGE_WIDTH, height: windowHeight } = Dimensions.get('window');
    const PAGE_HEIGHT = 220; // Reduced height for better vertical positioning
    
    const directionAnimVal = useSharedValue(0);
    
    const cardData = [
        { id: 1, image: require('@assets/MBCard.png') },
        { id: 2, image: require('@assets/GXCard.png') },
        { id: 3, image: require('@assets/CIMBCard.png') },
    ];

    const animationStyle: TAnimationStyle = React.useCallback(
        (value: number) => {
            'worklet';
            
            const zIndex = Math.ceil(
                interpolate(
                    value,
                    [-1, 0, 1],
                    [15, 20, 15],
                    Extrapolation.CLAMP
                )
            );
            
            // Reduce horizontal movement and add slight offset
            const translateX = interpolate(
                value,
                [-1, 0, 1],
                [-PAGE_WIDTH * 0.04, 0, PAGE_WIDTH * 0.02],
                Extrapolation.CLAMP
            );
            // Increase vertical offset for more pronounced stacking
            const translateY = interpolate(
                value,
                [-1, 0, 1],
                [-20, 0, 20],
                Extrapolation.CLAMP
            );
            
            
            const scale = interpolate(
                value,
                [-1, 0, 1],
                [0.95, 1, 0.95],
                Extrapolation.CLAMP
            );
    
            return {
                transform: [
                    { translateX },
                    { translateY },
                    { scale },
                ],
                zIndex,
            };
        },
        [PAGE_WIDTH],
    );

    const renderItem = ({ item }: { item: typeof cardData[0] }) => {
        const width = PAGE_WIDTH * 0.80; // Card width
        const height = 173; // Card height

        return (
            <Animated.View
                entering={FadeInDown.duration(300)}
                style={{
                    flex: 1,
                    alignItems: 'center',
                    justifyContent: 'center', // Center vertically
                    marginTop: -20, // Negative margin to move cards up
                }}
            >
                <View
                    style={{
                        width,
                        height,
                        borderRadius: 12,
                        backgroundColor: 'transparent',
                        shadowColor: '#000',
                        shadowOffset: {
                            width: 0,
                            height: 2,
                        },
                        shadowOpacity: 0.25,
                        shadowRadius: 3.84,
                        elevation: 5,
                    }}
                >
                    <Image
                        source={item.image}
                        style={{
                            width: '100%',
                            height: '100%',
                            borderRadius: 12,
                        }}
                        resizeMode="cover"
                    />
                </View>
            </Animated.View>
        );
    };

    return (
        <View style={{ 
            flex: 1, 
            backgroundColor: 'transparent',
            justifyContent: 'flex-start',
            alignItems: 'center',
            paddingTop: 20, // Increased padding to move cards higher
        }}>
            <Carousel
                loop={true}
                style={{
                    width: PAGE_WIDTH,
                    height: PAGE_HEIGHT,
                    justifyContent: 'center',
                    alignItems: 'center',
                }}
                defaultIndex={0}
                vertical={false}
                width={PAGE_WIDTH}
                height={PAGE_HEIGHT}
                data={cardData}
                onConfigurePanGesture={(gesture: any) => {
                    'worklet';
                    gesture.enableTrackpadTwoFingerGesture(true);
                    gesture.minDistance = 10;
                    gesture.activeOffsetX = [-10, 10];
                }}
                mode="horizontal-stack"
                modeConfig={{
                    stackInterval:1000,
                    snapDirection: 'right',
                    count: 1,
                    rotateZIndex: 2,
                }}
                panGestureHandlerProps={{
                    activeOffsetX: [-10, 10],
                }}
                renderItem={renderItem}
                customAnimation={animationStyle}
                scrollAnimationDuration={300}
            />
        </View>
    );
}

export default BankCardSlider;