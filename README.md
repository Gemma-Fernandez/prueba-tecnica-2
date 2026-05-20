# Representación Visual Interactiva de Accidentes


## Stack Tecnológico
* **Frontend:** React (Componentes funcionales y Hooks).
* **Librería Gráfica:** Konva / React-Konva (Renderizado optimizado en HTML5 Canvas).
* **Estilos:** CSS3 (Layout estructurado mediante Flexbox nativo).

## 🚀 Instrucciones de Ejecución

Sigue estos pasos para instalar y ejecutar el proyecto localmente en tu ordenador:

### 1. Prerrequisitos
Asegúrate de tener instalado [Node.js](https://nodejs.org/) junto con `npm`.

### 2. Clonación e Instalación
Clona este repositorio de GitHub y accede a la carpeta del proyecto:

```bash
# Clona el repositorio
git clone [https://github.com/Gemma-Fernandez/prueba-tecnica-2.git]

# Accede al directorio
cd prueba2

#Instala todas las dependencias necesarias definidas en el package.json
npm install

#Arranca la aplicación en el entorno de desarrollo:
npm start

```

## Modelo de Datos de la Escena

Para gestionar la información de la escena de forma eficiente y reactiva, se ha implementado un modelo de datos basado en el **estado de React (`useState`)**. Este estado actúa como la **única fuente de verdad (Single Source of Truth)** para la interfaz gráfica renderizada por Konva.

El modelo de la escena consiste en un arreglo (`Array`) de objetos JSON. Cada objeto representa un elemento individual en el lienzo y mantiene una estructura estandarizada y escalable:

* **`id`** (`string`): Identificador único (generado mediante timestamp) necesario para que React optimice el renderizado de listas y para identificar qué elemento se está manipulando.
* **`type`** (`string`): Define la categoría del elemento (`'car'`, `'obstacle'`, `'tree'`). Este atributo determina la lógica de renderizado (qué figura geométrica o componente de Konva instanciar).
* **`x` / `y`** (`number`): Coordenadas cartesianas actuales del elemento en el Canvas. Se actualizan dinámicamente mediante el evento `onDragEnd`, redondeando los valores para mantener un JSON limpio.
* **`properties`** (`object`): Objeto anidado que encapsula los metadatos y propiedades visuales específicas de cada elemento (color, dimensiones, etiquetas de texto). Esto permite que el modelo sea fácilmente escalable si en el futuro se necesitan nuevas propiedades (por ejemplo: rotación, nivel de daño, velocidad) sin alterar la estructura base.

**Flujo de sincronización:**
La arquitectura del flujo de datos es unidireccional. Las interacciones del usuario en el Canvas (como arrastrar un vehículo) no mutan el gráfico directamente, sino que disparan una actualización inmutable en el estado de React. Al detectar el cambio, React fuerza a Konva a repintar el elemento en sus nuevas coordenadas, garantizando que el modelo visual y el modelo de datos (JSON) estén siempre perfectamente sincronizados.
