import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';
import { useLoaderData } from 'react-router-dom';
import {getMenu} from "../services/Menu";

export const MenuLoader = async ({params}) => {
  const menu = await getMenu(params.menuId);
  return {menu};
}

const Menu = () => {
  const {menu} = useLoaderData();
  console.log(menu);
  return (
    <div>
      
    </div>
  );
}

export default Menu;