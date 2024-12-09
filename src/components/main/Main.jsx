import { useState, useEffect } from 'react'
// import initPosts from '../../posts'
import Card from '../card/Card'
import Tags from '../tags/Tags'
import axios from 'axios'

const initialFormData = {
    title: '',
    image: undefined,
    content: '',
    tags: [],
    category: '',
    published: true
}

export default function mainSection() {

    const [posts, setPosts] = useState([])
    const [formData, setFormData] = useState(initialFormData)

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

    function handleFormData(e) {
        const key = e.target.name
        const value = e.target.type === "checkbox" ? e.target.checked : e.target.value

        const newFormData = {
            ...formData,
            [key]: value
        }
        setFormData(newFormData)
    }

    useEffect(() => {
        if (!formData.published) {
            alert(`Hai reso il tuo post PRIVATO`)
        }
    }, [formData.published])

    function addPost(event) {
        event.preventDefault()
        if (posts.published === false) return setPosts(posts.filter(el => el !== posts === false))

        const newPost = {
            // id: Date.now(),
            ...formData,
        }

        axios.post('http://localhost:3232/posts/', newPost)
            .then(res => {
                console.log('nuovo post', res)
                setPosts([...posts, res.data])
                setFormData(initialFormData)
            })
            .catch(err => console.log(err))
    }

    function deletePost(post) {
        axios.delete(`http://localhost:3232/posts/${post.id}`)
            .then(res => {
                setPosts(posts.filter(el => el !== post))
            })
    }

    return (
        <>
            <div className="container">
                <div className="row">
                    <div className='col-100'>
                        <h3>Inserisci una nuova ricetta</h3>
                        <form onSubmit={addPost} className='formData' action="">
                            <div className='formData'>
                                <label htmlFor="title" className='formIT' >Titolo</label>
                                <input id='title' name='title' onChange={handleFormData} value={formData.title} type="text" placeholder='Inserisci il titolo' className='formControll' />
                            </div>
                            <div className='formData'>
                                <label htmlFor="content" className='formIT'>Contenuto</label>
                                <textarea id='content' name='content' onChange={handleFormData} value={formData.content} type="text" placeholder='Inserisci un contenuto..' className='formControll text_area' />
                            </div>
                            <div className='formData'>
                                <label htmlFor="img"><strong>Inserisci un immagine</strong></label>
                                <input type="img" id='img' placeholder='http://' className='formControll' />
                            </div>
                            <div className='formData'>
                                <label htmlFor="category" className='formIT'>Categoria</label>
                                <select name="category" id="category" className='formControll selction' onChange={handleFormData}>
                                    <option value="">Scegli la categoria</option>
                                    <option value="html">html</option>
                                    <option value="js">js</option>
                                    <option value="css">css</option>
                                </select>
                            </div>
                            <div className='formData'>
                                <label htmlFor="tags" className='formIT'>Tags</label>
                                <input type="text" id='tags' onChange={handleFormData} placeholder='Digita i tags..' className='formControll' />
                            </div>
                            <div>
                                <p><strong>{formData.published && 'Deseleziona per rendere privato' || 'Seleziona per rendere pubblico'} il nuovo post</strong></p><br />
                                <input type="checkbox" id='avaible' name='published' onChange={handleFormData} checked={formData.published} />
                                <label htmlFor="avaible" className='formIT formDataCheck' >{formData.published && 'Pubblico' || 'Privato'}</label>
                            </div>
                            <br />
                            <input type="submit" value="Aggiungi" id='button_form' />
                        </form>
                    </div>
                    {posts.map((post) =>
                        <div key={post.id} className="col-6">
                            <Card callBack={() => deletePost(post)} title={post.title} content={post.content} tags={post.tags} published={post.published !== false} image={post.image} />
                        </div>)}
                </div >
                {/* <div className="container">
                    <ul className="row">
                        <Tags />
                    </ul>
                </div> */}
            </div >
        </>

    )
}