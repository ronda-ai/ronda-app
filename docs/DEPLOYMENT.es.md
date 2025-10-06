<div align="right">
  <a href="DEPLOYMENT.md">View in English</a>
</div>

# Guía de Despliegue

Hay dos maneras principales de poner en marcha tu propia instancia de Ronda AI: usando Vercel para un despliegue rápido en la nube, o ejecutándolo localmente en tu propia máquina para un control total.

## Opción 1: Despliegue con Vercel (Recomendado para la mayoría)

Vercel es una plataforma que facilita enormemente el despliegue de aplicaciones web como Ronda AI. Ofrece un generoso plan gratuito.

### Pasos

1.  **Haz clic en el botón "Deploy with Vercel"** que se encuentra en el archivo `README.md` principal.

    <a href="https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Fronda-ai%2Fronda-app&env=GEMINI_API_KEY,ENCRYPTION_KEY,JWT_SECRET_KEY,NEXT_PUBLIC_MONGODB_URI,TEACHER_USER,TEACHER_PASS&envDescription=API%20Keys%20and%20credentials%20needed%20to%20run%20the%20application.&project-name=ronda-app&repository-name=my-ronda-app" target="_blank">
      <img src="https://vercel.com/button" alt="Deploy with Vercel"/>
    </a>

2.  **Conecta tu cuenta de GitHub:** Vercel te pedirá que inicies sesión con tu cuenta de GitHub. Esto le permitirá crear una copia (un "fork") del repositorio de Ronda AI en tu cuenta.

3.  **Configura tu Proyecto:** Dale un nombre a tu nuevo repositorio (por ejemplo, `mi-rondaai-personal`).

