set /p str=commit_message : 

echo %str%

git status
git add .
git commit -m "adding %str%"
git push origin master