<div align="right">
  <a href="DEPLOYMENT.es.md">Ver en Español</a>
</div>

# Deployment Guide

There are two main ways to get your own instance of Ronda AI up and running: using Vercel for a quick cloud deployment, or running it locally on your own machine for full control.

## Option 1: Deploy with Vercel (Recommended for most users)

Vercel is a platform that makes deploying web applications like Ronda AI incredibly easy. It offers a generous free tier.

### Steps

1.  **Click the "Deploy with Vercel" button** found in the main `README.md` file.

    <a href="https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Fronda-ai%2Fronda-app&env=GEMINI_API_KEY,ENCRYPTION_KEY,JWT_SECRET_KEY,NEXT_PUBLIC_MONGODB_URI,TEACHER_USER,TEACHER_PASS&envDescription=API%20Keys%20and%20credentials%20needed%20to%20run%20the%20application.&project-name=ronda-app&repository-name=my-ronda-app" target="_blank">
      <img src="https://vercel.com/button" alt="Deploy with Vercel"/>
    </a>

2.  **Connect your GitHub account:** Vercel will ask you to log in with your GitHub account. This will allow it to create a copy (a "fork") of the Ronda AI repository in your account.

3.  **Configure your Project:** Give your new repository a name (e.g., `my-personal-ronda`).

