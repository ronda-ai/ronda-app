<div align="right">
  <a href="CONTRIBUTING.md">View in English</a>
</div>

# Guía de Contribución

¡Estamos encantados de que estés interesado en contribuir a Ronda AI! Tu ayuda es fundamental para que este proyecto crezca y mejore. A continuación, encontrarás una guía para que tu contribución sea lo más fluida posible.

## ¿Cómo Puedo Contribuir?

Hay muchas maneras de contribuir, no solo escribiendo código. Aquí hay algunas ideas:

*   **Reportando Bugs:** Si encuentras un error, por favor, abre un "issue" en GitHub. Sé lo más específico posible, incluyendo los pasos para reproducir el error, capturas de pantalla y la versión que estás usando.
*   **Sugiriendo Mejoras:** ¿Tienes una idea para una nueva funcionalidad o una mejora para una existente? ¡Nos encantaría escucharla! Abre un "issue" y descríbela en detalle.
*   **Traducciones:** Si hablas otro idioma, puedes ayudar a traducir la interfaz de Ronda AI para que más educadores puedan usarla. Revisa la sección a continuación para más detalles.
*   **Documentación:** La buena documentación es clave. Si ves algo que se puede mejorar o clarificar en nuestro `README.md` o en la carpeta `docs`, no dudes en proponer un cambio.
*   **Escribiendo Código:** Si quieres ensuciarte las manos con el código, ¡genial! Sigue los pasos a continuación.

## Proceso de Desarrollo

1.  **Haz un "Fork" del Repositorio:** Comienza haciendo un "fork" del repositorio principal de Ronda AI en tu propia cuenta de GitHub.

2.  **Clona tu Fork:** Clona el repositorio que acabas de "forkear" a tu máquina local:
    ```bash
    git clone https://github.com/tu-usuario/ronda-app.git
    cd ronda-app
    ```

3.  **Crea una Nueva Rama:** Es importante crear una rama nueva para cada nueva funcionalidad o corrección de error en la que trabajes. Esto mantiene el historial limpio y organizado.
    ```bash
    git checkout -b mi-nueva-funcionalidad
    ```

4.  **Haz tus Cambios:** ¡Ahora es tu momento de brillar! Implementa tu nueva funcionalidad o corrige ese molesto bug.

5.  **Asegúrate de que Todo Funciona:** Antes de enviar tus cambios, asegúrate de que la aplicación se ejecuta sin errores.
    ```bash
    npm run dev
    ```

6.  **Haz "Commit" de tus Cambios:** Usa mensajes de "commit" claros y descriptivos.
    ```bash
    git add .
    git commit -m "feat: Añade una nueva e increíble funcionalidad"
    ```
    Usamos "Conventional Commits" para los mensajes. Ejemplos: `feat:`, `fix:`, `docs:`, `chore:`.

7.  **Empuja tus Cambios a tu Fork:**
    ```bash
    git push origin mi-nueva-funcionalidad
    ```

8.  **Abre un "Pull Request" (PR):** Ve a la página del repositorio original de Ronda AI en GitHub. Verás un aviso para crear un "Pull Request" desde tu rama. Rellena la plantilla del PR, explicando qué cambios has hecho y por qué.

## Traducciones y Localización

Para que Ronda AI sea accesible a educadores de todo el mundo, la aplicación está disponible en los siguientes idiomas: Inglés, Español, Portugués, Francés, Alemán, Chino Simplificado, Japonés, Ruso, Italiano, Polaco, Holandés, Coreano, Hindi e Indonesio.

**Nota Importante:** Las traducciones iniciales se generaron utilizando IA generativa. Aunque esto proporciona una base sólida, somos conscientes de que pueden existir errores, falta de naturalidad o matices culturales incorrectos.

**¡Aquí es donde tu ayuda es invaluable!** Si eres hablante nativo de alguno de estos idiomas, te animamos a:
1.  Revisar los archivos de idioma que se encuentran en `src/locales/[codigo-idioma]/`.
2.  Corregir cualquier error de traducción, mejorar la redacción para que suene más natural o adaptar los términos al contexto educativo de tu región.
3.  Abrir un "Pull Request" con tus mejoras.

Tu contribución en este ámbito tiene un impacto directo y masivo en la usabilidad de la herramienta para miles de educadores.

## Código de Conducta

Al contribuir a este proyecto, aceptas regirte por nuestro [Código de Conducta](./CODE_OF_CONDUCT.md). Queremos mantener una comunidad positiva, inclusiva y respetuosa para todos.

¡Gracias de nuevo por tu interés en Ronda AI! 🚀
