import { isEmpty } from 'lodash';
import React, { useEffect } from 'react';
import { Layout } from 'antd';

export default function SingleRestaurantFooter(props: any) {
  const { footerInfo } = props;
  const { Footer } = Layout;

  useEffect(() => {
    if (isEmpty(footerInfo)) {
      return;
    }
  }, [footerInfo]);

  return (
    <>
      <footer id="footer" className="footer-style-2">
        <div className="footer-widget">
          <div className="container">
            <div className="row">
              <div className="col-lg-3 col-md-3 col-sm-6 col-xs-12">
                <div className="widget widget-connect">
                  <ul>
                    {isEmpty(footerInfo?.phone) == false && (
                      <li>
                        <span className="bgcolor">
                          <i className="icon-ring_volume"></i>
                        </span>
                        <p>{isEmpty(footerInfo?.phone) ? <br /> : footerInfo?.phone}</p>
                      </li>
                    )}
                    {isEmpty(footerInfo?.email) === false && (
                      <li>
                        <span className="bgcolor">
                          <i className="icon-envelope-o"></i>
                        </span>
                        <p>
                          <a href="#">{isEmpty(footerInfo?.email) ? <br /> : footerInfo?.email}</a>
                        </p>
                      </li>
                    )}
                    {isEmpty(footerInfo?.address) === false && (
                      <li>
                        <span className="bgcolor">
                          <i className="icon-location-pin2"></i>
                        </span>
                        <p> {footerInfo?.address}</p>
                      </li>
                    )}
                    {isEmpty(footerInfo?.facebook) === false && (
                      <li>
                        <span className="bgcolor">
                          <i className="icon-facebook"></i>
                        </span>
                        <p>
                          <a href={footerInfo?.facebook}> Facebook Хаяг</a>
                        </p>
                      </li>
                    )}
                    {isEmpty(footerInfo?.instagram) === false && (
                      <li>
                        <span className="bgcolor">
                          <i className="icon-instagram"></i>
                        </span>
                        <p>
                          <a href={footerInfo?.instagram}> Instagram Хаяг</a>
                        </p>
                      </li>
                    )}
                    {isEmpty(footerInfo?.website) === false && (
                      <li>
                        <span className="bgcolor">
                          <i className="icon-browser"></i>
                        </span>
                        <p>
                          <a href={footerInfo?.website}> Вэб сайт</a>
                        </p>
                      </li>
                    )}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="copyright-sec">
          <div className="container">
            <div className="row">
              <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                <div className="copyright-inner">
                  <div className="copy-right">
                    <p>
                      © 2022 <a href="#">Qmenu</a>.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}
