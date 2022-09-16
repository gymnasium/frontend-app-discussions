import React, { useState } from 'react';

import { useSelector } from 'react-redux';

import { injectIntl, intlShape } from '@edx/frontend-platform/i18n';
import { Hyperlink, PageBanner } from '@edx/paragon';

import { selectUserIsStaff, selectUserRoles } from '../data/selectors';
import messages from '../messages';

function InformationBanner({
  intl,
}) {
  const [showBanner, setShowBanner] = useState(true);
  const userRoles = useSelector(selectUserRoles);
  const isAdmin = useSelector(selectUserIsStaff);
  const learnMoreLink = 'https://openedx.atlassian.net/wiki/spaces/COMM/pages/3509551260/Overview+New+discussions+experience';
  const TAFeedbackLink = process.env.TA_FEEDBACK_FORM || 'https://test-ta-feedback';
  const staffFeedbackLink = process.env.STAFF_FEEDBACK_FORM || 'https://test-staff-feedback';
  const hideLearnMoreButton = ((userRoles.includes('Student') && userRoles.length === 1) || !userRoles.length) && !isAdmin;
  const showStaffLink = !hideLearnMoreButton && (userRoles.includes('Moderator') || userRoles.includes('Administrator'));

  return (
    <PageBanner
      variant="light"
      show={showBanner}
      dismissible
      onDismiss={() => setShowBanner(false)}
    >
      <div style={{ fontWeight: '500' }}>
        {intl.formatMessage(messages.bannerMessage)}
        {!hideLearnMoreButton
            && (
            <Hyperlink
              destination={learnMoreLink}
              target="_blank"
              showLaunchIcon={false}
              className="px-2.5"
              variant="muted"
              isInline
            >
              {intl.formatMessage(messages.learnMoreBannerLink)}
            </Hyperlink>
            )}
        <Hyperlink
          destination={showStaffLink ? staffFeedbackLink : TAFeedbackLink}
          target="_blank"
          showLaunchIcon={false}
          variant="muted"
          isInline
        >
          {intl.formatMessage(messages.shareFeedback)}
        </Hyperlink>
      </div>
    </PageBanner>
  );
}

InformationBanner.propTypes = {
  intl: intlShape.isRequired,
};

export default injectIntl(InformationBanner);