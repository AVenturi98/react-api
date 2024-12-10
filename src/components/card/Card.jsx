import { useState } from 'react'
import style from './Card.module.css'
import imageDefault from '../../assets/caffe.jpg'

function Card({ title = '', content = '', tags = [], published, image, callBack = () => { } }) {

    const [expandedText, setExpandedText] = useState(false)

    const readAbout = (text) => {
        const words = text.split(" ")
        return words.slice(0, 20).join(" ") + (words.length > 20 ? "..." : "")
    }

    function handleToggleText() {
        setExpandedText(!expandedText)
    }



    const elementTags = tags.map(tag => tag)

    return (
        <>
            {published !== false ?
                <main className="container">
                    <div className={style.card}>
                        <div className={style.cardImg}>
                            <img className={style.image} src={image ? 'http://localhost:3232/imgs/posts/' + image : imageDefault} />
                        </div>
                        <div className={style.cardBody}>
                            <div className={style.titleCard}>{title}</div>
                            <div className={style.tagsCard}>{elementTags.join(' - ')}</div>
                            <div className={style.descriptionCard}>
                                {expandedText ? content : readAbout(content)}
                            </div>
                        </div>
                        <div className={`${style.btnFlex} container`}>
                            <button className={style.btn} onClick={handleToggleText}>{!expandedText ? 'Leggi di più' : 'Leggi meno'} </button>
                            <button onClick={callBack} className={style.btnDelete}>DELETE</button>
                        </div>
                    </div >
                </main > :
                ''
            }
        </>
    )
}



export default Card
