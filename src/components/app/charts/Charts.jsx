import React from 'react';
import CategoriesChart from './CategoriesChart/CategoriesChart';
import DayChart from './DayChart/DayChart';
import ExpenseOldChart from './OldCharts/ExpenseOldChart';
import WeekChart from './WeekChart/WeekChart';

const Charts = () => {
    return (
        <div style={{
            marginBottom: "7rem",
        }}>
            <CategoriesChart />
            <DayChart />
            <WeekChart />  
            <ExpenseOldChart />  
        </div>
    );
};

export default Charts;