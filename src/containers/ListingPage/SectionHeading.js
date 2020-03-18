import React from 'react';
import { FormattedMessage } from '../../util/reactIntl';
import { withRouter } from 'react-router-dom';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { InlineTextButton } from '../../components';
import { LINE_ITEM_NIGHT, LINE_ITEM_DAY } from '../../util/types';
import config from '../../config';

import { PrimaryButton } from '../../components';
import { addToFavorite } from './ListingPage.duck';
import css from './ListingPage.css';

const SectionHeading = props => {
  const {
    priceTitle,
    formattedPrice,
    richTitle,
    category,
    hostLink,
    showContactUser,
    onContactUser,
    addToFavorite,
    minderId
  } = props;

  const unitType = config.bookingUnitType;
  const isNightly = unitType === LINE_ITEM_NIGHT && props.listingCategory !== 'babysitter';
  const isDaily = unitType === LINE_ITEM_DAY;

  const unitTranslationKey = isNightly
    ? 'ListingPage.perNight'
    : isDaily
    ? 'ListingPage.perDay'
    : 'ListingPage.perUnit';

  const handleFavoriteClick = () => {
    addToFavorite(minderId)
  }

  return (
    <div className={css.sectionHeading}>
      <div className={css.desktopPriceContainer}>
        <div className={css.desktopPriceValue} title={priceTitle}>
          {formattedPrice}
        </div>
        <div className={css.desktopPerUnit}>
          <FormattedMessage id={unitTranslationKey} />
        </div>
      </div>
      <div className={css.heading}>
        <h1 className={css.title}>{richTitle}</h1>
        <div>
          <PrimaryButton onClick={handleFavoriteClick}>
            <h3>Favorite</h3>
          </PrimaryButton>
        </div>
        <div className={css.author}>
          {category}
          <FormattedMessage id="ListingPage.hostedBy" values={{ name: hostLink }} />
          {showContactUser ? (
            <span className={css.contactWrapper}>
              <span className={css.separator}>•</span>
              <InlineTextButton rootClassName={css.contactLink} onClick={onContactUser}>
                <FormattedMessage id="ListingPage.contactUser" />
              </InlineTextButton>
            </span>
          ) : null}
        </div>
      </div>
    </div>
  );
};

const mapDispatchToProps = (dispatch) => {
  return{
    addToFavorite: (minderListingId) => dispatch(addToFavorite(minderListingId))
  }
}

export default compose(
  withRouter,
  connect(null, mapDispatchToProps)
)(SectionHeading);
