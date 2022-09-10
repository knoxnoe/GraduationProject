import styles from './index.less';
import GlobalHeader from '@/components/GlobalHeader';
import React, { useEffect } from 'react';

export default function IndexPage(props) {
  return (
    <div>
      <GlobalHeader></GlobalHeader>
      <div style={{ padding: 20 }}>{props.children}</div>
    </div>
  );
}
