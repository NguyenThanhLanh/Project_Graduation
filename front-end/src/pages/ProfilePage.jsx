import React, { useEffect, useState } from "react";
import Header from "../component/layout/Header";
import Footer from "../component/layout/Footer";
import styles from "../styles/styles";
import { useSelector } from "react-redux";
import ProfileSideBar from "../component/profile/ProfileSideBar.jsx";
import ProfileContent from "../component/profile/ProfileContent.jsx";

const ProfilePage = () => {
  const { loading } = useSelector((state) => state.user);
  const [active, setActive] = useState(1);
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <div>
      <Header />
      <div className={`${styles.section} flex bg-[#f5f5f5] py-10`}>
        <div className="w-[50px] 800px:w-[335px] sticky 800px:mt-0 mt-[18%]">
          <ProfileSideBar active={active} setActive={setActive} />
        </div>
        <ProfileContent active={active} />
      </div>
      <Footer />
    </div>
  );
};

export default ProfilePage;
