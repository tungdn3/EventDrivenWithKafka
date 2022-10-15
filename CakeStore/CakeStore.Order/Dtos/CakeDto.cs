using Avro;
using Avro.Specific;

namespace CakeStore.Order.Dtos
{
    public class CakeDto : ISpecificRecord
    {
        private static Schema _schema = Schema.Parse(@"{
            ""name"": ""cake"",
            ""type"": ""record"",
            ""fields"": [
	            {""name"": ""id"", ""type"": ""long""},
	            {""name"": ""name"", ""type"": ""string""},
	            {""name"": ""count"", ""type"": ""long""},
            ]
}");

        public int Id { get; set; }

        public string Name { get; set; }

        public int Quantity { get; set; }

        public Schema Schema => _schema;

        public object Get(int fieldPos)
        {
            switch (fieldPos)
            {
                case 0: return Id;
                case 1: return Name;
                case 2: return Quantity;
                default: throw new AvroRuntimeException("Bad index " + fieldPos + " in Get()");
            };
        }

        public void Put(int fieldPos, object fieldValue)
        {
            switch (fieldPos)
            {
                case 0: Id = (int)fieldValue; break;
                case 1: Name = (string)fieldValue; break;
                case 2: Quantity = (int)fieldValue; break;
                default: throw new AvroRuntimeException("Bad index " + fieldPos + " in Put()");
            };
        }
    }
}
