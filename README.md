# ☁️ MUSLIM BOT PANEL — GitHub Actions Edition

Panel gratuit basé sur GitHub Pages + GitHub Actions.

## Architecture

- **GitHub Pages** : interface du MUSLIM BOT PANEL
- **GitHub Actions** : exécution des bots
- **GitHub Secrets** : tokens et variables sensibles
- **GitHub Repository** : code des bots

⚠️ GitHub Actions utilise des runners temporaires. Ce système n'est donc pas un VPS 24/7 permanent. Un workflow peut faire tourner un bot pendant son exécution, puis le runner est détruit lorsque le workflow se termine.

## Ajouter un bot

Place le code dans :

```text
bots/nom-du-bot/
```

Puis ajoute une entrée dans `panel/bots.json`.

Exemple :

```json
[
  {
    "id": "telegram-node",
    "name": "Telegram Node Bot",
    "path": "bots/telegram-node",
    "runtime": "node",
    "command": "npm install && node bot.js"
  }
]
```

Pour Python :

```json
{
  "id": "telegram-python",
  "name": "Telegram Python Bot",
  "path": "bots/telegram-python",
  "runtime": "python",
  "command": "pip install -r requirements.txt && python bot.py"
}
```

## Secrets

Ne mets jamais un token Telegram directement dans le code.

Dans GitHub :

`Settings → Secrets and variables → Actions → New repository secret`

Exemple :

```text
BOT_TOKEN
```

Le workflow rend les secrets disponibles à ton programme.

## Lancer un bot

Ouvre :

`Actions → MUSLIM BOT RUNNER → Run workflow`

Puis indique l'identifiant du bot présent dans `panel/bots.json`.

## Arrêter un bot

GitHub Actions permet d'annuler le workflow en cours depuis :

`Actions → MUSLIM BOT RUNNER → exécution en cours → Cancel workflow`

Le panneau contient également un bouton qui ouvre directement la page Actions.

## Déployer le panneau

Le workflow `pages.yml` publie automatiquement le dossier `panel/` sur GitHub Pages.

Après le premier push :

`Settings → Pages → Source: GitHub Actions`

Puis GitHub donnera l'adresse du panneau.

## Commandes Termux

```bash
pkg update -y
pkg install git gh -y

cd ~/storage/downloads
unzip MUSLIM-BOT-PANEL-GITHUB-ACTIONS.zip
cd MUSLIM-BOT-PANEL-GITHUB-ACTIONS

git init
git add .
git commit -m "Initial MUSLIM BOT PANEL - GitHub Actions"

gh auth login

gh repo create MUSLIM-BOT-PANEL --public --source=. --remote=origin --push
```

Ensuite ouvre le dépôt GitHub et active :

`Settings → Pages → GitHub Actions`

Le workflow Pages publiera le panneau.
