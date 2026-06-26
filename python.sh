#!/bin/bash

set -e

echo "🚀 Setting up AI Project Environment..."

# Create server directory
mkdir -p python

# Move into python directory
cd python

# Create virtual environment
python3 -m venv venv

# Activate venv
source venv/bin/activate

# Upgrade pip
pip install --upgrade pip setuptools wheel

echo "📦 Installing AI packages..."

pip install \
langchain \
langchain-core \
langchain-community \
langchain-openai \
langchain-mistralai \
langchain-pinecone \
pinecone \
mistralai \
python-dotenv \
fastapi \
uvicorn \
pypdf \
pymupdf \
unstructured \
tiktoken \
python-multipart \
aiofiles \
psycopg[binary]

# Create starter FastAPI app
cat > main.py << 'EOF'
from fastapi import FastAPI

app = FastAPI(title="AI Backend")

@app.get("/")
async def root():
    return {"message": "AI Python Running"}
EOF

# Create .env file
touch .env

echo "✅ Installation Complete"
echo ""
echo "Project Structure:"
echo "python/"
echo "├── venv/"
echo "├── main.py"
echo "└── .env"
echo ""
echo "Activate environment:"
echo "cd python"
echo "source venv/bin/activate"
echo ""
echo "Run FastAPI:"
echo "uvicorn main:app --reload"