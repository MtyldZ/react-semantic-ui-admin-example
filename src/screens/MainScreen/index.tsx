import React, {memo, useState} from "react";
import {Container, Header} from "semantic-ui-react";
import './index.scss';
import {BodyDataType, HeaderType, TableComponent} from "../../components/TableComponent";
import {CustomFormComponent} from "../../components/CustomFormComponent";

const Headers: HeaderType[] = [
    {title: 'Name', value: 'name', width: 2, sortable: true, key: 'Name',},
    {title: 'Surname', value: 'surname', width: 2, key: 'Surname',},
    {title: 'Email', value: 'email', width: 3, key: 'Email',},
    {title: 'Custom', value: 'custom', width: 3, key: 'custom',},
    {
        title: 'Sing in Date',
        value: 'recordingDate',
        width: 3,
        sortable: true,
        alignment: "center",
        key: 'recordingDate',
    },
    {title: 'Salary', value: 'salary', width: 4, sortable: true, alignment: "right", key: 'salary',},
];

const BodyData: BodyDataType[] = [
    ...Array(32).fill(0).map((_, index) => ({
        name: `Name ${index.toString()}`,
        surname: `Surname ${index.toString()}`,
        email: `www.blablabla${index.toString()}.com`,
        custom: {
            raw: `${index.toString()}`,
            display:
                <div className="custom-cell-ball"
                     style={{backgroundColor: `#${Math.floor(Math.random() * 16777215).toString(16)}`}}>
                    index
                </div>
        },
        recordingDate: `${new Date(new Date().getTime() + (24 * 3600000 * (Math.random() * 14 - 7))).toLocaleDateString('tr')}`,
        salary: `${(Math.random() * 30000 + 10000)
            .toFixed(2)
            .replace(/\d(?=(\d{3})+\.)/g, '$&,')} TL`,
        key: `${index.toString()}`
    }))
];

export const MainScreen = memo(function MainScreen() {
    const [screenState, setScreenState] = useState<'table' | 'form' | ''>('');

    return (
        <div className="main-screen-container">
            <Container>
                {screenState !== '' ?
                    <div className="back-button-container" onClick={() => setScreenState('')}>
                        {'< Back'}
                    </div> : null
                }
                {screenState !== 'table' ?
                    <div className="back-button-container" onClick={() => setScreenState('table')}>
                        {'To Table'}
                    </div> : null
                }
                {screenState !== 'form' ?
                    <div className="back-button-container" onClick={() => setScreenState('form')}>
                        {'To Form'}
                    </div> : null
                }
            </Container>
            {screenState !== '' ?
                <Container className="header-container">
                    <Header as='h1'>Main Screen</Header>
                </Container> : null
            }
            {screenState === 'table' ?
                <React.Fragment>

                    <Container className="table-container">
                        <Header as='h4'>Stripped, max 3 item</Header>
                        <TableComponent
                            headers={Headers}
                            data={BodyData}
                            stripped={true}
                            maxItem={3}
                        />
                    </Container>
                    <Container className="table-container">
                        <Header as='h4'>Celled, Scrollable 540px</Header>
                        <TableComponent
                            headers={Headers}
                            data={BodyData}
                            celled={true}
                            maxHeight={540}
                        />
                    </Container>
                    <Container className="table-container">
                        <Header as='h4'>Celled, max 10 item, Sortable some Headers</Header>
                        <TableComponent
                            headers={Headers}
                            data={BodyData}
                            celled={true}
                            sortable={true}
                            maxItem={10}
                        />
                    </Container>
                    <Container className="table-container">
                        <Header as='h4'>Striped, Scrollable 420px, Sortable some Headers</Header>
                        <TableComponent
                            headers={Headers}
                            data={BodyData}
                            stripped={true}
                            sortable={true}
                            maxHeight={420}
                        />
                    </Container></React.Fragment> : null
            }
            {screenState === 'form' ?
                <Container className="form-container">
                    <CustomFormComponent/>
                </Container> : null
            }
        </div>
    );
})