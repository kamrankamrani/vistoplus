import { Menu, MenuItem } from "@mui/material";
import {
  setOpenCityAnchor,
  setOpenCityMenu,
} from "../../featuers/cityMenuSlice";
import { useAppDispatch, useAppSelector } from "../../reduxHooks";

export default function CityMenu() {
  const openMenu = useAppSelector((state) => state.cityMenuSlice.openCityMenu);
  const cityMenuAnchor = useAppSelector(
    (state) => state.cityMenuSlice.anchorForCityMenu
  );

  const dispatch = useAppDispatch();

  const handleCloseCityMenu = (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault();
    dispatch(setOpenCityMenu(false));
    dispatch(setOpenCityAnchor(null));
  };

  return (
    <Menu
      open={openMenu}
      anchorEl={
        cityMenuAnchor ? document.querySelector(`#${cityMenuAnchor}`) : null
      }
      onClose={(e: React.MouseEvent<HTMLElement>) => handleCloseCityMenu(e)}
    >
      <MenuItem>City</MenuItem>
      <MenuItem>City</MenuItem>
      <MenuItem>City</MenuItem>
      <MenuItem>City</MenuItem>
    </Menu>
  );
}
