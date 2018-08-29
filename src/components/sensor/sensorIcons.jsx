import React from 'react';

const sensorIcon = (type) => {
    switch(type) {
        case 'motion':
            return <i className="material-icons"> transfer_within_a_station </i>;
        case 'button':
            return <i className="fa fa-dot-circle-o" aria-hidden="true"> </i>;
        case 'temperature':
            return <i className="fa fa-thermometer-empty" aria-hidden="true"> </i>;
        case 'magnet':
            return <i className="fa fa-magnet" aria-hidden="true"> </i>;
        case 'lock':
            return <i className="fa fa-lock" aria-hidden="true"> </i>;
    }
};

export default sensorIcon