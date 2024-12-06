import { useHeaderHeight } from "@react-navigation/elements";
import { ScrollView, StyleSheet } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { ThemedView } from "./ThemedView";

type ContentProps = {
  children: React.ReactNode;
  className?: string;
  contentClassName?: string;
  gap?: number;
  applySafeMargin?: boolean;
  scrollEnabled?: boolean;
  padding?: number;
};
const Content = ({
  children,
  className,
  contentClassName,
  gap,
  applySafeMargin = true,
  scrollEnabled,
  padding = 20,
}: ContentProps) => {
  const headerHeight = useHeaderHeight();
  const safeHeight = useSafeAreaInsets().top;
  const height = headerHeight > safeHeight ? headerHeight : safeHeight;
  return (
    <ThemedView style={styles.container}>
      <ScrollView
        contentContainerStyle={{
          flexGrow: 1,
          rowGap: gap,
          paddingTop: applySafeMargin ? height : 0,
          padding: padding,
        }}
        keyboardShouldPersistTaps={"handled"}
        className={className}
        contentContainerClassName={contentClassName}
        scrollEnabled={scrollEnabled}
      >
        {children}
      </ScrollView>
    </ThemedView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default Content;
