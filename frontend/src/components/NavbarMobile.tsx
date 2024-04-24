import Logo from "../assets/fakeX.png";
import LeftSideMenuMobile from "./LeftSideMenuMobile";

const NavbarMobile = () => {
  return (
    <div className="relative mx-auto flex w-full max-w-[600px] items-center justify-center px-3 pt-4 md:hidden md:px-0 md:py-20 md:pb-0">
      <img src={Logo} alt="logo" className="mx-auto w-[100px]" />
      <LeftSideMenuMobile />
    </div>
  );
};

export default NavbarMobile;
