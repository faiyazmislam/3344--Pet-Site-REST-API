$(document).ready(function () {

    //ADD PET TO DATABASE
    $("#addPetBtn").click(function () {

        var isPetValid = true;

        var petType = $("#addPetDDL").val().trim();
        var petName = $("#addName").val().trim();
        var petBirthdate = new Date($("#addBirthdate").val()).toLocaleDateString();
        var petAge = CalculatePetAge(petBirthdate);
        var petStatus = $("#addStatusDDL").val();
        var petDesc = $("#addDesc").val().trim();
        var petURL = $("#addURL").val();

        //input validation for the pet's info
        if (petName == "") {
            isPetValid = false;
        }
        if (petBirthdate == "Invalid Date") {
            isPetValid = false;
        }
        if (petDesc == "") {
            isPetValid = false;
        }
        if (petURL == "") {
            isPetValid = false;
        }

        //if data is entered properly, the pet is added
        if (isPetValid) {

            var strURL = "http://localhost:34607/api/pets/";

            // Clear the divs contents.
            $("#petDisplayDiv").html("");

            var newPet = new Object();
            newPet.AdoptionID = -1;
            newPet.PetType = petType;
            newPet.PetName = petName;
            newPet.PetBD = petBirthdate;
            newPet.PetAge = petAge;
            newPet.PetAvailability = petStatus;
            newPet.PetDescription = petDesc;
            newPet.PetURL = petURL;

            var strInput = JSON.stringify(newPet);

            //ajax post request
            $.ajax({

                type: "POST",
                url: strURL,
                contentType: "application/json; charset=utf-8",
                dataType: "json",                               
                data: strInput,
                success: function (data) {                    

                    var result = data;

                    if (result == true) {
                        alert("Pet was sucessfully stored into database.");
                    }
                    else {
                        alert("Program has failed to store the pet. Try again.");
                    }
                },
                error: function (req, status, error) {          
                    alert("Error: " + req.responseText + " | " + status + " | " + error);
                }
            });

        }
        else {
            alert("Please enter in proper data to add a pet.");
        }

    });

    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    //UPDATE PET IN DATABASE
    $("#updatePetBtn").click(function () {

        var isPetValid = true;

        var petID = $("#UpdateAdoptionID").val().trim();

        if (isNaN(petID)) {

            isPetValid = false;
            alert("Please enter a number for Adoption ID.");

        }

        var petType = $("#updateTypeDDL").val().trim();
        var petName = $("#updateName").val().trim();
        var petBirthdate = new Date($("#updateBirthdate").val()).toLocaleDateString();
        var petAge = CalculatePetAge(petBirthdate);
        var petStatus = $("#updateStatusDDL").val();
        var petDesc = $("#updateDesc").val().trim();
        var petURL = $("#updateURL").val();

        //input validation for the pet's info
        if (petName == "") {
            isPetValid = false;
        }
        if (petBirthdate == "Invalid Date") {
            isPetValid = false;
        }
        if (petDesc == "") {
            isPetValid = false;
        }
        if (petURL == "") {
            isPetValid = false;
        }

        //if data is entered properly, the pet is created
        if (isPetValid) {

            var strURL = "http://localhost:34607/api/pets/";    

            // Clear the divs contents.
            $("#petDisplayDiv").html("");

            var newPet = new Object();
            newPet.AdoptionID = parseInt(petID);
            newPet.PetType = petType;
            newPet.PetName = petName;
            newPet.PetBD = petBirthdate.toString();
            newPet.PetAge = petAge;
            newPet.PetAvailability = petStatus;
            newPet.PetDescription = petDesc;
            newPet.PetURL = petURL;

            var strInput = JSON.stringify(newPet);

            //ajax request for put
            $.ajax({

                type: "PUT",
                url: strURL,
                contentType: "application/json; charset=utf-8", 
                dataType: "json",                               
                data: strInput,
                success: function (data) {                      

                    var result = data;

                    if (result == true) {
                        alert("Pet was sucessfully update in the database.");
                    }
                    else {
                        alert("Program has failed to update the pet. Try again.");
                    }
                },

                error: function (req, status, error) {          
                    alert("Error: " + req.responseText + " | " + status + " | " + error);
                }
            });

        }
        else {
            alert("Please enter in proper data to update a pet.");
        }

    });

    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    //adopt btn that stores customer data and updates some pet data
    $("#adoptPetBtn").click(function () {

        var petID = $("#AdoptPetID").val().trim();

        if (isNaN(petID)) {
            alert("Not a valid number")
        }
        else {
            var newCustomer = new Object();
            newCustomer.PetID = parseInt(petID);
            newCustomer.CustomerName = $("#CustomerNameTxt").val().trim().toString();

            var strInput = JSON.stringify(newCustomer);

            var strURL = "http://localhost:34607/api/pets/PostCustomer";   


            $.ajax({

                type: "POST",
                url: strURL,
                contentType: "application/json; charset=utf-8", 
                dataType: "json",                              
                data: strInput,
                success: function (data) {                      

                    var result = data;

                    if (result == true) {
                        alert("Pet was sucessfully adopted.");
                    }
                    else {
                        alert("Program has failed to adopt the pet. Try again.");
                    }
                },
                error: function (req, status, error) {         
                    alert("Error: " + req.responseText + " | " + status + " | " + error);
                }
            });

        }

    });

    ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    //DELETE PET FROM DATABASE
    $("#deletePetBtn").click(function () {

        var petID = $("#deletePetID").val().trim();

        if (isNaN(petID)) {

            alert("Please enter a number for Adoption ID.");

        }
        else {

            var strURL = "http://localhost:34607/api/pets/DeletePet/";    
            var param = parseInt(petID);

            // Clear the divs contents.
            $("#petDisplayDiv").html("");

            //ajax request for delete 
            $.ajax({

                type: "DELETE",
                url: strURL + param,
                success: function (data) {                     

                    var result = data;

                    if (result == true) {
                        alert("Pet was sucessfully deleted from database.");
                    }
                    else {
                        alert("Program has failed to delete the pet. Either the pet does not exist or you have to try again.");
                    }
                },
                error: function (req, status, error) {          
                    alert("Error: " + req.responseText + " | " + status + " | " + error);
                }
            });
        }
    });

    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    //VIEW ALL PETS GET
    $("#ViewAllBtn").click(function () {

        var strURL = "http://localhost:34607/api/pets/GetAllPets/";    

        // Clear the divs contents.
        $("#petDisplayDiv").html("");

        //ajax request for get
        $.ajax({

            type: "GET",
            url: strURL,
            contentType: "application/json; charset=utf-8", 
            dataType: "json",                               
            success: function (data) {                      

                var petList = data;

                $.each(petList, function (index, pet) {

                    var singlePetDiv = document.createElement("div");
                    singlePetDiv.setAttribute("class", "singlePetDisplay");


                    var petData = document.createElement("p");
                    petData.innerHTML = "Adoption ID: " + pet.AdoptionID + " <br /> Type: " + pet.PetType + "<br /> Name: " + pet.PetName +
                        "<br /> DOB: " + pet.PetBD + "<br /> Age: " + pet.PetAge + "<br /> Status: " + pet.PetAvailability +
                        "<br /> Description: " + pet.PetDescription + "<br /> Owner: " + pet.CustomerName + "<br />";

                    var petImg = document.createElement("img");
                    petImg.setAttribute("src", pet.PetURL);
                    petImg.setAttribute("class", "petImage");

                    var break1 = document.createElement("br");
                    var break2 = document.createElement("br");


                    singlePetDiv.appendChild(petData);
                    singlePetDiv.appendChild(petImg);
                    singlePetDiv.append(break1);

                    $("#petDisplayDiv").append(singlePetDiv).append(break2);
                });

            },
            error: function (req, status, error) {          
                alert("Error: " + req.responseText + " | " + status + " | " + error);
            }

        });

    });

    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    //VIEW PET WITH ID
    $("#IDSearchBtn").click(function () {

        var searchID = $("#IDSearchTxt").val().trim();

        if (isNaN(searchID)) {

            alert("Please enter a number for Adoption ID.");

        }
        else {

            var strURL = "http://localhost:34607/api/pets/GetByID/";    
            var param = searchID;

            // Clear the divs contents.
            $("#petDisplayDiv").html("");

            $.ajax({

                type: "GET",
                url: strURL + param,
                contentType: "application/json; charset=utf-8", 
                dataType: "json",                               
                success: function (data) {                     

                    var pet = data;

                    var singlePetDiv = document.createElement("div");
                    singlePetDiv.setAttribute("class", "singlePetDisplay");


                    var petData = document.createElement("p");
                    petData.innerHTML = "Adoption ID: " + pet.AdoptionID + " <br /> Type: " + pet.PetType + "<br /> Name: " + pet.PetName +
                        "<br /> DOB: " + pet.PetBD + "<br /> Age: " + pet.PetAge + "<br /> Status: " + pet.PetAvailability +
                        "<br /> Description: " + pet.PetDescription + "<br /> Owner: " + pet.CustomerName + "<br />";

                    var petImg = document.createElement("img");
                    petImg.setAttribute("src", pet.PetURL);
                    petImg.setAttribute("class", "petImage");

                    var breaks = document.createElement("br");


                    singlePetDiv.appendChild(petData);
                    singlePetDiv.appendChild(petImg);
                    singlePetDiv.append(breaks);

                    $("#petDisplayDiv").append(singlePetDiv);

                },
                error: function (req, status, error) {          
                    alert("Error: " + req.responseText + " | " + status + " | " + error);
                }


            });
        }
    });

    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    //VIEW PETS BY TYPE
    $("#TypeSearchBtn").click(function () {

        var searchType = $("#typeSearchDDL").val().trim();

        var strURL = "http://localhost:34607/api/pets/GetByType/";    
        var param = searchType.toString();

        // Clear the divs contents.
        $("#petDisplayDiv").html("");

        $.ajax({

            type: "GET",
            url: strURL + param,
            contentType: "application/json; charset=utf-8", 
            dataType: "json",                               
            success: function (data) {                      

                var petList = data;

                $.each(petList, function (index, pet) {

                    var singlePetDiv = document.createElement("div");
                    singlePetDiv.setAttribute("class", "singlePetDisplay");


                    var petData = document.createElement("p");
                    petData.innerHTML = "Adoption ID: " + pet.AdoptionID + " <br /> Type: " + pet.PetType + "<br /> Name: " + pet.PetName +
                        "<br /> DOB: " + pet.PetBD + "<br /> Age: " + pet.PetAge + "<br /> Status: " + pet.PetAvailability +
                        "<br /> Desc: " + pet.PetDescription + "<br /> Owner: " + pet.CustomerName + "<br />";

                    var petImg = document.createElement("img");
                    petImg.setAttribute("src", pet.PetURL);
                    petImg.setAttribute("class", "petImage");

                    var break1 = document.createElement("br");
                    var break2 = document.createElement("br");


                    singlePetDiv.appendChild(petData);
                    singlePetDiv.appendChild(petImg);
                    singlePetDiv.append(break1);

                    $("#petDisplayDiv").append(singlePetDiv).append(break2);
                });

            },

            error: function (req, status, error) {          
                alert("Error: " + req.responseText + " | " + status + " | " + error);
            }
        });
    });

    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    //VIEW PETS BY AGE
    $("#AgeSearchBtn").click(function () {

        var searchAge = $("#ageSearchTxt").val().trim();

        if (isNaN(searchAge)) {

            alert("Please enter a number for age.");

        }
        else {

            var strURL = "http://localhost:34607/api/pets/GetByAge/";    
            var param = parseInt(searchAge);

            // Clear the divs contents.
            $("#petDisplayDiv").html("");

            $.ajax({

                type: "GET",
                url: strURL + param,
                contentType: "application/json; charset=utf-8",
                dataType: "json",                               
                success: function (data) {                      


                    var petList = data;

                    $.each(petList, function (index, pet) {

                        var singlePetDiv = document.createElement("div");
                        singlePetDiv.setAttribute("class", "singlePetDisplay");


                        var petData = document.createElement("p");
                        petData.innerHTML = "Adoption ID: " + pet.AdoptionID + " <br /> Type: " + pet.PetType + "<br /> Name: " + pet.PetName +
                            "<br /> DOB: " + pet.PetBD + "<br /> Age: " + pet.PetAge + "<br /> Status: " + pet.PetAvailability +
                            "<br /> Desc: " + pet.PetDescription + "<br /> Owner: " + pet.CustomerName + "<br />";

                        var petImg = document.createElement("img");
                        petImg.setAttribute("src", pet.PetURL);
                        petImg.setAttribute("class", "petImage");

                        var break1 = document.createElement("br");
                        var break2 = document.createElement("br");


                        singlePetDiv.appendChild(petData);
                        singlePetDiv.appendChild(petImg);
                        singlePetDiv.append(break1);

                        $("#petDisplayDiv").append(singlePetDiv).append(break2);
                    });

                },

                error: function (req, status, error) {          
                    alert("Error: " + req.responseText + " | " + status + " | " + error);
                }
            });
        }
    });


});

//function that calculates age
function CalculatePetAge(birthdate) {

    //converts the string into a Date object
    var DOB = new Date(birthdate);

    //calculates difference in time
    var diffInTime = Date.now() - DOB.getTime();

    //gets age
    var ageTime = new Date(diffInTime);

    //calculates the age in years
    var ageNumber = ageTime.getUTCFullYear() - 1970;

    //returns the absolute value 
    return Math.abs(ageNumber);
}