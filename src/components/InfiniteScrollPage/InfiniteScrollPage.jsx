import React, { useEffect, useContext } from 'react';
import { observer } from 'mobx-react';
import { StoreContext } from '../../stores/imageStore';

const InfiniteScrollPage = observer(() => {
  const store = useContext(StoreContext);

  useEffect(() => {
    store.fetchData();
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [store]);

  const handleScroll = () => {
    if (
      window.innerHeight + document.documentElement.scrollTop >=
      document.documentElement.offsetHeight - 200
    ) {
      store.loadMore();
    }
  };

  return (
    <div>
      <div className="image-list">
        {store.images.map((image, index) => (
          <img key={index} className='image-item' src={image} alt={`Image ${index + 1}`} />
        ))}
        {
            store.loading 
            && 
            <div className="spinner-container">
                <div className="spinner"></div>
            </div>    
        }
      </div>
    </div>
  );
});

export default InfiniteScrollPage;
