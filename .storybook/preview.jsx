/**
 * Copyright IBM Corp. 2016, 2018
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
import React from "react";
import { configureActions } from "@storybook/addon-actions";
import { white, g10, g90, g100 } from "@carbon/themes";
import { breakpoints } from "@carbon/layout";
import { Theme as GlobalTheme } from "@carbon/react";
import "./styles.scss";

export const globalTypes = {
  theme: {
    name: "Theme",
    description: "Set the global theme for displaying components",
    defaultValue: "boomerang",
    toolbar: {
      icon: "paintbrush",
      items: ["boomerang", "white", "g10", "g90", "g100"],
    },
  },
};

export const parameters = {
  actions: { argTypesRegex: "^on.*" },
  backgrounds: {
    // https://storybook.js.org/docs/react/essentials/backgrounds#grid
    grid: {
      cellSize: 8,
      opacity: 0.2,
    },
    values: [
      {
        name: "boomerang",
        value: "#f2f4f8",
      },
      {
        name: "white",
        value: white.background,
      },
      {
        name: "g10",
        value: g10.background,
      },
      {
        name: "g90",
        value: g90.background,
      },
      {
        name: "g100",
        value: g100.background,
      },
    ],
  },
  controls: {
    // https://storybook.js.org/docs/react/essentials/controls#show-full-documentation-for-each-property
    expanded: true,

    // https://storybook.js.org/docs/react/essentials/controls#specify-initial-preset-color-swatches
    // presetColors: [],

    // https://storybook.js.org/docs/react/essentials/controls#sorting-controls
    sort: "alpha",

    hideNoControlsWarning: true,
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/,
      },
    },
  },
  darkMode: {
    current: "light",
  },
  options: {
    storySort: {
      order: ["Welcome", "Components", "Inputs", "Features", "Platform", "Errors", "Playground", "*", "Deprecated"],
    },
  },
  parameters: {
    docs: {
      source: {
        type: 'dynamic',
        excludeDecorators: true,
      },
    },
  },
  // Small (<672)
  // Medium (672 - 1056px)
  // Large (1056 - 1312px)
  // X-Large (1312 - 1584px)
  // Max (>1584)
  viewport: {
    viewports: {
      sm: {
        name: "Small",
        styles: {
          width: breakpoints.sm.width,
          height: "100%",
        },
      },
      md: {
        name: "Medium",
        styles: {
          width: breakpoints.md.width,
          height: "100%",
        },
      },
      lg: {
        name: "Large",
        styles: {
          width: breakpoints.lg.width,
          height: "100%",
        },
      },
      xlg: {
        name: "X-Large",
        styles: {
          width: breakpoints.xlg.width,
          height: "100%",
        },
      },
      Max: {
        name: "Max",
        styles: {
          width: breakpoints.max.width,
          height: "100%",
        },
      },
    },
  },
};

configureActions({
  depth: 3,
  limit: 10,
});

export const decorators = [
  (Story, context) => {
    const { theme } = context.globals;

    React.useEffect(() => {
      document.documentElement.setAttribute("data-carbon-theme", theme);
    }, [theme]);

    return (
      <GlobalTheme theme={theme}>
        <Story {...context} />
      </GlobalTheme>
    );
  },
];
