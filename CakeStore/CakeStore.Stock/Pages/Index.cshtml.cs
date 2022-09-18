using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;

namespace CakeStore.Stock.Pages
{
    public class IndexModel : PageModel
    {
        private readonly ILogger<IndexModel> _logger;
        private readonly KafkaConsumer _kafkaConsumer;

        public IndexModel(ILogger<IndexModel> logger, KafkaConsumer kafkaConsumer)
        {
            _logger = logger;
            _kafkaConsumer = kafkaConsumer;
        }

        public List<StockItem> StockItems { get; private set; }

        public void OnGet()
        {
            StockItems = _kafkaConsumer.StockItems;
        }
    }
}