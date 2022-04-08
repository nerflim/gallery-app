import React, { FC, useEffect, useState } from 'react';
import { Avatar, Layout } from 'antd';
import { getPhotos } from '../../services';
import InfiniteScroll from 'react-infinite-scroll-component';
import Masonry from 'react-masonry-component';
import PreviewModal from '../../components/preview';

import { featuredLoadMore, onSearch, searchLoadMore } from './home.logic';
import './home.styles.less';
import Header from '../../components/header';

const { Content } = Layout;

const Home: FC = () => {
  const [photos, setPhotos] = useState<any[]>([]);
  const [totalPhotos, setTotalPhotos] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(false);

  // filters
  const [search, setSearch] = useState<string>('');
  const [page, setPage] = useState<number>(1);
  const [order, setOrder] = useState<string>('relevant');
  const [orientation, setOrientation] = useState<string>('any');

  const [active, setActive] = useState<any>(null);

  const onLoadMore = () => {
    search ? searchLoadMore(search, order, orientation, page, photos, setPage, setPhotos) : featuredLoadMore(page, photos, setPhotos, setPage);
  };

  useEffect(() => {
    if (!search) {
      getPhotos().then(setPhotos);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [search]);

  return (
    <div className='homeContainer' data-testid='home-container'>
      <Layout>
        <Layout>
          <Content>
            <Header
              onSearch={onSearch(order, orientation, setPage, setLoading, setPhotos, setTotalPhotos, setSearch)}
              order={order}
              orientation={orientation}
              setOrder={setOrder}
              setOrientation={setOrientation}
            />
            <div className='feedContainer' data-testid='feed-container'>
              {search && loading ? (
                <div className='searchResultText'>Searching...</div>
              ) : (
                search && (
                  <div className='searchResultText'>
                    Search result for "<span>{search}</span>"
                  </div>
                )
              )}

              <InfiniteScroll
                dataLength={photos.length}
                next={onLoadMore}
                hasMore={!search || photos.length < totalPhotos}
                loader={<div className='totalDisplayed'>Loading...</div>}
                endMessage={<div className='totalDisplayed'>All images of "{search}" has been displayed.</div>}
                style={{ overflow: 'hidden' }}>
                <Masonry className='masonry' options={{ transitionDuration: 0 }} disableImagesLoaded={false} updateOnEachImageLoad={false}>
                  {photos.map((item: any) => (
                    <div className='imgContainer' key={item.id} onClick={() => setActive(item)}>
                      <div className='imgInfoContainer'>
                        <div className='imgInfo'>
                          <div className='userInfo'>{item.user.name}</div>
                          <Avatar src={item.user.profile_image.small} />
                        </div>
                      </div>
                      <img alt={item.id} src={item.urls.thumb} className='imgItem' decoding='async' />
                    </div>
                  ))}
                </Masonry>
              </InfiniteScroll>
            </div>

            <PreviewModal image={active} setImage={setActive} />
          </Content>
        </Layout>
      </Layout>
    </div>
  );
};

export default Home;
