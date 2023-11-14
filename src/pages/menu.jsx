import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import Navbar from "../components/Navbar";
import { CardActionArea } from '@mui/material';
import { useLoaderData } from 'react-router-dom';
import {getMenu} from "../services/Menu";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import MealCard from '../components/MealCard';

export const MenuLoader = async ({params}) => {
  const menu = await getMenu(params.menuId);
  return {menu};
}

const Menu = () => {
  const [value, setValue] = React.useState(0);
  const tabs = [
    { label: 'Home', value: 0 },
    { label: 'About Us', value: 1 },
    { label: 'Services', value: 2 },
    { label: 'Products', value: 3 },
    { label: 'Contact', value: 4 },
    { label: 'Contact', value: 5 },
    { label: 'Contact', value: 6 },
    // Add more tabs as needed
  ];

  

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const {menu} = useLoaderData();
  console.log(menu);
  return (
    <div>
        <Navbar />
        <section class="bg-center bg-contain bg-no-repeat bg-[url('https://firebasestorage.googleapis.com/v0/b/fatwhale-7fedd.appspot.com/o/images%2FdashboardImage.avif?alt=media&token=f718fae2-a0c5-4f51-971b-9ce5603571ac')] bg-gray-700 bg-blend-multiply">
          <div class="px-4 mx-auto max-w-screen-xl text-center py-24 ">
              <h1 class="mb-4 text-4xl font-extrabold tracking-tight leading-none text-white md:text-5xl lg:text-6xl">Ghaith Menu</h1>
              <p class="mb-8 text-lg font-normal text-gray-300 lg:text-xl sm:px-16 lg:px-48">This menu is for good people who have loved meals since they were children</p>
          </div>
      </section>
      {/* <Box sx={{ maxWidth: { xs: '100%', sm: '100%', lg: 600 }, marginRight: 'auto', marginLeft: 'auto', marginTop: 2, marginBottom: 2, backgroundColor: '#ffffff', borderRadius: 2}}>
        <Tabs
          value={value}
          onChange={handleChange}
          variant="scrollable"
          scrollButtons={false}
          indicatorColor="transparent"
          aria-label="scrollable prevent tabs example"
        >
          {tabs.map((tab, index) => (
            <Tab
              key={index}
              label={tab.label}
              value={tab.value}
              sx={{
                textTransform: 'none',
                fontWeight: 600,
                fontSize: 14,
                marginRight: 0.5,
                marginLeft: 0.5,
                marginTop: 1,
                marginBottom: 1,
                borderRadius: 2,
                backgroundColor: "#FEF1DF",
                '&:focus': {
                  backgroundColor: '#DB6326',
                  color: "#ffffff",

                },
                ...(value === tab.value && {
                  backgroundColor: 'rgba(255,255,255,0.2)',
                }),
              }}
              />
          ))}
        </Tabs>
      </Box> */}

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 my-2 mx-16">
          <MealCard />
          <MealCard />
          <MealCard />
          <MealCard />
          <MealCard />
          
      </div>
    </div>
  );
}

export default Menu;