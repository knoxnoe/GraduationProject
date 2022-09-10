import { Button } from 'antd';
import { Dispatch, FC, SetStateAction } from 'react';

interface IProps {
  setStep: Dispatch<SetStateAction<number>>;
}

const Result: FC<IProps> = (props) => {
  const { setStep } = props;

  return (
    <div>
      <div style={{ textAlign: 'center' }}>
        <Button style={{ margin: '8px 8px' }} onClick={() => setStep(1)}>
          上一步
        </Button>
        <Button type="primary" onClick={() => {}}>
          一键下载
        </Button>
      </div>
    </div>
  );
};

export default Result;
