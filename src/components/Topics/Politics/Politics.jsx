//HOOKS
import React, { useState, useEffect } from 'react';

//CUSTOM HOOKS
import useFetch from '../../../custom-hooks/useFetch';

//CONTEXT
import { useContext } from 'react';
import NewsContext from '../../../store/News-Context';

//STYLING
import styles from './Politics.module.scss';

//COMPONENTS
import Line_Separator from '../../UI/Line_Separator/Line_Separator';
import Subhead_Lg from '../../UI/Subhead/Subhead_Lg/Subhead_Lg';
import Subhead_Sm from '../../UI/Subhead/Subhead_Sm/Subhead_Sm';

const Politics = () => {
  const { data, isLoading, error, fetchNow } = useFetch();
  const newsCtx = useContext(NewsContext);
  useEffect(() => {
    fetchNow({
      url: `https://content.guardianapis.com/us-news?search?from-date=${
        newsCtx.currentDate
      }&page-size=10&show-fields=body%2Cthumbnail%2CshouldHideAdverts%2Cheadline%2C&show-elements=image&show-blocks=all&show-tags=contributor&api-key=${
        import.meta.env.VITE_MY_API_KEY
      }`,
    });
  }, [fetchNow]);

  let status = '';

  if (isLoading) {
    status = <p>LOADING</p>;
  } else if (error) {
    status = <p>{error}</p>;
  }

  return (
    <div className={styles.politics}>
      <div className={styles.politics__separator_full}>
        <Line_Separator />
      </div>

      <div className={styles.politics__topic}>Politics</div>
      {!isLoading && !error && data && (
        <>
          <div className={styles.politics__block_1}>
            <Subhead_Lg article={data[0]} />
            <div className={styles.politics__column_border_1}></div>
          </div>

          <div className={styles.politics__block_2}>
            <div className={styles.politics__block_2__row_1}>
              <Subhead_Sm article={data[1]} />

              <div className={styles.politics__separator_quarter}>
                <Line_Separator lineColor='#e9e9e9' />
              </div>
              <Subhead_Sm article={data[2]} />
            </div>
            <div className={styles.politics__column_border_2}></div>
            <div className={styles.politics__block_2__row_2}>
              <Subhead_Sm article={data[5]} />

              <div className={styles.politics__separator_quarter}>
                <Line_Separator lineColor='#e9e9e9' />
              </div>
              <Subhead_Sm article={data[4]} />
            </div>
          </div>
        </>
      )}
      {status}
    </div>
  );
};

export default Politics;
