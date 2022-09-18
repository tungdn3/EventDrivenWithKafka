using CakeStore.Order.Dtos;
using CakeStore.Order.Events;
using Microsoft.AspNetCore.Mvc;

namespace CakeStore.Order.Controllers;

[ApiController]
[Route("[controller]")]
public class OrdersController : ControllerBase
{
    private readonly ILogger<OrdersController> _logger;
    private KafkaEventBus _kafkaEventBus;

    public OrdersController(ILogger<OrdersController> logger, KafkaEventBus kafkaEventBus)
    {
        _logger = logger;
        _kafkaEventBus = kafkaEventBus;
    }

    [HttpPost]
    public async Task<ActionResult> Create(CreateOrderDto dto)
    {
        // Persist order here

        // Then publish the event
        var @event = new OrderCreatedEvent { Cakes = dto.Cakes };
        await _kafkaEventBus.Publish("order", @event);

        return Ok();
    }
}
