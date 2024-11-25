import axios from "axios";

const api = axios.create({
    baseURL:'https://jsonplaceholder.typicode.com',
});


export const fetchPost = async(pageNumber) =>{
    const res = await api.get(`/posts?_start=${pageNumber}&_limit=3`,)
    return res.data
}

export const IndividualPost = async(id) =>{
    const res = await api.get(`/posts/${id}`,)
    return res.data
}
export const DeletePost = async(id) =>{
    return await api.delete(`/posts/${id}`,)
     
}
export const UpdatePost = async(id) =>{
    return await api.patch(`/posts/${id}`,{title:'I am done tanstack query'})
     
}

export const infinityUser = async({pagePrams =1}) =>{
    try {
     const res =  await axios.get(`https://api.github.com/users?per_page=10&page=${pagePrams}`)
     return res.data

    } catch (error) {
        console.log(error);
        
    }
     
}