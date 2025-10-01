<div align="right">
  <a href="FEATURES-TEACHER-LAB.md">View in English</a>
</div>

# 💡 Laboratorio Docente: Un Espacio para la Práctica Reflexiva

El **Laboratorio Docente** es tu asistente pedagógico personal, un espacio privado diseñado para el autodesarrollo profesional, guiado por la inteligencia artificial. A diferencia de otros módulos centrados en el estudiante, este laboratorio se enfoca en ti, el educador, y está profundamente integrado con el **Marco para la Buena Enseñanza (MBE)** de Chile para proporcionar un contexto pedagógico robusto y relevante.

El laboratorio está organizado en pestañas que se alinean con los dominios del MBE, ofreciendo herramientas específicas para cada área.

**NOTA:** La funcionalidad "Experto MBE" dentro de este laboratorio requiere el uso de MongoDB Atlas (el servicio en la nube de MongoDB) y una configuración específica de un Índice de Búsqueda Vectorial. No funcionará con instancias locales o auto-alojadas de MongoDB. Por favor, consulta la [**guía de despliegue**](./DEPLOYMENT.es.md#configuración-del-índice-de-búsqueda-vectorial-para-el-experto-mbe) para las instrucciones de configuración obligatorias.

---

### Pestaña 1: Pulso del Aula (Visión General)

Esta es tu vista de 360 grados de la clase. Con un solo clic, la IA analiza datos clave de todos tus estudiantes, como relaciones, participación reciente y estados de ánimo, para generar un resumen conciso de la salud general del aula.

*   **Fortalezas del Grupo**: Identifica tendencias positivas (ej. "La mayoría de los estudiantes muestra una alta colaboración en los desafíos de 'Dúo Dinámico'") y las vincula a criterios del MBE como **B1 (Crea un clima de relaciones respetuosas)**.
*   **Desafíos Potenciales**: Detecta posibles problemas (ej. "Existe un conflicto recurrente entre Estudiante A y Estudiante C que podría afectar el trabajo en equipo") y lo conecta con criterios como **A2 (Conoce las características, intereses y experiencias de sus estudiantes)**.

---

### Pestaña 2: Dominio A - Planificación

Esta pestaña te ayuda a diseñar lecciones más efectivas y variadas, convirtiendo un simple objetivo en múltiples planes de acción pedagógica.

*   **Herramienta: "Copiloto de Planificación"**
    *   **Input del Docente:** Escribes un objetivo de aprendizaje claro (ej. "Que los estudiantes comprendan el ciclo del agua").
    *   **Output de la IA:** La IA devuelve un **"Menú Pedagógico"** con tres enfoques de clase distintos para lograr el mismo objetivo. Cada enfoque incluye:
        1.  **Título Creativo**: ej. "Reporteros del Clima", "El Viaje de una Gota de Agua", "Laboratorio de Condensación".
        2.  **Actividades Secuenciadas**: Un plan de tres pasos (Inicio, Desarrollo, Cierre) para cada enfoque.
        3.  **Justificación MBE**: Una breve explicación de por qué ese enfoque es pedagógicamente sólido, citando criterios específicos del MBE (ej. "Este enfoque promueve el pensamiento crítico (C8) y la colaboración (B1)").
        4.  **Sugerencia de Adaptación**: Un consejo práctico sobre cómo adaptar una de las actividades para un estudiante con necesidades específicas, basándose en los perfiles anónimos de tu clase.

---

### Pestaña 3: Dominio B y C - Ambiente y Enseñanza

Aquí puedes practicar y perfeccionar tus habilidades de gestión del aula y estrategias de enseñanza en un entorno seguro y controlado.

*   **Herramienta: "Simulador de Clima de Aula"**
    *   **Input del Docente:** Describes una situación de gestión del aula que te gustaría practicar (ej. "Dos estudiantes están discutiendo y не trabajan", "Un estudiante está totalmente desconectado de la actividad"). También puedes definir la duración de la simulación (corta, media o larga).
    *   **Simulación Interactiva:**
        1.  La IA presenta el escenario inicial.
        2.  Te ofrece de 2 a 4 opciones de intervención concretas.
        3.  Tras tu elección, la IA **evalúa tu decisión** basándose en el MBE (ej. "Buena elección. Al acercarte silenciosamente, mantienes el flujo de la clase (C4) y gestionas la convivencia de manera respetuosa (B3).") y la narrativa avanza, mostrando las consecuencias de tu acción.
        4.  El ciclo se repite, creando un escenario ramificado y realista.

*   **Herramienta: "Analizador de Calidad de Preguntas"**
    *   **Input del Docente:** Pegas una lista de preguntas que hiciste o planeas hacer.
    *   **Output de la IA:** La IA analiza cada pregunta y:
        1.  La clasifica según la **Taxonomía de Bloom** (Recordar, Comprender, Aplicar, Analizar, Evaluar, Crear).
        2.  Proporciona una justificación de por qué pertenece a ese nivel.
        3.  Ofrece una **sugerencia concreta para elevarla** a un nivel cognitivo superior.
        4.  Entrega un resumen general sobre la calidad cognitiva de tu conjunto de preguntas.

---

### Pestaña 4: Dominio D - Reflexión Profesional

Este es tu espacio más personal: un diario de vida profesional interactivo y un centro para compartir aprendizajes.

*   **Herramienta: "Experto MBE"**
    *   **Input del Docente**: Realiza cualquier consulta abierta sobre el "Marco para la Buena Enseñanza", opcionalmente proporcionando contexto sobre un alumno específico.
    *   **Output de la IA**: Una respuesta experta generada por una IA que ha estudiado el documento oficial del MBE, proporcionando una orientación detallada, práctica y bien fundamentada, adaptada a tu consulta.

*   **Herramienta: "Asistente de Reflexión Guiada"**
    *   **Input del Docente:** Escribes libremente tus pensamientos, frustraciones o éxitos sobre una clase.
    *   **Output de la IA (Diálogo Socrático):** La IA no da respuestas, sino que **hace preguntas de seguimiento** diseñadas para profundizar tu reflexión, siempre ancladas en el MBE. (Ej. "Entiendo. Mencionas que estaban aburridos. Pensando en el Dominio A, ¿cómo crees que la actividad se conectó con sus intereses (A2)?").

*   **Herramienta: "Colaboración Profesional"**
    *   **Input del Docente:** Con un solo clic, puedes exportar los resultados de cualquiera de las herramientas del laboratorio (el Menú Pedagógico, el Análisis de Preguntas o tu diálogo de reflexión) en un formato limpio y bien estructurado.
    *   **Output:** Un documento HTML listo para imprimir o compartir con tus colegas, facilitando conversaciones de desarrollo profesional y el aprendizaje colectivo.
