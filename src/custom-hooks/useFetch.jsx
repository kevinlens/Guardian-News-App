import React, { useState, useCallback } from 'react';

const useFetch = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [data, setData] = useState();

  const fetchNow = useCallback(async (requestConfig) => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch(requestConfig.url);

      if (!response.ok) {
        throw new Error('Something went wrong');
      }

      const data = await response.json();
      const newsData = data.response.results.map((newsData) => {
        let author = '';
        if (newsData.tags.length >= 1) {
          author = newsData.tags[0].webTitle;
        }
        let primaryPhoto, primaryCaption, photographer = '';
        
        if(newsData.blocks.main){
          primaryCaption = newsData.blocks.main.elements[0].imageTypeData.caption;
          photographer = newsData.blocks.main.elements[0].imageTypeData.credit;
        }
        if (!newsData.blocks.main) {
          primaryPhoto = newsData.fields.thumbnail;
        } else if (newsData.blocks.main.elements[0].assets[5]) {
          primaryPhoto = newsData.blocks.main.elements[0].assets[5].file;
        } else if (newsData.blocks.main.elements[0].assets[4]) {
          primaryPhoto = newsData.blocks.main.elements[0].assets[4].file;
        } else if (newsData.blocks.main.elements[0].assets[3]) {
          primaryPhoto = newsData.blocks.main.elements[0].assets[3].file;
        }
        return {
          id: newsData.id,
          title: newsData.fields.headline,
          caption: primaryCaption,
          author: author,
          body: newsData.blocks.body[0].bodyTextSummary,
          thumbnail: newsData.fields.thumbnail,
          image: primaryPhoto,
          photographer: photographer
        };
      });
      setData(newsData);
    } catch (error) {
      setError(error.message);
    }

    setIsLoading(false);
  }, []);

  return {
    data,
    isLoading,
    error,
    fetchNow,
  };
};

export default useFetch;