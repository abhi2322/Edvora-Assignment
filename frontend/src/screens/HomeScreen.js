import React from 'react';

function HomeScreen() {
    const data= JSON.parse(localStorage.getItem('user'));
    return (
        <div>
            {data.first_name}
        </div>
    )
};

export default HomeScreen;

