using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Data;
using System.Collections.Generic;
using FaiyazIslamLab5.Models;

namespace FaiyazIslamLab5.Controllers
{
    //ensures that the api gets and returns json 
    [Consumes("application/json")]
    [Produces("application/json")]
    [Route("api/pets")]
    public class PetsController : Controller
    {

        //adds the new pet into the Pets database
        // POST api/pets/post
        [HttpPost]
        public Boolean Post([FromBody] Pet newPet)
        {
            DBConnect objDB = new DBConnect();
            string strSQL = "INSERT INTO Pets (PetType, PetName, PetBD, PetAge, PetAvailability, PetDescription, PetURL) " +
                            "VALUES ('" + newPet.PetType + "', '" + newPet.PetName + "', '" + newPet.PetBD + "', '" + newPet.PetAge
                            + "', '" + newPet.PetAvailability + "', '" + newPet.PetDescription
                            + "', '" + newPet.PetURL + "')";

            int result = objDB.DoUpdate(strSQL);

            if (result > 0)
                return true;

            return false;
        }


        //adds new customer to Customers database and updates the availability and owner name of the pet
        //api/pets/PostCustomer
        [HttpPost("PostCustomer")]
        public Boolean PostCustomer([FromBody] Customer newCustomer)
        {
            DBConnect odjDB = new DBConnect();
            string strSQL = "INSERT INTO Customers (CustomerName, PetID) " + "VALUES ('" + newCustomer.CustomerName + "', '" 
                + newCustomer.PetID + "')";

            int result = odjDB.DoUpdate(strSQL);

            string strSQL2 = "UPDATE Pets SET PetAvailability = '" + "Adopted" + "', CustomerName = '" +
                newCustomer.CustomerName + "' WHERE AdoptionID = " + newCustomer.PetID;

            result += odjDB.DoUpdate(strSQL2);

            if (result > 1) return true;

            return false;
        }


        //updates the target pet's information
        //api/pets/put
        [HttpPut]
        public Boolean Put([FromBody] Pet newPetInfo)
        {
            DBConnect objDB = new DBConnect();
            string strSQL = "UPDATE Pets SET PetType = '" + newPetInfo.PetType + "', PetName = '" + newPetInfo.PetName
                + "', PetBD = '" + newPetInfo.PetBD + "', PetAge = '" + newPetInfo.PetAge + "', PetAvailability = '" + newPetInfo.PetAvailability
                + "', PetDescription = '" + newPetInfo.PetDescription + "', PetURL = '" + newPetInfo.PetURL + "' WHERE AdoptionID = " + newPetInfo.AdoptionID;

            int result = objDB.DoUpdate(strSQL);

            if (result > 0)
                return true;

            return false;
        }


        //deletes a pet from the database
        //api/pets/DeletePet/2
        [HttpDelete("DeletePet/{id}")]
        public Boolean DeletePet(int id)
        {
            DBConnect objDB = new DBConnect();
            string strSQL = "DELETE FROM Pets WHERE AdoptionID = " + id;

            int result = objDB.DoUpdate(strSQL);

            if (result > 0) 
                return true;

            return false;
        }


        //Gets all pets
        // GET api/pets/GetAllPets
        [HttpGet("GetAllPets")]
        public List<Pet> Get()
        {
            DBConnect objDB = new DBConnect();
            DataSet ds = objDB.GetDataSet("SELECT * FROM Pets");
            List<Pet> pets = new List<Pet>();
            Pet pet;

            foreach (DataRow record in ds.Tables[0].Rows)
            {
                pet = new Pet();

                pet.AdoptionID = int.Parse(record["AdoptionID"].ToString());
                pet.PetType = record["PetType"].ToString();
                pet.PetName = record["PetName"].ToString();
                pet.PetBD = record["PetBD"].ToString();
                pet.PetAge = int.Parse(record["PetAge"].ToString());
                pet.PetAvailability = record["PetAvailability"].ToString();
                pet.PetDescription = record["PetDescription"].ToString();
                pet.PetURL = record["PetURL"].ToString();
                pet.CustomerName = record["CustomerName"].ToString();

                pets.Add(pet);
            }

            return pets;
        }


        //Gets a single pet by an ID
        // GET api/pets/GetPetByID/8
        [HttpGet("GetByID/{id}")]
        public Pet GetByID(int id)
        {
            DBConnect petDB = new DBConnect();
            DataSet ds = petDB.GetDataSet("SELECT * FROM Pets WHERE AdoptionID = " + id);
            DataRow record;

            Pet pet = new Pet();

            if (ds.Tables[0].Rows.Count != 0)
            {
                record = ds.Tables[0].Rows[0];
                pet.AdoptionID = (int)record["AdoptionID"];
                pet.PetType = record["PetType"].ToString();
                pet.PetName = record["PetName"].ToString();
                pet.PetBD = record["PetBD"].ToString();
                pet.PetAge = int.Parse(record["PetAge"].ToString());
                pet.PetAvailability = record["PetAvailability"].ToString();
                pet.PetDescription = record["PetDescription"].ToString();
                pet.PetURL = record["PetURL"].ToString();
                pet.CustomerName = record["CustomerName"].ToString();
            }

            return pet;
        }


        //Gets all pets that match the target type
        // GET api/pets/GetPetByType/Bird
        [HttpGet("GetByType/{type}")]
        public List<Pet> GetByType(string type)
        {
            DBConnect objDB = new DBConnect();
            DataSet ds = objDB.GetDataSet("SELECT * FROM Pets WHERE PetType = '" + type + "'");
            List<Pet> pets = new List<Pet>();
            Pet pet;

            foreach (DataRow record in ds.Tables[0].Rows)
            {
                pet = new Pet();

                pet.AdoptionID = int.Parse(record["AdoptionID"].ToString());
                pet.PetType = record["PetType"].ToString();
                pet.PetName = record["PetName"].ToString();
                pet.PetBD = record["PetBD"].ToString();
                pet.PetAge = int.Parse(record["PetAge"].ToString());
                pet.PetAvailability = record["PetAvailability"].ToString();
                pet.PetDescription = record["PetDescription"].ToString();
                pet.PetURL = record["PetURL"].ToString();
                pet.CustomerName = record["CustomerName"].ToString();

                pets.Add(pet);
            }

            return pets;
        }


        //Gets all pets that match the target age
        // GET api/pets/GetPetByAge/4
        [HttpGet("GetByAge/{age}")]
        public List<Pet> GetByAge(int age)
        {
            DBConnect objDB = new DBConnect();
            DataSet ds = objDB.GetDataSet("SELECT * FROM Pets WHERE PetAge = " + age);
            List<Pet> pets = new List<Pet>();
            Pet pet;

            foreach (DataRow record in ds.Tables[0].Rows)
            {
                    pet = new Pet();

                    pet.AdoptionID = int.Parse(record["AdoptionID"].ToString());
                    pet.PetType = record["PetType"].ToString();
                    pet.PetName = record["PetName"].ToString();
                    pet.PetBD = record["PetBD"].ToString();
                    pet.PetAge = int.Parse(record["PetAge"].ToString());
                    pet.PetAvailability = record["PetAvailability"].ToString();
                    pet.PetDescription = record["PetDescription"].ToString();
                    pet.PetURL = record["PetURL"].ToString();
                    pet.CustomerName = record["CustomerName"].ToString();
                    
                    pets.Add(pet);
            }

            return pets;
        }

    }
}
