import { BottomSheetModal } from "@gorhom/bottom-sheet";
import { createContext, useContext, useMemo, useRef, useState } from "react";

type SnapPoint = "25%" | "50%" | "75%";

// Create Bottom Modal Context Type
type BottomModalContextType = {
  ref: React.RefObject<BottomSheetModal>;
  show: (snapPoint?: SnapPoint) => void;
  hide: () => void;
  content?: React.ReactNode;
  setContent: (content: React.ReactNode) => void;
  snapPoint: SnapPoint;
  open: (
    content: React.ReactNode,
    snapPoint?: SnapPoint,
    dismissCb?: () => void
  ) => void;
  close: () => void;
  onDismiss?: React.MutableRefObject<(() => void) | null>;
};

// Create Bottom Modal Context
const BottomModalContext = createContext<BottomModalContextType | null>(null);

// Create Bottom Modal Hook
export const useBottomModal = () => {
  const context = useContext(BottomModalContext);
  if (!context) {
    throw new Error("useBottomModal must be used within a BottomModalProvider");
  }
  return context;
};

// Create Bottom Modal Provider Type
type BottomModalProviderType = {
  children: React.ReactNode;
};

// Create Bottom Modal Provider
export const BottomModalProvider = ({ children }: BottomModalProviderType) => {
  // Create Bottom Modal Ref
  const ref = useRef<BottomSheetModal>(null);

  const [content, setContent] = useState<React.ReactNode>(undefined);
  const [snapPoint, setSnapPoint] = useState<SnapPoint>("50%");
  // const [_, setOnDismiss] = useState<() => void>();
  const dismissCbRef = useRef<(() => void) | null>(null);

  // Show Bottom Modal
  const show = (snapPoint?: SnapPoint) => {
    if (snapPoint) {
      setSnapPoint(snapPoint);
    }
    ref.current?.present();
  };

  // Hide Bottom Modal
  const hide = () => {
    ref.current?.dismiss();
  };

  const open = (
    content: React.ReactNode,
    snapPoint: SnapPoint = "50%",
    dismissCb?: () => void
  ) => {
    setContent(content);
    setSnapPoint(snapPoint);
    if (dismissCb) {
      dismissCbRef.current = dismissCb;
    }
    ref.current?.present();
  };

  const close = () => {
    setContent(undefined);
    ref.current?.close();
  };

  const value = useMemo(() => {
    return {
      ref,
      show,
      hide,
      content,
      setContent,
      snapPoint,
      open,
      close,
      onDismiss: dismissCbRef,
    };
  }, [ref, content, setContent, snapPoint]);

  return (
    <BottomModalContext.Provider value={value}>
      {children}
    </BottomModalContext.Provider>
  );
};

export default BottomModalContext;
