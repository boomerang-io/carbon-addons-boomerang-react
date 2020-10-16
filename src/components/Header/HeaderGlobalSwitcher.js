import PropTypes from 'prop-types';
import React from 'react';
import { Activity32, Calendar32, Document32, Rocket32, Settings32 } from '@carbon/icons-react';
import { settings } from 'carbon-components';

const { prefix } = settings;

const HeaderGlobalSwitcher = () => {
  // const { links } = props;

  return (
    <div className={`${prefix}--bmrg-header-global`}>
      <ul className={`${prefix}--bmrg-header-global__collection`}>
        {/* links.map(image => (
          <li className={`${prefix}--bmrg-header-global__collection--item`}>
            <a href={image.link}>
              <img
                src={image.src}
                className={`${prefix}--bmrg-header-global__icon`}
                alt="Global Icon"
              />
            </a>
            <text className={`${prefix}-cloud-header-global__text`}>{image.name}</text>
          </li>
        )) */}
        <li className={`${prefix}--bmrg-header-global__collection--item`}>
          <a href="https://launch.boomerangplatform.net/admin/">
            <Settings32
              alt="Admin Icon"
              fill="white"
              className={`${prefix}--bmrg-header-global__icon`}
            />
          </a>
          <div className={`${prefix}-cloud-header-global__text`}>Admin</div>
        </li>
        <li className={`${prefix}--bmrg-header-global__collection--item`}>
          <a href="https://launch.boomerangplatform.net/admin/">
            <Document32
              className={`${prefix}--bmrg-header-global__icon`}
              alt="Docs Icon"
              fill="white"
            />
          </a>
          <div className={`${prefix}-cloud-header-global__text`}>Docs</div>
        </li>
        <li className={`${prefix}--bmrg-header-global__collection--item`}>
          <a href="https://launch.boomerangplatform.net/docs/">
            <Activity32
              className={`${prefix}--bmrg-header-global__icon`}
              alt="Status Icon"
              fill="white"
            />
          </a>
          <div className={`${prefix}-cloud-header-global__text`}>Status</div>
        </li>
        <li className={`${prefix}--bmrg-header-global__collection--item`}>
          <a href="https://launch.boomerangplatform.net/next/">
            <Calendar32
              className={`${prefix}--bmrg-header-global__icon`}
              alt="Next Icon"
              fill="white"
            />
          </a>
          <div className={`${prefix}-cloud-header-global__text`}>Next</div>
        </li>
        <li className={`${prefix}--bmrg-header-global__collection--item`}>
          <a href="https://launch.boomerangplatform.net/launchpad/">
            <Rocket32
              className={`${prefix}--bmrg-header-global__icon`}
              alt="Launchpad Icon"
              fill="white"
            />
          </a>
          <div className={`${prefix}-cloud-header-global__text`}>Launchpad</div>
        </li>
      </ul>
    </div>
  );
};

HeaderGlobalSwitcher.propTypes = {
  links: PropTypes.object,
};

HeaderGlobalSwitcher.defaultProps = {};

export default HeaderGlobalSwitcher;
