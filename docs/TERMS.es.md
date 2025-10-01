# Descargo y Aviso de Responsabilidad

**Fecha de Entrada en Vigor: 1 de Agosto de 2024**

Ronda AI se proporciona como un software de código abierto y auto-alojado. Al desplegar y utilizar esta aplicación, usted acepta los siguientes términos.

## 1. Software de Código Abierto

Ronda AI se proporciona "tal cual" bajo la licencia GPL-3.0-or-later. Usted es libre de usarlo, modificarlo y distribuirlo de acuerdo con los términos de esa licencia. No existe garantía de ningún tipo, expresa o implícita.

## 2. Sus Datos son su Responsabilidad

El principio fundamental de diseño de Ronda AI es la **soberanía de los datos**. Esto significa:

- **Usted controla dónde residen sus datos.** Ya sea que despliegue en Vercel, un servidor privado o su máquina local, la base de datos y los archivos de la aplicación están bajo su control.
- **Nosotros (los creadores de Ronda AI) no tenemos acceso a sus datos.** Su instancia es completamente independiente de la nuestra.

## 3. Seguridad y Cifrado

Ronda AI está construido con la seguridad como una prioridad. Utiliza un cifrado robusto para proteger los datos sensibles de los estudiantes en reposo. Esto significa que incluso si alguien obtuviera acceso no autorizado a los archivos de su base de datos, no podría leer la información sin la clave de cifrado.

**LA CLAVE DE CIFRADO ES CRÍTICA.**
- La `ENCRYPTION_KEY` que usted proporciona durante la configuración es la **única** clave que puede descifrar los datos de sus estudiantes.
- **Usted es el único responsable de su seguridad.** Manténgala a salvo. No la comparta públicamente.
- **Si pierde su `ENCRYPTION_KEY`, sus datos serán permanentemente irrecuperables.** No podemos ayudarle a recuperarlos. No existe una opción de "olvidé mi contraseña" para esta clave.

## 4. Descargo de Responsabilidad

Debido a que usted controla la infraestructura y las claves, usted es responsable de su seguridad. Por lo tanto:

- **Brechas de Terceros:** Si su proveedor de alojamiento (como Vercel) o su proveedor de base de datos (como MongoDB Atlas) sufre una brecha de seguridad, los creadores de Ronda AI no son responsables de ninguna exposición de datos resultante.
- **Vulnerabilidades de Infraestructura:** Si su propio servidor o entorno de despliegue se ve comprometido, los creadores de Ronda AI no son responsables.
- **Error del Usuario:** Si usted expone accidentalmente su `ENCRYPTION_KEY` u otras credenciales, usted es responsable de las consecuencias.

Ronda AI proporciona las herramientas para la protección de datos (cifrado), pero **usted es responsable de asegurar el entorno donde se utilizan esas herramientas.**

Al utilizar este software, usted reconoce y acepta que los creadores y contribuyentes del proyecto de código abierto Ronda AI no son responsables de ninguna brecha de datos, pérdida de datos u otros daños que puedan ocurrir.
