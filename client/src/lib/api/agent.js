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
    await sleep(100);
    return response;
}, (error) => {
    const { data, status, config } = error.response;
    switch (status) 
    {
        case 400:
            if (data.errors) 
            {
                const modalStateErrors = [];
                for (const key in data.errors) 
                {
                    if (data.errors[key]) 
                    {
                        modalStateErrors.push(data.errors[key]);
                    }
                }
                throw modalStateErrors.flat();
            } else {
                throw new Error(data.message || 'Bad Request');
            }
        case 401:
            throw new Error(data.message || 'Unauthorized');
        case 404:
            throw new Error(data.message || 'Not Found');
        case 500:
            throw new Error(data.message || 'Internal Server Error');
        default:
            throw new Error(error.message);
    }
});

export default agent;