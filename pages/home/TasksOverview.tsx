import CopyText from "@/components/CopyText";
import ForegroundView from "@/components/ForegroundView";
import PrimaryText from "@/components/PrimaryText";
import { useGetTasks, useTasks } from "@/database/hooks";
import { Pressable, View } from "react-native";
import PrimaryIcon from "@/components/PrimaryIcon";
import { useBottomModal } from "@/context/BottomModalContext";
import AddTaskSheet from "@/sheets/AddTaskSheet";
import Button from "@/components/Button";

const TasksOverview = () => {
  const { tasks } = useGetTasks({});

  const { open, close } = useBottomModal();

  const onAddComplete = () => {
    close();
  };

  const onAddHandler = () => {
    open(<AddTaskSheet onComplete={onAddComplete} />);
  };

  return (
    <ForegroundView className="rounded-xl p-4 gap-2">
      <CopyText type={"subtitle"}>Tasks</CopyText>
      <Button className="border border-primary-light" onPress={onAddHandler}>
        <PrimaryIcon
          name={"add-circle-outline"}
          type={"defaultSemiBold"}
          size={24}
        />
        <PrimaryText type={"defaultSemiBold"}>Add New</PrimaryText>
      </Button>
    </ForegroundView>
  );
};

export default TasksOverview;
