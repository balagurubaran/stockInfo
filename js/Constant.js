
app.service('Constant', function() {
	var httpStatus = 'localOnly';
	var confiqFilePath = ''

	 this.getHttpStatus = function(){
	 	return httpStatus;
	}
});