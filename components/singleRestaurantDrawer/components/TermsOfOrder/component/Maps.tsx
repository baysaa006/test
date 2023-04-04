import React, { useState } from 'react';
import GoogleMapReact from 'google-map-react';
import pinIcon from '../../../../../assets/orderTypesPic/MapPin.png';
import { Avatar, Input, List, Row } from 'antd';
import { debounce } from 'lodash';
import { useLazyQuery } from '@apollo/client';
import { SEARCH_LOCATIONS } from '../../../../../graphql/query/search.location';
import styles from './style.module.scss';
import { SearchOutlined } from '@ant-design/icons';

const SimpleMap = (props: any) => {
  const { center, setCenter, selectedAddress, currentLocation } = props;
  const [zoom, setZoom] = useState(16);
  const [addressValue, setAddressValue] = useState();

  const [searchLocations, { loading: searchLaoding, data: searchLocation }] = useLazyQuery(SEARCH_LOCATIONS, {
    onCompleted: (data) => {},
    onError(err) {},
  });

  const onChange = (e: any) => {};
  const onChildClick = (e: any) => {};
  const onClick = (e: any) => {
    setCenter({ lat: e.lat, lng: e.lng });
    searchLocations({ variables: { query: '', lat: e.lat, lon: e.lng } });
  };
  const AnyReactComponent = ({ text }: any) => (
    <div>
      <img src={pinIcon} style={{ position: 'absolute', top: '-25px', left: '-12px' }} />
    </div>
  );

  const onFocusMap = () => {
    searchLocations({ variables: { query: '', lat: center.lat, lon: center.lng } });
  };

  const addressHandleChange = (e: any) => {
    setAddressValue(e);
  };

  const debouncedFetchData = debounce((query: any) => {
    searchLocations({ variables: { query: query, lat: center.lat, lon: center.lng } });
  }, 500);

  const addressOnSearch = (query: any) => {
    debouncedFetchData(query.target.value);
  };

  return (
    <>
      {center.lng > 0 && (
        <div style={{ height: '35vh', width: '100%' }}>
          <GoogleMapReact
            bootstrapURLKeys={{
              key: 'AIzaSyA_Fd121FdGJZpBOZxuEfM-liLOrpTTJCQ',
              language: 'mn',
              region: 'mn',
              libraries: ['places'],
            }}
            defaultCenter={center}
            defaultZoom={zoom}
            options={{
              keyboardShortcuts: true,
              panControl: true,
              mapTypeControl: false,
              scrollwheel: false,
              fullscreenControl: false,
              styles: [{ stylers: [{ saturation: -100 }, { gamma: 0.8 }, { lightness: 4 }, { visibility: 'on' }] }],
            }}
            layerTypes={['TrafficLayer', 'TransitLayer']}
            shouldUnregisterMapOnUnmount
            yesIWantToUseGoogleMapApiInternals
            onChange={onChange}
            onChildClick={onChildClick}
            onClick={onClick}
          >
            <AnyReactComponent lat={center.lat} lng={center.lng} text="My Marker" />
          </GoogleMapReact>
        </div>
      )}
      <br />
      <Row justify="center" className={styles.locationSearchInput}>
        <Input
          onChange={addressOnSearch}
          onFocus={onFocusMap}
          suffix={<SearchOutlined />}
          placeholder="Өөрйин байршилаа оруулна уу."
        />
      </Row>
      <List
        loading={searchLaoding}
        dataSource={
          (searchLocation && searchLocation.searchLocations) || (currentLocation && currentLocation.searchLocations)
        }
        itemLayout="horizontal"
        renderItem={(item: any) => (
          <List.Item onClick={() => selectedAddress(item)}>
            <List.Item.Meta avatar={<Avatar src={pinIcon} />} title={item.address} description={item.description} />
          </List.Item>
        )}
      ></List>
    </>
  );
};

export default SimpleMap;
