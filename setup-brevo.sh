#!/bin/bash

echo "🚀 Setting up Brevo Integration for Bayyinah Project"
echo "=================================================="

# Check if .env.local already exists
if [ -f ".env.local" ]; then
    echo "⚠️  .env.local already exists. Backing up to .env.local.backup"
    cp .env.local .env.local.backup
fi

# Copy the template to .env.local
if [ -f "env.local.template" ]; then
    cp env.local.template .env.local
    echo "✅ Created .env.local from template"
else
    echo "❌ env.local.template not found"
    exit 1
fi

echo ""
echo "📝 Environment Configuration:"
echo "   - BREVO_API_KEY: ✅ Set"
echo "   - FROM_EMAIL: noreply@bayyinah.com"
echo "   - FROM_NAME: Bayyinah Islamic Studies"
echo ""
echo "⚠️  IMPORTANT: Update the email addresses in .env.local to match your actual domains!"
echo ""

# Check if pnpm is available
if command -v pnpm &> /dev/null; then
    echo "📦 Installing dependencies..."
    pnpm install
    echo "✅ Dependencies installed"
else
    echo "❌ pnpm not found. Please install pnpm first:"
    echo "   npm install -g pnpm"
    exit 1
fi

echo ""
echo "🎯 Next Steps:"
echo "1. Update email addresses in .env.local to match your domains"
echo "2. Start your development server: pnpm dev"
echo "3. Test the integration: node scripts/test-brevo.js"
echo ""
echo "📚 For detailed setup instructions, see BREVO_INTEGRATION.md"
echo ""
echo "✨ Brevo integration setup complete!"
