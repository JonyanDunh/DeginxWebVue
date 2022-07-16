<script>
import axios from 'axios';
axios.defaults.crossDomain = true;
axios.defaults.withCredentials  = true;
var user;
var is_login=false;
export default {
  axios,
  user,
  is_login
}
</script>