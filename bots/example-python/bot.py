import os
import time
from datetime import datetime

print("🤖 Example Python bot démarré.")
print("BOT_TOKEN reçu :", "oui" if os.getenv("BOT_TOKEN") else "non")

while True:
    print("Bot toujours actif -", datetime.utcnow().isoformat())
    time.sleep(30)
