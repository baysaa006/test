import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import mn from '../../assets/lang/MN.png';
import en from '../../assets/lang/US.png';
import sv from '../../assets/lang/SV.png';
import ru from '../../assets/lang/RU.png';
import ko from '../../assets/lang/KO.png';
import zh from '../../assets/lang/ZH.png';
import de from '../../assets/lang/DE.png';
import ja from '../../assets/lang/JA.png';
import fr from '../../assets/lang/FR.png';

import { Space, Dropdown, Menu, Image } from 'antd';
import styles from './style.module.scss';
import { getPayload } from '../../contexts/auth.context';

type Props = {
  currentLanguage: string;
  setCurrentLanguage: (currentLanguage: string) => void;
};

const iconSize = 30;

const Language = ({ setCurrentLanguage, currentLanguage }: Props) => {
  const [languages, setLanguages] = useState<string[]>();
  useEffect(() => {
    setLanguages(getPayload()?.languages?.filter((language) => language));
  }, []);
  const icon = (language: string) => {
    switch (language) {
      case 'mn': {
        return mn;
      }
      case 'en': {
        return en;
      }
      case 'sv': {
        return sv;
      }
      case 'ru': {
        return ru;
      }
      case 'ko': {
        return ko;
      }
      case 'zh': {
        return zh;
      }
      case 'de': {
        return de;
      }
      case 'ja': {
        return ja;
      }
      case 'fr': {
        return fr;
      }
    }
  };
  const { i18n } = useTranslation('language');

  const changeLanguage = (text: string) => {
    i18n.changeLanguage(text);
    if (currentLanguage) {
      setCurrentLanguage(text);
    }
  };

  const menu = () => {
    return languages && languages[0] ? (
      <Menu
        className={styles.dropDownLanguage}
        items={languages.map((language, index) => {
          return {
            key: index,
            icon: (
              <Image
                src={icon(language)}
                onClick={(e) => {
                  e.stopPropagation();
                  changeLanguage(language);
                }}
                preview={false}
                width={iconSize}
              />
            ),
          };
        })}
      />
    ) : (
      <Menu
        className={styles.dropDownLanguage}
        items={[
          {
            key: 1,
            icon: <Image src={mn} onClick={() => changeLanguage('mn')} preview={false} width={iconSize} />,
          },
          {
            key: 2,
            icon: <Image src={en} onClick={() => changeLanguage('en')} preview={false} width={iconSize} />,
          },
          {
            key: 3,
            icon: <Image src={sv} onClick={() => changeLanguage('sv')} preview={false} width={iconSize} />,
          },
          {
            key: 4,
            icon: <Image src={ru} onClick={() => changeLanguage('ru')} preview={false} width={iconSize} />,
          },
          {
            key: 5,
            icon: <Image src={ko} onClick={() => changeLanguage('ko')} preview={false} width={iconSize} />,
          },
          {
            key: 6,
            icon: <Image src={zh} onClick={() => changeLanguage('zh')} preview={false} width={iconSize} />,
          },
          {
            key: 7,
            icon: <Image src={de} onClick={() => changeLanguage('de')} preview={false} width={iconSize} />,
          },
          {
            key: 8,
            icon: <Image src={ja} onClick={() => changeLanguage('ja')} preview={false} width={iconSize} />,
          },
          {
            key: 9,
            icon: <Image src={fr} onClick={() => changeLanguage('fr')} preview={false} width={iconSize} />,
          },
        ]}
      />
    );
  };

  const renderLang = () => {
    return (
      <Dropdown
        overlay={menu}
        placement="bottomCenter"
        overlayStyle={{ paddingTop: '5px', margin: '0' }}
        trigger={['click']}
      >
        <a onClick={(e) => e.preventDefault()}>
          <Space>
            {i18n.language === 'mn' && <Image src={mn} preview={false} width={iconSize} />}
            {i18n.language === 'en' && <Image src={en} preview={false} width={iconSize} />}
            {i18n.language === 'sv' && <Image src={sv} preview={false} width={iconSize} />}
            {i18n.language === 'ru' && <Image src={ru} preview={false} width={iconSize} />}
            {i18n.language === 'ko' && <Image src={ko} preview={false} width={iconSize} />}
            {i18n.language === 'zh' && <Image src={zh} preview={false} width={iconSize} />}
            {i18n.language === 'de' && <Image src={de} preview={false} width={iconSize} />}
            {i18n.language === 'ja' && <Image src={ja} preview={false} width={iconSize} />}
            {i18n.language === 'fr' && <Image src={fr} preview={false} width={iconSize} />}
          </Space>
        </a>
      </Dropdown>
    );
  };

  return renderLang();
};

export default Language;
