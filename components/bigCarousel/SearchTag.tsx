import { Card, Image, Typography } from 'antd';
import React from 'react';
import styles from './style.module.scss';
import morning from './assets/images/morning.png';
import lunch from './assets/images/lunch.png';
import nigth from './assets/images/night.png';
import table from './assets/images/tableOrder.png';
import order from './assets/images/ordering.png';
import take from './assets/images/take_away.png';
import { useTranslation } from 'react-i18next';

export default function SearchTag() {
  const { t, i18n } = useTranslation('language');
  return (
    <>
      <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 ">
        <div className="categories-holder modern">
          <div className="col-lg-2 col-sm-4 col-xs-6">
            <div className="categories-list">
              <a href="#">
                <Image preview={false} src={morning} />
                <h6 style={{ color: '#000000' }}>
                  <span>{t('mainPage.Breakfast')}</span>
                </h6>
              </a>
            </div>
          </div>
          <div className="col-lg-2 col-sm-4 col-xs-6">
            <div className="categories-list">
              <a href="#">
                <Image preview={false} src={lunch} />
                <h6 style={{ color: '#000000' }}>
                  <span>{t('mainPage.Lunch')}</span>
                </h6>
              </a>
            </div>
          </div>
          <div className="col-lg-2 col-sm-4 col-xs-6">
            <div className="categories-list">
              <a href="#">
                <Image preview={false} src={nigth} />
                <h6 style={{ color: '#000000' }}>
                  <span>{t('mainPage.Dinner')}</span>
                </h6>
              </a>
            </div>
          </div>
          <div className="col-lg-2 col-sm-4 col-xs-6">
            <div className="categories-list">
              <a href="#">
                <Image preview={false} src={table} />
                <h6 style={{ color: '#000000' }}>
                  <span>{t('mainPage.TableReservation')}</span>
                </h6>
              </a>
            </div>
          </div>
          <div className="col-lg-2 col-sm-4 col-xs-6">
            <div className="categories-list">
              <a href="#">
                <Image preview={false} src={order} />
                <h6 style={{ color: '#000000' }}>
                  <span>{t('mainPage.PreOrder')}</span>
                </h6>
              </a>
            </div>
          </div>
          <div className="col-lg-2 col-sm-4 col-xs-6">
            <div className="categories-list">
              <a href="#">
                <Image preview={false} src={take} />
                <h6 style={{ color: '#000000' }}>
                  <span>{t('mainPage.GoAndGetIt')}</span>
                </h6>
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
