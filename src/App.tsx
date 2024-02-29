import { Scopes } from "@spotify/web-api-ts-sdk";
import "./App.css";
import { useSpotify } from "./hooks/useSpotify";

function App() {
    const sdk = useSpotify(
        import.meta.env.VITE_SPOTIFY_CLIENT_ID,
        import.meta.env.VITE_REDIRECT_TARGET,
        Scopes.all
    );
    return sdk ? (
        <div>you are logged in</div>
    ) : (
        <>you should be redirected soon</>
    );
}

export default App;
