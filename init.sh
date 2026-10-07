#!/usr/bin/env bash
set -e

echo "Instalando dependências..."
npm install

echo "Rodando build..."
npm run build

echo "Health check..."
npm run dev -- --open

echo "Ambiente OK."
