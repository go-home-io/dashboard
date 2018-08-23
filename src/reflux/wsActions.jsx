import Reflux from 'reflux'

const wsActions = Reflux.createActions([
    'doCommand',
    'reconnect',
]);

export default wsActions