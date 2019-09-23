import React from "react";
import BubbleSort from "./components/SortAlgos/IterativeSorting/BubbleSort";
import SelectionSort from "./components/SortAlgos/IterativeSorting/SelectionSort";
import QuickSort from "./components/SortAlgos/RecursiveSorting/QuickSort";
import MergeSort from "./components/SortAlgos/RecursiveSorting/MergeSort";
import AStar from "./components/PathfindingAlgos/AStar";
import "./App.css";
import { Route, NavLink } from "react-router-dom";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <Typography
      component="div"
      role="tabpanel"
      hidden={value !== index}
      id={`scrollable-prevent-tabpanel-${index}`}
      aria-labelledby={`scrollable-prevent-tab-${index}`}
      {...other}
    >
      <Box p={3}>{children}</Box>
    </Typography>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired
};

function a11yProps(index) {
  return {
    id: `scrollable-prevent-tab-${index}`,
    "aria-controls": `scrollable-prevent-tabpanel-${index}`
  };
}

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    width: "100%",
    backgroundColor: theme.palette.background.paper
  }
}));

export default function ScrollableTabsButtonPrevent() {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Tabs
          value={value}
          onChange={handleChange}
          variant="scrollable"
          scrollButtons="off"
          aria-label="scrollable prevent tabs example"
        >
          <Tab
            icon={<h2>Iterative Sorting</h2>}
            aria-label="phone"
            {...a11yProps(0)}
          />
          <Tab
            icon={<h2>Recursive Sorting</h2>}
            aria-label="favorite"
            {...a11yProps(1)}
          />
          <Tab
            icon={<h2>Pathfinding Algos</h2>}
            aria-label="phone"
            {...a11yProps(2)}
          />
        </Tabs>
      </AppBar>
      <TabPanel value={value} index={0}>
        <NavLink to="/bubble_sort">Bubble Sort</NavLink>
        <NavLink to="/selection_sort">Selection Sort</NavLink>
      </TabPanel>
      <TabPanel value={value} index={1}>
        <NavLink to="/merge_sort">Selection Sort</NavLink>
        <NavLink to="/quick_sort">Selection Sort</NavLink>
      </TabPanel>
      <TabPanel value={value} index={2}>
        <NavLink to="/astar">A Star</NavLink>
      </TabPanel>
      <Route path="/bubble_sort" component={BubbleSort} />
      <Route path="/selection_sort" component={SelectionSort} />
      <Route path="/merge_sort" component={MergeSort} />
      <Route path="/quick_sort" component={QuickSort} />
      <Route path="/astar" component={AStar} />
    </div>
  );
}
