import React from "react";
import MockUpCard from './subtools/MockUpCard';
import {Divider} from '@mui/material';
import './MockupsPage.css'

const MockupsPage = ({setMockupsSelected}) => {
    //const nr = [7981, 7944, 5868, 2328, 1980, 1899, 1665, 1503, 1438, 1404, 1215, 1191, 968, 964, 520, 479, 192, 25, 7];
    const mockups = [
        {
            group: "Laptop",
            mockups: ["Laptop (1)"] 
        },
        {
            group: "Book",
            mockups: [
                    "Book (1)",
                    "Book (2)",
                    "Book (3)",
                    "Book (4)",
                    "Book (5)",
                    "Book (6)",
                    "Book (7)",
                    "Book (8)",
                    "Book (9)",
                    "Book (10)",
                    "Book (11)",
                    "Book (12)",
                    "Book (13)",
                    "Book (14)"
                ] 
        },
        {
            group: "Mug",
            mockups: ["Mug (1)", "Mug (2)"] 
        },
        {
            group: "Ipad",
            mockups: ["Ipad (1)"] 
        },
        
    ];
    return (
        <div className="p-1">
            <div className="background-page-header">
                Choose Mockup Page
            </div>
            <div className="bg-library-page-body p-1">
                {mockups.map((group, key) => {
                  
                    return( 
                        <div style={{ marginTop: '20px' }}>
                        <Divider className="divider" textAlign="left">Mockup Group - {group.group}</Divider>
                        <div className="mockupGroup">
                        {group.mockups.map((mockup, key) => {
                           
                            return (
                                <div>
                                    <MockUpCard 
                                        key={key}
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