import {
  BottomModalProvider,
  useBottomModal,
} from "@/context/BottomModalContext";
import {
  BottomSheetModal,
  BottomSheetModalProvider,
  BottomSheetScrollView,
} from "@gorhom/bottom-sheet";

type BottomSheetContentType = {};
export const BottomSheetContent = ({}: BottomSheetContentType) => {
  const { ref, content, snapPoint } = useBottomModal();

  return (
    <BottomSheetModal ref={ref} snapPoints={[snapPoint]} index={1}>
      <BottomSheetScrollView
        contentContainerStyle={{
          padding: 20,
          backgroundColor: "rgba(0,0,0,0.2)",
          flex: 1,
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
