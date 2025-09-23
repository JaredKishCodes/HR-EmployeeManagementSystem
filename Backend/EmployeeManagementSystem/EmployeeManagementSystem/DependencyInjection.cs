using System.Text.Json.Serialization;
using EmployeeManagementSystem.Application;
using EmployeeManagementSystem.Infrastructure;

namespace EmployeeManagementSystem
{
    public static class DependencyInjection
    {
        public static IServiceCollection AddApiServices(this IServiceCollection services,IConfiguration configuration)
        {
            // Add application services here
            services.AddApplicationServices()
                     .AddInfrastructureServices(configuration)
                     ;
            services.AddCors(options =>
            {
                options.AddPolicy("AllowAll", policy =>
                {
                    policy.AllowAnyOrigin()      // Allow all origins
                          .AllowAnyMethod()      // Allow any HTTP method (GET, POST, PUT, DELETE, etc.)
                          .AllowAnyHeader();     // Allow any header
                });
            });

            

            services.AddControllers()
                .AddJsonOptions(options =>
                {
                    options.JsonSerializerOptions.Converters.Add(new JsonStringEnumConverter());
                });

            return services;
        }
    }
}
