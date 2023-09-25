const TabPanel = ({ children, value, index }) => {
  return value === index && children;
};

export default TabPanel;
