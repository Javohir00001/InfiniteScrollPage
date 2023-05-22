import { createContext, useContext } from 'react';
import { makeAutoObservable } from 'mobx';

export const StoreContext = createContext(null);

class ImageStore {
  images = [];
  loading = false;
  page = 1;
  perPage = 10;

  constructor() {
    makeAutoObservable(this);
  }

  fetchData() {
    this.loading = true;
    const url = `https://picsum.photos/v2/list?page=${this.page}&limit=${this.perPage}`;

    fetch(url)
      .then(response => response.json())
      .then(data => {
        const newImages = data.map(item => item.download_url);
        this.images.push(...newImages);
        this.loading = false;
      })
      .catch(error => {
        console.error('Ooops!:', error);
        this.loading = false;
      });
  }

  loadMore() {
    if (!this.loading) {
      this.page++;
      this.fetchData();
    }
  }
}

export const StoreProvider = ({ children }) => {
  const store = new ImageStore();

  return (
    <StoreContext.Provider value={store}>{children}</StoreContext.Provider>
  );
};
