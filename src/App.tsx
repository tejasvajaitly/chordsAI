import {
    Scopes,
    SimplifiedPlaylist,
    SpotifyApi,
} from "@spotify/web-api-ts-sdk";
import { useSpotify } from "./hooks/useSpotify";
import { useEffect, useState } from "react";

function App() {
    const sdk = useSpotify(
        import.meta.env.VITE_SPOTIFY_CLIENT_ID,
        import.meta.env.VITE_REDIRECT_TARGET,
        Scopes.all
    );
    return sdk ? (
        <UserPlaylists sdk={sdk} />
    ) : (
        <>you should be redirected soon</>
    );
}

export default App;

type UserPlaylistsProps = {
    sdk: SpotifyApi;
};

function UserPlaylists(props: UserPlaylistsProps) {
    const { sdk } = props;
    const [userPlaylists, setUserPlaylists] = useState<
        SimplifiedPlaylist[] | null
    >(null);

    useEffect(() => {
        const getUP = async () => {
            try {
                const results = await sdk.currentUser.playlists.playlists(50);
                if (results.items) setUserPlaylists(results.items);
            } catch (e: Error | unknown) {
                console.log(e);
            }
        };

        getUP();
    }, []);

    return userPlaylists ? (
        <ul>
            {userPlaylists.map((userPlaylist) => (
                <li className="bg-gray-800 m-4 table p-3 rounded text-gray-50">
                    {userPlaylist.name}
                </li>
            ))}
        </ul>
    ) : (
        <p>either loading or error getting data</p>
    );
}
