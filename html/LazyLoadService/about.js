define(["UserRepository"], function () {
	
	// controller
	return ["$scope", "UserRepository", function ($scope, UserRepository) {
		
		// properties
	    $scope.title = "This is About page";
		$scope.user = UserRepository.getUserByName("Clark");
	}];	
});