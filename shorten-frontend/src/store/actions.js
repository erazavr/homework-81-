import axiosApi from "../axiosApi";

export const FETCH_SHORTEN_REQUEST = 'FETCH_SHORTEN_REQUEST';
export const FETCH_SHORTEN_SUCCESS = 'FETCH_SHORTEN_SUCCESS';
export const FETCH_SHORTEN_FAILURE = 'FETCH_SHORTEN_FAILURE';

export const fetchShortenRequest = () => ({type: FETCH_SHORTEN_REQUEST});
export const fetchShortenSuccess = link => ({type: FETCH_SHORTEN_SUCCESS, link});
export const fetchShortenFailure = error => ({type: FETCH_SHORTEN_FAILURE, error});


export const sendShortLink = link => {
    return async dispatch => {
        try {
            dispatch(fetchShortenRequest());
            const response = await axiosApi.post('/short', link);
            dispatch(fetchShortenSuccess(response.data))
        }catch (e) {
            dispatch(fetchShortenFailure(e))
        }
    }
};