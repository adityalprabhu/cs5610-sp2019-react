class UserService {
    static myInstance = null;

    constructor(){
        this.user = "";
        this.apiUrl = "https://ancient-coast-13605.herokuapp.com";
        // this.apiUrl = " https://cs5610-sp19-adityalprabhu.herokuapp.com";
    }

    static getInstance() {
        if (UserService.myInstance == null) {
            UserService.myInstance = new UserService();
        }
        return this.myInstance;
    }

    login = (username, password) => {

        const requestOptions = {
            method: 'POST',
            credentials: 'include',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username, password })
        };

        return fetch(this.apiUrl+'/api/login', requestOptions)
            .then(this.handleResponse)
            .then(user => {
                // store user details and jwt token in local storage to keep user logged in between page refreshes
                console.log("sdsdsdsdds")
                localStorage.setItem('user', JSON.stringify(user));

                return user;
            });
    };

    register = (username, password) => {

        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username, password })
        };

        return fetch(this.apiUrl+'/api/register', requestOptions)
            .then(this.handleResponse)
            .then(user => {
                // store user details and jwt token in local storage to keep user logged in between page refreshes
                if(user!=null){
                    console.log("dssdsdsd")
                    localStorage.setItem('user', JSON.stringify(user));
                }

                return user;

            });
    };


    logout = () => {
        const requestOptions = {
            method: 'POST',
            credentials: 'include',
            headers: { 'Content-Type': 'application/json' }
        };



        return fetch(this.apiUrl+'/api/logout', requestOptions)
            .then(function(res){
            console.log(res);
            return null;
            });
    };

    getProfile = (user) => {
        const requestOptions = {
            method: 'POST',
            credentials: 'include',
            headers: { 'Content-Type': 'application/json' }
        };

        let userId = 0
        var user = JSON.parse(localStorage.getItem("user"))
            if(user){
             userId = user.id
            }


        return fetch(this.apiUrl+'/api/user/' + userId +'/profile', requestOptions)
            .then(this.handleResponse)
            .then(function(res){
                console.log(res);
                return res;
            });
    };



    updateProfile = (user) => {
        const requestOptions = {
            method: 'PUT',
            credentials: 'include',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(user)
        };

        return fetch(this.apiUrl+'/api/profile', requestOptions)
            .then(this.handleResponse)
            .then(function(res){
                console.log(res);
                return res;
            });
    };


    handleResponse = (response) => {
        return response.text().then(text => {
            const data = text && JSON.parse(text);
            if (!response.ok) {
                if (response.status === 401) {
                    // auto logout if 401 response returned from api
                    // logout();
                    // location.reload(true);
                    console.log("401 Error");
                }

                const error = (data && data.message) || response.statusText;
                return Promise.reject(error);
            }

            return data;
        });
    }
}
export default UserService;