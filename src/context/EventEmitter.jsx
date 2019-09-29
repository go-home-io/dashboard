// -------------------------------------------------------------------------------------
//                             CUSTOM EVENTS
// -------------------------------------------------------------------------------------
//
//  Event "message", Message to Device Component
//      {
//          'id': id,       // device id, string
//          'state': state  // device state or "oneWayResponse"
//      }
//
//  Event "message", Message to Notification Component
//      {'id': 'notification', 'state': {
//                                  'created': created, // 1235687125755645566
//                                  'status': status, // status = one of ['info', 'success', 'warning', 'error', 'default']
//                                  'message': 'test message', // string
//                                  'origin': id // device id, string
//                             }}
//
//  Event "command", Server command
//      {
//        'id': id, // device id, string
//        'cmd': command, // server command, string
//        'value': value, // command parameter, string, maybe null
//        'oneWay': true/false // is command oneWay? , boolean
//        }
//
//  Event "status", Message to Component Header
//        {
//          'id': id, // device id, string
//          'status': status, // status = one of ['ordinary', 'success', 'error']
//        }
//
//
//  Event "loading", message to Device Manager Component
//      {
//         'id': id, // device id, string
//         'loading': true/false, // boolean
//      }
//
// ---------------------------------------------------------------------------------------------


import React, {useState} from "react";
import PropTypes from "prop-types";

export const EventEmitter = React.createContext({
    subscribe: () => {},
    unsubscribe: () => {},
    raiseEvent: () => {}
});


const EventEmitterProvider = (props) => {
    const { children, ...other } = props;
    const [events, setEvents] = useState({});

    const raiseEvent = (event, data) => {
        if (! events[event]) return;
        events[event].forEach(callback => callback(data));
    };

    const subscribe = (event, callback) => {
        let eventsDict = events;
        let callbacks = [];
        if ( eventsDict && eventsDict[event]) {
            callbacks = eventsDict[event];
        }
        callbacks.push(callback);
        eventsDict[event] = callbacks;
        setEvents(eventsDict);
    };

    const unsubscribe = (event, callback) => {
        if (! events) return;

        let newEvents = events;
        const callbacks = events[event];
        let newCallbacks = [];
        callbacks.forEach(item => {
            if (item !== callback ) newCallbacks.push(item);
        });
        newEvents[event] = newCallbacks;
        setEvents(newEvents);
    };

    const eventEmitter = {
        subscribe: (event, callback) => subscribe(event, callback),
        unsubscribe: (event, callback) => unsubscribe(event, callback),
        raiseEvent: (event, data) => raiseEvent(event, data)
    };

    return (
        <EventEmitter.Provider value = { eventEmitter } { ...other }>
            { children }
        </EventEmitter.Provider>
    );
};

EventEmitter.propTypes = {
    children: PropTypes.object.isRequired
};

export default EventEmitterProvider;