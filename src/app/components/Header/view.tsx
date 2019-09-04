import React from 'react'

import css from './style.module.css'
import { ReactComponent as ReactLogo } from './assets/react.svg'

const HeaderView: React.FC<any> = () => {
    return (
        <header className={css.header}>
            <h1>
                <ReactLogo className={css.headerLogo} /> React + Express – SSR Starter – TypeScript
                Edition
            </h1>
        </header>
    )
}

export default HeaderView
