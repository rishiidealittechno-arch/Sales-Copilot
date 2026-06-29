#!/bin/bash

set -e

echo "🚀 Setting up AI Python environment..."

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PYTHON_DIR="$ROOT_DIR/python"

mkdir -p "$PYTHON_DIR"
cd "$PYTHON_DIR"

if [ ! -d "venv" ]; then
  python3 -m venv venv
fi

source venv/bin/activate

pip install --upgrade pip setuptools wheel
pip install -r requirements.txt

if [ ! -f ".env" ]; then
  cp .env.example .env
  echo "Created python/.env from .env.example"
fi

echo "✅ Installation complete"
echo ""
echo "Activate environment:"
echo "cd python && source venv/bin/activate"
echo ""
echo "Run FastAPI:"
echo "uvicorn main:app --reload --port 8000"
