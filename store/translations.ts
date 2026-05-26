export const translations = {
    en: {
        // Navigation
        nav: {
            home: 'Home',
            workouts: 'Workouts',
            progress: 'Progress',
            profile: 'Profile',
        },
        // Header
        header: {
            rutinme: 'RutinME',
            library: 'Library',
            progress: 'Progress',
            profile: 'Profile',
            activeSession: 'Active Session',
        },
        // Dashboard
        dashboard: {
            welcome: 'Welcome back',
            startWorkout: 'Start Workout',
            recentActivity: 'Recent Activity',
            noActivity: 'No recent activity',
            quickstats: 'Quick Stats',
            sessions: 'Sessions',
            volume: 'Volume',
            tomorrowsRoutine: "Tomorrow's Routine",
            restDay: "Rest Day",
        },
        welcome: {
            greeting: 'Welcome',
            ready: 'Ready to train?',
            start: 'START',
            useEstablished: 'Use Current Routine',
            createNew: 'Create New Routine',
        },
        createRoutine: {
            title: 'Build Your Routine',
            next: 'Next',
            back: 'Back',
            finish: 'Finish',
            addExercise: 'Add Exercise',
            setRestDay: 'Set as Rest Day',
            isRestDay: 'Rest Day',
            selectExercises: 'Select Exercises',
            sets: 'Sets',
            reps: 'Reps',
        },
        exerciseDetails: {
            rationale: 'Strategic Rationale',
            focus: 'Biomechanical Focus',
            mastery: 'Technical Mastery',
            backToSession: 'Back to Session',
            view: 'View',
            agonists: 'Agonists',
            synergists: 'Synergists',
            stabilizers: 'Dynamic Stabilizers',
        },
        // Library
        library: {
            title: 'Library',
            subtitle: 'Global Database',
            searchPlaceholder: 'Search exercises...',
            all: 'All',
            noExercises: 'No exercises found.',
        },
        // Log Set
        logSet: {
            target: 'Target',
            weight: 'Weight',
            reps: 'Reps',
            rpe: 'Difficulty (RPE)',
            easy: 'Easy',
            failure: 'Failure',
            lastSession: 'Last Session',
            logBtn: 'LOG SET',
            plateGuide: 'Plate Loading Guide',
            bar: 'Bar',
            perSide: 'Per Side',
        },
        // Progress
        progress: {
            title: 'Performance',
            subtitle: 'Biometric Progress',
            totalSessions: 'Total Sessions',
            globalVolume: 'Global Volume',
            volumeChart: 'Volume Accumulation',
            frequencyChart: 'Session Frequency',
            noData: 'No workout data yet. Log a set!',
        },
        // Profile
        profile: {
            identity: 'IDENTITY',
            subtitle: 'Biometric Scan Active',
            age: 'Age',
            weight: 'Weight',
            height: 'Height',
            bodyFat: 'Body Fat',
            preferences: 'Preferences',
            darkMode: 'Dark Mode',
            language: 'Language',
            notifications: 'Push Notifications',
            signOut: 'Sign Out',
            proTitle: 'Unlock Biometric Analysis',
            proDesc: 'Get AI-driven insights on your form, personalized recovery plans, and more.',
            goPremium: 'Go Premium',
        }
    },
    es: {
        // Navegación
        nav: {
            home: 'Inicio',
            workouts: 'Ejercicios',
            progress: 'Progreso',
            profile: 'Perfil',
        },
        // Encabezado
        header: {
            rutinme: 'RutinME',
            library: 'Biblioteca',
            progress: 'Progreso',
            profile: 'Perfil',
            activeSession: 'Sesión Activa',
        },
        // Tablero
        dashboard: {
            welcome: 'Bienvenido',
            startWorkout: 'Iniciar Rutina',
            recentActivity: 'Actividad Reciente',
            noActivity: 'Sin actividad reciente',
            quickstats: 'Estadísticas Rápidas',
            sessions: 'Sesiones',
            volume: 'Volumen',
            tomorrowsRoutine: "Rutina de Mañana",
            restDay: "Día de Descanso",
        },
        welcome: {
            greeting: 'Bienvenido',
            ready: '¿Listo para entrenar?',
            start: 'INICIAR',
            useEstablished: 'Usar Rutina Actual',
            createNew: 'Crear Nueva Rutina',
        },
        createRoutine: {
            title: 'Diseña tu Rutina',
            // ... (existing)
            reps: 'Reps',
        },
        exerciseDetails: {
            rationale: 'Justificación Estratégica',
            focus: 'Enfoque Biomecánico',
            mastery: 'Maestría Técnica',
            backToSession: 'Volver a la Sesión',
            view: 'Ver',
            agonists: 'Agonistas',
            synergists: 'Sinergistas',
            stabilizers: 'Estabilizadores Dinámicos',
        },
        // Biblioteca
        library: {
            title: 'Biblioteca',
            subtitle: 'Base de Datos Global',
            searchPlaceholder: 'Buscar ejercicios...',
            all: 'Todos',
            noExercises: 'No se encontraron ejercicios.',
        },
        // Registrar Serie
        logSet: {
            target: 'Objetivo',
            weight: 'Peso',
            reps: 'Reps',
            rpe: 'Dificultad (RPE)',
            easy: 'Fácil',
            failure: 'Fallo',
            lastSession: 'Última Sesión',
            logBtn: 'REGISTRAR SERIE',
            plateGuide: 'Guía de Discos',
            bar: 'Barra',
            perSide: 'Por Lado',
        },
        // Progreso
        progress: {
            title: 'Rendimiento',
            subtitle: 'Progreso Biométrico',
            totalSessions: 'Total Sesiones',
            globalVolume: 'Volumen Global',
            volumeChart: 'Acumulación de Volumen',
            frequencyChart: 'Frecuencia de Sesiones',
            noData: 'Sin datos aún. ¡Registra una serie!',
        },
        // Perfil
        profile: {
            identity: 'IDENTIDAD',
            subtitle: 'Escaneo Biométrico Activo',
            age: 'Edad',
            weight: 'Peso',
            height: 'Altura',
            bodyFat: 'Grasa Corp.',
            preferences: 'Preferencias',
            darkMode: 'Modo Oscuro',
            language: 'Idioma',
            notifications: 'Notificaciones',
            signOut: 'Cerrar Sesión',
            proTitle: 'Desbloquear Análisis Biométrico',
            proDesc: 'Obtén insights de IA sobre tu técnica, planes de recuperación y más.',
            goPremium: 'Hazte Premium',
        }
    }
};

export type Language = 'en' | 'es';
