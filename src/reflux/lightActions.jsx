import Reflux from 'reflux'

const lightActions = Reflux.createActions([
    'setColor',
    'on',
    'off',
    'toggle',
    'setBrightness',
    'setScene',
    'visible',
    'message',
    'status',

]);

export default lightActions