4.  **Configure Environment Variables:** This is the most important step. Vercel will show you a list of variables you need to set up. See the sections below for detailed instructions on the database and language model.

    *   `NEXT_PUBLIC_MONGODB_URI`: The connection string to your MongoDB database.
    *   `TEACHER_USER`: The email you will use to log in as a teacher. Make one up (e.g., `teacher@school.com`).
    *   `TEACHER_PASS`: The password for the teacher user.
    *   `GEMINI_API_KEY`: Your Google AI Studio (Gemini) API key. **This is required for the default setup.**
    *   `ENCRYPTION_KEY`: A long, random secret key to encrypt sensitive student data. You can generate one [here](https://www.lastpass.com/features/password-generator).
    *   `JWT_SECRET_KEY`: A long, random secret key for signing authentication tokens. Generate another one [here](https://www.lastpass.com/features/password-generator).
    *   `OPENAI_API_KEY`, `DEEPSEEK_API_KEY`, `XAI_API_KEY` (Optional): API keys for other AI models if you wish to use them instead of Gemini.

5.  **Deploy:** Click the "Deploy" button. Vercel will handle the entire process. In a few minutes, your instance of Ronda AI will be online!

---

## Option 2: Local Installation

This option gives you full control and is ideal for development or for hosting the application on your own infrastructure.

### Prerequisites

*   **Node.js**: Version 18 or higher.
*   **Database**: A local or cloud MongoDB instance, or a Supabase project.
*   **Git**: To clone the repository.

### Steps

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/ronda-ai/ronda-app.git
    cd ronda-app
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    ```

3.  **Create the `.env` file:** Copy the file `.env.example` (if it exists) or create a new file named `.env` in the root of the project. Add all the environment variables listed in the Vercel section above.

4.  **Run the development server:**
    ```bash
    npm run dev
    ```

Your application will be running at `http://localhost:9002`!

---

## Configuring the Language Model (LLM)

Ronda AI is configured to use Google's Gemini models by default, but you can switch to others like OpenAI's GPT, Grok, DeepSeek, or a local model via Ollama.

### Google Gemini (Default)

This is the recommended and default option. It offers a generous free tier that is excellent for getting started.

*   **Free Tier Limits**: The Gemini API free tier provides **60 requests per minute (RPM)**, which is sufficient for most individual classroom uses. However, during periods of high demand on Google's services, you might experience "model overload" errors.
*   **Recommendation**: For a more stable and reliable experience, it is highly recommended to upgrade to a **pay-as-you-go** plan. This significantly reduces the likelihood of service interruptions.
*   **How to get an API Key**:
    1.  Go to [**Google AI Studio**](https://aistudio.google.com/app).
    2.  Sign in with your Google account.
    3.  Click on the "**Get API key**" button.
    4.  Create a new API key in a new or existing Google Cloud project.
    5.  Copy the generated key and paste it into the `GEMINI_API_KEY` environment variable.

### Other Models

To use a different model, you need to provide its API key in the corresponding environment variable and then select the desired plugin and model from the "Classroom" settings page within the application.

*   **OpenAI (GPT-4o, etc.)**:
    *   **API Key**: Get it from your [OpenAI Platform](https://platform.openai.com/api-keys) dashboard.
    *   **Environment Variable**: `OPENAI_API_KEY`

*   **xAI (Grok)**:
    *   **API Key**: Access is currently limited. Check the [xAI website](https://x.ai) for availability.
    *   **Environment Variable**: `XAI_API_KEY`

*   **DeepSeek**:
    *   **API Key**: Get it from the [DeepSeek Platform](https://platform.deepseek.com/api_keys).
    *   **Environment Variable**: `DEEPSEEK_API_KEY`

*   **Ollama (Local Models)**:
    *   To use models running locally on your machine, you must first install [Ollama](https://ollama.com/).
    *   No API key is needed, but you must configure the **Ollama Base URL** on the "Classroom" page within the application (e.g., `http://localhost:11434`).

---

## Database Setup

You need to choose and configure a database. MongoDB is the default and recommended option.

### MongoDB (Recommended)

MongoDB's flexible schema is perfect for Ronda AI's data. You can get a free database that is more than enough for a classroom.

1.  **Create a Free Account**: Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) and sign up for a free account.
2.  **Create a Free Cluster**: Follow the instructions to create a new "Shared" cluster (the free M0 tier). Choose a cloud provider and a region near you. It may take a few minutes for the cluster to be created.
3.  **Create a Database User**: In your cluster, go to "Database Access" and create a new database user. Give it a username and a strong password. **Save this username and password.**
4.  **Allow Network Access**: Go to "Network Access" and add your current IP address. For simplicity in development, you can "Allow Access from Anywhere" (0.0.0.0/0), but be aware this is less secure. For Vercel deployments, you **must** use this option.
5.  **Get the Connection String**: Go back to "Databases", click "Connect" for your cluster, select "Drivers", and copy the connection string. It will look like this: `mongodb+srv://<user>:<password>@<cluster-url>/...`
6.  **Update the Connection String**: Replace `<user>` and `<password>` with the credentials you created in step 3. You can also specify a database name after the cluster URL (e.g., `...cluster.net/myRondaDB?retryWrites...`). If you don't, it will default to `test`.
7.  **Set the Environment Variable**: Add this full connection string to your `.env` file or Vercel environment variables as `NEXT_PUBLIC_MONGODB_URI`.

### Setting up the Vector Search Index (for MBE Expert)

**This step is mandatory if you want to use the "MBE Expert" feature in the Teacher Lab.** This feature uses vector search, which is only available on MongoDB's cloud platform, **Atlas**.

1.  **Navigate to Atlas Search**: In your MongoDB Atlas cluster dashboard, go to the "Search" tab.
2.  **Create a New Index**: Click the "Create Search Index" button.
3.  **Select JSON Editor**: Choose the "JSON Editor" configuration method. Click "Next".
4.  **Configure the Index**:
    *   **Database and Collection**: Select your database and the `mbedocuments` collection.
    *   **Index Name**: Give it a name, for example, `mbe_embedding_index`.
    *   **Paste the JSON Configuration**: In the JSON editor, paste the following configuration. This defines how the `embedding` field will be indexed for vector search.

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
5.  **Create the Index**: Click "Create Search Index". The index will take a few moments to build.

Once the index is built, you can load the MBE document into the database by going to the "Teacher Lab" tab and clicking on the "MBE Expert" section.

### Supabase (Experimental)

Supabase provides a PostgreSQL database and is being developed as an alternative. **Note: Supabase support is currently incomplete.**

1.  **Create a Free Project**: Go to [Supabase](https://supabase.com/) and create a new free-tier project.
2.  **Get Connection String**: In your project's dashboard, go to "Settings" > "Database". Find the "Connection string" and copy the URI.
3.  **Set Environment Variables**: In your `.env` file, set `DB_PROVIDER="supabase"` and `NEXT_PUBLIC_SUPABASE_URL` to the URI you copied.
