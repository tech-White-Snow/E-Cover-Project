import React from "react";
import MockUpCard from './subtools/MockUpCard';

const MockupsPage = ({setMockupsSelected}) => {
    const urls = ['http://192.168.134.125:3000/testdata/mockups/test1.png', 'http://192.168.134.125:3000/testdata/mockups/test2.png', 'http://192.168.134.125:3000/testdata/mockups/test3.png', 'http://192.168.134.125:3000/testdata/mockups/test4.png']
    return (
        <div className="p-1">
            <div className="background-page-header">
                Choose Mockup Page
            </div>
            <div className="background-page-body p-1">
                {/* <img src = 'http://192.168.134.125:3000/testdata/test1.png' alt="testimg" width={300} height={200} className="image-card"/>
                <img src = 'http://192.168.134.125:3000/testdata/test1.png' alt="testimg" width={300} height={200} className="image-card"/>
                <img src = 'http://192.168.134.125:3000/testdata/test1.png' alt="testimg" width={300} height={200} className="image-card"/> */}
                {urls.map((url, index) => {
                    return (<MockUpCard url = {url} setMockupsSelected={setMockupsSelected} index={index} />)
                })}
            </div>
        </div>
    )
}

export default MockupsPage;