import React, { Fragment } from 'react';
import { connect } from 'react-redux';

import { slugify } from 'utils';
import { Section } from 'components/BulmaHelpers';
import BrowseSection from './BrowseSection';
import SubCategoryItem from './SubCategoryItem';


const Root = ({ category, currentCategory }) => {
  if (!category.isReady) {
    return (
      <Section>Loading categories...</Section>
    );
  }

  // We are in the root, so top categories go on left side.
  // Child categories go on the right side.
  const rootCategory = {};
  for (const data of category.rows) {
    // Check if we are browsing null category or a root level category
    if (currentCategory !== undefined && data.id !== currentCategory.id && data.parent_fk !== currentCategory.id) {
      // If we are in a root level category, then we do not allow categories that are not children or this root
      continue;
    }

    if (data.parent_fk === null) {
      // This is a root category
      rootCategory[data.id] = {
        category: data,
        children: [],
        headingURL: `/category/${data.id}/${slugify(data.label)}/`,
      };
    } else {
      rootCategory[data.parent_fk].children.push(data);
    }
  }

  return (
    <Fragment>
      { Object.values(rootCategory).filter(root => root.children.length !== 0).map((item, i) => (
        <BrowseSection key={`sec-${i}`} {...item.category} headingURL={item.headingURL}>
          <Fragment>
            { item.children.map(data => (
              <SubCategoryItem {...data} key={`sc-${data.id}`} />
            )) }
          </Fragment>
        </BrowseSection>
      )) }
    </Fragment>
  );
}


const mapStateToProps = state => ({
  category: state.category,
});


export default connect(
  mapStateToProps,
  { }
)(Root);