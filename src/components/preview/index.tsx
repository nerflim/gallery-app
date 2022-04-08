import React, { FC, useEffect, useState } from 'react';
import { Avatar, Divider, Modal, Statistic } from 'antd';
import { InstagramFilled, TwitterSquareFilled, GlobalOutlined } from '@ant-design/icons';

import './preview.styles.less';
import { getPhotoStats } from '../../services';

interface Props {
  image: any;
  setImage: (data: any) => void;
}

const PreviewModal: FC<Props> = ({ image, setImage }) => {
  const [statistics, setStatistics] = useState<any>(null);

  useEffect(() => {
    if (image) {
      getPhotoStats(image.id).then((res) => setStatistics(res));
    } else {
      setStatistics(null);
    }
  }, [image]);

  return (
    <Modal
      visible={!!image}
      onOk={() => setImage(null)}
      onCancel={() => setImage(null)}
      footer={null}
      centered
      transitionName=''
      className='previewContainer'
      width='80%'>
      {image && statistics && (
        <div className='detailsContainer'>
          <div className='preview'>
            <img src={image.urls.regular} alt={image.id} />
          </div>
          <div className='stats'>
            <div className='imgStats'>
              <Statistic title='Likes' value={statistics.likes.total} />
              <Statistic title='Downloads' value={statistics.downloads.total} />
              <Statistic title='Views' value={statistics.views.total} />
            </div>
            <Divider className='divider' />
            <div>
              <div className='bioContainer'>
                <div>
                  <Avatar src={image.user.profile_image.medium} size={60} />
                </div>
                <div className='bio'>
                  <p className='name'>{image.user.name}</p>
                  {image.user.location && (
                    <p className='location'>
                      <em>{image.user.location}</em>
                    </p>
                  )}
                  <p className='description'>{image.user.bio}</p>
                </div>
              </div>

              {image.user.social.portfolio_url && (
                <div className='socialContainer'>
                  <GlobalOutlined className='icon icon-web' />{' '}
                  <a href={image.user.social.portfolio_url} target='_blank' rel='noopener noreferrer'>
                    {image.user.social.portfolio_url}
                  </a>
                </div>
              )}

              {image.user.social.instagram_username && (
                <div className='socialContainer'>
                  <InstagramFilled className='icon icon-instagram' />{' '}
                  <a href={`https://www.instagram.com/${image.user.social.instagram_username}`} target='_blank' rel='noopener noreferrer'>
                    instagram/{image.user.social.instagram_username}
                  </a>
                </div>
              )}
              {image.user.social.twitter_username && (
                <div className='socialContainer'>
                  <TwitterSquareFilled className='icon icon-twitter' />
                  <a href={`https://twitter.com/${image.user.social.twitter_username}`} target='_blank' rel='noopener noreferrer'>
                    twitter/{image.user.social.twitter_username}
                  </a>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </Modal>
  );
};

export default PreviewModal;
