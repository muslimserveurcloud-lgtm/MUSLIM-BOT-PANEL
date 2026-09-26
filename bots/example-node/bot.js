console.log("🤖 Example Node bot démarré.");
console.log("BOT_TOKEN reçu :", process.env.BOT_TOKEN ? "oui" : "non");

setInterval(() => {
  console.log("Bot toujours actif -", new Date().toISOString());
}, 30000);
