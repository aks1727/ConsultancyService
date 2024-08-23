const conf = {
    backendUser : String(import.meta.env.VITE_BACKEND_USER),
    backendAdmin: String(import.meta.env.VITE_BACKEND_ADMIN),
    backendSearch: String(import.meta.env.VITE_BACKEND_SEARCH),
    backendChat: String(import.meta.env.VITE_BACKEND_CHATS),
    backendMessage:String(import.meta.env.VITE_BACKEND_MESSAGES),
    backendEndpoint: String(import.meta.env.VITE_BACKEND_ENDPOINT)
}

export default conf;