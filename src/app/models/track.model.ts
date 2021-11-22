import { Album } from "./album.model";
import { Artist } from "./artist.model";

export interface Track{
    id: string,
    name: string,
    popularity: number,
    preview_url: number | null,
    album: Album,
    artists: Artist[],
}