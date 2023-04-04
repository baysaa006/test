import React from 'react';
import { useTranslation } from 'react-i18next';
import banner from '../assets/extra-images/call-to-action-paralax.jpg';

export default function ContentCarousel() {
  const { t, i18n } = useTranslation('language');
  return (
    <>
      <div
        className="page-section parallex-bg nopadding cs-nomargin"
        data-type="background"
        style={{
          background: `url(${banner}) no-repeat center top / cover fixed #ffffff`,
          marginTop: 0,
          paddingTop: 30,
          paddingBottom: 10,
          marginBottom: 0,
        }}
      >
        <div className="container ">
          <div className="row">
            <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 ">
              <div className="cs-calltoaction fancy text-center">
                <div className="img-holder">
                  <i className=" icon-restaurant_menu "></i>
                </div>
                <div className="cs-text">
                  <strong style={{ color: '#ffffff' }}>{t('mainPage.AllInOne')}</strong>
                  <span style={{ color: 'rgb(255,255,255)' }}>
                    {' '}
                    {t('mainPage.PreOrderFood')}, {t('mainPage.TableReservation')}
                  </span>
                </div>
                <a
                  href="/restaurantRegister"
                  className="csborder-color cs-color"
                  style={{ backgroundColor: '#eb6825', color: '#ffffff' }}
                >
                  {t('mainPage.RestaurantRegistration')}
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
