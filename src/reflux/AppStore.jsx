import React from 'react';
import Reflux from 'reflux';

class AppStore extends Reflux.Store {
    constructor() {
        super();

        this.state = {
                 locations: [],
                 active_location: '',
                 credentials: {},
        }
    }
}

export default AppStore;