import { useState, useEffect } from 'react'
import Card from '../card/Card'
import Form from '../form/Form'
import axios from 'axios'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus } from '@fortawesome/free-solid-svg-icons'
import { faMinus } from '@fortawesome/free-solid-svg-icons'

// const initialFormData = {
//     title: '',
//     image: '',
//     content: '',
//     tags: [],
//     category: '',
//     published: true
// }

export default function mainSection() {

    const [posts, setPosts] = useState([])
    // const [formData, setFormData] = useState(initialFormData)
    const [isOpen, setIsOpen] = useState(true)

    function fetchPosts() {
        axios.get('http://localhost:3232/posts/')
            .then((res) => {
                console.log('posts', res)
                setPosts(res.data)
            })
            .catch(err => console.log(err))
    }

    useEffect(() => {
        fetchPosts()
    }, [])

    // function handleFormData(e) {
    //     const key = e.target.name
    //     const value = e.target.type === "checkbox" ? e.target.checked : e.target.value

    //     const newFormData = {
    //         ...formData,
    //         [key]: value
    //     }
    //     setFormData(newFormData)
    // }

    // useEffect(() => {
    //     if (!formData.published) {
    //         alert(`Hai reso il tuo post PRIVATO`)
    //     }
    // }, [formData.published])



    // function addPost(event) {
    //     event.preventDefault()
    //     if (posts.published === false) return setPosts(posts.filter(el => el !== posts === false))

    //     const newPost = {
    //         ...formData,
    //     }

    //     axios.post('http://localhost:3232/posts/', newPost)
    //         .then(res => {
    //             console.log('nuovo post', res)
    //             setPosts([...posts, res.data])
    //             setFormData(initialFormData)
    //         })
    //         .catch(err => console.log(err))
    // }

    function deletePost(post) {
        axios.delete(`http://localhost:3232/posts/${post.id}`)
            .then(() => {
                setPosts(posts.filter(el => el !== post))
            })
            .catch((err) => console.log(err))
    }

    function openMenu() {
        setIsOpen(!isOpen)
    }

    return (
        <>
            <div className="container">
                <div className='flexItem'>
                    <h1>Ricette versatili -</h1>
                    <button type='button' onClick={openMenu} className={isOpen ? `iconFA` : `iconMin`}> {isOpen ? <FontAwesomeIcon icon={faPlus} /> : <FontAwesomeIcon icon={faMinus} />}</button>
                </div>
                <div className="row">
                    <div className={isOpen ? 'd-none' : 'col-100'}>
                        <h2>Inserisci una nuova ricetta</h2>
                        <Form />
                    </div>
                    {posts.map((post) =>
                        <div key={post.id} className="col-6">
                            <Card callBack={() => deletePost(post)} title={post.title} content={post.content} tags={post.tags} published={post.published} image={post.image} />
                        </div>
                    )}
                </div >
            </div >
        </>

    )
}