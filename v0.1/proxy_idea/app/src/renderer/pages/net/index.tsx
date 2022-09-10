import { Button } from 'antd';
// import proxy from '../../../main/proxy/index';
import { RootState } from '../../store';
import {
  fetchUserById,
  increment,
  incrementByAmount,
} from '../../store/reducer/user';
import { useAppDispatch, useAppSelector } from '../../hooks/index';

const Net = () => {
  // window.electron.proxy.start();
  const count = useAppSelector((state: RootState) => state.user.value);
  // const countStandard = useAppSelector(
  //   (state: RootState) => state.counter.value
  // );
  const dispatch = useAppDispatch();

  const handleChangeProxy = () => {
    // dispatch(increment());
    // console.log(count);
    // console.log(proxy);
    window.electron.proxy.start();
  };

  return (
    <div>
      <h1>{count}</h1>
      <Button type="primary" onClick={handleChangeProxy}>
        change proxy
      </Button>
    </div>
  );
};

export default Net;
