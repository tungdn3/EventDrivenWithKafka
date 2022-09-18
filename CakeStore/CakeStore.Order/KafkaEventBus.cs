using Confluent.Kafka;
using Newtonsoft.Json;

namespace CakeStore.Order
{
    public class KafkaEventBus
    {
        private readonly ILogger<KafkaEventBus> _logger;
        private readonly IProducer<Null, string> _producer;

        public KafkaEventBus(ILogger<KafkaEventBus> logger, IProducer<Null, string> producer)
        {
            _logger = logger;
            _producer = producer;
        }

        public async Task Publish<T>(string topic, T value)
        {
            var result = await _producer.ProduceAsync(
                topic,
                new Message<Null, string> { Value = JsonConvert.SerializeObject(value) });

            if (result.Status == PersistenceStatus.NotPersisted)
            {
                _logger.LogError("Failed to deliver message.");
            }
        }
    }
}
