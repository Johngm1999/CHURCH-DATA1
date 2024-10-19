import React from 'react';
import { Dropdown, Nav, Tab } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import endpoints from '../../services/endpoints';

function Notification({ notifications, refetch }) {
    let allRead = true;

    const navigate = useNavigate();

    const unreadNotifications = notifications.filter(
        (item) => item.MARK_READ !== 1
    );
    if (unreadNotifications.length !== 0) {
        allRead = false;
    }

    const DropItems = ({ item }) => (
        <div
            className='border-top'
            style={{
                backgroundColor:
                    item.MARK_READ === 1 ? '#F0F0F0' : 'transparent',
            }}
        >
            <Dropdown.Item
                eventKey='1'
                key={item.Notification_Id}
                onClick={() => {
                    navigate('/' + item.NOTIFICATION_LOCATION, {
                        state: {
                            courseId: item.Course_ID,
                            courseCategoryId: item.Course_Category_ID,
                            versionId: item.Version_ID,
                        },
                    });

                    if (item.MARK_READ !== 1) {
                        axios
                            .post(endpoints.notification.instructorRead, item)
                            .then((res) => {
                                refetch();
                            });
                    }
                }}
            >
                <p
                    className='small mb-1 fw-bold'
                    style={{ width: '250px', whiteSpace: 'normal' }}
                >
                    <span className='text-capitalize'>
                        {item.Course_NAME ? item.Course_NAME + ' : ' : ''}
                    </span>
                    {item.NOTIFICATION_CONTENT}
                </p>
                <span className='small'>{item.NOTIFICATION_TOPIC}</span>
            </Dropdown.Item>
        </div>
    );

    return (
        <div className='bell custom-tab'>
            <Dropdown align='end'>
                <Dropdown.Toggle
                    variant='transparent'
                    className='clearFocusDecorate p-0'
                >
                    {allRead ? (
                        <span
                            className='rounded-circle'
                            style={{
                                border: '2px solid #D89B65',
                                width: '23px',
                                height: '23px',
                                display: 'inline-block',
                            }}
                        />
                    ) : (
                        <span
                            className='rounded-circle'
                            style={{
                                border: '2px solid #D89B65',
                                width: '23px',
                                height: '23px',
                                display: 'inline-block',
                                position: 'relative',
                            }}
                        >
                            <span
                                className='d-inline-block position-absolute rounded-circle bg-white'
                                style={{
                                    border: '2px solid #07203F',
                                    outline: '2px solid white',
                                    width: '9px',
                                    height: '9px',
                                    right: '-2px',
                                    top: '-2px',
                                }}
                            />
                        </span>
                    )}
                </Dropdown.Toggle>

                <Dropdown.Menu
                    className='border pb-0 shadow-sm'
                    style={{ minWidth: '250px' }}
                >
                    {notifications.length ? (
                        <Tab.Container
                            defaultActiveKey='unread'
                            className='bg-danger'
                        >
                            <Nav
                                variant='pills'
                                className='my-3 justify-content-center nav-tabs mx-auto'
                                style={{ width: '150px' }}
                            >
                                <Nav.Item className='w-50 text-center'>
                                    <Nav.Link
                                        type='button'
                                        className='p-2 py-0 small'
                                        eventKey='unread'
                                    >
                                        Unread
                                    </Nav.Link>
                                </Nav.Item>
                                <Nav.Item className='w-50 text-center'>
                                    <Nav.Link
                                        type='button'
                                        className='p-2 py-0 small'
                                        eventKey='all'
                                    >
                                        All
                                    </Nav.Link>
                                </Nav.Item>
                            </Nav>
                            <Tab.Content>
                                <Tab.Pane
                                    eventKey='all'
                                    title='All'
                                    style={{
                                        maxHeight: '300px',
                                        overflow: 'auto',
                                    }}
                                >
                                    {notifications.map((item) => (
                                        <DropItems
                                            item={item}
                                            key={item.Notification_Id}
                                        />
                                    ))}
                                </Tab.Pane>
                                <Tab.Pane
                                    eventKey='unread'
                                    title='Unread'
                                    style={{
                                        maxHeight: '300px',
                                        overflow: 'auto',
                                    }}
                                >
                                    {unreadNotifications.length === 0 ? (
                                        <div className='pt-3 p-4  text-center'>
                                            No notifications to read
                                        </div>
                                    ) : (
                                        unreadNotifications.map((item) => (
                                            <DropItems
                                                item={item}
                                                key={item.Notification_Id}
                                            />
                                        ))
                                    )}
                                </Tab.Pane>
                            </Tab.Content>
                        </Tab.Container>
                    ) : (
                        <p className='h6 p-3 text-secondary text-center'>
                            No notifications
                        </p>
                    )}
                </Dropdown.Menu>
            </Dropdown>
        </div>
    );
}

export default Notification;
