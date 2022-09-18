using CakeStore.Stock.Dtos;

namespace CakeStore.Stock.Events
{
    public class OrderCreatedEvent
    {
        public CakeDto[] Cakes { get; set; }
    }
}
