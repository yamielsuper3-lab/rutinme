# 🏋️‍♂️ Rutinme: Performance & Biometrics Tracking
[![React](https://img.shields.io/badge/React-19.2-blue?logo=react&logoColor=white)](https://react.dev)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.8-blue?logo=typescript&logoColor=white)](https://www.typescriptlang.org)
[![Capacitor](https://img.shields.io/badge/Capacitor-8.3-cyan?logo=capacitor&logoColor=white)](https://capacitorjs.com)
[![Zustand](https://img.shields.io/badge/State_Management-Zustand-orange)](https://github.com/pmndrs/zustand)
[![Recharts](https://img.shields.io/badge/Charts-Recharts-red)](https://recharts.org)

**Rutinme** es una aplicación móvil híbrida moderna y de alto rendimiento diseñada para entusiastas del fitness y atletas que desean monitorear su rendimiento en el gimnasio y registrar datos biométricos clave. Permite crear rutinas personalizadas, registrar series de ejercicios en tiempo real y analizar el progreso físico mediante visualizaciones de datos interactivas.

---

## ✨ Características Principales

*   **⚡ Registro en Tiempo Real (LogSet):** Interfaz fluida y táctil optimizada para registrar series, repeticiones, pesos y tiempos de descanso durante tus entrenamientos activos.
*   **📊 Biometría y Gráficos (Recharts):** Visualiza tu progreso físico y evolución de pesos mediante gráficas e indicadores biométricos interactivos de alto impacto visual.
*   **📝 Creador de Rutinas Avanzado:** Diseña y edita tus propias rutinas dividiendo ejercicios por grupos musculares de manera ágil y dinámica.
*   **💾 Estado Global Eficiente:** Utiliza **Zustand** para lograr un manejo de estado ultra-rápido, reactivo y de baja latencia, ideal para dispositivos móviles.
*   **📱 Multiplataforma (Capacitor):** Empaquetado y listo para ser compilado en dispositivos móviles nativos **Android** e **iOS** a partir del mismo codebase.

---

## 🛠️ Stack Tecnológico

*   **Core:** React 19 + TypeScript (tipado estricto)
*   **Estilos:** Tailwind CSS (diseño responsivo móvil-primero)
*   **Navegación:** React Router Dom v7
*   **Manejo de Estado:** Zustand (ligero, escalable y persistente)
*   **Gráficos:** Recharts (visualización de biometría en tiempo real)
*   **Compilador Móvil:** Capacitor v8 (Android / iOS SDK)
*   **Build Tool:** Vite

---

## 📂 Arquitectura del Proyecto

El código está organizado bajo principios de modularidad y componentes enfocados en la reutilización:

```text
📁 src/
├── 📁 components/     # Componentes visuales reutilizables (Tarjetas, Inputs, Botones)
├── 📁 store/          # Estado global asíncrono con Zustand
├── 📁 views/          # Vistas principales de la aplicación móvil:
│   ├── 📄 Welcome.tsx          # Pantalla de bienvenida
│   ├── 📄 Dashboard.tsx        # Panel principal con resumen y analíticas
│   ├── 📄 CreateRoutine.tsx    # Creador y editor dinámico de rutinas
│   ├── 📄 Library.tsx          # Biblioteca de ejercicios por grupo muscular
│   ├── 📄 LogSet.tsx           # Registrador activo de series
│   ├── 📄 Profile.tsx          # Perfil de usuario y biometría
│   └── 📄 Progress.tsx         # Historial y gráficos de evolución
├── 📄 App.tsx         # Ruteador central y Layout móvil
└── 📄 main.tsx        # Punto de entrada de la aplicación
```

---

## 🚀 Instrucciones de Instalación y Ejecución

### Requisitos Previos:
*   [Node.js](https://nodejs.org) (versión 18 o superior recomendada)
*   [Git](https://git-scm.com)
*   [Android Studio](https://developer.android.com/studio) (si deseas compilar en Android)

### 1. Clonar el repositorio e instalar dependencias:
```bash
git clone https://github.com/tu-usuario/rutinme.git
cd rutinme
npm install
```

### 2. Ejecutar el servidor de desarrollo local:
```bash
npm run dev
```
Abre tu navegador en el puerto indicado (usualmente `http://localhost:5173`) y activa la vista móvil (`F12 > Modo Dispositivo`) para experimentar la UI nativa.

### 3. Compilar y sincronizar con Android (Capacitor):
```bash
# Compilar el bundle de producción web
npm run build

# Sincronizar los archivos web con el proyecto nativo de Android
npx cap sync android

# Abrir el proyecto directamente en Android Studio para compilar y emular
npx cap open android
```

---

## 📄 Licencia

Este proyecto está bajo la licencia **MIT**. Puedes usarlo, modificarlo y distribuirlo libremente.
