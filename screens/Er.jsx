import React, { useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { View, Text, Button, Pressable } from 'react-native';
import { PanGestureHandler, State } from 'react-native-gesture-handler';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  Easing,
} from 'react-native-reanimated';

const data = [
  {
    question: 'What is the capital of France?',
    options: ['London', 'Paris', 'Madrid'],
    answer: 'Paris',
  },
  {
    question: 'What is the largest ocean?',
    options: ['Indian', 'Atlantic', 'Pacific'],
    answer: 'Pacific',
  },
  {
    question: 'What is the currency of Japan?',
    options: ['Yen', 'Dollar'],
    answer: 'Yen',
  },
];

const Er = () => {
  const [currentQ, setCurrentQ] = useState(0);

  const offsetX = useSharedValue(0);

  const handleGestureEvent = Animated.event(
    [{ nativeEvent: { translationX: offsetX } }],
    { useNativeDriver: true }
  );

  const handleGestureStateChange = event => {
    if (event.nativeEvent.state === State.END) {
      if (event.nativeEvent.translationX > 0 && currentQ > 0) {
        setCurrentQ(currentQ - 1);
      } else if (
        event.nativeEvent.translationX < 0 &&
        currentQ < data.length - 1
      ) {
        setCurrentQ(currentQ + 1);
      }

      offsetX.value = withTiming(0, {
        duration: 250,
        easing: Easing.out(Easing.ease),
      });
    }
  };

  const questionStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateX: offsetX.value }],
    };
  });

  const optionsStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateX: offsetX.value }],
    };
  });

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={{ flex: 1 }}>
        <PanGestureHandler
          onGestureEvent={handleGestureEvent}
          onHandlerStateChange={handleGestureStateChange}
        >
          <Animated.View style={questionStyle}>
            <Text>{data[currentQ].question}</Text>
          </Animated.View>
        </PanGestureHandler>

        <View style={{ flexDirection: 'row' }}>
          {data[currentQ].options.map((item, index) => (
            <Pressable
              key={index}
              style={{ flex: 1 }}
              onPress={() => {
                if (item === data[currentQ].answer) {
                  alert('Correct!');
                } else {
                  alert('Incorrect!');
                }
              }}
            >
              <Animated.View style={optionsStyle}>
                <Text>{item}</Text>
              </Animated.View>
            </Pressable>
          ))}
        </View>

        <Button title="Next" onPress={handleGestureStateChange} />
      </View>
    </SafeAreaView>
  );
};

export default Er;
