using System.ComponentModel;

namespace FaiyazIslamLab5.Models
{
    public class Customer
    {

        public int CustomerID { get; set; }
        public string CustomerName { get; set; }
        public int PetID { get; set; }

        public Customer()
        {

        }

        public Customer(int customerID, string customerName, int petID)
        {
            CustomerID = customerID;
            CustomerName = customerName;
            PetID = petID;
        }
    }
}
