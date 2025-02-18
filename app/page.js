// "use client"
//
// import React, {useEffect, useState} from 'react';
// import Map from '../components/Map';
// import Filters from "../components/Filters";
//
// const HomePage = () => {
//     const [filteredProperties, setFilteredProperties] = useState([]);
//     const [filters, setFilters] = useState({
//         minPrice: '',
//         maxPrice: '',
//         minArea: '',
//         maxArea: '',
//     });
//
//     useEffect(() => {
//         fetch('/sample.json')
//             .then(res => res.json())
//             .then(data => {
//                 const dataArray = Object.values(data);
//                 setFilteredProperties(dataArray);
//             });
//     }, []);
//
//     const handleFilterChange = (e) => {
//         setFilters({...filters, [e.target.name]: e.target.value});
//     };
//
//     const applyFilters = () => {
//         fetch('/sample.json')
//             .then(res => res.json())
//             .then(data => {
//                 const dataArray = Object.values(data);
//                 const filtered = dataArray.filter(prop => {
//                     return (
//                         (!filters.minPrice || prop.price >= filters.minPrice) &&
//                         (!filters.maxPrice || prop.price <= filters.maxPrice) &&
//                         (!filters.minArea || prop.flat_area >= filters.minArea) &&
//                         (!filters.maxArea || prop.flat_area <= filters.maxArea)
//                     );
//                 });
//                 setFilteredProperties(filtered);
//             });
//     };
//
//     return (
//         <main className="flex min-h-screen flex-col items-center justify-center p-6">
//             <h1 className="text-4xl font-bold mb-4">FlatFly Dashboard</h1>
//             <div className="w-full flex min-h-[600px] flex-col md:flex-row gap-4">
//                 {/* Фільтри */}
//                 <Filters filters={filters} onApplyFilters={applyFilters}/>
//
//                 {/* Карта */}
//                 <div className="w-full md:w-2/3">
//                     <Map properties={filteredProperties}/>
//                 </div>
//             </div>
//         </main>
//     );
// };
//
// export default HomePage;


"use client"

import React, {useEffect, useState} from 'react';
import Map from '../components/Map';
import Filters from '../components/Filters';

const HomePage = () => {
    const [filteredProperties, setFilteredProperties] = useState([]);
    const [filters, setFilters] = useState({
        minPrice: '',
        maxPrice: '',
        minArea: '',
        maxArea: '',
    });

    useEffect(() => {
        fetch('/sample.json')
            .then(res => res.json())
            .then(data => {
                const dataArray = Object.values(data);
                setFilteredProperties(dataArray);
            });
    }, []);

    const handleFilterChange = (e) => {
        setFilters({...filters, [e.target.name]: e.target.value});
    };

    const applyFilters = () => {
        fetch('/sample.json')
            .then(res => res.json())
            .then(data => {
                const dataArray = Object.values(data);
                const filtered = dataArray.filter(prop => {
                    return (
                        (!filters.minPrice || prop.price >= filters.minPrice) &&
                        (!filters.maxPrice || prop.price <= filters.maxPrice) &&
                        (!filters.minArea || prop.flat_area >= filters.minArea) &&
                        (!filters.maxArea || prop.flat_area <= filters.maxArea)
                    );
                });
                setFilteredProperties(filtered);
            });
    };

    return (
        <main className="flex min-h-screen flex-col items-center p-6">
            <h1 className="text-4xl font-bold mb-4">FlatFly Dashboard</h1>
            <div className="w-full flex min-h-[600px] flex-col md:flex-row gap-4">
                <Filters filters={filters} onApplyFilters={applyFilters} onFilterChange={handleFilterChange}/>
                <div className="w-full md:w-2/3">
                    <Map properties={filteredProperties}/>
                </div>
            </div>
        </main>
    );
};

export default HomePage;
