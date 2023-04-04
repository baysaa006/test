import React from 'react';
import { useTranslation } from 'react-i18next';

export default function Footer() {
  const { t, i18n } = useTranslation('language');
  return (
    <>
      <footer id="footer" className="footer-style-2">
        <div className="footer-widget">
          <div className="container">
            <div className="row">
              <div className="col-lg-3 col-md-3 col-sm-6 col-xs-12">
                <div className="widget widget-connect">
                  <ul>
                    <li>
                      <span className="bgcolor">
                        <i className="icon-ring_volume"></i>
                      </span>
                      <p>77772040</p>
                    </li>
                    <li>
                      <span className="bgcolor">
                        <i className="icon-envelope-o"></i>
                      </span>
                      <p>
                        <a href="#">info@qmenu.mn</a>
                      </p>
                    </li>
                    <li>
                      <span className="bgcolor">
                        <i className="icon-location-pin2"></i>
                      </span>
                      <p>{t('mainPage.QmenuAddress')}</p>
                    </li>
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
