import React, { useState } from 'react';
import { Stage, Layer, Rect, Circle, RegularPolygon, Text, Group } from 'react-konva';
import './App.css';

function App() {
  // Estado principal que contiene nuestro modelo de datos
  const [elements, setElements] = useState([]);

  // Funciones para añadir distintos tipos de elementos
  const addCar = () => {
    const newCar = {
      id: Date.now().toString(),
      type: 'car',
      x: 100,
      y: 100,
      properties: { color: 'blue', width: 100, height: 50, label: 'Vehículo' }
    };
    setElements([...elements, newCar]);
  };

  const addObstacle = () => {
    const newObstacle = {
      id: Date.now().toString(),
      type: 'obstacle',
      x: 150,
      y: 150,
      properties: { color: 'orange', radius: 25, label: 'Cono' }
    };
    setElements([...elements, newObstacle]);
  };

  const addEnvironment = () => {
    const newEnv = {
      id: Date.now().toString(),
      type: 'tree',
      x: 200,
      y: 100,
      properties: { color: 'green', radius: 30, label: 'Árbol' }
    };
    setElements([...elements, newEnv]);
  };

  const clearScene = () => {
    setElements([]);
  };

  // Actualizar el modelo de datos cuando el usuario termina de arrastrar un objeto
  const handleDragEnd = (id, e) => {
    const updatedElements = elements.map((el) => {
      if (el.id === id) {
        return {
          ...el,
          x: Math.round(e.target.x()), // Redondeamos para mantener el JSON limpio
          y: Math.round(e.target.y())
        };
      }
      return el;
    });
    setElements(updatedElements);
  };

  // Función auxiliar para renderizar el componente gráfico de Konva según el tipo de dato
  //En un futuro se pueden añadir mas tipos de elementos
  const renderElement = (el) => {
    switch (el.type) {
      case 'car':
        return (
          <Rect
            width={el.properties.width}
            height={el.properties.height}
            fill={el.properties.color}
            cornerRadius={5}
            shadowBlur={5}
          />
        );
      case 'obstacle':
        return (
          <RegularPolygon
            sides={3}
            radius={el.properties.radius}
            fill={el.properties.color}
            shadowBlur={5}
          />
        );
      case 'tree':
        return (
          <Circle
            radius={el.properties.radius}
            fill={el.properties.color}
            shadowBlur={5}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="app-container">
      {/* Panel Lateral para controles e interacciones */}
      <div className="sidebar">
        <h2>Herramientas de Escena</h2>
        <button onClick={addCar}>+ Añadir Vehículo</button>
        <button onClick={addObstacle}>+ Añadir Obstáculo</button>
        <button onClick={addEnvironment}>+ Añadir Entorno (Árbol)</button>
        <button onClick={clearScene} style={{ backgroundColor: '#ef4444' }}>Limpiar Escena</button>

        <hr />

        <h3>Modelo de Datos (JSON)</h3>
        <p>Este es el modelo en tiempo real de la escena:</p>
        <div className="json-output">
          {JSON.stringify(elements, null, 2)}
        </div>
      </div>

      {/* Área del Canvas */}
      <div className="canvas-container">
        <Stage width={window.innerWidth - 300} height={window.innerHeight}>
          <Layer>
            {elements.map((el) => (
              <Group
                key={el.id}
                x={el.x}
                y={el.y}
                draggable
                onDragEnd={(e) => handleDragEnd(el.id, e)}
              >
                {/* Figura geométrica */}
                {renderElement(el)}

                {/* Etiqueta de texto debajo del elemento */}
                <Text
                  text={el.properties.label}
                  y={el.type === 'car' ? el.properties.height + 5 : el.properties.radius + 5}
                  fontSize={14}
                  fill="black"
                  fontStyle="bold"
                />
              </Group>
            ))}
          </Layer>
        </Stage>
      </div>
    </div>
  );
}
export default App;
