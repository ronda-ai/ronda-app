<div align="right">
  <a href="CONTRIBUTING.es.md">Ver en Español</a>
</div>

# Contribution Guide

We are thrilled that you are interested in contributing to Ronda AI! Your help is essential for this project to grow and improve. Below you will find a guide to make your contribution as smooth as possible.

## How Can I Contribute?

There are many ways to contribute, not just by writing code. Here are some ideas:

*   **Reporting Bugs:** If you find a bug, please open an "issue" on GitHub. Be as specific as possible, including steps to reproduce the error, screenshots, and the version you are using.
*   **Suggesting Improvements:** Do you have an idea for a new feature or an improvement to an existing one? We'd love to hear it! Open an "issue" and describe it in detail.
*   **Translations:** If you speak another language, you can help translate the Ronda AI interface so more educators can use it. See the section below for more details.
*   **Documentation:** Good documentation is key. If you see something that can be improved or clarified in our `README.md` or in the `docs` folder, feel free to propose a change.
*   **Writing Code:** If you want to get your hands dirty with code, great! Follow the steps below.

## Development Process

1.  **Fork the Repository:** Start by forking the main Ronda AI repository to your own GitHub account.

2.  **Clone Your Fork:** Clone the repository you just forked to your local machine:
    ```bash
    git clone https://github.com/your-username/ronda-app.git
    cd ronda-app
    ```

3.  **Create a New Branch:** It's important to create a new branch for each new feature or bug fix you work on. This keeps the history clean and organized.
    ```bash
    git checkout -b my-new-feature
    ```

4.  **Make Your Changes:** Now is your time to shine! Implement your new feature or fix that annoying bug.

5.  **Ensure Everything Works:** Before submitting your changes, make sure the application runs without errors.
    ```bash
    npm run dev
    ```

6.  **Commit Your Changes:** Use clear and descriptive commit messages.
    ```bash
    git add .
    git commit -m "feat: Add a new and incredible feature"
    ```
    We use "Conventional Commits" for messages. Examples: `feat:`, `fix:`, `docs:`, `chore:`.

7.  **Push Your Changes to Your Fork:**
    ```bash
    git push origin my-new-feature
    ```

8.  **Open a Pull Request (PR):** Go to the original Ronda AI repository page on GitHub. You will see a prompt to create a Pull Request from your branch. Fill out the PR template, explaining what changes you have made and why.

## Translations and Localization

To make Ronda AI accessible to educators worldwide, the application is available in the following languages: English, Spanish, Portuguese, French, German, Simplified Chinese, Japanese, Russian, Italian, Polish, Dutch, Korean, Hindi, and Indonesian.

**Important Note:** The initial translations were generated using generative AI. While this provides a solid baseline, we are aware that errors, unnatural phrasing, or incorrect cultural nuances may exist.

**This is where your help is invaluable!** If you are a native speaker of any of these languages, we encourage you to:
1.  Review the language files located in `src/locales/[language-code]/`.
2.  Correct any translation errors, improve wording for naturalness, or adapt terms to your region's educational context.
3.  Open a "Pull Request" with your improvements.

Your contribution in this area has a direct and massive impact on the tool's usability for thousands of educators.

## Code of Conduct

By contributing to this project, you agree to abide by our [Code of Conduct](./CODE_OF_CONDUCT.md). We want to maintain a positive, inclusive, and respectful community for everyone.

Thanks again for your interest in Ronda AI! 🚀