4.  **Configura las Variables de Entorno:** Este es el paso más importante. Vercel te mostrará una lista de variables que necesitas configurar. Consulta las secciones siguientes para obtener instrucciones detalladas sobre la base de datos y el modelo de lenguaje.

    *   `NEXT_PUBLIC_MONGODB_URI`: La cadena de conexión a tu base de datos MongoDB.
    *   `TEACHER_USER`: El correo electrónico que usarás para iniciar sesión como profesor. Inventa el que quieras (ej: `profe@colegio.com`).
    *   `TEACHER_PASS`: La contraseña para el usuario profesor.
    *   `GEMINI_API_KEY`: Tu clave de API de Google AI Studio (Gemini). **Esta es necesaria para la configuración predeterminada.**
    *   `ENCRYPTION_KEY`: Una clave secreta larga y aleatoria para cifrar los datos sensibles de los estudiantes. Puedes generar una [aquí](https://www.lastpass.com/features/password-generator).
    *   `JWT_SECRET_KEY`: Una clave secreta larga y aleatoria para firmar los tokens de autenticación. Genera otra [aquí](https://www.lastpass.com/features/password-generator).
    *   `OPENAI_API_KEY`, `DEEPSEEK_API_KEY`, `XAI_API_KEY` (Opcional): Claves de API para otros modelos de IA si deseas usarlos en lugar de Gemini.

5.  **Desplegar:** Haz clic en el botón "Deploy". Vercel se encargará de todo el proceso. En unos minutos, ¡tu instancia de Ronda AI estará en línea!

---

## Opción 2: Instalación Local

Esta opción te da un control total y es ideal para desarrollo o para alojar la aplicación en tu propia infraestructura.

### Prerrequisitos

*   **Node.js**: Versión 18 o superior.
*   **Base de Datos**: Una instancia local o en la nube de MongoDB, o un proyecto de Supabase.
*   **Git**: Para clonar el repositorio.

### Pasos

1.  **Clona el repositorio:**
    ```bash
    git clone https://github.com/ronda-ai/ronda-app.git
    cd ronda-app
    ```

2.  **Instala las dependencias:**
    ```bash
    npm install
    ```

3.  **Crea el archivo `.env`:** Copia el archivo `.env.example` (si existe) o crea un nuevo archivo llamado `.env` en la raíz del proyecto. Añade todas las variables de entorno listadas en la sección de Vercel más arriba.

4.  **Ejecuta el servidor de desarrollo:**
    ```bash
    npm run dev
    ```

¡Tu aplicación estará funcionando en `http://localhost:9002`!

---

## Configuración del Modelo de Lenguaje (LLM)

Ronda AI está configurado para usar los modelos Gemini de Google por defecto, pero puedes cambiar a otros como GPT de OpenAI, Grok, DeepSeek o un modelo local a través de Ollama.

### Google Gemini (Predeterminado)

Esta es la opción recomendada y predeterminada. Ofrece un generoso plan gratuito que es excelente para empezar.

*   **Límites del Plan Gratuito**: El plan gratuito de la API de Gemini proporciona **60 peticiones por minuto (RPM)**, lo cual es suficiente para la mayoría de los usos individuales en un aula. Sin embargo, durante períodos de alta demanda en los servicios de Google, podrías experimentar errores de "sobrecarga del modelo".
*   **Recomendación**: Para una experiencia más estable y fiable, se recomienda encarecidamente actualizar a un plan de **pago por uso**. Esto reduce significativamente la probabilidad de interrupciones del servicio.
*   **Cómo obtener una clave de API**:
    1.  Ve a [**Google AI Studio**](https://aistudio.google.com/app).
    2.  Inicia sesión con tu cuenta de Google.
    3.  Haz clic en el botón "**Get API key**".
    4.  Crea una nueva clave de API en un proyecto nuevo o existente de Google Cloud.
    5.  Copia la clave generada y pégala en la variable de entorno `GEMINI_API_KEY`.

### Otros Modelos

Para usar un modelo diferente, necesitas proporcionar su clave de API en la variable de entorno correspondiente y luego seleccionar el plugin y modelo deseados desde la página de "Aula" dentro de la aplicación.

*   **OpenAI (GPT-4o, etc.)**:
    *   **Clave de API**: Obtenla en tu panel de [OpenAI Platform](https://platform.openai.com/api-keys).
    *   **Variable de Entorno**: `OPENAI_API_KEY`

*   **xAI (Grok)**:
    *   **Clave de API**: El acceso está actualmente limitado. Consulta el [sitio web de xAI](https://x.ai) para ver la disponibilidad.
    *   **Variable de Entorno**: `XAI_API_KEY`

*   **DeepSeek**:
    *   **Clave de API**: Obtenla en la [DeepSeek Platform](https://platform.deepseek.com/api_keys).
    *   **Variable de Entorno**: `DEEPSEEK_API_KEY`

*   **Ollama (Modelos Locales)**:
    *   Para usar modelos que se ejecutan localmente en tu máquina, primero debes instalar [Ollama](https://ollama.com/).
    *   No se necesita clave de API, pero debes configurar la **URL Base de Ollama** en la página de "Aula" dentro de la aplicación (ej., `http://localhost:11434`).

---

## Configuración de la Base de Datos

Necesitas elegir y configurar una base de datos. MongoDB es la opción predeterminada y recomendada.

### MongoDB (Recomendado)

El esquema flexible de MongoDB es perfecto para los datos de Ronda AI. Puedes obtener una base de datos gratuita que es más que suficiente para un aula.

1.  **Crea una Cuenta Gratuita**: Ve a [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) y regístrate para obtener una cuenta gratuita.
2.  **Crea un Clúster Gratuito**: Sigue las instrucciones para crear un nuevo clúster "Shared" (el nivel gratuito M0). Elige un proveedor de nube y una región cerca de ti. La creación del clúster puede tardar unos minutos.
3.  **Crea un Usuario de Base de Datos**: En tu clúster, ve a "Database Access" y crea un nuevo usuario de base de datos. Dale un nombre de usuario y una contraseña segura. **Guarda este nombre de usuario y contraseña.**
4.  **Permite el Acceso de Red**: Ve a "Network Access" y añade tu dirección IP actual. Para simplificar en desarrollo, puedes "Permitir Acceso desde Cualquier Lugar" (0.0.0.0/0), pero ten en cuenta que es menos seguro. Para despliegues en Vercel, **debes** usar esta opción.
5.  **Obtén la Cadena de Conexión**: Vuelve a "Databases", haz clic en "Connect" para tu clúster, selecciona "Drivers" y copia la cadena de conexión. Se verá así: `mongodb+srv://<user>:<password>@<cluster-url>/...`
6.  **Actualiza la Cadena de Conexión**: Reemplaza `<user>` y `<password>` con las credenciales que creaste en el paso 3. También puedes especificar un nombre de base de datos después de la URL del clúster (ej., `...cluster.net/miRondaDB?retryWrites...`). Si no lo haces, por defecto será `test`.
7.  **Establece la Variable de Entorno**: Añade esta cadena de conexión completa a tu archivo `.env` o a las variables de entorno de Vercel como `NEXT_PUBLIC_MONGODB_URI`.

### Configuración del Índice de Búsqueda Vectorial (para el Experto MBE)

**Este paso es obligatorio si quieres utilizar la funcionalidad "Experto MBE" del Laboratorio Docente.** Esta característica utiliza búsqueda vectorial, que solo está disponible en la plataforma en la nube de MongoDB, **Atlas**.

1.  **Navega a Atlas Search**: En el panel de tu clúster de MongoDB Atlas, ve a la pestaña "Search".
2.  **Crea un Nuevo Índice**: Haz clic en el botón "Create Search Index".
3.  **Selecciona el Editor JSON**: Elige el método de configuración "JSON Editor". Haz clic en "Next".
4.  **Configura el Índice**:
    *   **Base de datos y Colección**: Selecciona tu base de datos y la colección `mbedocuments`.
    *   **Nombre del Índice**: Dale un nombre, por ejemplo, `mbe_embedding_index`.
    *   **Pega la Configuración JSON**: En el editor JSON, pega la siguiente configuración. Esto define cómo se indexará el campo `embedding` para la búsqueda vectorial.

    ```json
    {
      "mappings": {
        "dynamic": false,
        "fields": {
          "embedding": {
            "dimensions": 768,
            "similarity": "cosine",
            "type": "vector"
          }
        }
      }
    }
    ```
5.  **Crea el Índice**: Haz clic en "Create Search Index". La creación del índice tardará unos momentos.

Una vez que el índice esté construido, puedes cargar el documento del MBE en la base de datos yendo a la pestaña "Laboratorio Docente" y haciendo clic en la sección "Experto MBE".

### Supabase (Experimental)

Supabase proporciona una base de datos PostgreSQL y se está desarrollando como una alternativa. **Nota: El soporte para Supabase está actualmente incompleto.**

1.  **Crea un Proyecto Gratuito**: Ve a [Supabase](https://supabase.com/) y crea un nuevo proyecto en el nivel gratuito.
2.  **Obtén la Cadena de Conexión**: En el panel de tu proyecto, ve a "Settings" > "Database". Busca la "Connection string" y copia el URI.
3.  **Establece las Variables de Entorno**: En tu archivo `.env`, establece `DB_PROVIDER="supabase"` y `NEXT_PUBLIC_SUPABASE_URL` con el URI que copiaste.
