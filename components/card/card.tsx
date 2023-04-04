/* eslint-disable @next/next/no-img-element */
import { Button, Col, message, Row, Space, Typography } from 'antd';
import React from 'react';
import { useTranslation } from 'react-i18next';
import logo from '../../assets/images/bking.png';
import styles from './styles.module.scss';

const Card = (props: { text: any }) => {
  const { t, i18n } = useTranslation('language');
  const { text } = props;
  return (
    <>
      <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
        <div className="listing fancy">
          <ul className="row">
            <div className="list-post featured">
              <div className="img-holder">
                <img height={100} src={logo} alt="" />
                <span className="restaurant-status close">
                  <em className="bookmarkRibbon"></em>
                  {t('mainPage.register')}
                </span>
              </div>
              <div className="text-holder">
                <Row>
                  <Col>
                    <div className="list-rating">
                      <div className="rating-star">
                        <span className="rating-box" style={{ width: '100%' }}></span>
                      </div>
                      <span className="reviews">(1)</span>
                    </div>
                    <div className="post-title">
                      <h5>
                        <a href="#">{text.title}</a>
                        <span className="sponsored text-color">Sponsored</span>
                      </h5>
                    </div>
                    <address>
                      <Typography.Text strong>{t('mainPage.TimeTable')}: </Typography.Text> 07:00-21:00
                    </address>
                    <address>
                      <Typography.Text strong>{t('mainPage.TypeOfFood')}: </Typography.Text> Пицца, паста, итали хоол
                    </address>
                    <address>
                      <Typography.Text strong>{t('mainPage.Address')}: </Typography.Text> УБ, БЗД 26-р хороо Park OD
                    </address>
                    <div className="delivery-potions">
                      <Space wrap>
                        <div>
                          <div className="post-time">
                            <i className="icon-clock4"></i>
                            <div className="time-tooltip">
                              <div className="time-tooltip-holder">
                                <b className="tooltip-label">{t('mainPage.PreOrder')}</b>
                                <b className="tooltip-info">{t('mainPage.PreOrder')} 15 minutes.</b>{' '}
                              </div>
                            </div>
                          </div>
                        </div>
                        <div>
                          <div className="post-time">
                            <i className="icon-food"></i>
                            <div className="time-tooltip">
                              <div className="time-tooltip-holder">
                                <b className="tooltip-label">{t('mainPage.TableReservation')}</b>
                                <b className="tooltip-info">{t('mainPage.TableReservation')} 15 minutes.</b>{' '}
                              </div>
                            </div>
                          </div>
                        </div>
                        <div>
                          <div className="post-time">
                            <i className="icon-motorcycle"></i>
                            <div className="time-tooltip">
                              <div className="time-tooltip-holder">
                                <b className="tooltip-label">{t('mainPage.Delivery')}</b>
                                <b className="tooltip-info">Your order will be delivered in 10 minutes.</b>{' '}
                              </div>
                            </div>
                          </div>
                        </div>
                      </Space>
                    </div>
                  </Col>
                </Row>
              </div>

              <div className="list-option">
                <a href="javascript:void(0);" className="shortlist-btn" data-toggle="modal" data-target="#sign-in">
                  <i className="icon-heart-o"></i>
                </a>
              </div>
            </div>
          </ul>
        </div>
      </div>
    </>
  );
};

export default Card;
