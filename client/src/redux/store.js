import {configureStore} from '@reduxjs/toolkit';
import cartSlice from './cartSlice';
//store içinde slice toplanır
export default configureStore({
     reducer:{
        cart:cartSlice,
        
     }
});