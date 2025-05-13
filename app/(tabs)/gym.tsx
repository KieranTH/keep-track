import Content from "@/components/Content";
import {
	Text,
	View,
	TextInput,
	Button,
	FlatList,
	StyleSheet,
} from "react-native";
import React, { useState } from "react";

// THESE TYPES ARE WORK IN PROGRESS - IDEALLY NEED TO FIND A NICE WAY TO STORE THESE AVAILABLE STRUCTURES. MAYBE IN SQLITE??

enum WorkoutType {
	Cardio = "Cardio",
	Strength = "Strength",
}

enum CardioType {
	Running = "Running",
	Cycling = "Cycling",
	Swimming = "Swimming",
	Walking = "Walking",
	Hiking = "Hiking",
	Rowing = "Rowing",
	StairClimbing = "Stair Climbing",
}

enum StrengthCategory {
	UpperBody = "Upper Body",
	LowerBody = "Lower Body",
	Core = "Core",
}

enum UpperBodyGroup {
	Chest = "Chest",
	Back = "Back",
	Shoulders = "Shoulders",
	Biceps = "Biceps",
	Triceps = "Triceps",
	Forearms = "Forearms",
}

enum ChestType {
	BenchPress = "Bench Press",
	PushUps = "Push Ups",
	CableFlyes = "Cable Flyes",
	ChestPress = "Chest Press",
	ChestDips = "Chest Dips",
	DumbbellInclinePress = "Dumbbell Incline Press",
	DumbbellFlatPress = "Dumbbell Flat Press",
}

enum BackType {
	Deadlifts = "Deadlifts",
	PullUps = "Pull Ups",
	BarbellRows = "Barbell Rows",
	DumbbellRows = "Dumbbell Rows",
	LatPulldowns = "Lat Pulldowns",
	CableRows = "Cable Rows",
}

enum ShoulderType {
	ShoulderPress = "Shoulder Press",
	LateralRaises = "Lateral Raises",
	FrontRaises = "Front Raises",
	UprightRows = "Upright Rows",
	FacePulls = "Face Pulls",
	ArnoldPress = "Arnold Press",
}

enum BicepType {
	BicepCurls = "Bicep Curls",
	HammerCurls = "Hammer Curls",
	ConcentrationCurls = "Concentration Curls",
	PreacherCurls = "Preacher Curls",
	CableCurls = "Cable Curls",
}

enum TricepType {
	TricepDips = "Tricep Dips",
	SkullCrushers = "Skull Crushers",
	TricepPushdowns = "Tricep Pushdowns",
	DumbbellOverheadExtensions = "Dumbbell Overhead Extensions",
	CableOverheadExtensions = "Cable Overhead Extensions",
}

enum ForearmType {
	ForearmCurls = "Forearm Curls",
	ReverseForearmCurls = "Reverse Forearm Curls",
	WristRollers = "Wrist Rollers",
	PlatePinches = "Plate Pinches",
	BarbellWristCurls = "Barbell Wrist Curls",
}

enum LowerBodyGroup {
	Quads = "Quads",
	Hamstrings = "Hamstrings",
	Calves = "Calves",
	Glutes = "Glutes",
	Adductors = "Adductors",
	Abductors = "Abductors",
}

enum CoreGroup {
	Abs = "Abs",
	Obliques = "Obliques",
	LowerBack = "Lower Back",
}

enum WorkoutIntensity {
	Low = "Low",
	Medium = "Medium",
	High = "High",
}

type Workout = {
	id: string;
	date: string;
	workoutType: WorkoutType;
	workoutCategory: CardioType | StrengthCategory;
};

const GymScreen = () => {
	const [workout, setWorkout] = useState("");
	const [workouts, setWorkouts] = useState<string[]>([]);

	const addWorkout = () => {
		if (workout) {
			setWorkouts([...workouts, workout]);
			setWorkout("");
		}
	};

	return (
		<Content>
			<View style={styles.container}>
				<TextInput
					style={styles.input}
					placeholder="Enter workout"
					value={workout}
					onChangeText={setWorkout}
				/>
				<Button title="Add Workout" onPress={addWorkout} />
				<FlatList
					data={workouts}
					keyExtractor={(item, index) => index.toString()}
					renderItem={({ item }) => (
						<Text style={styles.workoutItem}>{item}</Text>
					)}
				/>
			</View>
		</Content>
	);
};

const styles = StyleSheet.create({
	container: {
		padding: 20,
	},
	input: {
		height: 40,
		borderColor: "gray",
		borderWidth: 1,
		marginBottom: 10,
		paddingHorizontal: 10,
	},
	workoutItem: {
		padding: 10,
		fontSize: 18,
	},
});

export default GymScreen;
