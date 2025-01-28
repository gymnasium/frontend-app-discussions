import React from 'react';

import { Helmet } from 'react-helmet';

import { getConfig } from '@edx/frontend-platform';
import { injectIntl, intlShape } from '@edx/frontend-platform/i18n';

import messages from './messages';

const Head = ({ intl }) => (
  <Helmet>
    <title>
      {intl.formatMessage(messages['discussions.page.title'], { siteName: getConfig().SITE_NAME })}
    </title>
  </Helmet>
);

Head.propTypes = {
  intl: intlShape.isRequired,
};

export default injectIntl(Head);
