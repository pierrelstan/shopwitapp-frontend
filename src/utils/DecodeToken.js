import jwtDecode from 'jwt-decode';
import store from '../redux/store/store';

const TOKEN = store.getState().auth.token;
const DECODE_TOKEN = jwtDecode(TOKEN);
export default DECODE_TOKEN;
