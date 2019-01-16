export const config = {
    CLIENTID: 'YOUR-CLIENT-ID-APP-CODE',
    CLIENT_SECRET: 'YOUR-CLIENT-SECRET-APP-CODE',
    REDIRECT_URI: 'http://localhost:8080/dist/index.html', // Redirect URL for Spotify
    AUTHORIZE_ID: 'authorize', // Id del botón que hará el trigger de la autorización
    LOGOUT_REDIRECT: 'http://localhost:8080/index.html',
    LOGOUT_ID: 'logout',
    SCOPES: 'user-follow-read&user-read-email&user-read-private'
}