import axios from 'axios';

const Instance = axios.create(
    { 
        baseURL : 'https://reactplayground-ea323.firebaseio.com/',
    }
)

export default Instance;