import axios from "axios";

axios.defaults.headers.common["x-api-key"] = "live_GfcVl1b232pngh1MKADMgDtOZt4zyoazo7igFLGafkVEgXORtLYPxbnuoYzMK75j";
axios.defaults.baseURL = 'https://api.thecatapi.com/v1';

function fetchBreeds() {
    return axios.get('/breeds')
        .then(function (response) {
            return response.data;
        })
        .catch(function (error) {
            return error;
        });
}

function fetchCatByBreed(breedId) {
    return axios.get(`/images/search?breed_ids=${breedId}`)
        .then(function (response) {
            return response.data;
        })
        .catch(function (error) {
            return error;
        });
}

export { fetchBreeds, fetchCatByBreed };
    

