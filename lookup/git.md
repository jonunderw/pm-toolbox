# Git Tooling

> Common Git Commands
> https://github.com/joshnh/Git-Commands

---

## Clone Repo
```
git clone https://github.com/YOUR-USERNAME/YOUR-REPOSITORY
```

---

## Set VS Code as git's default diff tool by adding this to the git config
    [diff]
        tool = default-difftool
    [difftool "default-difftool"]
        cmd = code --wait --diff $LOCAL $REMOTE

---

## Git (In Depth)
---
* Change 'git log' formatting by creating aliasing function for any custom formatting use 'git config'
* '--oneline' flag condenses each commit to a single line. 
* Useful for getting a high level overview of your project
    * '--decorate' flag displays all of the references (branches, tags, etc) that point to each commit.


---
