import React from 'react';
import CategoriesChart from './CategoriesChart/CategoriesChart';
import DayChart from './DayChart/DayChart';

const Charts = () => {
    return (
        <div style={{
            marginBottom: "7rem"
        }}>
            <CategoriesChart />
            <DayChart />    
        </div>
    );
};

export default Charts;