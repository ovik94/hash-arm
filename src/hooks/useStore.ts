import { useContext } from 'react';
import { StoreContext } from '../core/StoreContext';

const useStore = () => useContext(StoreContext);

export default useStore;
