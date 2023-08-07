import React from "react";
import MockUpCard from './subtools/MockUpCard';

const MockupsPage = ({setMockupsSelected}) => {
    const nr = [7981, 7944, 5868, 2328, 1980, 1899, 1665, 1503, 1438, 1404, 1215, 1191, 968, 964, 520, 479, 192, 25, 7];
    return (
        <div className="p-1">
            <div className="background-page-header">
                Choose Mockup Page
            </div>
            <div className="bg-library-page-body p-1">
                {nr.map((nr) => {
                    return (<MockUpCard nr = {nr} setMockupsSelected={setMockupsSelected} />)
                })}
            </div>
        </div>
    )
}

export default MockupsPage;