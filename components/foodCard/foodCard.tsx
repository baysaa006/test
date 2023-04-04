/* eslint-disable @next/next/no-img-element */
import React from 'react';
import styles from './styles.module.scss';
import logo from '../assets/extra-images/cover-photo20-359x212.jpg';
import logo1 from '../assets/extra-images/cover-photo20-359x212.jpg';
import { Image } from 'antd';
import { useTranslation } from 'react-i18next';
import { CURRENCY } from '../../helper/constant';

const { t, i18n } = useTranslation('language');

const htmlCard = (text: any) => (
  <div className="col-md-4 col-xs-6 grid-listing-col ">
    <div className="img-holder">
      <figure style={{ margin: '0px 0px 0px 0px' }}>
        <a href="#">
          <img src={logo} alt="" />{' '}
        </a>
        <figcaption className="listing-meta">
          <div className="listing-inner clearfix">
            <div className="list-option">
              <span className="label bgcolor time-label" style={{ display: 'none' }}></span>
              <a href="#" className="shortlist-btn" data-toggle="modal" data-target="#sign-in">
                <i className="icon-heart-o"></i>{' '}
              </a>
            </div>
            <div className="list-rating">
              <div className="rating-star">
                <span className="rating-box" style={{ width: '100%' }}></span>
              </div>
              <span className="reviews">(1)</span>
            </div>
          </div>
        </figcaption>
      </figure>
      <span className="restaurant-status close">
        <em className="bookmarkRibbon"></em>
        {t('mainPage.register')}
      </span>
    </div>
    <div className="text-holder">
      <div className="listing-inner" style={{ background: '#fff' }}>
        <h4>
          <a href="#">{text.title}</a>
        </h4>
        <p>Apple Juice, Beef Roast, Cheese Burger</p>
        <div className="min-order">
          Үнэ: <span className="price">{text.price} ₮</span>
        </div>
      </div>
      <div className="listing-footer">
        <div className="listing-inner clearfix">
          <div className="img-holder">
            <a href="#">
              <img src={logo1} alt="" />
            </a>
          </div>
          <div className="text-holder">
            <p>Bristol, Bristol</p>
            <p className="deliver-time">
              <span className="icon-motorcycle2"></span>10 min
            </p>
            <p className="pickup-time">
              <span className="icon-clock4"></span>15 min
            </p>
            <a href="#" className="ordernow-btn bgcolor">
              {t('mainPage.Order')}
            </a>
          </div>
        </div>
      </div>
    </div>
  </div>
);
const FoodCard = (props: any) => {
  const { itemsData } = props;
  return (
    <div>
      <div className="container">
        <div className="row">
          <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
            <div className="row">
              <div className="listing grid-listing four-cols">
                {itemsData.map((item: any) => {
                  return htmlCard(item);
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FoodCard;
