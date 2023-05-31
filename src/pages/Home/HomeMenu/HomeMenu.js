import React, { useState } from "react";
import { Tabs } from 'antd';

const { TabPane } = Tabs

function HomeMenu(props) {

    const [state, setState] = useState({
        tabPosition: 'left'
    })

    const changeTabPosition = (e) => {
        setState({ tabPosition: e.target.value });
    };

    // render(){

    // }
    const { tabPosition } = state
    return (
        <>
            <Tabs tabPosition={tabPosition}>
                {[
                    {
                        key: '1',
                        tab: <img src="https://picsum.photos/200" className="rounded-full" width="50" />,
                    },
                    {
                        key: '2',
                        tab: <img src="https://picsum.photos/200" className="rounded-full" width="50" />,
                    },
                    {
                        key: '3',
                        tab: <img src="https://picsum.photos/200" className="rounded-full" width="50" />,
                    },
                ].map(item => (
                    <TabPane tab={item.tab} key={item.key}>
                        Tab {item.key}
                    </TabPane>
                ))}
            </Tabs>
        </>
    );
}

export default HomeMenu;