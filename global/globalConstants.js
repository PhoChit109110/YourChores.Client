// All the names of screens used in navigation
const screens = {
    Timeline: 'Time Line',
    Rooms: 'Room',
    Settings: 'Setting',
    RoomsScreen: 'RoomsScreen',
    RoomDetailsScreen: 'RoomDetailsScreen',
    RoomSearchScreen: 'RoomSearchScreen',
    RoomSettingsScreen: 'RoomSettingsScreen',
    MemberSearchScreen: 'MemberSearchScreen',
    SettingsScreen: 'SettingsScreen',
    TimelineScreen: 'TimelineScreen',

    // SwitchNavigation
    DrawerNavigationScreen: 'DrawerNavigationScreen',
    LoginScreen: 'loginScreen',
    SignupSCreen: 'signupScreen',
    WaitingScreen: 'waitingScreen'
}

const urgency = {
    Low: 1,
    Medium: 2,
    High: 3,
    translate:(value)=>{
        switch(value){
            case 1:case '1':return "One";
            case 2:case '2':return "Two";
            case 3:case '3':return "Three";
        }
    }
}

const choreState = {
    All: 1,
    Pending: 2,
    Done: 3,
    translate: (value) => {
        switch (value) {
            case 1:
            case '1':
                return "All";
            case 2:
            case '2':
                return "Pending";
            case 3:
            case '3':
                return "Done";
        }
    }
}



const sortBy = {
    MostRecent: 1,
    Urgency: 2,
    translate: (value) => {
        switch (value) {
            case 1:
            case '1':
                return "MostRecent";
            case 2:
            case '2':
                return "Urgency";

        }
    }
}
const joinRequestType = {
    Join : 1,
    Invite : 2,
    translate: (value) => {
        switch (value) {
            case 1:
            case '1':
                return "طلب انظمام";
            case 2:
            case '2':
                return "دعوة";
            
        }
    }
}
const papulateOptions = (enums) => {
    var options = [];
    for (var key in enums) {
        if (enums.hasOwnProperty(key) && key != 'translate') {
            options.push({
                value: enums[key],
                text: enums.translate(enums[key]),
                key: `${enums[key]}`
            })
        }
    }
    return options;
}
export { screens, urgency,choreState,papulateOptions,joinRequestType ,sortBy}