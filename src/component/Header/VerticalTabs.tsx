import * as React from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

const TabPanel = (props: TabPanelProps) => {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

const a11yProps = (index: number) => {
  return {
    id: `vertical-tab-${index}`,
    'aria-controls': `vertical-tabpanel-${index}`,
  };
}

export const VerticalTabs = () => {
  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <Box
      sx={{ flexGrow: 1, bgcolor: 'background.paper', display: 'flex', height: '100%' }}
    >
      <Tabs
        orientation="vertical"
        variant="scrollable"
        value={value}
        onChange={handleChange}
        aria-label="Vertical tabs example"
        sx={{ borderRight: 3, borderColor: 'divider', height: '100vh' }}
      >
        <Tab label="Income" {...a11yProps(0)} />
        <Tab label="Expenses" {...a11yProps(1)} />
        <Tab label="Saving" {...a11yProps(2)} />
      </Tabs>
      <div>
        <div>
          <button>
            Вьібор счета
          </button>
          <button>
            Месяц - вьібор датьі ()
          </button>
          <button>
            Переводьі
          </button>
          <button>
            Категории
          </button>
          <button>
            Счета
          </button>
          <button>
            Валютьі
          </button>
          <button>
            Настройки
          </button>
        </div>
        <div>
          <TabPanel value={value} index={0}>
            Income
          </TabPanel>
          <TabPanel value={value} index={1}>
            Expenses
          </TabPanel>
          <TabPanel value={value} index={2}>
            Saving
          </TabPanel>
        </div>
      </div>
    </Box>
  );
}