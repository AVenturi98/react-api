import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import axios from "axios"

export default function Dettails() {

    const [post, setPost] = useState(null)

    const { id } = useParams()

    useEffect(() => {
        axios.get(`http://localhost:3232/posts/${id}`)
            .then((res) => {
                setPost(res.data)
            })
            .catch(err => console.error(err))
    }, [id])

    return (
        <>
            <div>questo è il post con id: {id} </div>
            <div>{post.title}</div>
            <div>{post.content}</div>
        </>
    )
}