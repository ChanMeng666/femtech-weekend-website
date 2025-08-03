#!/bin/bash

# Color codes for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

echo -e "${BLUE}========================================${NC}"
echo -e "${BLUE}Starting FemTech Weekend with AI Chatbot${NC}"
echo -e "${BLUE}========================================${NC}"

# Check if .env.local exists
if [ ! -f .env.local ]; then
    echo -e "${RED}ERROR: .env.local file not found!${NC}"
    echo -e "${YELLOW}Creating .env.local with placeholder values...${NC}"
    cat > .env.local << EOL
# Notion Configuration
NOTION_TOKEN="your_notion_integration_token"
NOTION_DATABASE_ID="your_main_database_id"
PDF_FORM_DATABASE_ID="your_pdf_form_database_id"

# Cloudinary Configuration (Optional)
CLOUDINARY_CLOUD_NAME="your_cloud_name"
CLOUDINARY_API_KEY="your_api_key"
CLOUDINARY_API_SECRET="your_api_secret"

# Google Gemini AI Configuration
GOOGLE_GENERATIVE_AI_API_KEY="your_gemini_api_key_here"

# Environment
NODE_ENV="development"
EOL
    echo -e "${GREEN}Created .env.local file${NC}"
fi

# Check if API key is set
source .env.local
if [ -z "$GOOGLE_GENERATIVE_AI_API_KEY" ] || [ "$GOOGLE_GENERATIVE_AI_API_KEY" = "your_api_key_here" ]; then
    echo -e "${RED}WARNING: GOOGLE_GENERATIVE_AI_API_KEY is not set properly in .env.local${NC}"
    echo -e "${YELLOW}The chatbot will not work without a valid API key${NC}"
fi

# Check if node_modules exists
if [ ! -d "node_modules" ]; then
    echo -e "${YELLOW}Installing dependencies...${NC}"
    npm install
fi

# Start the development environment
echo -e "${GREEN}Starting development servers...${NC}"
echo -e "${BLUE}----------------------------------------${NC}"
echo -e "${BLUE}Docusaurus will run on: http://localhost:3000${NC}"
echo -e "${BLUE}API Server will run on: http://localhost:3001${NC}"
echo -e "${BLUE}----------------------------------------${NC}"
echo -e "${YELLOW}Press Ctrl+C to stop all servers${NC}"
echo ""

# Run both servers concurrently
npm run dev