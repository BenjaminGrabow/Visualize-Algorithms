import React from "react";
import PropTypes from "prop-types";
import Color from "color";
import { makeStyles } from "@material-ui/styles";
import Tabs from "@material-ui/core/Tabs";
import { Navlink } from "react-router-dom";

const useTabsStyles = makeStyles(() => ({
  indicator: {
    display: "none"
  }
}));

const useTabStyles = makeStyles(({ palette, spacing, breakpoints }) => {
  const defaultBgColor = palette.common.white;
  const defaultSelectedBgColor = palette.secondary.main;
  const defaultMinWidth = {
    md: 120
  };
  const getTextColor = color => {
    if (Color(color).isLight()) return palette.text.primary;
    return palette.common.white;
  };
  return {
    root: ({
      bgColor = defaultBgColor,
      minWidth = defaultMinWidth,
      selectedBgColor = defaultSelectedBgColor
    }) => ({
      opacity: 1,
      overflow: "initial",
      color: getTextColor(bgColor),
      backgroundColor: bgColor,
      transition: "0.2s",
      [breakpoints.up("md")]: {
        minWidth: minWidth.md
      },
      "&:before": {
        transition: "0.2s"
      },
      "&:not(:first-of-type)": {
        "&:before": {
          content: '" "',
          position: "absolute",
          left: 0,
          display: "block",
          height: 20,
          width: 1,
          zIndex: 1,
          backgroundColor: palette.grey[300]
        }
      },
      "& + $selected:before": {
        opacity: 0
      },
      "&:hover": {
        "&:not($selected)": {
          backgroundColor: Color(selectedBgColor)
            .fade(0.87)
            .toString()
        },
        "&::before": {
          opacity: 0
        },
        "& + $root:before": {
          opacity: 0
        }
      }
    }),
    selected: ({ selectedBgColor = defaultSelectedBgColor }) => ({
      backgroundColor: selectedBgColor,
      color: getTextColor(selectedBgColor),
      "& + $root": {
        zIndex: 1
      },
      "& + $root:before": {
        opacity: 0
      }
    }),
    wrapper: {
      zIndex: 2,
      textTransform: "initial"
    }
  };
});

const IterativeTabs = ({ tabs, tabStyle, tabProps, ...props }) => {
  const iterativeAlgos = ["Bubble Sort", "Selection Sort"];
  const tabsClasses = useTabsStyles(props);
  const tabClasses = useTabStyles({ ...tabProps, ...tabStyle });
  return (
    <Tabs {...props} classes={tabsClasses}>
      {iterativeAlgos.map((tab, index) => (
        <Navlink
          key={index}
          to={`/${tab
            .toLowerCase()
            .split(" ")
            .join("_")}`}
        >
          {tab}
        </Navlink>
      ))}
    </Tabs>
  );
};

IterativeTabs.propTypes = {
  tabs: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.node.isRequired
    })
  ),
  tabStyle: PropTypes.shape({
    bgColor: PropTypes.string,
    minWidth: PropTypes.shape({})
  }),
  tabProps: PropTypes.shape({})
};
IterativeTabs.defaultProps = {
  tabs: [],
  tabStyle: {},
  tabProps: {}
};

export default IterativeTabs;
