
const INITIAL_STATES = {
    username: '',
    isLoading:false,
    isLoggedIn: false,
    loader: false,
    email : '',
    uri:'',
    uid : '',
    auth: false,
    contact:'',
    address:'',
    age:"",
    Category:'',
    userType:'',
    company_name:'',
    timing:'',
    salary:'',
    city:'',
    exp:'',
    allstudents:[],
    allcompanies:[]
    
}

export default function (state = INITIAL_STATES, action) {

    switch (action.type) {
      
        case "CHANGE_LOADING_STATE":
            return ({
                ...state,
                isLoading: !state.isLoading
            })
        case "LIST_STUDENTS":
            return ({
                ...state,
                allstudents: action.payload
            })
        case "LIST_COMPANIES":
        return ({
            ...state,
            allcompanies: action.payload
        })
        case "LOGGEDIN_USER":
            console.log(action.payload)
            return ({
                ...state,
                email: action.payload.email,
                username: action.payload.name,
                uid: action.payload.uid,
               contact: action.payload.contact,
              address: action.payload.address,
               Category: action.payload.Category,
                age:action.payload.age,
                isLoggedIn : true,
            })
        default:
            return state;
    }

}