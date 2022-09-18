using CakeStore.Order.Dtos;

namespace CakeStore.Order.Events
{
    public class OrderCreatedEvent
    {
        public CakeDto[] Cakes { get; set; }
    }
}
