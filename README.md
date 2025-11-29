```bash
# 1) Create a virtual environment (recommended .venv in repo root)
python -m venv .venv
```
```bash
# 2) (the .venv) will be automatically activated when u open a terminal window
.venv\Scripts\activate
```

```bash
# 4) Add pre-commit library
uv add pre-commit
```

```bash
# 5) Install pre-commit
pre-commit install
```

```bash
# 6) Test -precommit
pre-commit run --all-files
```

```bash
# you wil use uv add (name of library) instead of pip install (name of library)

uv sync #to install in your .venv the libraries present in the project
```