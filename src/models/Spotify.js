import { AuthModule } from "@root/auth/auth";

export const BASE_URL = 'https://api.spotify.com/v1/'
const COUNTRY = 'ES'

export const QUERY_TYPES = {
    artist: 'artist',
    artists: 'artists'
}

export default class Spotify {
    constructor() {
        this.currentType = QUERY_TYPES.artists;
        //this.access_token = token
    }

    getTypes() {
        return {
            artists: 'artists',
            albums: 'albums',
            tracks: 'tracks',
            playlist: 'playlists',
            search: {
                artist: 'artist',
                album: 'album',
                track: 'track',
                playlist: 'playlist'
            }
        }
    }

    getAlbumTracks(albumId) {
        return AuthModule.getToken()
            .then(ACCESS_TOKEN => {
                return new Promise((resolve, reject) => {
                    fetch(`${BASE_URL}albums/${albumId}/tracks`, {
                            headers: new Headers({
                                Accept: "application/json",
                                Authorization: `Bearer ${ACCESS_TOKEN}`
                            })
                        })
                        .then(resp => resp.json())
                        .then(data => resolve(data))
                        .catch(err => err);
                })
            })
    }

    getArtists() {
        return AuthModule.getToken()
            .then(ACCESS_TOKEN => {
                return new Promise((resolve, reject) => {
                    fetch(`${BASE_URL}artists?ids=0oSGxfWSnnOXhD2fKuz2Gy`, {
                            headers: new Headers({
                                Accept: "application/json",
                                Authorization: `Bearer ${ACCESS_TOKEN}`
                            })
                        })
                        .then(resp => resp.json())
                        .then(data => resolve(data))
                        .catch(err => err);
                })
            })
    }

    getArtistTopTracks(artist) {
        return new Promise((resolve, reject) => {
            fetch(`${BASE_URL}artists/${artist}/top-tracks?country=${COUNTRY}`, {
                    headers: new Headers({
                        Accept: "application/json",
                        Authorization: `Bearer ${ACCESS_TOKEN}`
                    })
                })
                .then(resp => resp.json())
                .then(data => resolve(data.tracks))
                .catch(err => reject(err));
        })
    }

    getArtistAlbums(artist) {
        return AuthModule.getToken()
            .then(ACCESS_TOKEN => {
                return new Promise((resolve, reject) => {
                    fetch(`${BASE_URL}artists/${artist}/albums`, {
                            headers: new Headers({
                                Accept: "application/json",
                                Authorization: `Bearer ${ACCESS_TOKEN}`
                            })
                        })
                        .then(resp => resp.json())
                        .then(data => resolve(data.items))
                        .catch(err => err);
                })
            })
    }

    search(query,
        type = '',
        artist = '',
        album = '',
        song = '') {
        return AuthModule.getToken()
            .then(ACCESS_TOKEN => {
                return new Promise((resolve, reject) => {
                    const qString = this.buildString(query, type, artist, album, song);
                    fetch(qString, {
                            headers: new Headers({
                                Accept: "application/json",
                                Authorization: `Bearer ${ACCESS_TOKEN}`
                            })
                        })
                        .then(resp => resp.json())
                        .then(data => resolve(data.artists))
                        .catch(err => reject(err));
                })
            })
    }

    buildString(query, type, artist, album, song) {
        //TODO: FALTA COMPLETAR FUNCION DE ARMADO DE QUERY
        return `${BASE_URL}search?q=${query}&type=${type}`;
    }
}