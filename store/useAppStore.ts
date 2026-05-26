import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { View, Exercise, WorkoutSet, WeeklySchedule } from '../types';
import { Language } from './translations';

interface WorkoutLog {
    id: string;
    date: string;
    exerciseId: string;
    sets: WorkoutSet[];
    notes?: string;
}

interface UserProfile {
    name: string;
    weight?: number; // kg
    height?: number; // cm
    bodyFat?: number; // %
    age?: number;
}

interface AppState {
    // Data
    exercises: Exercise[];
    schedule: WeeklySchedule;
    history: WorkoutLog[];
    userProfile: UserProfile;
    activeWorkout: WorkoutLog | null; // For currently tracking a workout

    // Settings
    theme: 'light' | 'dark';
    language: Language;

    // Actions
    addExercise: (exercise: Exercise) => void;
    logWorkout: (log: WorkoutLog) => void;
    updateProfile: (profile: Partial<UserProfile>) => void;
    setTheme: (theme: 'light' | 'dark') => void;
    setLanguage: (lang: Language) => void;
    setSchedule: (schedule: WeeklySchedule) => void;
    deleteExercise: (id: string) => void;
    deleteLog: (id: string) => void;
}

export const useAppStore = create<AppState>()(
    persist(
        (set) => ({
            exercises: [
                // Lunes
                {
                    id: 'sq',
                    name: 'Sentadilla',
                    category: 'Legs',
                    tags: ['Compuesto'],
                    videoUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBza9VpGwpMCi-kKoQ0MNwfmTSGoSog9762WS3gIX4JoUIL35AECgNYNTsmB5tOmaJccH5lIJ0tYUeGk_zX4N77D_Kf-Dlw4yPwzxKsIkH0tDNfrxTldng7VUIOBlhqig1b1Ylj2HWkNbroiTvuZSaG8YyoYPkVykVy_hf01rLEj06Ooqy_zeXIMWVWqiWqMJVxxdHttRItSxxOu8vE2sdpmdUT4nBJbcnvbdu0pkL1KfdLccdqp5gG4ts2-EjbYmRo54UXBtueJW_Ysf',
                    description: 'Constructor de Fuerza Primaria',
                    rationale: 'Base fundamental para la Hipertrofia del Tren Inferior. Involucra máximas unidades motoras para desencadenar una respuesta anabólica sistémica.',
                    focus: {
                        agonists: ['Cuádriceps', 'Glúteo Mayor'],
                        synergists: ['Aductor Mayor', 'Sóleos'],
                        stabilizers: ['Isquios', 'Gemelos']
                    },
                    technique: [
                        { title: 'Compactar Núcleo 360°', description: 'Inhala profundo hacia el diafragma, expandiendo oblicuos y espalda baja antes de descender.' },
                        { title: 'Columna Neutra', description: 'Mantén la mirada al frente. No hiperextiendas el cuello.' },
                        { title: 'Trayectoria de Rodillas', description: 'Empuja las rodillas hacia afuera sobre la punta de los pies durante todo el movimiento.' }
                    ]
                },
                {
                    id: 'ext',
                    name: 'Extensiones de Cuádriceps',
                    category: 'Legs',
                    tags: ['Aislamiento'],
                    videoUrl: '',
                    description: 'Aislante de Cuádriceps',
                    rationale: 'Ejercicio de aislamiento crucial para el recto femoral. Permite una contracción máxima en la posición de acortamiento, algo que la sentadilla no ofrece.',
                    focus: {
                        agonists: ['Recto Femoral', 'Vasto Lateral'],
                        synergists: ['Vasto Medial'],
                        stabilizers: ['Core']
                    },
                    technique: [
                        { title: 'Alineación de Rodilla', description: 'Asegúrate de que el eje de rotación de la máquina esté alineado con tus rodillas.' },
                        { title: 'Control Excéntrico', description: 'Baja el peso controladamente durante 3 segundos. No dejes caer la carga.' },
                        { title: 'Pico de Contracción', description: 'Sostén la extensión completa por 1 segundo apretando los cuádriceps.' }
                    ]
                },
                {
                    id: 'lp',
                    name: 'Prensa de Piernas',
                    category: 'Legs',
                    tags: ['Máquina'],
                    videoUrl: '',
                    description: 'Volumen e Hipertrofia',
                    rationale: 'Permite mover grandes cargas con estabilidad total, eliminando el factor limitante del equilibrio. Ideal para acumular volumen efectivo en el tren inferior.',
                    focus: {
                        agonists: ['Cuádriceps', 'Glúteo Mayor'],
                        synergists: ['Aductores'],
                        stabilizers: ['Isquios']
                    },
                    technique: [
                        { title: 'Posición de Pies', description: 'Coloca los pies al ancho de hombros en el centro de la plataforma.' },
                        { title: 'Rango Completo', description: 'Baja hasta que tus muslos toquen o casi toquen tu pecho, sin levantar la cadera del asiento.' },
                        { title: 'Empuje Controlado', description: 'Empuja con toda la planta del pie, evitando bloquear las rodillas al final.' }
                    ]
                },
                {
                    id: 'pl',
                    name: 'Plancha Abdominal',
                    category: 'Core',
                    tags: ['Isométrico'],
                    videoUrl: '',
                    description: 'Estabilidad del Núcleo',
                    rationale: 'Fortalece la función principal del core: la anti-extensión. Esencial para proteger la columna en levantamientos pesados.',
                    focus: {
                        agonists: ['Recto Abdominal'],
                        synergists: ['Oblicuos', 'Serratos'],
                        stabilizers: ['Glúteos', 'Cuádriceps']
                    },
                    technique: [
                        { title: 'Tensión Total', description: 'Aprieta glúteos y cuádriceps para inclinar la pelvis posteriormente.' },
                        { title: 'Codos bajo Hombros', description: 'Alinea los codos directamente debajo de los hombros.' },
                        { title: 'Respiración', description: 'Mantén respiraciones cortas y controladas sin perder la tensión abdominal.' }
                    ]
                },
                {
                    id: 'nc',
                    name: 'Curl de Cuello',
                    category: 'Neck',
                    tags: ['Aislamiento'],
                    videoUrl: '',
                    description: 'Grosor Cervical',
                    rationale: 'Desarrolla los flexores profundos del cuello (esternocleidomastoideo), vitales para la estética, postura y reducción de riesgo de conmociones.',
                    focus: {
                        agonists: ['Esternocleidomastoideo'],
                        synergists: ['Escalenos'],
                        stabilizers: ['Platisma']
                    },
                    technique: [
                        { title: 'Rango Completo', description: 'Deja colgar la cabeza completamente hacia atrás y flexiona hasta tocar el pecho con la barbilla.' },
                        { title: 'Tempo Lento', description: 'Usa un tempo 2-0-2. Evita impulsos bruscos.' },
                        { title: 'Plato en Frente', description: 'Sostén un disco o pesa sobre la frente con una toalla para comodidad.' }
                    ]
                },
                // Martes
                {
                    id: 'bp',
                    name: 'Press de Banca',
                    category: 'Chest',
                    tags: ['Compuesto'],
                    videoUrl: '',
                    description: 'Rey del Empuje',
                    rationale: 'El constructor de masa por excelencia para el tren superior. Combina carga mecánica alta con gran activación pectoral y de tríceps.',
                    focus: {
                        agonists: ['Pectoral Mayor', 'Tríceps'],
                        synergists: ['Deltoides Anterior'],
                        stabilizers: ['Dorsal Ancho', 'Manguito Rotador']
                    },
                    technique: [
                        { title: 'Retracción Escapular', description: 'Junta las escápulas y mantenlas pegadas al banco para proteger los hombros.' },
                        { title: 'Arco Natural', description: 'Mantén un arco ligero en la espalda baja, con los pies firmes en el suelo.' },
                        { title: 'Trayectoria en J', description: 'La barra no viaja en línea recta; baja al esternón y sube hacia los ojos.' }
                    ]
                },
                {
                    id: 'br',
                    name: 'Remo con Barra',
                    category: 'Back',
                    tags: ['Compuesto'],
                    videoUrl: '',
                    description: 'Espalda Densa',
                    rationale: 'Añade grosor a la espalda media y alta. Es el antagonista directo del press de banca, ayudando a mantener la salud postural.',
                    focus: {
                        agonists: ['Dorsal Ancho', 'Romboides'],
                        synergists: ['Bíceps', 'Trapecio'],
                        stabilizers: ['Erectores Espinales', 'Core']
                    },
                    technique: [
                        { title: 'Bisagra de Cadera', description: 'Inclínate hacia adelante manteniendo la espalda neutra, casi paralela al suelo.' },
                        { title: 'Tirar a la Cadera', description: 'Dirige la barra hacia el pliegue de la cadera, no al pecho.' },
                        { title: 'Codos Pegados', description: 'Mantén los codos cerca del torso para maximizar la activación del dorsal.' }
                    ]
                },
                {
                    id: 'ji',
                    name: 'Ejercicios de Mandíbula',
                    category: 'Face',
                    tags: ['Isométrico'],
                    videoUrl: '',
                    description: 'Estética Facial',
                    rationale: 'Estimula la hipertrofia de los maseteros para definir la línea de la mandíbula. Mejora la estética facial general.',
                    focus: {
                        agonists: ['Maseteros'],
                        synergists: ['Temporales'],
                        stabilizers: ['Pterigoideos']
                    },
                    technique: [
                        { title: 'Masticación Fuerte', description: 'Usa chicle de resistencia o ejercitador. Muerde con fuerza controlada.' },
                        { title: 'Volumen Alto', description: 'Estos músculos son resistentes. Se benefician de tiempos bajo tensión prolongados.' },
                        { title: 'Simetría', description: 'Asegúrate de masticar uniformemente con ambos lados.' }
                    ]
                },
                {
                    id: 'ne',
                    name: 'Extensión de Cuello',
                    category: 'Neck',
                    tags: ['Aislamiento'],
                    videoUrl: '',
                    description: 'Nuca Poderosa',
                    rationale: 'Complemento del curl de cuello. Trabaja los extensores posteriores (trapecio superior, esplenios), dando un aspecto de poder desde atrás.',
                    focus: {
                        agonists: ['Esplenios', 'Trapecio Superior'],
                        synergists: ['Erectores Espinales'],
                        stabilizers: ['Romboides']
                    },
                    technique: [
                        { title: 'Arnés o Disco', description: 'Usa un arnés de cabeza o sostén un disco detrás de la nuca.' },
                        { title: 'Mirada al Frente', description: 'Al subir, intenta mirar al frente o ligeramente arriba.' },
                        { title: 'Rango Completo', description: 'Deja que la barbilla toque el pecho y extiende hasta mirar al techo.' }
                    ]
                },
                // Jueves
                {
                    id: 'dl',
                    name: 'Peso Muerto',
                    category: 'Back',
                    tags: ['Compuesto'],
                    videoUrl: '',
                    description: 'Fuerza Total',
                    rationale: 'El ejercicio que recluta más musculatura total. Construye la cadena posterior completa (isquios, glúteos, espalda baja y alta).',
                    focus: {
                        agonists: ['Isquiosurales', 'Glúteo Mayor'],
                        synergists: ['Erectores', 'Dorsales', 'Trapecios'],
                        stabilizers: ['Core', 'Antebrazos']
                    },
                    technique: [
                        { title: 'Barra Pegada', description: 'La barra debe rozar tus espinillas y muslos durante todo el recorrido.' },
                        { title: 'Empujar el Suelo', description: 'Piensa en alejar el suelo con tus pies, no en "levantar" la barra.' },
                        { title: 'Bloqueo Glúteo', description: 'Termina el movimiento contrayendo fuerte los glúteos, no hiperextendiendo la espalda.' }
                    ]
                },
                {
                    id: 'gs',
                    name: 'Sentadilla Goblet',
                    category: 'Legs',
                    tags: ['Compuesto'],
                    videoUrl: '',
                    description: 'Movilidad y Cuádriceps',
                    rationale: 'Excelente variante para enfatizar cuádriceps y mejorar la movilidad de cadera/tobillo. La carga frontal obliga a mantener el torso vertical.',
                    focus: {
                        agonists: ['Cuádriceps', 'Core'],
                        synergists: ['Glúteos'],
                        stabilizers: ['Bíceps', 'Hombros']
                    },
                    technique: [
                        { title: 'Codos Adentro', description: 'Sostén la mancuerna pegada al pecho con los codos cerrados.' },
                        { title: 'Sentarse Entre Piernas', description: 'Baja profundo, permitiendo que los codos toquen el interior de tus muslos.' },
                        { title: 'Torso Erguido', description: 'Lucha por no inclinarte hacia adelante en ningún momento.' }
                    ]
                },
                {
                    id: 'lr',
                    name: 'Elevación de Piernas',
                    category: 'Core',
                    tags: ['Aislamiento'],
                    videoUrl: '',
                    description: 'Abdominales Inferiores',
                    rationale: 'Target ea los flexores de cadera y la porción inferior del recto abdominal de manera más efectiva que el crunch tradicional.',
                    focus: {
                        agonists: ['Recto Abdominal (Inf)'],
                        synergists: ['Psoas Ilíaco'],
                        stabilizers: ['Oblicuos', 'Brazos']
                    },
                    technique: [
                        { title: 'Colgarse', description: 'Cuélgate de una barra. Deprime las escápulas (hombros lejos de orejas).' },
                        { title: 'Pelvis Hacia Arriba', description: 'No solo subas las piernas; intenta mostrar tu pelvis al frente.' },
                        { title: 'Controlar Bajada', description: 'Baja lento para evitar el balanceo. El balanceo mata la eficacia.' }
                    ]
                },
                // Viernes
                {
                    id: 'ohp',
                    name: 'Press Militar',
                    category: 'Shoulders',
                    tags: ['Compuesto'],
                    videoUrl: '',
                    description: 'Hombros de Acero',
                    rationale: 'El mejor formador de hombros grandes y fuertes. Requiere gran estabilidad del core y fuerza de tríceps.',
                    focus: {
                        agonists: ['Deltoides Anterior', 'Medial'],
                        synergists: ['Tríceps', 'Pectoral Superior'],
                        stabilizers: ['Core', 'Serratos']
                    },
                    technique: [
                        { title: 'Glúteo Apretado', description: 'Contrae glúteos y abdomen para crear una base sólida y no arquear la espalda.' },
                        { title: 'Cabeza Atrás', description: 'Mueve la cabeza ligeramente atrás para dejar pasar la barra, luego métela "por la ventana".' },
                        { title: 'Codos Adelante', description: 'Mantén los codos ligeramente por delante de la barra en la posición inicial.' }
                    ]
                },
                {
                    id: 'pd',
                    name: 'Jalón al Pecho',
                    category: 'Back',
                    tags: ['Máquina'],
                    videoUrl: '',
                    description: 'Amplitud Dorsal',
                    rationale: 'Alternativa vertical a las dominadas. Excelente para aislar el dorsal ancho y crear la forma de "V".',
                    focus: {
                        agonists: ['Dorsal Ancho'],
                        synergists: ['Bíceps', 'Redondo Mayor'],
                        stabilizers: ['Trapecio Inferior']
                    },
                    technique: [
                        { title: 'Pecho Arriba', description: 'Saca el pecho hacia la barra. Piensa en llevar los codos a los bolsillos traseros.' },
                        { title: 'Sin Impulso', description: 'Evita inclinarte excesivamente hacia atrás para mover el peso.' },
                        { title: 'Estiramiento Completo', description: 'Deja que los brazos se estiren completamente arriba para un estiramiento dorsal máximo.' }
                    ]
                },
            ],
            schedule: {
                1: [ // Lunes
                    { exerciseId: 'sq', sets: '3 sets', reps: '5 reps' },
                    { exerciseId: 'lp', sets: '3 sets', reps: '10 reps' },
                    { exerciseId: 'pl', sets: '3 sets', reps: '30s' },
                    { exerciseId: 'nc', sets: '2 sets', reps: '15 reps' },
                ],
                2: [ // Martes
                    { exerciseId: 'bp', sets: '3 sets', reps: '5 reps' },
                    { exerciseId: 'br', sets: '3 sets', reps: '10 reps' },
                    { exerciseId: 'ji', sets: '5 sets', reps: '10s' },
                    { exerciseId: 'ne', sets: '2 sets', reps: '15 reps' },
                ],
                3: [], // Miércoles (Recuperación Activa)
                4: [ // Jueves
                    { exerciseId: 'dl', sets: '3 sets', reps: '5 reps' },
                    { exerciseId: 'gs', sets: '3 sets', reps: '10 reps' },
                    { exerciseId: 'lr', sets: '3 sets', reps: '12 reps' },
                    { exerciseId: 'nc', sets: '2 sets', reps: '15 reps' },
                ],
                5: [ // Viernes
                    { exerciseId: 'ohp', sets: '3 sets', reps: '5 reps' },
                    { exerciseId: 'pd', sets: '3 sets', reps: '10 reps' },
                    { exerciseId: 'ji', sets: '5 sets', reps: '10s' },
                    { exerciseId: 'ne', sets: '2 sets', reps: '15 reps' },
                ],
                6: [], // Sábado (Optimización)
                0: [], // Domingo (Descanso)
            },
            history: [],
            userProfile: {
                name: 'Yamie',
                weight: 50,
                height: 168,
                bodyFat: 12, // Estimación atlética para BMI 17.7
                age: 20
            },
            activeWorkout: null,
            theme: 'dark',
            language: 'es',

            addExercise: (exercise) => set((state) => ({
                exercises: [...state.exercises, exercise]
            })),

            logWorkout: (log) => set((state) => ({
                history: [log, ...state.history]
            })),

            updateProfile: (profile) => set((state) => ({
                userProfile: { ...state.userProfile, ...profile }
            })),

            setTheme: (theme) => set({ theme }),

            setLanguage: (language) => set({ language }),

            setSchedule: (schedule) => set({ schedule }),

            deleteExercise: (id) => set((state) => ({
                exercises: state.exercises.filter(e => e.id !== id)
            })),

            deleteLog: (id) => set((state) => ({
                history: state.history.filter(h => h.id !== id)
            })),
        }),
        {
            name: 'rutinme-storage', // name of the item in the storage (must be unique)
            storage: createJSONStorage(() => localStorage), // (optional) by default, 'localStorage' is used
        }
    )
);
