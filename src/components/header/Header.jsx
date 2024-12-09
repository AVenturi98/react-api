import { useState } from 'react'
import style from './Header.module.css'
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

function Header() {

    const [search, setSearch] = useState(false)

    const toggleArea = (event) => {
        event.preventDefault()
        setSearch(!search);
    }

    return (
        <>
            <header className={`${style.navbar}`}>
                <ul className={style.navIT}>
                    <li>
                        <img src="../../public/Logo.png" />
                    </li>
                    <li>
                        <h1 className={style.titleNav}>IlMioBlog</h1>
                    </li>
                    <li >
                        <a href="../../../index.html" className={`${style.navItem} ${style.activeSection}`}>Home</a>
                    </li>
                    <li className={style.navItem}>
                        <a href="#">Salato</a>
                    </li>
                    <li className={style.navItem}>
                        <a href="#">Dolce</a>
                    </li>
                </ul>
                <ul className={style.navIT}>
                    <li>
                        <form action="">
                            {search && (
                                <input type="text" placeholder='Cerca...' className={style.navSearchText} />)}
                            <button type="submit" onClick={toggleArea} className={style.iconFA}>{search ? 'Vai' : <FontAwesomeIcon icon={faMagnifyingGlass} />}</button>
                        </form>
                    </li>
                    <li>
                        <button type="button" className={style.loginBtn}>login</button>
                    </li>
                </ul>

            </header>

        </>
    )
}

export default Header