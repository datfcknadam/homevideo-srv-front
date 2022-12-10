import axios from 'axios';
const { protocol, hostname } = window.location;
const base = `${protocol}//${hostname}`;
const instance = axios.create({
    baseURL: `${base}/api/v1/`,
    headers: {"Access-Control-Allow-Origin": "*"},
});

export const pathToImage = `${base}`;
export const pathToVideo = `${base}`;

export default instance;