#!/bin/bash

echo "🚀 Blogger V2.0.0 Installer"

echo "📦 Installing Node dependencies..."
npm install --force

echo "🔧 Setting up environment variables..."
cp .env.example .env.local

echo "🔗 Creating post directories..."
mkdir posts
mkdir public
mkdir public/blogassets

echo "🎉 Blogger Installation Completed Successfully!"
echo "📖 To continue, edit the environment variables to your values."
echo "📝 Run 'npm run dev' to start the development server."