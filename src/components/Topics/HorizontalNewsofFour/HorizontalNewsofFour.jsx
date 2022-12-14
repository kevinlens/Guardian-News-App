//HOOKS
import React, { useState, useEffect } from 'react';

//CUSTOM HOOKS
import useFetch from '../../../custom-hooks/useFetch';

//CONTEXT
import { useContext } from 'react';
import NewsContext from '../../../store/News-Context';

//STYLING
import styles from './HorizontalNewsofFour.module.scss';

//COMPONENTS
import Filler_Subhead_Aside_xs from '../../UI/Subhead_Aside/Subhead_Aside_xs/Filler_Subhead_Aside_xs/Filler_Subhead_Aside_xs';
import Line_Separator from '../../UI/Line_Separator/Line_Separator';

const HorizontalNewsofFour = () => {
  
  const { data, isLoading, error, fetchNow } = useFetch();


  useEffect(() => {

    fetchNow({category: 'us/travel'});

  }, [fetchNow]);

  let status = '';

  if (isLoading) {
    status = <p>LOADING</p>;
  } else if (error) {
    status = <p>{error}</p>;
  }

  return (
    <div className={styles.horizontalNewsofFour}>
      <div className={styles.horizontalNewsofFour__separator}>
        <Line_Separator />
      </div>
      {!isLoading && !error && data && (
        <div className={styles.horizontalNewsofFour__articles}>
          <Filler_Subhead_Aside_xs article={data[0]} />
          <Filler_Subhead_Aside_xs article={data[1]} />
          <Filler_Subhead_Aside_xs article={data[2]} />
          <Filler_Subhead_Aside_xs article={data[3]} />
        </div>
      )}
      {status}
    </div>
  );
};

export default HorizontalNewsofFour;
