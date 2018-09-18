import Base from './components/Main/Base.jsx';
import Login from './components/Authentication/Login.jsx';
import Signup from './components/Authentication/Signup.jsx';
import Index from './components/Main/index_page/Index.jsx';
import CreateEvent from './components/Events/new_event/CreateEvent.jsx';
import EventsByPage from './components/Common/EventsByPage.jsx';
import EventsByCategory from './components/Events/events_by_category/EventsByCategory.jsx';
import PopularEvents from './components/Events/popular_events/PopularEvents.jsx';
import AllEvents from './components/Events/all_events/AllEvents.jsx';
import Event from './components/Events/single_event/Event.jsx';
import MyEvents from './components/Events/my_events/MyEvents.jsx';
import CreatedEvents from './components/Events/new_event/CreateEvent.jsx';
import AttendingEvents from './components/Events/my_events/AttendingEvents.jsx';
import Auth from './modules/Auth';
import Schedule from "./components/Events/Schedule.jsx";
import Manage from "./components/Events/Manage.jsx";

const routes = {
        // base component (wrapper for the whole application).
        component: Base,
        childRoutes: [
            {
                path: '/',
                component: Index
            },
            {
                path: '/events',
                component: AllEvents
            },
            {
                path: '/signup',
                exactly: true,
                component: Signup
            },
            {
                path: '/login',
                exactly: true,
                component: Login
            },
            {
                path: '/logout',
                onEnter: (nextState, replace) => {
                    Auth.deauthenticateUser();

                    // change the current URL to /
                    replace('/');
                }
            },
            {
                path: '/events/new',
                exactly: true,
                component: CreateEvent
            },
            {
                path: '/events/:eventID',
                exactly: true,
                component: Event
            },
            {
                path: '/events/page/1',
                exactly: true,
                component: EventsByPage
            },
            {
                path: '/schedule',
                exactly: true,
                component: Schedule
            },
            {
                path: '/manage',
                exactly: true,
                component: Manage
            },
            {
                path: '/my_events',
                exactly: true,
                component: MyEvents
            },
            {
                path: '/my_created_events',
                exactly: true,
                component: CreatedEvents
            },
            {
                path: '/my_scheduled_events',
                exactly: true,
                component: AttendingEvents
            },
            {
                path:'/events/categories/:category',
                exactly: true,
                component: EventsByCategory
            },
            {
                path:'/popular_events',
                exactly: true,
                component: PopularEvents
            }
        ]
    }
;

export default routes;