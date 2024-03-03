import React         from 'react'
import { createRoot } from 'react-dom/client';

import { useEffect, useState } from 'react'

import Scheduler from '@mormat/react-scheduler';
import { v4 as uuidv4 } from 'uuid';

function App()
{
    
    const config = {
        minHour: 8,
        maxHour: 20,
        width: 'auto',
        height: 'auto',
        events: async function(setEvents ){
            setEvents(await window.events.load())
        },
        onEventCreate: async (obj) => {
            obj['_id'] = uuidv4();

            await window.events.add(obj);
        },
        onEventUpdate: async (obj) => {
            const where = {_id: obj['_id']};

            await window.events.update(where, obj);
        },
        onEventDelete: async (obj) => {
            const { _id } = obj;
            await window.events.delete({ _id });
        }
    }

    return (
        <Scheduler { ...config } />
    )
}

const root = createRoot(document.getElementById('root'));
root.render(<App />)
