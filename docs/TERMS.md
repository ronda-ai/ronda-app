<div align="right">
  <a href="TERMS.es.md">Ver en Español</a>
</div>

# Disclaimer and Notice of Responsibility

**Effective Date: August 1, 2024**

Ronda AI is provided as an open-source, self-hosted software. By deploying and using this application, you agree to the following terms.

## 1. Open Source Software

Ronda AI is provided "as is" under the GPL-3.0-or-later license. You are free to use, modify, and distribute it according to the terms of that license. There is no warranty of any kind, express or implied.

## 2. Your Data is Your Responsibility

The fundamental design principle of Ronda AI is **data sovereignty**. This means:

- **You control where your data lives.** Whether you deploy on Vercel, a private server, or your local machine, the application's database and files are under your control.
- **We (the creators of Ronda AI) do not have access to your data.** Your instance is completely separate from ours.

## 3. Security and Encryption

Ronda AI is built with security as a priority. It uses strong encryption to protect sensitive student data at rest. This means that even if someone gained unauthorized access to your database files, they would not be able to read the information without the encryption key.

**THE ENCRYPTION KEY IS CRITICAL.**
- The `ENCRYPTION_KEY` you provide during setup is the **only** key that can decrypt your student data.
- **You are solely responsible for its security.** Keep it safe. Do not share it publicly.
- **If you lose your `ENCRYPTION_KEY`, your data will be permanently unrecoverable.** We cannot help you get it back. There is no "forgot password" for this key.

## 4. Disclaimer of Liability

Because you control the infrastructure and the keys, you are responsible for its security. Therefore:

- **Third-Party Breaches:** If your hosting provider (such as Vercel) or your database provider (such as MongoDB Atlas) suffers a security breach, the creators of Ronda AI are not liable for any resulting data exposure.
- **Infrastructure Vulnerabilities:** If your own server or deployment environment is compromised, the creators of Ronda AI are not liable.
- **User Error:** If you accidentally expose your `ENCRYPTION_KEY` or other credentials, you are responsible for the consequences.

Ronda AI provides the tools for data protection (encryption), but **you are responsible for securing the environment where those tools are used.**

By using this software, you acknowledge and agree that the creators and contributors of the Ronda AI open-source project are not responsible or liable for any data breaches, data loss, or other damages that may occur.
