# Automatic GitHub Updates

This document explains how to use the automatic update system for this repository.

## Option 1: Using the Batch File

1. Simply double-click the `update-github.bat` file in the root directory of the project.
2. This will automatically:
   - Stage all changes
   - Commit them with a timestamp
   - Push them to GitHub

## Option 2: Using Git Alias

We've set up a Git alias called `ac` (auto-commit) that does the same thing:

```bash
git ac
```

This will:
- Stage all changes
- Commit them with the message "Auto commit"
- Push them to GitHub

## Option 3: Manual Update

If you prefer to manually control your commits:

```bash
git add .
git commit -m "Your commit message"
git push origin main
```

## Troubleshooting

If you encounter any issues with the automatic update:

1. Make sure you're logged in to GitHub
2. Check your internet connection
3. Verify that you have write access to the repository

For more help, contact the repository administrator. 