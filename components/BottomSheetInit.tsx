import {
  BottomModalProvider,
  useBottomModal,
} from "@/context/BottomModalContext";
import { useThemeColor } from "@/hooks/useThemeColor";
import {
  BottomSheetBackdrop,
  BottomSheetModal,
  BottomSheetModalProvider,
  BottomSheetScrollView,
} from "@gorhom/bottom-sheet";
import resolveConfig from "tailwindcss/resolveConfig";
import tailwindConfig from "../tailwind.config.js";
import { StyleSheet, View } from "react-native";

type BottomSheetContentType = {};
export const BottomSheetContent = ({}: BottomSheetContentType) => {
  const { ref, content, snapPoint, onDismiss } = useBottomModal();
  const fullConfig = resolveConfig(tailwindConfig);

  const backgroundColor = useThemeColor(
    {
      // @ts-ignore
      light: fullConfig.theme.colors["foreground-light"],
      // @ts-ignore
      dark: fullConfig.theme.colors["foreground-dark"],
    },
    "background"
  );

  const indicatorColor = useThemeColor(
    {
      light: "#000",
      dark: "#fff",
    },
    "text"
  );

  return (
    <BottomSheetModal
      ref={ref}
      snapPoints={[snapPoint]}
      index={1}
      handleStyle={{
        backgroundColor,
        borderTopRightRadius: 12,
        borderTopLeftRadius: 12,
      }}
      handleIndicatorStyle={{ backgroundColor: indicatorColor }}
      backdropComponent={(props) => (
        <BottomSheetBackdrop
          {...props}
          opacity={0.5}
          enableTouchThrough={false}
          appearsOnIndex={0}
          disappearsOnIndex={-1}
          style={[
            { backgroundColor: "rgba(0, 0, 0, 1)" },
            StyleSheet.absoluteFillObject,
          ]}
        />
      )}
      backgroundStyle={{
        backgroundColor,
      }}
      onDismiss={() => {
        console.log("DISMISSSSSS");
        if (onDismiss?.current) {
          onDismiss.current();
        }
      }}
    >
      <BottomSheetScrollView
        contentContainerStyle={{
          padding: 20,
          // backgroundColor: "rgba(0,0,0,0.2)",
          backgroundColor,
          flex: 1,
        }}
        style={{
          backgroundColor,
        }}
      >
        {/* Content */}
        {content}
      </BottomSheetScrollView>
    </BottomSheetModal>
  );
};

type BottomSheetInitType = {
  children: React.ReactNode;
};
export const BottomSheetInit = ({ children }: BottomSheetInitType) => {
  return (
    <BottomSheetModalProvider>
      <BottomModalProvider>
        {children}
        <BottomSheetContent />
      </BottomModalProvider>
    </BottomSheetModalProvider>
  );
};
