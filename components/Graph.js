import { BG_PRIMARY } from '@/utils/constants';
import React from 'react';
import { BarChart, Bar, Rectangle, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const data = [

    { name: 'Jan', uv: 4000, pv: 1, amt: 2400 },
    { name: 'Feb', uv: 3000, pv: 3, amt: 2210 },
    { name: 'Mar', uv: 2000, pv: 2, amt: 2290 },
    { name: 'Apr', uv: 2780, pv: 5, amt: 2000 },
    { name: 'May', uv: 1890, pv: 2, amt: 2181 },
    { name: 'Jun', uv: 2390, pv: 4, amt: 2500 },
    { name: 'Jul', uv: 3490, pv: 2, amt: 2100 },
    { name: 'Aug', uv: 3490, pv: 1, amt: 2100 },
    { name: 'Sep', uv: 3490, pv: 3, amt: 2100 },
    { name: 'Oct', uv: 3490, pv: 1, amt: 2100 },
    { name: 'Nov', uv: 3490, pv: 4, amt: 2100 },
    { name: 'Dec', uv: 3490, pv: 5, amt: 2100 },
];

const Graph = () => {
    return (
        <ResponsiveContainer width="100%" height="100%">
            <BarChart
                width={500}
                height={300}
                data={data}
                margin={{
                    top: 5,
                    right: 30,
                    left: 20,
                    bottom: 5,
                }}
            >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                {/* <Legend /> */}
                {/* <Bar dataKey="pv" fill="#A0BF7C" activeBar={<Rectangle fill="pink" stroke="blue" />} /> */}
                <Bar barSize={15} dataKey="pv" fill={BG_PRIMARY} />
            </BarChart>
        </ResponsiveContainer>
    );
};

export default Graph;
