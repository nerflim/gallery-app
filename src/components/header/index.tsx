import React, { FC, useEffect, useState } from 'react';
import { SORT_BY, ORIENTATION } from '../../constant/filters';
import { Dropdown, Button, Input, Menu } from 'antd';
import { DownOutlined } from '@ant-design/icons';
import headerBg from '../../images/header-bg.jpeg';

import './header.styles.less';

const { Search } = Input;

const MIN_HEIGHT = 50;
const MAX_HEIGHT = 300;

interface Props {
  onSearch: (data: string) => void;
  order: string;
  orientation: string;
  setOrder: (data: string) => void;
  setOrientation: (data: string) => void;
}

const Header: FC<Props> = ({ onSearch, order, orientation, setOrder, setOrientation }) => {
  const [height, setHeight] = useState<number>(MAX_HEIGHT);
  const getMenu = (dataSource: { [key: string]: any }, activeKey: string, setKey: (data: string) => void) => {
    const keys = Object.keys(dataSource);

    return (
      <Menu activeKey={activeKey} onClick={(e: any) => setKey(e.key)}>
        {keys.map((item) => (
          <Menu.Item key={item} disabled={item === activeKey}>
            {dataSource[item]}
          </Menu.Item>
        ))}
      </Menu>
    );
  };

  const onBackToTop = () => {
    window.scroll({ top: 0, left: 0, behavior: 'smooth' });
  };

  useEffect(() => {
    const onHeaderScroll = () => {
      const scrollTop = window.scrollY;
      const logoHeight = Math.max(MIN_HEIGHT, MAX_HEIGHT - scrollTop);

      setHeight(logoHeight);
    };
    window.addEventListener('scroll', onHeaderScroll);

    return () => {
      window.removeEventListener('scroll', onHeaderScroll);
    };
  }, []);

  return (
    <div className='headerContainer' data-testid='header-container'>
      <div className='searchContainer' style={{ backgroundImage: `url(${headerBg})`, height }}>
        <div className='searchForm'>
          <h1 className='appTitle'>Gallery</h1>

          <Search
            placeholder='Search free high-resolution photos'
            onSearch={onSearch}
            size='large'
            className='searchInput'
            onFocus={onBackToTop}
            onChange={onBackToTop}
            onClick={onBackToTop}
          />
          <div className='filterContainer'>
            <Dropdown overlay={getMenu(SORT_BY, order, setOrder)} trigger={['click']}>
              <Button type='link'>
                Sort by {SORT_BY[order]} <DownOutlined />
              </Button>
            </Dropdown>
            <Dropdown overlay={getMenu(ORIENTATION, orientation, setOrientation)} trigger={['click']}>
              <Button type='link'>
                {ORIENTATION[orientation]} <DownOutlined />
              </Button>
            </Dropdown>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
