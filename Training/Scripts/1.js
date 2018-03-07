function Validate()
{
	var firstName = document.getElementById('txtFname').value;
	var lastName = document.getElementById('txtLname').value;
	var email = document.getElementById('emailID').value;
	var upload = document.getElementById('imgUploader');
	var mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
	var nameFormat = /^[a-zA-Z]*$/;

	if(firstName == "" || firstName == null)
	{
		alert("Enter UserName");
		return false;
	}

	if(nameFormat.test(firstName)== false)
	{
		alert("Please use alphabets for name");
		return false;
	}

	if(firstName.length < 5 || firstName.length>15)
	{
		alert("Your Character must be 5 to 15 Character");
		return false;
	}


	if(lastName == "" || lastName == null)
	{
		alert("Enter lastName");
		return false;
	}

	if(nameFormat.test(lastName)== false)
	{
		alert("Please use alphabets for name");
		return false;
	}

	if(lastName.length < 5 || lastName.length > 15)
	{
		alert("Your Character must be 5 to 15 Character");
		return false;
	}


	if(email == "" || email == null)
	{
		alert("Enter Email");
		return false;
	}

	if(mailformat.test(email) == false)
	{
		alert("Please enter a valid Email");
		return false;
	}

	if(upload.files.length === 0)
	{
		alert("Please select your photo");
		upload.focus();
		return false;
	}

}

function fileValidation()
{
	var fileInput = document.getElementById('imgUploader');
	var filePath = fileInput.value;
	var allowedExtensions = /(\.jpg|\.gif)$/i;
	var fileSize =250.00;

	if(!allowedExtensions.exec(filePath))
	{
		alert("Please upload file having extensions .jpeg or .gif only.");
		fileInput.value="";
		return false;
	}

	var uploadedSize = parseFloat(fileInput.files[0].size / 1024).toFixed(2);

	if(uploadedSize > 250 )
	{
		alert("Please upload photo of size less than 250 kb");
		return false;
	}
}

