import React, { Component } from 'react'
import { Helmet } from 'react-helmet-async'

import RouterStatus from '../../components/RouterStatus'

class NotFoundView extends Component {
    render() {
        return (
            <RouterStatus code={404}>
                <Helmet>
                    <meta name="robots" content="noindex, nofollow" />
                </Helmet>
                page not found ...
            </RouterStatus>
        )
    }
}

export default NotFoundView
