import React, { Component } from 'react'

import Features from '../../components/Features'

import css from './style.module.css'

class HomeView extends Component {
    handleLocaleChange = (e: React.FormEvent<HTMLButtonElement>) => {
        const { setLocale } = this.props
        setLocale(e.currentTarget.value)
    }

    render() {
        const { t, location } = this.props
        return (
            <div className={css.wrapper}>
                Welcome Home.. : {location.pathname}
                <hr />
                <Features t={t} />
                <h2>{t('i18n-example')}</h2>
                <p>
                    <button value="de_DE" onClick={this.handleLocaleChange}>
                        Deutsch
                    </button>
                    <button value="en_US" onClick={this.handleLocaleChange}>
                        English
                    </button>
                </p>
            </div>
        )
    }
}

export default HomeView
