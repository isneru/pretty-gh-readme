# Make your Github Profile Readme Pretty

## Requirements to display "Now Playing" on your Github Profile

- Supabase (for storing Spotify refresh token)
- Spotify Developer Account (for creating an app to get client ID and secret)

## Setting up Supabase

1. Create a Supabase account and set up a new project.

2. Create a table named `spotify_tokens` with the following command:

   ```sql
    create table spotify_tokens (
      id text primary key,
      refresh_token text not null,
      created_at timestamp default now()
    );
   ```

3. Go to the "Project Settings" > "Data API" section of your Supabase project and note down the `URL`.

4. Go to "Project Settings" > "API Keys" section of your Supabase project and note down the `service_role key`.

5. Type the credentials in the `.env` file as `SUPABASE_URL` and `SUPABASE_KEY`.

## Setting up Spotify Developer Account

1. Go to the [Spotify Developer Dashboard](https://developer.spotify.com/dashboard/).

2. Log in with your Spotify account or create a new one.

3. Click on "Create an App" and fill in the required details.

4. Once the app is created, note down the `Client ID` and `Client Secret`.

5. Set the Redirect URI to `http://localhost:3000/callback` (or your preferred URI).

6. Save the changes.

## Setting up the Project

1. Clone this repository to your local machine.
   ```bash
   git clone https://github.com/isneru/pretty-gh-readme.git
   cd pretty-gh-readme
   ```
2. Install the required dependencies.
   ```bash
   npm install
   ```
3. Create a `.env` file (if you haven't already) in the root directory and fill in the following environment variables with the values you obtained previously:
   ```env
   SPOTIFY_CLIENT_ID=""
   SPOTIFY_CLIENT_SECRET=""
   SPOTIFY_REDIRECT_URI=""
   SUPABASE_URL=""
   SUPABASE_KEY=""
   SETUP_SECRET=""
   ```

> [!NOTE]  
> You can generate a random string for `SETUP_SECRET` to secure the setup process with `openssl rand -base64 32`
> Setup secret ensures that only you can access the setup route to store the refresh token.

4. Start the development server.

   ```bash
   npm run dev
   ```

5. Open your browser and navigate to `http://localhost:3000/api/spotify-auth?secret=<YOUR_SETUP_SECRET>` to initiate the Spotify authentication process.

6. After successful authentication, the refresh token will be stored in your Supabase database.

7. You now have spotify data coming through the API endpoint and you can start customizing your Github Profile Readme on `http://localhost:3000/api/readme`.

## Issues you may encounter

- **Custom fonts**: if you are using custom fonts in your readme, make sure you convert the font to base64 and use it in the CSS with the `@font-face` rule.
- **CSS styling**: in a world full of tailwind, shadcn-ui and other css frameworks, writing plain css can be a pain. I'm sorry for the hassle, but this is the only way to ensure compatibility with Github's markdown rendering that I know of. Feel free to open a PR if you have a better solution.
- **Responsiveness**: %$&/%/&%#$&%&)@#&%$#&
