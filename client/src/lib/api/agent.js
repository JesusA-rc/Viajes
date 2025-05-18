import axios  from "axios"

const agent = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
    withCredentials: true
});

const sleep = (delay) => {
    return new Promise(resolve =>{
        setTimeout(resolve, delay)
    });
}

agent.interceptors.response.use(async response => {
    try {
        await sleep(100);
        return response;
    } catch (error) {
        console.log(error);
        return Promise.reject(error);
    }
});

export default agent;