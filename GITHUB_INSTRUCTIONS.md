# Hosting Mahjong Learner on GitHub

Since you don't have Git installed on this machine, you'll need to follow these steps to host your application on GitHub Pages.

## Step 1: Install Git
You cannot deploy to GitHub Pages easily without Git.
1. Download Git for Windows from: [git-scm.com/download/win](https://git-scm.com/download/win)
2. Run the installer and click "Next" through the default options.
3. **Restart your terminal** (or VS Code) after installation.
4. Verify by running: `git --version`

## Step 2: Create a GitHub Repository
1. Go to [github.com/new](https://github.com/new).
2. Name your repository (e.g., `mahjong-learner`).
3. Make it **Public**.
4. Do NOT initialize with README, .gitignore, or License (keep it empty).
5. Click **Create repository**.

## Step 3: Configure Your Project
1. Open this project's `vite.config.js` file.
2. Add the `base` property with your repository name:
   ```javascript
   export default defineConfig({
     base: '/mahjong-learner/', // REPLACE with your actual repo name
     plugins: [react()],
   })
   ```

## Step 4: Push and Deploy
Open your terminal in the project folder and run these commands one by one:

```powershell
# Initialize Git
git init
git checkout -b main
git add .
git commit -m "Initial commit"

# Link to your new GitHub repo (Replace URL with yours)
git remote add origin https://github.com/YOUR_USERNAME/mahjong-learner.git

# Deploy to GitHub Pages
npm run deploy
```

## Step 5: View Your App
After the `deploy` command finishes, your app will be live at:
`https://YOUR_USERNAME.github.io/mahjong-learner/`
