const express = require("express");
const { Client } = require("pg");
const { SecretClient } = require("@azure/keyvault-secrets");
const { DefaultAzureCredential } = require("@azure/identity");

const app = express();
const port = process.env.PORT || 3000;

// Key Vault URL from environment variable
const keyVaultUrl = String(process.env.KEYVAULT_URL || "").trim();
const credential = new DefaultAzureCredential();
const secretClient = new SecretClient(keyVaultUrl, credential);

app.get("/hello", async (req, res) => {
  let dbClient;

  try {
    console.log(
      "/hello endpoint triggered. Fetching secrets from Key Vault..."
    );

    const dbHost = (await secretClient.getSecret("DB-HOST")).value;
    const dbUser = (await secretClient.getSecret("DB-USER")).value;
    const dbPassword = (await secretClient.getSecret("DB-PASSWORD")).value;

    console.log("Secrets retrieved. Connecting to PostgreSQL...");

    dbClient = new Client({
      host: dbHost,
      user: dbUser,
      password: dbPassword,
      database: "postgres",
      ssl: {
        rejectUnauthorized: false,
      },
    });

    await dbClient.connect();

    console.log("PostgreSQL connection successful.");

    const result = await dbClient.query("SELECT NOW()");
    const currentTime = result.rows[0].now;

    console.log("Query successful.");

    res.status(200).send(`
      <h1>Connection Successful!</h1>
      <p>The /hello endpoint executed.</p>
      <p>Current time from PostgreSQL: ${currentTime}</p>
    `);
  } catch (err) {
    console.error("An error occurred:", err.message);
    res.status(500).send(`
      <h1>Connection Failed!</h1>
      <p>An error occurred:</p>
      <pre>${err.stack}</pre>
    `);
  } finally {
    if (dbClient) {
      await dbClient.end();
      console.log("PostgreSQL connection closed.");
    }
  }
});

app.listen(port, () => {
  console.log(`Server started on port ${port}.`);
});
