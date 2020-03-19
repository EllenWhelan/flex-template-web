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


class FavoritesPage extends Component {
    componentDidMount() {
        const { getFavoriteMinders } = this.props
        getFavoriteMinders()
    }

    render() {
        const { favoriteMinders } = this.props
        return (
            <LayoutSingleColumn>
                <LayoutWrapperTopbar>
                <TopbarContainer />
                </LayoutWrapperTopbar>
    
                <LayoutWrapperMain>
                    <h1>Favorite Minders</h1>
                    { favoriteMinders.map(minder => {
                        return <UserCard user={minder} key={minder.id.uuid} />
                    }) }
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