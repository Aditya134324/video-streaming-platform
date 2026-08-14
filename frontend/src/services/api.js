const API_URL = "http://localhost:5000/api";
export const signup = async (data) => {
    const res = await fetch(`${API_URL}/auth/signup`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
    });
    return res.json();
};  

export const login = async (data) => {
    const res = await fetch(`${API_URL}/auth/login`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
    });
    return res.json();
};

export const addComment = async (videoId, data, token) => {
    const res = await fetch(`${API_URL}/comments/${videoId}`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(data)
    });
    return res.json();
};

export const getVideoComments = async (videoId) => {
    const res = await fetch(`${API_URL}/comments/${videoId}`, {
        method: "GET"
    });
    return res.json();
};

export const deleteComment = async (commentId, token) => {
    const res = await fetch(`${API_URL}/comments/${commentId}`, {
        method: "DELETE",
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
    return res.json();
};

export const getUserProfile = async (token) => {
    const res = await fetch(`${API_URL}/user/profile`, {
        method: "GET",
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
    return res.json();
};

export const updateUserProfile = async (data, token) => {
    const res = await fetch(`${API_URL}/user/profile`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(data)
    });
    return res.json();
};

export const updateAvatar = async (file, token) => {
    const formData = new FormData();
    formData.append("avatar", file);

    const res = await fetch(`${API_URL}/user/avatar`, {
        method: "PATCH",
        headers: {
            Authorization: `Bearer ${token}`
        },
        body: formData
    });
    return res.json();
};

export const updateCoverImage = async (file, token) => {
    const formData = new FormData();
    formData.append("coverImage", file);

    const res = await fetch(`${API_URL}/user/cover-image`, {
        method: "PATCH",
        headers: {
            Authorization: `Bearer ${token}`
        },
        body: formData
    });
    return res.json();
};


export const uploadVideo = async (data, token) => {
    const res = await fetch(`${API_URL}/videos/upload`, {
        method: "POST",
        headers: {
            Authorization: `Bearer ${token}`
        },
        body: data
    });
    return res.json();
};

export const getAllVideos = async () => {
    const res = await fetch(`${API_URL}/videos`, {
        method: "GET"
    });
    return res.json();
};

export const searchVideos = async (query) => {
    const res = await fetch(`${API_URL}/videos/search?query=${query}`, {
        method: 'GET'
    });

    return res.json();
};

export const getVideoById = async (videoId) => {
    const res = await fetch(`${API_URL}/videos/${videoId}`, {
        method: "GET"
    });
    return res.json();
};

export const updateVideo = async (videoId, data, token) => {
    const res = await fetch(`${API_URL}/videos/${videoId}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(data)
    });
    return res.json();
};

export const likeVideo = async (videoId, token) => {
    const res = await fetch(`${API_URL}/videos/${videoId}/like`, {
        method: "POST",
        headers: {
            Authorization: `Bearer ${token}`
        }
    });

    return res.json();
};

export const addToHistory = async(videoId,token)=>{
    const res=await fetch(`${API_URL}/history/${videoId}`,{
        method:"POST",
        headers:{
            Authorization:`Bearer ${token}`
        }
    });
    return res.json();
};

export const getHistory = async(token)=>{
    const res=await fetch(`${API_URL}/history`,{
        headers:{
            Authorization:`Bearer ${token}`
        }
    });
    return res.json();
};