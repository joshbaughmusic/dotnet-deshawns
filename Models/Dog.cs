using System.Security.Cryptography.X509Certificates;

namespace Deshawns.Models;

class Dog
{
    public int Id { get; set; }
    public string Name { get; set; }
    public int? WalkerId { get; set; }
    public int CityId { get; set; }
    public Walker Walker { get; set; }
    public City City  {get; set; }
}