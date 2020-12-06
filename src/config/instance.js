import axios from 'axios';

const Instance = axios.create(
    { 
        baseURL : 'http://localhost/react_play/Api/',
    }
)

export default Instance;