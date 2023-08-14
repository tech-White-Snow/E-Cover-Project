import React from "react";
import MockUpCard from './subtools/MockUpCard';
import {Divider} from '@mui/material';

const MockupsPage = ({setMockupsSelected}) => {
    //const nr = [7981, 7944, 5868, 2328, 1980, 1899, 1665, 1503, 1438, 1404, 1215, 1191, 968, 964, 520, 479, 192, 25, 7];
    const mockups = [
        {
            group: "Laptop",
            mockups: ["Laptop 2"] 
        },
        {
            group: "book",
            mockups: ["Software Book Design 1_Side View 1", "Software Book Design 1_Front View", "Software Book Design 1_Side View 2"] 
        },
        {
            group: "IPad",
            mockups: [] 
        },
        
    ];
    return (
        <div className="p-1">
            <div className="background-page-header">
                Choose Mockup Page
            </div>
            <div className="bg-library-page-body p-1">
                {mockups.map((group, key) => {
                    console.log("--mockups");
                    return( 
                        <div>
                        <Divider className="divider" textAlign="left">{group.group}</Divider>
                        <div>
                        {group.mockups.map((mockup, key) => {
                            console.log("--group", mockup);
                            return (
                                <div>
                                    
                                    <MockUpCard 
                                        mockup={mockup}
                                        setMockupsSelected={setMockupsSelected} />
                                </div>
                            )
                        })}
                        </div></div>
                    );
                    
                })}
            </div>
        </div>
    )
}

export default MockupsPage;