# Website

This website is built using [Docusaurus](https://docusaurus.io/), a modern static website generator.

### Installation

```
$ yarn
```

Or with npm:

```
$ npm install
```

### Local Development

```
$ yarn start
```

Or with npm:

```
$ npm run start
```

This command starts a local development server and opens up a browser window. Most changes are reflected live without having to restart the server.

### API Server for Form Submissions

This website includes form submission functionality on the `/ecosystem/join` page that saves data to Notion and uploads images to Cloudinary. To enable this functionality, you need to:

1. Set up your environment variables in `.env.local`:
```
# Notion API credentials
NOTION_TOKEN=your_notion_token_here
NOTION_DATABASE_ID=your_notion_database_id_here

# Cloudinary configuration
CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret
```

2. Run both the Docusaurus server and API server:

```
# Run the API server (in one terminal)
$ npm run api

# Run the Docusaurus server (in another terminal)
$ npm run start
```

Or run both simultaneously:

```
$ npm run dev
```

### Notion Database Setup

For the `/ecosystem/join` form to work properly, you need to set up a Notion database with the following properties:

- `Name` (title)
- `Email` (email)
- `Company Name` (rich text)
- `Company Website` (url)
- `Company LinkedIn` (url)
- `Company Instagram` (url)
- `Founder Name` (rich text)
- `Founder LinkedIn` (url)
- `Business Description` (rich text)
- `Business Stage` (select)
- `Categories` (multi-select)
- `Additional Info` (rich text)
- `Logo` (files & media)

### Build

```
$ yarn build
```

Or with npm:

```
$ npm run build
```

This command generates static content into the `build` directory and can be served using any static contents hosting service.

### Deployment

Using SSH:

```
$ USE_SSH=true yarn deploy
```

Not using SSH:

```
$ GIT_USER=<Your GitHub username> yarn deploy
```

If you are using GitHub pages for hosting, this command is a convenient way to build the website and push to the `gh-pages` branch.

When deploying to production, make sure to set up the necessary environment variables for Notion and Cloudinary in your hosting platform.


