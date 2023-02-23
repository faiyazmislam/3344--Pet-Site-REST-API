using System;

namespace FaiyazIslamLab5.Models
{
    public class Pet
    {

        public int AdoptionID { get; set; }
        public string PetType { get; set; }
        public string PetName { get; set; }
        public string PetBD { get; set; }
        public int PetAge { get; set; }
        public string PetAvailability { get; set; }
        public string PetDescription { get; set; }
        public string PetURL { get; set; }

        public string CustomerName { get; set; }

        public Pet()
        {

        }

        public Pet(int adoptionID, string petType, string petName, string petDB, int petAge, string petAvailability,
            string petDescription, string petURL)
        {
            this.AdoptionID = adoptionID;
            this.PetType = petType;
            this.PetName = petName;
            this.PetBD = petDB;
            this.PetAge = petAge;
            this.PetAvailability = petAvailability;
            this.PetDescription = petDescription;
            this.PetURL = petURL;
        }
    }
}

