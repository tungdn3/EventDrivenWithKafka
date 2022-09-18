using CakeStore.Stock;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddRazorPages();

builder.Services.Configure<KafkaOptions>(builder.Configuration);

builder.Services.AddHostedService<KafkaConsumer>();

builder.Services.AddSingleton(factory => factory
    .GetServices<IHostedService>()
    .OfType<KafkaConsumer>()
    .First());

var app = builder.Build();

// Configure the HTTP request pipeline.
if (!app.Environment.IsDevelopment())
{
    app.UseExceptionHandler("/Error");
    // The default HSTS value is 30 days. You may want to change this for production scenarios, see https://aka.ms/aspnetcore-hsts.
    app.UseHsts();
}

app.UseHttpsRedirection();
app.UseStaticFiles();

app.UseRouting();

app.UseAuthorization();

app.MapRazorPages();

app.Run();
