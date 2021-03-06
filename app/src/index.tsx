import './index.css';
import Global from './models/global'
//import * as serviceWorker from './serviceWorker';
import dva from 'dva';
import History from './models/history';
import createHistory from 'history/createHashHistory';
import AudioStore from './models/audio';
const app = dva(
  { history: createHistory() }
);
// 2. Add plugins (optionally)
//app.use(plugin);
app.model(Global);
app.model(History);
app.model(AudioStore);

// 5. Config router with Components
app.router(require('./pages/index').default);
// 6. Start app
app.start('#root');
// ReactDOM.render(
//   <React.StrictMode>
//     <App />
//   </React.StrictMode>,
//   document.getElementById('root')
// );
