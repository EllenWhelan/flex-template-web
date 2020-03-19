import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { getFavoriteMinders } from './FavoritesPage.duck';
import { TopbarContainer } from '../../containers';
import {
  LayoutSingleColumn,
  LayoutWrapperTopbar,
  LayoutWrapperMain,
  LayoutWrapperFooter,
  Footer,
  UserCard
} from '../../components';

import css from './FavoritesPage.css'


class FavoritesPage extends Component {
    componentDidMount() {
        const { getFavoriteMinders } = this.props
        getFavoriteMinders()
    }

    render() {
        const { favoriteMinders } = this.props
        const onContactUser = () => {
            return
        }
        return (
            <LayoutSingleColumn>
                <LayoutWrapperTopbar>
                <TopbarContainer />
                </LayoutWrapperTopbar>
                <LayoutWrapperMain>
                    <div className={css.favoriteMinderList}>
                        <h1>Favorite Minders</h1>
                        { favoriteMinders.map(minder => {
                            return <UserCard className={css.userCard} 
                                            user={minder}
                                            onContactUser={onContactUser}
                                            key={minder.id.uuid} />
                        }) }
                    </div>
                </LayoutWrapperMain>
    
                <LayoutWrapperFooter>
                <Footer />
                </LayoutWrapperFooter>
            </LayoutSingleColumn>
        )
    }
}

const mapStateToProps = state => {
    const { favoriteMinders } = state.FavoritesPage
    return {
        favoriteMinders
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        getFavoriteMinders: () => dispatch(getFavoriteMinders())
    }
}
  
export default compose(
    withRouter,
    connect(mapStateToProps, mapDispatchToProps)
)(FavoritesPage);