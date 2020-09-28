import './index.css';
import Global from './models/global'
//import * as serviceWorker from './serviceWorker';
import dva from 'dva';
import createHistory from 'history/createBrowserHistory';

const app = dva(
  { history: createHistory() }
);
// 2. Add plugins (optionally)
//app.use(plugin);
app.model(Global);

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
