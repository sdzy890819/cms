define(["app"], function (app) {
    
	// class
	var UserRepository = (function () {
	    
	    // constructors
	    function UserRepository() {
			
	        // users
	        this.users = new Array();
	        this.users.push({ name: "Clark", address: "Taipei" });
	        this.users.push({ name: "Jeff", address: "Kaohsiung" });
	        this.users.push({ name: "Jammy", address: "Taipei" });
	    }
	    
	    // methods    
	    UserRepository.prototype.getUserByName = function (name) {
			
	        // result
	        var result = null;
	        for (var key in this.users) {
	            if (this.users[key].name == name) {
	                result = this.users[key];
	            }
	        }
			
	        // return
	        return result;
	    };
	    
	    // return
	    return UserRepository;
	})();
	
	// register
    app.service("UserRepository", [UserRepository]);
});