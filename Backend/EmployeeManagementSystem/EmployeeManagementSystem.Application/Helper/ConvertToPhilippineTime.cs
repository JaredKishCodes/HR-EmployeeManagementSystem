

namespace EmployeeManagementSystem.Application.Helper
{
    public static class DateTimeHelper
    {
        public static DateTime ConvertToPhilippineTime(DateTime utcDateTime)
        {
            return TimeZoneInfo.ConvertTimeFromUtc(
                utcDateTime,
                TimeZoneInfo.FindSystemTimeZoneById("Singapore Standard Time"));
        }
    }

}
