import { StyleSheet } from "react-native";
import LottieView from "lottie-react-native";
import Animated, { 
  withTiming,
  useAnimatedStyle,
  useSharedValue,
  runOnJS
} from "react-native-reanimated";

import splashAnimation from "@/assets/lotties/splash_animation.json";

export default function SplashScreen({ onFinish = () => {} } : { onFinish?: (isCancelled: boolean) => void }) {
  const opacity = useSharedValue(1);

  const onAnimationFinish = (isCancelled: boolean) => {
    if (!isCancelled) {
      opacity.value = withTiming(0, {
        duration: 400,
      }, () => {
        runOnJS(onFinish)(isCancelled);
      });
    }
  }

  const animatedStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
  }));

  return (
    <Animated.View 
      style={[styles.safeArea, animatedStyle]}
    >
      <LottieView
        source={splashAnimation}
        onAnimationFinish={onAnimationFinish}
        autoPlay
        resizeMode="cover"
        loop={false}
        style={styles.lottie}
      />
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: '#fff',
    zIndex: 999,
  },
  lottie: {
    width: 150,
    height: 150,
  }
});
