/* eslint-disable no-undef */
const BASE_URL = 'https://guest-booking-app-y4ac.onrender.com'
// const BASE_URL = 'http://localhost:3001'

const URL_Generator = (route) => BASE_URL + route;

export const assetsUrl = (fileName) => {
    return BASE_URL + '/assets/' + fileName
};

export default ({
    apiRegister: URL_Generator('/auth/signup'),
    apiLogin: URL_Generator('/auth/signin'),
    apiAllRooms: URL_Generator('/room/allrooms'),
    apiCreateRoom: URL_Generator('/room/create'),
    apiUpdateRoom: URL_Generator('/room/update'),
    apiDeleteRoom: URL_Generator('/room/delete'),
    apiCancelRoom: URL_Generator('/room/cancelroom'),
    apiBookRoom: URL_Generator('/room/bookroom'),
    apiWishList: URL_Generator('/room/wishlist'),
})


