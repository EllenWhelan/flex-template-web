import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { getFavoriteListings } from './FavoritesPage.duck';
import { getListingsById } from '../../ducks/marketplaceData.duck';
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
    const { favoriteListingIds } = state.FavoritesPage
    const listings = getListingsById(state, favoriteListingIds)
    return {
        listings
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