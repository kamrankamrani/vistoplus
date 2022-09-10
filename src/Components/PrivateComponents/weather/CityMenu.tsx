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

  const handleClose = () => {
    dispatch(setOpenCityMenu(false));
    dispatch(setOpenCityAnchor(null));
  };

  return (
    <Menu
      open={openMenu}
      anchorEl={
        cityMenuAnchor ? document.querySelector(`#${cityMenuAnchor}`) : null
      }
      onClose={() => handleClose()}
    >
      <MenuItem>City</MenuItem>
      <MenuItem>City</MenuItem>
      <MenuItem>City</MenuItem>
      <MenuItem>City</MenuItem>
    </Menu>
  );
}
