const Config = {
    baseURL : import.meta.env.MODE === "development" ? "http://127.0.0.1:5000/api" : "/api"
}

export default Config;