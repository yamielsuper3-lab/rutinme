
export enum View {
  DASHBOARD = 'DASHBOARD',
  WORKOUTS = 'WORKOUTS',
  PROGRESS = 'PROGRESS',
  PROFILE = 'PROFILE',
  LOG_SET = 'LOG_SET'
}

export interface Exercise {
  id: string;
  name: string;
  category: string; // e.g., 'Legs', 'Chest'
  tags: string[]; // e.g., 'Compound', 'Isolation'
  videoUrl?: string;
  lastSession?: string;

  // Rich Details for Exercise Explanation
  description?: string; // Short summary
  rationale?: string; // Strategic Rationale
  focus?: {
    agonists: string[];
    synergists: string[];
    stabilizers: string[];
  };
  technique?: {
    title: string;
    description: string;
  }[];

  // Specific Routine Metadata (Optional)
  defaultSets?: string; // e.g. "4 Sets"
  defaultReps?: string; // e.g. "8-10"
  duration?: string;    // e.g. "5 min"
  typeLabel?: string;   // e.g. "1. Main Lift", "Warmup"
  color?: string;       // e.g. "bg-primary"
}

export interface WorkoutSet {
  weight: number;
  reps: number;
  rpe: number;
}

export interface RoutineItem {
  exerciseId: string;
  sets: string;
  reps: string;
}

export interface WeeklySchedule {
  [key: number]: RoutineItem[]; // 0 = Sunday, 1 = Monday, etc.
}
