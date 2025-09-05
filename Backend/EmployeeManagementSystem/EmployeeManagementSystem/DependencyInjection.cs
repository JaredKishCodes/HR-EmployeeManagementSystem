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
            //error in doing the endpoint
            return services;
        }
    }
}
