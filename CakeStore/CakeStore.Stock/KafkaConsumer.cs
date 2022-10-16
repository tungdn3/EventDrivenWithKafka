using CakeStore.Stock.Events;
using Confluent.Kafka;
using Microsoft.Extensions.Options;
using Newtonsoft.Json;

namespace CakeStore.Stock
{
    public class KafkaOptions
    {
        public Dictionary<string, string> KafkaConfig { get; set; }
    }

    public class KafkaConsumer : BackgroundService
    {
        private readonly KafkaOptions _options;
        private IConsumer<Null, string> _consumer;

        public KafkaConsumer(IOptions<KafkaOptions> optionsAccessor)
        {
            _options = optionsAccessor.Value;

            var consumerConfig = new ConsumerConfig(_options.KafkaConfig)
            {
                GroupId = Guid.NewGuid().ToString(),
                //AutoOffsetReset = AutoOffsetReset.Earliest,
                EnableAutoCommit = false
            };

            _consumer = new ConsumerBuilder<Null, string>(consumerConfig).Build();
        }

        public List<StockItem> StockItems { get; private set; } = new List<StockItem>
        {
            new StockItem { Id = 1, Name = "Aesthetic Blue", Quality = 1000 },
            new StockItem { Id = 2, Name = "Bundt", Quality = 1000 },
            new StockItem { Id = 3, Name = "Chocolate", Quality = 1000 },
            new StockItem { Id = 4, Name = "Naked", Quality = 1000 },
            new StockItem { Id = 5, Name = "Pineapple", Quality = 1000 },
            new StockItem { Id = 6, Name = "Berry", Quality = 1000 },
        };

        protected override async Task ExecuteAsync(CancellationToken stoppingToken)
        {
            _consumer.Subscribe(new[] { "order" });

            // Hack: to prevent blocking the host service
            await Task.Delay(100);

            while (!stoppingToken.IsCancellationRequested)
            {
                var result = _consumer.Consume(stoppingToken);
                if (!string.IsNullOrEmpty(result.Message.Value))
                {
                    try
                    {
                        var orderCreatedEvent = JsonConvert.DeserializeObject<OrderCreatedEvent>(result.Message.Value);
                        ReduceStock(orderCreatedEvent);
                    }
                    catch { }
                }
            }
        }

        private void ReduceStock(OrderCreatedEvent? orderCreatedEvent)
        {
            if (orderCreatedEvent == null || orderCreatedEvent.Cakes == null || !orderCreatedEvent.Cakes.Any())
            {
                return;
            }

            StockItems = StockItems.Select(x =>
            {
                var orderedItem = orderCreatedEvent.Cakes.FirstOrDefault(o => o.Id == x.Id);
                if (orderedItem != null)
                {
                    x.Quality -= orderedItem.Quantity;
                }

                return x;
            }).ToList();
        }
    }
}
