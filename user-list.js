class User {
    constructor(id, username, registeredOn){
        this.id = id;
        this.username = username;
        this.registeredOn = registeredOn;
    }
    toHtml() {
        let wrapper = document.createElement('div');
        wrapper.innerHTML = `<span id="${this.id}">${this.username}</span>`;
        return wrapper;
    }
}


let beResponse = {id: 123, name: 'pesho'}; // data from the server
let user1 = new User(beResponse.id, beResponse.name);

document.body.appendChild(user1.toHtml());