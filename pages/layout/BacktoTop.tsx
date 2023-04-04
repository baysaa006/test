import { UpCircleOutlined } from "@ant-design/icons";
import { Affix } from "antd";
import React ,{ useEffect, useState }from "react";
import styles from "./style.module.scss";

export default function BacktoTop(){
    const [showButton, setShowButton] = useState(false);

    useEffect(() => {
      window.addEventListener("scroll", () => {
        if (window.pageYOffset > 300) {
          setShowButton(true);
        } else {
          setShowButton(false);
        }
      });
    }, []);

    const scrollToTop = () => {
        window.scrollTo({
          top: 0,
          behavior: 'smooth' 
        });
      };
    return(
        <>
           {showButton && (
               <Affix style={{ position: 'fixed', bottom: 70, right: 70 }}>
                    <UpCircleOutlined onClick={scrollToTop} className={styles.backtoTop} />
               </Affix>
      )}
        </>
    )
}
