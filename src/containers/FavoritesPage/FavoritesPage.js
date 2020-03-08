import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { getFavoriteListings } from './FavoritesPage.duck';
import { TopbarContainer } from '../../containers';
import {
  LayoutSingleColumn,
  LayoutWrapperTopbar,
  LayoutWrapperMain,
  LayoutWrapperFooter,
  Footer,
  SearchResultsPanel
} from '../../components';


class FavoritesPage extends Component {
    componentDidMount() {
        const { getFavoriteListings } = this.props
        getFavoriteListings()
    }

    render() {
        const { listings } = this.props
        // console.log(listings)
        return (
            <LayoutSingleColumn>
                <LayoutWrapperTopbar>
                <TopbarContainer />
                </LayoutWrapperTopbar>
    
                <LayoutWrapperMain>
                    <h1>Favorite Minders</h1>
                    <SearchResultsPanel
                        listings={listings}
                    />
                </LayoutWrapperMain>
    
                <LayoutWrapperFooter>
                <Footer />
                </LayoutWrapperFooter>
            </LayoutSingleColumn>
        )
    }
}

const mapStateToProps = state => {
    const { favoriteListings } = state.FavoritesPage
    return {
        listings: favoriteListings
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        getFavoriteListings: () => dispatch(getFavoriteListings())
    }
}
  
export default compose(
    withRouter,
    connect(mapStateToProps, mapDispatchToProps)
)(FavoritesPage);