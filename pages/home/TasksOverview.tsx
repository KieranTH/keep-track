import CopyText from "@/components/CopyText";
import ForegroundView from "@/components/ForegroundView";
import PrimaryText from "@/components/PrimaryText";
import { useGetTasks } from "@/database/hooks";
import { Pressable, View } from "react-native";
import PrimaryIcon from "@/components/PrimaryIcon";
import { useBottomModal } from "@/context/BottomModalContext";
import AddTaskSheet from "@/sheets/AddTaskSheet";
import Button from "@/components/Button";
import PrimaryContentText from "@/components/PrimaryContentText";
import clsx from "clsx";
import { usePrimaryColour } from "@/hooks/usePrimaryColour";
import PrimaryButton from "@/components/PrimaryButton";
import { router } from "expo-router";

const TasksOverview = () => {
  const { tasks } = useGetTasks({});
  const primaryColour = usePrimaryColour();

  const { open, close } = useBottomModal();

  const onAddComplete = () => {
    close();
  };

  const onAddHandler = () => {
    router.navigate("/(sheets)/createTask");
    // open(<AddTaskSheet onComplete={onAddComplete} />);
  };

  return (
    <ForegroundView className="rounded-xl p-4 gap-2">
      <CopyText type={"subtitle"}>Tasks</CopyText>
      {tasks.map((task) => (
        <Pressable key={task.id}>
          <View
            className={clsx(
              "flex-row gap-2 border border-primary p-4 rounded-lg",
              "bg-primary-light dark:bg-primary-dark"
            )}
            style={{
              borderColor: primaryColour,
              backgroundColor: primaryColour,
            }}
          >
            <PrimaryContentText type={"defaultSemiBold"}>
              {task.title}
            </PrimaryContentText>
          </View>
        </Pressable>
      ))}
      <PrimaryButton onPress={onAddHandler} variant="outline">
        <PrimaryIcon
          name={"add-circle-outline"}
          type={"defaultSemiBold"}
          size={24}
        />
        <PrimaryText type={"defaultSemiBold"}>Add New</PrimaryText>
      </PrimaryButton>
    </ForegroundView>
  );
};

export default TasksOverview;
