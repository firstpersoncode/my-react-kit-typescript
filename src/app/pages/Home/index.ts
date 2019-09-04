import { connect } from 'react-redux'
import { compose } from 'recompose'
import { withRouter } from 'react-router-dom'
import { withTranslation } from 'react-i18next'

import { setLocale } from '../../store/reducers/app/actions'
import { Locale } from '../../store/reducers/app/types'
import { HOME_PATH } from '../../utils/constants'

import HomeView from './view'

interface MapDispatchToProps {
    setLocale: Locale
}

const mapStateToProps = (state) => ({
    // ua: state.userAgent,
    // user: state.user,
})

const mapDispatchToProps: MapDispatchToProps = {
    setLocale,
}

const enhance = compose(
    withRouter,
    connect(
        mapStateToProps,
        mapDispatchToProps
    )
)

export default {
    path: HOME_PATH,
    component: enhance(withTranslation()(HomeView)),
    exact: true,
    auth: true,
}
